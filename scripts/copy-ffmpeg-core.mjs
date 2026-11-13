import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const sourceDir = resolve(rootDir, 'node_modules/@ffmpeg/core/dist/esm');
const targetDir = resolve(rootDir, 'public/ffmpeg');

const files = ['ffmpeg-core.js', 'ffmpeg-core.wasm'];

mkdirSync(targetDir, { recursive: true });

for (const file of files) {
  const src = resolve(sourceDir, file);
  const dest = resolve(targetDir, file);
  if (!existsSync(src)) {
    throw new Error(`Missing @ffmpeg/core asset: ${src}`);
  }
  copyFileSync(src, dest);
  console.log(`Copied ${file} -> public/ffmpeg/${file}`);
}
