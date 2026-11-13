# MergeVideos

**100% Client-Side Online Video Merger — Combine MP4, MOV & WebM Clips in Browser RAM with Zero Cloud Uploads & No Watermark.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-mergevideos.github.io-00AF91?style=for-the-badge&logo=googlechrome&logoColor=white)](https://mergevideos.github.io/)
[![Astro](https://img.shields.io/badge/Astro-7.4%20Static-007965?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![FFmpeg.wasm](https://img.shields.io/badge/FFmpeg.wasm-0.12-F58634?style=for-the-badge&logo=ffmpeg&logoColor=white)](https://ffmpegwasm.netlify.app/)
[![MIT License](https://img.shields.io/badge/License-MIT-FFCC29?style=for-the-badge)](./LICENSE)
[![Support the Developer](https://img.shields.io/badge/Support%20the%20Developer-Buy%20Me%20a%20Coffee-F58634?style=for-the-badge&logo=buymeacoffee&logoColor=white)](https://kisharadilshan.gumroad.com/coffee)

---

## Key Features

- **Zero Cloud Uploads (100% Local RAM):** Powered by `@ffmpeg/ffmpeg` compiled to single-threaded WebAssembly (`@ffmpeg/core`). Your videos never leave your computer or phone.
- **Lossless Instant Concat & Smart Resolution Normalization:** Dual-mode FFmpeg engine:
  - **Fast Instant Merge:** Stream-copies matching clips (`-f concat -safe 0 -i filelist.txt -c copy`) in ~1 second without re-encoding.
  - **Smart Compatible Merge:** Normalizes mixed iPhone `.MOV`, Android `.MP4`, `.WebM`, `.MKV`, and `.AVI` files (`-filter_complex`) with automatic scaling, letterboxing, frame-rate alignment, and silent-track padding to **Auto/Original**, **16:9 YouTube (1920×1080)**, **9:16 TikTok & iPhone (1080×1920)**, or **1:1 Square (1080×1080)**, plus **Keep Audio / Mute Audio** control.
- **Drag-and-Drop Clip Reordering:** Visual storyboard timeline with extracted frame thumbnails, clip durations, order badges (`#1`, `#2`, `#3`…), accessible left/right reorder buttons, and 60fps FLIP layout animations.
- **8-Language i18n:** Full static localized routes across English (`/`), Spanish (`/es/`), Portuguese (`/pt/`), German (`/de/`), French (`/fr/`), Japanese (`/ja/`), Chinese (`/zh/`), and Russian (`/ru/`), plus flat `sitemap.xml` and `@astrojs/sitemap` for Google Search Console.
- **Light/Dark Theme:** Clean Emerald & Sunshine Light Mode default with instant, persistent Deep Night Dark Mode toggle and zero FOUC.
- **Offline-Ready PWA:** Installable via **Add to Home Screen** (`public/manifest.webmanifest`) with an offline-first Service Worker (`public/sw.js`) that caches HTML, CSS, JS, and FFmpeg WebAssembly core binaries so you can merge videos offline.

---

## Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Web Framework** | Astro (`output: 'static'`) + `@astrojs/react` | Zero-JS-by-default static pages with an interactive React merger island |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) + CSS Custom Properties | Responsive UI, `100dvh` first-fold workspace, and Light/Dark theme tokens |
| **Video Engine** | `@ffmpeg/ffmpeg`, `@ffmpeg/util`, `@ffmpeg/core` | 100% client-side WebAssembly concat & `-filter_complex` normalization |
| **Offline & PWA** | Web App Manifest + Service Worker (`public/sw.js`) | Offline-first caching for HTML, `_astro/` bundles, and FFmpeg WASM core |
| **SEO & Schema** | `src/pages/sitemap.xml.ts`, `@astrojs/sitemap`, JSON-LD | W3C flat + index sitemaps, hreflang graph, and zero-fake-rating schema |
| **Analytics** | Google Tag Manager (`GTM-NDP5XC2F`) & GA4 (`G-JSCQLBDWHS`) | Lightweight asynchronous telemetry inside `<head>` |

---

## Color Palette Specification

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Vibrant Emerald Teal** | `#00AF91` | Workspace borders, active highlights, dark-mode primary action button |
| **Deep Forest Green** | `#007965` | Light-mode primary headings, primary action buttons, PWA theme color |
| **Energetic Tangerine Orange** | `#F58634` | Active drag-drop border, Support CTA button, progress gradient accent |
| **Warm Sunshine Gold** | `#FFCC29` | Highlight badges, local RAM privacy pill, dark-mode secondary text & hover glow |
| **Clean Light Background** | `#F8FFFD` | Light-mode canvas primary background |
| **Pure Canvas White** | `#FFFFFF` | Light-mode surface cards & workspace container |
| **Deep Night Black** | `#0D1B18` | Dark-mode canvas background (`#132A25` cards / `#16302A` workspace) |

---

## Quick Start & Deployment

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/mergevideos/mergevideos.github.io.git
cd mergevideos.github.io

# 2. Install dependencies
npm install

# 3. Start local development server (auto-copies @ffmpeg/core into public/ffmpeg/)
npm run dev

# 4. Run Astro type checking and production static build
npm run check
npm run build
```

### Automated GitHub Pages Deployment

Deployments are automated via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) on every push to `main` (or manual `workflow_dispatch`):

1. Checks out the repository and ensures `public/.nojekyll` is present.
2. Uses `withastro/action@v3` with Node 22 to install dependencies, copy `@ffmpeg/core` assets (`prebuild`), and build static HTML/JS/CSS/WASM into `dist/`.
3. Publishes `dist/` to the `github-pages` environment using `actions/deploy-pages@v4`.

---

## Support the Developer

MergeVideos is 100% free, open source, ad-free, and never adds watermarks. If it saved you time:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20MergeVideos-F58634?style=for-the-badge&logo=buymeacoffee&logoColor=white)](https://kisharadilshan.gumroad.com/coffee)

---

## License

Licensed under the **MIT License** — see [`LICENSE`](./LICENSE) for full details.
