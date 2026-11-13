export interface VideoClip {
  id: string;
  file: File;
  name: string;
  size: number;
  extension: string;
  duration: number | null;
  width: number | null;
  height: number | null;
  thumbnailUrl: string | null;
}

const SUPPORTED_EXTENSIONS = new Set([
  'mp4',
  'mov',
  'webm',
  'mkv',
  'avi',
  'm4v',
  '3gp',
  'ogv',
  'mts',
  'm2ts',
  'ts',
  'flv',
]);

export function getFileExtension(filename: string): string {
  const parts = filename.toLowerCase().split('.');
  return parts.length > 1 ? parts.pop() || 'mp4' : 'mp4';
}

export function isSupportedVideoFile(file: File): boolean {
  if (file.type && file.type.startsWith('video/')) {
    return true;
  }
  const ext = getFileExtension(file.name);
  return SUPPORTED_EXTENSIONS.has(ext);
}

export function formatDuration(seconds: number | null, fallback = '--:--'): string {
  if (seconds === null || !Number.isFinite(seconds) || seconds < 0) {
    return fallback;
  }
  const totalSec = Math.round(seconds);
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  if (hrs > 0) {
    return `${hrs}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const idx = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, idx);
  return `${value >= 100 || idx === 0 ? Math.round(value) : value.toFixed(1)} ${units[idx]}`;
}

export function createClipId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `clip_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export async function extractVideoMetadata(file: File): Promise<VideoClip> {
  const id = createClipId();
  const extension = getFileExtension(file.name);
  const baseClip: VideoClip = {
    id,
    file,
    name: file.name,
    size: file.size,
    extension,
    duration: null,
    width: null,
    height: null,
    thumbnailUrl: null,
  };

  if (typeof document === 'undefined') {
    return baseClip;
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const metadata = await new Promise<{
      duration: number | null;
      width: number | null;
      height: number | null;
      thumbnailUrl: string | null;
    }>((resolve) => {
      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.preload = 'metadata';

      let settled = false;
      let duration: number | null = null;
      let width: number | null = null;
      let height: number | null = null;

      const finish = (thumbnailUrl: string | null) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeoutId);
        video.onloadedmetadata = null;
        video.onseeked = null;
        video.onloadeddata = null;
        video.onerror = null;
        video.removeAttribute('src');
        video.load();
        resolve({ duration, width, height, thumbnailUrl });
      };

      const timeoutId = window.setTimeout(() => {
        finish(null);
      }, 3500);

      const captureFrame = () => {
        try {
          const vw = video.videoWidth || 320;
          const vh = video.videoHeight || 180;
          if (vw <= 0 || vh <= 0) {
            finish(null);
            return;
          }
          const targetWidth = 320;
          const targetHeight = Math.max(1, Math.round((vh / vw) * targetWidth));
          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            finish(null);
            return;
          }
          ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.78);
          finish(dataUrl);
        } catch {
          finish(null);
        }
      };

      video.onloadedmetadata = () => {
        duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : null;
        width = video.videoWidth > 0 ? video.videoWidth : null;
        height = video.videoHeight > 0 ? video.videoHeight : null;

        const targetTime = duration ? Math.min(0.6, duration * 0.15) : 0;
        if (targetTime > 0.05) {
          video.onseeked = captureFrame;
          try {
            video.currentTime = targetTime;
          } catch {
            captureFrame();
          }
        } else {
          video.onloadeddata = captureFrame;
          if (video.readyState >= 2) {
            captureFrame();
          }
        }
      };

      video.onerror = () => {
        finish(null);
      };

      video.src = objectUrl;
    });

    return {
      ...baseClip,
      ...metadata,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
