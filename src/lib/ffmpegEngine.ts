import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import type { VideoClip } from './videoMetadata';

export type AspectRatioPreset = 'auto' | '16:9' | '9:16' | '1:1';
export type MergeMode = 'fast' | 'smart';
export type AudioMode = 'keep' | 'mute';
export type MergeStage =
  | 'loading-engine'
  | 'preparing'
  | 'fast-merging'
  | 'smart-merging'
  | 'fallback-smart'
  | 'finalizing';

export interface MergeProgressUpdate {
  stage: MergeStage;
  percent: number;
}

export interface MergeOptions {
  clips: VideoClip[];
  aspectRatio: AspectRatioPreset;
  mode: MergeMode;
  audio: AudioMode;
  signal?: AbortSignal;
  onProgress?: (update: MergeProgressUpdate) => void;
}

export interface MergeResult {
  blob: Blob;
  url: string;
  filename: string;
  mimeType: string;
  usedMode: MergeMode;
  sizeBytes: number;
}

let sharedFFmpeg: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;
let loadedBlobUrls: string[] = [];

const DEFAULT_WASM_BYTE_ESTIMATE = 32_232_419;

function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException('Merge cancelled by user', 'AbortError');
  }
}

function revokeLoadedBlobUrls() {
  for (const url of loadedBlobUrls) {
    try {
      URL.revokeObjectURL(url);
    } catch {
      // Ignore cleanup errors
    }
  }
  loadedBlobUrls = [];
}

/**
 * Fetches a core asset and converts it to a same-origin Blob URL.
 * Unlike @ffmpeg/util's toBlobURL, this avoids comparing decompressed stream
 * byte counts against gzip/brotli-compressed Content-Length headers.
 */
async function fetchAsBlobURL(
  url: string,
  mimeType: string,
  signal?: AbortSignal,
  onProgress?: (ratio: number) => void
): Promise<string> {
  const resp = await fetch(url, { signal });
  if (!resp.ok) {
    throw new Error(`Failed to fetch FFmpeg asset (${resp.status}): ${url}`);
  }

  if (!onProgress || !resp.body || typeof resp.body.getReader !== 'function') {
    const buf = await resp.arrayBuffer();
    onProgress?.(1);
    const blobUrl = URL.createObjectURL(new Blob([buf], { type: mimeType }));
    loadedBlobUrls.push(blobUrl);
    return blobUrl;
  }

  const contentEncoding = resp.headers.get('Content-Encoding')?.toLowerCase();
  const isCompressed = Boolean(contentEncoding && contentEncoding !== 'identity');
  const rawLength = Number(resp.headers.get('Content-Length') || '0');
  const expectedTotal =
    !isCompressed && Number.isFinite(rawLength) && rawLength > 0
      ? rawLength
      : DEFAULT_WASM_BYTE_ESTIMATE;

  const reader = resp.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    throwIfAborted(signal);
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    if (value && value.byteLength > 0) {
      chunks.push(value);
      received += value.byteLength;
      const ratio = expectedTotal > 0 ? Math.min(0.98, received / expectedTotal) : 0.5;
      onProgress(ratio);
    }
  }

  onProgress(1);
  const blobUrl = URL.createObjectURL(new Blob(chunks as BlobPart[], { type: mimeType }));
  loadedBlobUrls.push(blobUrl);
  return blobUrl;
}

export function terminateFFmpeg() {
  if (sharedFFmpeg) {
    try {
      sharedFFmpeg.terminate();
    } catch {
      // Ignore cleanup errors
    }
    sharedFFmpeg = null;
  }
  loadPromise = null;
  revokeLoadedBlobUrls();
}

async function ensureFFmpegLoaded(
  onProgress?: (update: MergeProgressUpdate) => void,
  signal?: AbortSignal
): Promise<FFmpeg> {
  throwIfAborted(signal);

  if (sharedFFmpeg && sharedFFmpeg.loaded) {
    return sharedFFmpeg;
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = (async () => {
    const ffmpeg = new FFmpeg();
    sharedFFmpeg = ffmpeg;

    onProgress?.({ stage: 'loading-engine', percent: 2 });

    const baseOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const coreJsSrc = `${baseOrigin}/ffmpeg/ffmpeg-core.js`;
    const coreWasmSrc = `${baseOrigin}/ffmpeg/ffmpeg-core.wasm`;

    const coreURL = await fetchAsBlobURL(coreJsSrc, 'text/javascript', signal);
    throwIfAborted(signal);

    onProgress?.({ stage: 'loading-engine', percent: 5 });

    const wasmURL = await fetchAsBlobURL(coreWasmSrc, 'application/wasm', signal, (ratio) => {
      onProgress?.({ stage: 'loading-engine', percent: Math.round(5 + ratio * 14) });
    });

    throwIfAborted(signal);
    onProgress?.({ stage: 'loading-engine', percent: 20 });

    await ffmpeg.load({ coreURL, wasmURL }, { signal });
    return ffmpeg;
  })();

  try {
    return await loadPromise;
  } catch (err) {
    terminateFFmpeg();
    throw err;
  }
}

function getSafeInputExtension(ext: string): string {
  const cleaned = ext.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned || 'mp4';
}

function computeTargetDimensions(
  aspectRatio: AspectRatioPreset,
  clips: VideoClip[]
): { width: number; height: number } {
  if (aspectRatio === '16:9') return { width: 1920, height: 1080 };
  if (aspectRatio === '9:16') return { width: 1080, height: 1920 };
  if (aspectRatio === '1:1') return { width: 1080, height: 1080 };

  const firstWithSize = clips.find((c) => c.width && c.height);
  if (!firstWithSize || !firstWithSize.width || !firstWithSize.height) {
    return { width: 1280, height: 720 };
  }

  let w = firstWithSize.width;
  let h = firstWithSize.height;
  const maxDim = 1920;
  if (w > maxDim || h > maxDim) {
    const scale = maxDim / Math.max(w, h);
    w = Math.round(w * scale);
    h = Math.round(h * scale);
  }
  const toEven = (n: number) => Math.max(2, Math.floor(n / 2) * 2);
  return { width: toEven(w), height: toEven(h) };
}

function parseTimeToSeconds(line: string): number | null {
  const match = line.match(/time=(\d+):(\d+):(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const hrs = Number(match[1]);
  const mins = Number(match[2]);
  const secs = Number(match[3]);
  return hrs * 3600 + mins * 60 + secs;
}

function parseDurationToSeconds(line: string): number | null {
  const match = line.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const hrs = Number(match[1]);
  const mins = Number(match[2]);
  const secs = Number(match[3]);
  return hrs * 3600 + mins * 60 + secs;
}

function hasIncompatibleStreamsForFastCopy(clips: VideoClip[]): boolean {
  const extensions = new Set(clips.map((c) => getSafeInputExtension(c.extension)));
  if (extensions.has('webm') && extensions.size > 1) {
    return true;
  }
  if (extensions.has('avi') && extensions.size > 1) {
    return true;
  }
  const knownDims = clips
    .filter((c) => c.width && c.height)
    .map((c) => `${c.width}x${c.height}`);
  if (knownDims.length >= 2 && new Set(knownDims).size > 1) {
    return true;
  }
  return false;
}

interface ProbeInfo {
  hasAudio: boolean;
  durationSec: number;
}

async function probeInputFile(
  ffmpeg: FFmpeg,
  filename: string,
  fallbackDuration: number | null
): Promise<ProbeInfo> {
  const logs: string[] = [];
  const onLog = ({ message }: { message: string }) => {
    logs.push(message);
  };
  ffmpeg.on('log', onLog);
  try {
    await ffmpeg.exec(['-i', filename]);
  } catch {
    // Expected exit code 1 when running -i without output
  } finally {
    ffmpeg.off('log', onLog);
  }

  let hasAudio = false;
  let durationSec = fallbackDuration && fallbackDuration > 0 ? fallbackDuration : 5;

  for (const line of logs) {
    if (/Stream #\d+:\d+.*Audio:/i.test(line)) {
      hasAudio = true;
    }
    const parsedDur = parseDurationToSeconds(line);
    if (parsedDur && parsedDur > 0) {
      durationSec = parsedDur;
    }
  }

  return { hasAudio, durationSec };
}

export async function mergeVideosInBrowser(options: MergeOptions): Promise<MergeResult> {
  const { clips, aspectRatio, mode, audio, signal, onProgress } = options;

  if (clips.length < 2) {
    throw new Error('At least 2 video clips are required to merge.');
  }

  const abortHandler = () => {
    terminateFFmpeg();
  };
  signal?.addEventListener('abort', abortHandler, { once: true });

  const writtenFiles: string[] = [];
  let ffmpeg: FFmpeg | null = null;

  try {
    ffmpeg = await ensureFFmpegLoaded(onProgress, signal);
    throwIfAborted(signal);

    const inputNames: string[] = [];

    for (let i = 0; i < clips.length; i++) {
      throwIfAborted(signal);
      const clip = clips[i];
      const ext = getSafeInputExtension(clip.extension);
      const inputName = `input_${i}.${ext}`;
      inputNames.push(inputName);
      writtenFiles.push(inputName);

      const basePct = 20 + Math.round((i / clips.length) * 14);
      onProgress?.({ stage: 'preparing', percent: basePct });

      const data = await fetchFile(clip.file);
      throwIfAborted(signal);
      await ffmpeg.writeFile(inputName, data, { signal });
    }

    onProgress?.({ stage: 'preparing', percent: 35 });
    throwIfAborted(signal);

    // Determine whether Fast Copy is viable or Smart Mode is required
    let effectiveMode: MergeMode = aspectRatio !== 'auto' ? 'smart' : mode;
    let outputName = 'merged_output.mp4';
    let mimeType = 'video/mp4';

    const totalKnownDuration = clips.reduce((acc, c) => acc + (c.duration ?? 5), 0);

    const attachProgressTracker = (stage: MergeStage) => {
      let maxPercent = 36;
      const onProgressEvent = ({ progress }: { progress: number }) => {
        if (Number.isFinite(progress) && progress > 0 && progress <= 1.05) {
          const pct = Math.min(94, Math.round(36 + Math.min(1, progress) * 58));
          if (pct > maxPercent) {
            maxPercent = pct;
            onProgress?.({ stage, percent: maxPercent });
          }
        }
      };
      const onLogEvent = ({ message }: { message: string }) => {
        const secs = parseTimeToSeconds(message);
        if (secs !== null && totalKnownDuration > 0) {
          const ratio = Math.min(1, secs / totalKnownDuration);
          const pct = Math.min(94, Math.round(36 + ratio * 58));
          if (pct > maxPercent) {
            maxPercent = pct;
            onProgress?.({ stage, percent: maxPercent });
          }
        }
      };
      ffmpeg!.on('progress', onProgressEvent);
      ffmpeg!.on('log', onLogEvent);
      return () => {
        ffmpeg?.off('progress', onProgressEvent);
        ffmpeg?.off('log', onLogEvent);
      };
    };

    let fastSucceeded = false;

    if (effectiveMode === 'fast') {
      if (hasIncompatibleStreamsForFastCopy(clips)) {
        effectiveMode = 'smart';
        onProgress?.({ stage: 'fallback-smart', percent: 36 });
      } else {
        const allWebm = clips.every((c) => getSafeInputExtension(c.extension) === 'webm');
        outputName = allWebm ? 'merged_output.webm' : 'merged_output.mp4';
        mimeType = allWebm ? 'video/webm' : 'video/mp4';
        writtenFiles.push('filelist.txt', outputName);

        const concatList = inputNames.map((name) => `file '${name}'`).join('\n');
        await ffmpeg.writeFile('filelist.txt', concatList, { signal });

        onProgress?.({ stage: 'fast-merging', percent: 38 });
        const detach = attachProgressTracker('fast-merging');

        try {
          const fastArgs = ['-f', 'concat', '-safe', '0', '-i', 'filelist.txt'];
          if (audio === 'mute') {
            fastArgs.push('-c:v', 'copy', '-an');
          } else {
            fastArgs.push('-c', 'copy');
          }
          if (!allWebm) {
            fastArgs.push('-movflags', '+faststart');
          }
          fastArgs.push(outputName);

          const exitCode = await ffmpeg.exec(fastArgs, -1, { signal });
          if (exitCode === 0) {
            const checkData = await ffmpeg.readFile(outputName, 'binary', { signal });
            if (checkData instanceof Uint8Array && checkData.byteLength > 1024) {
              fastSucceeded = true;
            }
          }
        } catch (err) {
          if ((err as Error)?.name === 'AbortError' || signal?.aborted) {
            throw err;
          }
          fastSucceeded = false;
        } finally {
          detach();
        }

        if (!fastSucceeded) {
          try {
            await ffmpeg.deleteFile(outputName);
          } catch {
            // Ignore missing file
          }
          effectiveMode = 'smart';
          onProgress?.({ stage: 'fallback-smart', percent: 36 });
        }
      }
    }

    if (effectiveMode === 'smart' && !fastSucceeded) {
      outputName = 'merged_output.mp4';
      mimeType = 'video/mp4';
      if (!writtenFiles.includes(outputName)) {
        writtenFiles.push(outputName);
      }

      const probes: ProbeInfo[] = [];
      for (let i = 0; i < inputNames.length; i++) {
        throwIfAborted(signal);
        probes.push(await probeInputFile(ffmpeg, inputNames[i], clips[i].duration));
      }

      const { width, height } = computeTargetDimensions(aspectRatio, clips);
      const anyHasAudio = audio === 'keep' && probes.some((p) => p.hasAudio);

      const filterParts: string[] = [];
      const concatInputs: string[] = [];

      for (let i = 0; i < inputNames.length; i++) {
        filterParts.push(
          `[${i}:v]scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=black,setsar=1,fps=30,format=yuv420p[v${i}]`
        );
        if (anyHasAudio) {
          if (probes[i].hasAudio) {
            filterParts.push(
              `[${i}:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo[a${i}]`
            );
          } else {
            const dur = Math.max(0.1, probes[i].durationSec).toFixed(3);
            filterParts.push(`anullsrc=r=44100:cl=stereo,atrim=0:${dur}[a${i}]`);
          }
          concatInputs.push(`[v${i}][a${i}]`);
        } else {
          concatInputs.push(`[v${i}]`);
        }
      }

      if (anyHasAudio) {
        filterParts.push(`${concatInputs.join('')}concat=n=${inputNames.length}:v=1:a=1[outv][outa]`);
      } else {
        filterParts.push(`${concatInputs.join('')}concat=n=${inputNames.length}:v=1:a=0[outv]`);
      }

      const inputArgs = inputNames.flatMap((name) => ['-i', name]);
      const smartArgs = [
        ...inputArgs,
        '-filter_complex',
        filterParts.join(';'),
        '-map',
        '[outv]',
        ...(anyHasAudio ? ['-map', '[outa]'] : []),
        '-c:v',
        'libx264',
        '-preset',
        'ultrafast',
        '-crf',
        '23',
        '-pix_fmt',
        'yuv420p',
        ...(anyHasAudio ? ['-c:a', 'aac', '-b:a', '128k', '-ar', '44100', '-ac', '2'] : ['-an']),
        '-movflags',
        '+faststart',
        outputName,
      ];

      onProgress?.({ stage: 'smart-merging', percent: 38 });
      const detach = attachProgressTracker('smart-merging');

      try {
        const exitCode = await ffmpeg.exec(smartArgs, -1, { signal });
        if (exitCode !== 0) {
          throw new Error(`FFmpeg smart merge exited with code ${exitCode}`);
        }
      } finally {
        detach();
      }
    }

    throwIfAborted(signal);
    onProgress?.({ stage: 'finalizing', percent: 96 });

    const outputData = await ffmpeg.readFile(outputName, 'binary', { signal });
    if (!(outputData instanceof Uint8Array) || outputData.byteLength < 256) {
      throw new Error('Merged output file is empty.');
    }

    const copiedBuffer = new Uint8Array(outputData.byteLength);
    copiedBuffer.set(outputData);
    const blob = new Blob([copiedBuffer.buffer], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const ext = mimeType === 'video/webm' ? 'webm' : 'mp4';
    const filename = `merged-videos-${Date.now()}.${ext}`;

    onProgress?.({ stage: 'finalizing', percent: 100 });

    return {
      blob,
      url,
      filename,
      mimeType,
      usedMode: effectiveMode,
      sizeBytes: blob.size,
    };
  } finally {
    signal?.removeEventListener('abort', abortHandler);
    if (ffmpeg && ffmpeg.loaded && !signal?.aborted) {
      for (const file of new Set(writtenFiles)) {
        try {
          await ffmpeg.deleteFile(file);
        } catch {
          // Ignore file already deleted
        }
      }
    }
  }
}
