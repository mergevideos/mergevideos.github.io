import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { UIMessages } from '../i18n/ui';
import {
  extractVideoMetadata,
  formatBytes,
  formatDuration,
  isSupportedVideoFile,
  type VideoClip,
} from '../lib/videoMetadata';
import {
  mergeVideosInBrowser,
  terminateFFmpeg,
  type AspectRatioPreset,
  type AudioMode,
  type MergeMode,
  type MergeResult,
  type MergeStage,
} from '../lib/ffmpegEngine';

interface VideoMergerProps {
  messages: UIMessages['merger'];
}

type WorkspaceStep = 'dropzone' | 'storyboard' | 'processing' | 'result';

function formatTemplate(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (acc, [key, val]) => acc.replaceAll(`{${key}}`, String(val)),
    template
  );
}

export default function VideoMerger({ messages }: VideoMergerProps) {
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [step, setStep] = useState<WorkspaceStep>('dropzone');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioPreset>('auto');
  const [mergeMode, setMergeMode] = useState<MergeMode>('fast');
  const [audioMode, setAudioMode] = useState<AudioMode>('keep');

  const [isFileDragActive, setIsFileDragActive] = useState(false);
  const [isAddingFiles, setIsAddingFiles] = useState(false);
  const [draggedClipId, setDraggedClipId] = useState<string | null>(null);
  const [dragOverClipId, setDragOverClipId] = useState<string | null>(null);

  const [progressPercent, setProgressPercent] = useState(0);
  const [progressStage, setProgressStage] = useState<MergeStage>('loading-engine');
  const [result, setResult] = useState<MergeResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const dragDepthRef = useRef(0);
  const draggedClipIdRef = useRef<string | null>(null);

  // FLIP animation tracking refs
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const prevRectsRef = useRef<Map<string, DOMRect>>(new Map());

  const captureCardPositions = useCallback(() => {
    const map = new Map<string, DOMRect>();
    cardRefs.current.forEach((el, id) => {
      if (el) {
        map.set(id, el.getBoundingClientRect());
      }
    });
    prevRectsRef.current = map;
  }, []);

  useLayoutEffect(() => {
    const prevRects = prevRectsRef.current;
    if (prevRects.size === 0) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      cardRefs.current.forEach((el, id) => {
        const prev = prevRects.get(id);
        if (!el || !prev) return;
        const next = el.getBoundingClientRect();
        const dx = prev.left - next.left;
        const dy = prev.top - next.top;
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;

        el.style.transition = 'none';
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        el.getBoundingClientRect();
        requestAnimationFrame(() => {
          el.style.transition = 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)';
          el.style.transform = 'translate3d(0, 0, 0)';
        });
      });
    }

    prevRectsRef.current = new Map();
  }, [clips]);

  // Revoke previous object URL when replaced or unmounted
  useEffect(() => {
    return () => {
      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }
    };
  }, [result]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      terminateFFmpeg();
    };
  }, []);

  const totalKnownDuration = useMemo(() => {
    const hasAnyDuration = clips.some((c) => c.duration !== null);
    if (!hasAnyDuration) return null;
    return clips.reduce((sum, c) => sum + (c.duration ?? 0), 0);
  }, [clips]);

  const effectiveMode: MergeMode = aspectRatio !== 'auto' ? 'smart' : mergeMode;

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const ingestFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      if (files.length === 0) return;

      const validFiles = files.filter(isSupportedVideoFile);
      const invalidCount = files.length - validFiles.length;

      if (invalidCount > 0) {
        setErrorMessage(messages.errorInvalidFiles);
      } else {
        setErrorMessage(null);
      }

      if (validFiles.length === 0) return;

      setIsAddingFiles(true);
      try {
        const extracted = await Promise.all(validFiles.map((file) => extractVideoMetadata(file)));
        setClips((prev) => [...prev, ...extracted]);
        setStep('storyboard');
        if (result) {
          setResult(null);
        }
      } finally {
        setIsAddingFiles(false);
      }
    },
    [messages.errorInvalidFiles, result]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      void ingestFiles(e.target.files);
    }
    e.target.value = '';
  };

  const isExternalFileDrag = (e: React.DragEvent): boolean => {
    if (draggedClipIdRef.current) return false;
    return Array.from(e.dataTransfer?.types ?? []).includes('Files');
  };

  const handleWorkspaceDragEnter = (e: React.DragEvent) => {
    if (!isExternalFileDrag(e)) return;
    e.preventDefault();
    dragDepthRef.current += 1;
    setIsFileDragActive(true);
  };

  const handleWorkspaceDragOver = (e: React.DragEvent) => {
    if (!isExternalFileDrag(e)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleWorkspaceDragLeave = (e: React.DragEvent) => {
    if (!isExternalFileDrag(e)) return;
    e.preventDefault();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) {
      setIsFileDragActive(false);
    }
  };

  const handleWorkspaceDrop = (e: React.DragEvent) => {
    if (!isExternalFileDrag(e)) return;
    e.preventDefault();
    dragDepthRef.current = 0;
    setIsFileDragActive(false);
    if (step === 'processing') return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      void ingestFiles(e.dataTransfer.files);
    }
  };

  const moveClip = useCallback(
    (index: number, delta: -1 | 1) => {
      const targetIndex = index + delta;
      if (targetIndex < 0 || targetIndex >= clips.length) return;
      captureCardPositions();
      setClips((prev) => {
        const next = [...prev];
        const [moved] = next.splice(index, 1);
        next.splice(targetIndex, 0, moved);
        return next;
      });
    },
    [clips.length, captureCardPositions]
  );

  const reorderClipsById = useCallback(
    (sourceId: string, targetId: string) => {
      if (sourceId === targetId) return;
      const sourceIndex = clips.findIndex((c) => c.id === sourceId);
      const targetIndex = clips.findIndex((c) => c.id === targetId);
      if (sourceIndex === -1 || targetIndex === -1) return;

      captureCardPositions();
      setClips((prev) => {
        const next = [...prev];
        const [moved] = next.splice(sourceIndex, 1);
        next.splice(targetIndex, 0, moved);
        return next;
      });
    },
    [clips, captureCardPositions]
  );

  const removeClip = useCallback(
    (id: string) => {
      captureCardPositions();
      setClips((prev) => {
        const next = prev.filter((c) => c.id !== id);
        if (next.length === 0) {
          setStep('dropzone');
        }
        return next;
      });
    },
    [captureCardPositions]
  );

  const clearAllClips = useCallback(() => {
    setClips([]);
    setResult(null);
    setErrorMessage(null);
    setStep('dropzone');
  }, []);

  const handleStartMerge = async () => {
    if (clips.length < 2) {
      setErrorMessage(messages.errorTooFewClips);
      return;
    }

    setErrorMessage(null);
    setResult(null);
    setProgressPercent(2);
    setProgressStage('loading-engine');
    setStep('processing');

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const mergeOutput = await mergeVideosInBrowser({
        clips,
        aspectRatio,
        mode: effectiveMode,
        audio: audioMode,
        signal: controller.signal,
        onProgress: ({ stage, percent }) => {
          setProgressStage(stage);
          setProgressPercent(percent);
        },
      });
      setResult(mergeOutput);
      setStep('result');
    } catch (err) {
      const isCancelled = (err as Error)?.name === 'AbortError' || controller.signal.aborted;
      if (!isCancelled) {
        console.error('[MergeVideos] Merge failed:', err);
      }
      setErrorMessage(isCancelled ? messages.errorCancelled : messages.errorMergeFailed);
      setStep('storyboard');
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleCancelMerge = () => {
    abortControllerRef.current?.abort();
    terminateFFmpeg();
  };

  const getStageLabel = (stage: MergeStage): string => {
    switch (stage) {
      case 'loading-engine':
        return messages.statusLoadingEngine;
      case 'preparing':
        return messages.statusPreparingClips;
      case 'fast-merging':
        return messages.statusFastMerging;
      case 'smart-merging':
        return messages.statusSmartMerging;
      case 'fallback-smart':
        return messages.statusFallbackSmart;
      case 'finalizing':
        return messages.statusFinalizing;
    }
  };

  const aspectOptions: { id: AspectRatioPreset; label: string; w: number; h: number }[] = [
    { id: 'auto', label: messages.aspectAuto, w: 22, h: 16 },
    { id: '16:9', label: messages.aspect16x9, w: 24, h: 14 },
    { id: '9:16', label: messages.aspect9x16, w: 14, h: 24 },
    { id: '1:1', label: messages.aspect1x1, w: 18, h: 18 },
  ];

  return (
    <div
      className="relative w-full max-w-5xl mx-auto rounded-3xl border-2 transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-workspace)',
        borderColor: isFileDragActive ? 'var(--mv-tangerine)' : 'var(--border-color)',
        boxShadow: isFileDragActive
          ? '0 0 0 6px rgba(245, 134, 52, 0.22), var(--shadow-workspace)'
          : 'var(--shadow-workspace)',
      }}
      onDragEnter={handleWorkspaceDragEnter}
      onDragOver={handleWorkspaceDragOver}
      onDragLeave={handleWorkspaceDragLeave}
      onDrop={handleWorkspaceDrop}
    >
      {/* Hidden Multi-Video File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/mp4,video/quicktime,video/webm,video/x-matroska,video/x-msvideo,.mp4,.mov,.webm,.mkv,.avi,.m4v,video/*"
        className="sr-only"
        onChange={handleFileInputChange}
        aria-label={messages.selectVideosBtn}
      />

      {/* Global Error Alert */}
      {errorMessage && (
        <div
          role="alert"
          className="mx-4 mt-4 sm:mx-6 sm:mt-6 flex items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-base font-semibold mv-enter"
          style={{
            backgroundColor: 'rgba(245, 134, 52, 0.12)',
            borderColor: 'var(--mv-tangerine)',
            color: 'var(--text-primary)',
          }}
        >
          <span className="flex items-center gap-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F58634"
              strokeWidth="2.2"
              className="h-6 w-6 shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
            {errorMessage}
          </span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="rounded-lg px-3 py-1 text-sm font-bold cursor-pointer hover:bg-[#F58634]/20"
          >
            {messages.errorDismiss}
          </button>
        </div>
      )}

      {/* Drag-over overlay when in Step 2 or Step 4 */}
      {isFileDragActive && step !== 'dropzone' && step !== 'processing' && (
        <div
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center rounded-3xl border-4 border-dashed backdrop-blur-xs mv-drag-pulse"
          style={{
            backgroundColor: 'rgba(245, 134, 52, 0.14)',
            borderColor: 'var(--mv-tangerine)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F58634"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-16 w-16 mb-3"
            aria-hidden="true"
          >
            <path d="M12 13v8" />
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="m8 17 4-4 4 4" />
          </svg>
          <p className="text-xl sm:text-2xl font-extrabold px-6 text-center" style={{ color: 'var(--text-primary)' }}>
            {messages.dropzoneDragActive}
          </p>
        </div>
      )}

      {/* STEP 1: Giant Dashed Dropzone */}
      {step === 'dropzone' && (
        <div className="p-4 sm:p-7 md:p-9 mv-enter">
          <div
            role="button"
            tabIndex={0}
            onClick={openFilePicker}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openFilePicker();
              }
            }}
            aria-label={messages.selectVideosBtn}
            className={`group flex min-h-[340px] sm:min-h-[390px] md:min-h-[420px] flex-col items-center justify-center rounded-2xl border-3 border-dashed px-5 py-10 text-center transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 ${
              isFileDragActive ? 'mv-drag-pulse scale-[1.01]' : ''
            }`}
            style={{
              borderColor: isFileDragActive ? 'var(--mv-tangerine)' : 'var(--border-color)',
              backgroundColor: isFileDragActive ? 'rgba(245, 134, 52, 0.08)' : 'var(--bg-subtle)',
              outlineColor: 'var(--mv-emerald)',
            }}
          >
            {/* Floating Oversized SVG Icon (56px-64px) */}
            <div
              className="mv-float mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl shadow-md transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundColor: isFileDragActive ? 'var(--mv-tangerine)' : 'var(--mv-emerald)',
                color: '#FFFFFF',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-14 w-14 sm:h-16 sm:w-16"
                aria-hidden="true"
              >
                <rect width="14" height="14" x="2" y="5" rx="3" />
                <path d="M16 10l6-3.5v11L16 14" />
                <path d="M9 9v6" />
                <path d="M6 12h6" />
              </svg>
            </div>

            <h2
              className="max-w-2xl text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {isFileDragActive ? messages.dropzoneDragActive : messages.dropzoneTitle}
            </h2>

            <p
              className="mt-3 max-w-xl text-[1.15rem] leading-relaxed font-medium opacity-90"
              style={{ color: 'var(--text-body)' }}
            >
              {messages.dropzoneSubtitle}
            </p>

            {/* Oversized Primary Action Button + Secondary Add More */}
            <div
              className="mt-7 flex flex-wrap items-center justify-center gap-3.5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={openFilePicker}
                disabled={isAddingFiles}
                className="mv-btn-primary inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4.5 text-[1.15rem] sm:text-xl font-extrabold shadow-lg cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
                {messages.selectVideosBtn}
              </button>

              <button
                type="button"
                onClick={openFilePicker}
                disabled={isAddingFiles}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 px-6 py-4 text-[1.1rem] font-bold transition-colors cursor-pointer hover:bg-[#00AF91]/12"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-surface)',
                }}
              >
                {messages.addMoreVideosBtn}
              </button>
            </div>

            <p
              className="mt-6 text-sm sm:text-base font-semibold"
              style={{ color: 'var(--text-secondary)' }}
            >
              {messages.supportedFormatsHint}
            </p>
          </div>
        </div>
      )}

      {/* STEP 2: Visual Clip Storyboard & Controls */}
      {step === 'storyboard' && (
        <div className="p-4 sm:p-6 md:p-8 space-y-6 mv-enter">
          {/* Top Storyboard Summary & Add/Clear Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: 'var(--border-soft)' }}>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <h2 className="text-xl sm:text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                {messages.storyboardHeading}
              </h2>
              <span
                aria-live="polite"
                className="inline-flex items-center rounded-full px-3.5 py-1 text-sm font-extrabold"
                style={{ backgroundColor: 'var(--badge-bg)', color: 'var(--badge-text)' }}
              >
                {formatTemplate(messages.clipsReadyTemplate, { count: clips.length })}
              </span>
              {totalKnownDuration !== null && (
                <span className="text-base font-bold" style={{ color: 'var(--text-secondary)' }}>
                  {messages.totalDurationLabel}: {formatDuration(totalKnownDuration, messages.unknownDuration)}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={openFilePicker}
                disabled={isAddingFiles}
                className="inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-base font-extrabold transition-colors cursor-pointer hover:bg-[#00AF91]/12"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-subtle)',
                }}
              >
                {messages.addMoreVideosBtn}
              </button>
              <button
                type="button"
                onClick={clearAllClips}
                className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-sm font-bold opacity-85 hover:opacity-100 hover:border-[#F58634] transition-colors cursor-pointer"
                style={{ borderColor: 'var(--border-soft)', color: 'var(--text-body)' }}
              >
                {messages.clearAllBtn}
              </button>
            </div>
          </div>

          {clips.length === 1 && (
            <div
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-base font-bold"
              style={{
                backgroundColor: 'rgba(255, 204, 41, 0.16)',
                borderColor: 'var(--mv-sunshine)',
                color: 'var(--text-primary)',
              }}
            >
              <span>{messages.needTwoClipsHint}</span>
              <button
                type="button"
                onClick={openFilePicker}
                className="mv-btn-primary rounded-xl px-4 py-2 text-sm font-extrabold cursor-pointer"
              >
                {messages.addMoreVideosBtn}
              </button>
            </div>
          )}

          {/* Drag-and-Drop Visual Storyboard Timeline */}
          <div>
            <p className="mb-3 text-sm font-semibold opacity-85" style={{ color: 'var(--text-body)' }}>
              {messages.dragToReorderHint}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {clips.map((clip, index) => {
                const isDragging = draggedClipId === clip.id;
                const isDragOver = dragOverClipId === clip.id && draggedClipId !== clip.id;
                return (
                  <div
                    key={clip.id}
                    ref={(el) => {
                      if (el) {
                        cardRefs.current.set(clip.id, el);
                      } else {
                        cardRefs.current.delete(clip.id);
                      }
                    }}
                    draggable
                    onDragStart={(e) => {
                      draggedClipIdRef.current = clip.id;
                      setDraggedClipId(clip.id);
                      e.dataTransfer.effectAllowed = 'move';
                      e.dataTransfer.setData('text/plain', clip.id);
                    }}
                    onDragOver={(e) => {
                      if (!draggedClipIdRef.current) return;
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      if (dragOverClipId !== clip.id) {
                        setDragOverClipId(clip.id);
                      }
                    }}
                    onDrop={(e) => {
                      if (!draggedClipIdRef.current) return;
                      e.preventDefault();
                      e.stopPropagation();
                      reorderClipsById(draggedClipIdRef.current, clip.id);
                      draggedClipIdRef.current = null;
                      setDraggedClipId(null);
                      setDragOverClipId(null);
                    }}
                    onDragEnd={() => {
                      draggedClipIdRef.current = null;
                      setDraggedClipId(null);
                      setDragOverClipId(null);
                    }}
                    className={`group relative flex flex-col rounded-2xl border-2 p-3 transition-shadow duration-200 cursor-grab active:cursor-grabbing ${
                      isDragging ? 'opacity-60 scale-[0.98]' : ''
                    } ${isDragOver ? 'ring-3 ring-[#F58634]' : ''}`}
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      borderColor: isDragOver ? 'var(--mv-tangerine)' : 'var(--border-soft)',
                      boxShadow: 'var(--shadow-card)',
                    }}
                  >
                    {/* Thumbnail Frame */}
                    <div
                      className="relative aspect-video w-full overflow-hidden rounded-xl border flex items-center justify-center"
                      style={{
                        backgroundColor: '#0D1B18',
                        borderColor: 'var(--border-soft)',
                      }}
                    >
                      {clip.thumbnailUrl ? (
                        <img
                          src={clip.thumbnailUrl}
                          alt={clip.name}
                          className="h-full w-full object-contain pointer-events-none select-none"
                          draggable={false}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-1 text-[#00AF91]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-12 w-12"
                            aria-hidden="true"
                          >
                            <rect width="18" height="14" x="3" y="5" rx="2" />
                            <polygon points="10 9 15 12 10 15 10 9" fill="currentColor" />
                          </svg>
                          <span className="text-xs font-extrabold uppercase tracking-wider">
                            {clip.extension}
                          </span>
                        </div>
                      )}

                      {/* Order Badge (#1, #2, #3...) */}
                      <span
                        className="absolute top-2 left-2 rounded-lg px-2.5 py-0.5 text-sm font-black shadow-sm"
                        style={{ backgroundColor: 'var(--mv-sunshine)', color: '#0D1B18' }}
                      >
                        #{index + 1}
                      </span>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeClip(clip.id)}
                        aria-label={`${messages.removeClipAria} #${index + 1}`}
                        title={messages.removeClipAria}
                        className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D1B18]/80 text-white hover:bg-[#F58634] transition-colors cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Duration Pill */}
                      <span className="absolute bottom-2 right-2 rounded-md bg-[#0D1B18]/85 px-2 py-0.5 text-xs font-bold text-white tabular-nums">
                        {formatDuration(clip.duration, messages.unknownDuration)}
                      </span>
                    </div>

                    {/* Metadata & Reorder Arrow Controls */}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate text-sm sm:text-base font-bold"
                          title={clip.name}
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {clip.name}
                        </p>
                        <p className="text-xs font-semibold opacity-80" style={{ color: 'var(--text-body)' }}>
                          {clip.extension.toUpperCase()} • {formatBytes(clip.size)}
                          {clip.width && clip.height ? ` • ${clip.width}×${clip.height}` : ''}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => moveClip(index, -1)}
                          disabled={index === 0}
                          aria-label={`${messages.moveLeftAria} #${index + 1}`}
                          title={messages.moveLeftAria}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#00AF91]/15"
                          style={{
                            borderColor: 'var(--border-soft)',
                            color: 'var(--text-primary)',
                            backgroundColor: 'var(--bg-surface)',
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            className="h-4 w-4"
                            aria-hidden="true"
                          >
                            <path d="m15 18-6-6 6-6" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => moveClip(index, 1)}
                          disabled={index === clips.length - 1}
                          aria-label={`${messages.moveRightAria} #${index + 1}`}
                          title={messages.moveRightAria}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#00AF91]/15"
                          style={{
                            borderColor: 'var(--border-soft)',
                            color: 'var(--text-primary)',
                            backgroundColor: 'var(--bg-surface)',
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            className="h-4 w-4"
                            aria-hidden="true"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls Grid: Aspect Ratio + Merge Mode + Audio */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-2xl border p-4 sm:p-5"
            style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-soft)' }}
          >
            {/* Aspect Ratio Presets */}
            <div className="lg:col-span-5 space-y-2.5">
              <label className="block text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                {messages.aspectRatioLabel}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {aspectOptions.map((opt) => {
                  const selected = aspectRatio === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAspectRatio(opt.id)}
                      className="flex items-center gap-2.5 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-bold transition-all cursor-pointer"
                      style={{
                        backgroundColor: selected ? 'rgba(0, 175, 145, 0.14)' : 'var(--bg-surface)',
                        borderColor: selected ? 'var(--mv-emerald)' : 'var(--border-soft)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border"
                        style={{ borderColor: selected ? 'var(--mv-emerald)' : 'var(--border-soft)' }}
                      >
                        <span
                          className="rounded-[2px] border-2"
                          style={{
                            width: `${opt.w * 0.72}px`,
                            height: `${opt.h * 0.72}px`,
                            borderColor: selected ? 'var(--mv-tangerine)' : 'currentColor',
                          }}
                        />
                      </span>
                      <span className="leading-snug">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Merge Mode Toggle */}
            <div className="lg:col-span-5 space-y-2.5">
              <label className="block text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                {messages.mergeModeLabel}
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMergeMode('fast');
                    setAspectRatio('auto');
                  }}
                  className="flex flex-col rounded-xl border-2 px-3.5 py-2.5 text-left transition-all cursor-pointer"
                  style={{
                    backgroundColor: effectiveMode === 'fast' ? 'rgba(0, 175, 145, 0.14)' : 'var(--bg-surface)',
                    borderColor: effectiveMode === 'fast' ? 'var(--mv-emerald)' : 'var(--border-soft)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span className="text-sm font-extrabold">{messages.modeFastTitle}</span>
                  <span className="text-xs font-medium opacity-80" style={{ color: 'var(--text-body)' }}>
                    {messages.modeFastDesc}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMergeMode('smart')}
                  className="flex flex-col rounded-xl border-2 px-3.5 py-2.5 text-left transition-all cursor-pointer"
                  style={{
                    backgroundColor: effectiveMode === 'smart' ? 'rgba(0, 175, 145, 0.14)' : 'var(--bg-surface)',
                    borderColor: effectiveMode === 'smart' ? 'var(--mv-emerald)' : 'var(--border-soft)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span className="text-sm font-extrabold">{messages.modeSmartTitle}</span>
                  <span className="text-xs font-medium opacity-80" style={{ color: 'var(--text-body)' }}>
                    {aspectRatio !== 'auto' ? messages.aspectRequiresSmartNote : messages.modeSmartDesc}
                  </span>
                </button>
              </div>
            </div>

            {/* Audio Toggle */}
            <div className="lg:col-span-2 space-y-2.5">
              <label className="block text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                {messages.audioLabel}
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => setAudioMode('keep')}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-extrabold transition-all cursor-pointer"
                  style={{
                    backgroundColor: audioMode === 'keep' ? 'rgba(0, 175, 145, 0.14)' : 'var(--bg-surface)',
                    borderColor: audioMode === 'keep' ? 'var(--mv-emerald)' : 'var(--border-soft)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4 shrink-0" aria-hidden="true">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  <span>{messages.audioKeep}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudioMode('mute')}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-extrabold transition-all cursor-pointer"
                  style={{
                    backgroundColor: audioMode === 'mute' ? 'rgba(245, 134, 52, 0.14)' : 'var(--bg-surface)',
                    borderColor: audioMode === 'mute' ? 'var(--mv-tangerine)' : 'var(--border-soft)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4 shrink-0" aria-hidden="true">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="22" x2="16" y1="9" y2="15" />
                    <line x1="16" x2="22" y1="9" y2="15" />
                  </svg>
                  <span>{messages.audioMute}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Massive Primary Merge Action Button */}
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={handleStartMerge}
              disabled={clips.length < 2}
              className="mv-btn-primary w-full sm:w-auto min-w-[280px] inline-flex items-center justify-center gap-3 rounded-2xl px-10 py-4.5 text-[1.15rem] sm:text-xl font-black shadow-lg cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 shrink-0"
                aria-hidden="true"
              >
                <path d="m8 6 4-4 4 4" />
                <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                <path d="m20 22-5-5" />
              </svg>
              {clips.length >= 2
                ? formatTemplate(messages.mergeActionBtnTemplate, { count: clips.length })
                : messages.mergeActionNeedMoreBtn}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Animated Progress */}
      {step === 'processing' && (
        <div className="px-5 py-12 sm:px-10 sm:py-16 flex flex-col items-center text-center mv-enter">
          <div
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl"
            style={{ backgroundColor: 'rgba(0, 175, 145, 0.14)', color: 'var(--mv-emerald)' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              className="h-14 w-14 animate-spin"
              style={{ animationDuration: '2.4s' }}
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            {messages.progressTitle}
          </h2>

          <p
            aria-live="polite"
            className="mt-2 text-[1.15rem] font-bold"
            style={{ color: 'var(--text-secondary)' }}
          >
            {getStageLabel(progressStage)}
          </p>

          {/* Animated Gradient Progress Bar */}
          <div className="mt-7 w-full max-w-2xl" aria-live="polite">
            <div className="mb-2 flex items-center justify-between text-base font-extrabold">
              <span style={{ color: 'var(--text-body)' }}>{clips.length} Clips</span>
              <span className="text-xl tabular-nums" style={{ color: 'var(--text-primary)' }}>
                {progressPercent}%
              </span>
            </div>
            <div
              className="h-5 w-full overflow-hidden rounded-full border p-0.5"
              style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-soft)' }}
              role="progressbar"
              aria-label={messages.progressTitle}
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="mv-progress-fill h-full rounded-full"
                style={{ width: `${Math.max(4, progressPercent)}%` }}
              />
            </div>
          </div>

          {/* #FFCC29 Privacy Badge */}
          <div
            className="mt-7 inline-flex items-center gap-2.5 rounded-full border-2 px-5 py-2.5 text-sm sm:text-base font-extrabold shadow-sm"
            style={{
              backgroundColor: 'var(--badge-bg)',
              color: 'var(--badge-text)',
              borderColor: 'var(--mv-sunshine)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{messages.privacyBadge}</span>
          </div>

          <button
            type="button"
            onClick={handleCancelMerge}
            className="mt-8 rounded-xl border-2 px-6 py-2.5 text-base font-bold transition-colors cursor-pointer hover:border-[#F58634] hover:text-[#F58634]"
            style={{ borderColor: 'var(--border-soft)', color: 'var(--text-body)' }}
          >
            {messages.cancelMergeBtn}
          </button>
        </div>
      )}

      {/* STEP 4: Instant Preview & Download */}
      {step === 'result' && result && (
        <div className="p-4 sm:p-7 md:p-8 space-y-6 mv-enter">
          {/* Combined Duration Summary Banner */}
          <div
            aria-live="polite"
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 px-5 py-4"
            style={{
              backgroundColor: 'rgba(0, 175, 145, 0.12)',
              borderColor: 'var(--mv-emerald)',
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl font-black text-white shrink-0"
                style={{ backgroundColor: 'var(--mv-emerald)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" className="h-6 w-6" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <p className="text-lg sm:text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                {formatTemplate(messages.resultBannerTemplate, {
                  count: clips.length,
                  duration: formatDuration(totalKnownDuration, messages.unknownDuration),
                })}
              </p>
            </div>
            <span
              className="rounded-full px-3.5 py-1 text-sm font-extrabold"
              style={{ backgroundColor: 'var(--badge-bg)', color: 'var(--badge-text)' }}
            >
              {messages.resultSizeLabel}: {formatBytes(result.sizeBytes)}
            </span>
          </div>

          {/* Instant HTML5 Video Preview Player */}
          <div
            className="overflow-hidden rounded-2xl border-2 bg-[#0D1B18] shadow-lg"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <video
              src={result.url}
              controls
              playsInline
              className="max-h-[400px] w-full object-contain mx-auto"
            />
          </div>

          {/* Download & Secondary Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={result.url}
              download={result.filename}
              className="mv-btn-primary inline-flex items-center justify-center gap-3 rounded-2xl px-9 py-4.5 text-[1.15rem] sm:text-xl font-black shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 shrink-0"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              {messages.downloadBtn}
            </a>

            <button
              type="button"
              onClick={() => setStep('storyboard')}
              className="rounded-2xl border-2 px-6 py-4 text-base font-extrabold transition-colors cursor-pointer hover:bg-[#00AF91]/12"
              style={{
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-subtle)',
              }}
            >
              {messages.editStoryboardBtn}
            </button>

            <button
              type="button"
              onClick={clearAllClips}
              className="rounded-2xl border px-6 py-4 text-base font-bold transition-colors cursor-pointer hover:border-[#F58634]"
              style={{ borderColor: 'var(--border-soft)', color: 'var(--text-body)' }}
            >
              {messages.mergeMoreBtn}
            </button>
          </div>

          {/* Friendly Post-Download Support Micro-Card */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              borderColor: 'rgba(245, 134, 52, 0.45)',
            }}
          >
            <div className="text-center sm:text-left">
              <p className="text-base sm:text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>
                {messages.supportCardTitle}
              </p>
              <p className="text-sm font-medium opacity-85" style={{ color: 'var(--text-body)' }}>
                {messages.supportCardDesc}
              </p>
            </div>
            <a
              href="https://kisharadilshan.gumroad.com/coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="mv-cta-support inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-base font-extrabold shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                <path
                  d="M10 11.4c-.5-.7-1.6-.7-2.1 0-.5.6-.4 1.6.2 2.2L10 15.3l1.9-1.7c.6-.6.7-1.6.2-2.2-.5-.7-1.6-.7-2.1 0Z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
              {messages.supportCardBtn}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
