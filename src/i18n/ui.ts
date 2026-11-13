export const locales = ['en', 'es', 'pt', 'de', 'fr', 'ja', 'zh', 'ru'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export interface LocaleInfo {
  code: Locale;
  shortCode: string;
  nativeName: string;
  htmlLang: string;
  ogLocale: string;
}

export const localeMeta: Record<Locale, LocaleInfo> = {
  en: { code: 'en', shortCode: 'EN', nativeName: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  es: { code: 'es', shortCode: 'ES', nativeName: 'Español', htmlLang: 'es', ogLocale: 'es_ES' },
  pt: { code: 'pt', shortCode: 'PT', nativeName: 'Português', htmlLang: 'pt', ogLocale: 'pt_BR' },
  de: { code: 'de', shortCode: 'DE', nativeName: 'Deutsch', htmlLang: 'de', ogLocale: 'de_DE' },
  fr: { code: 'fr', shortCode: 'FR', nativeName: 'Français', htmlLang: 'fr', ogLocale: 'fr_FR' },
  ja: { code: 'ja', shortCode: 'JA', nativeName: '日本語', htmlLang: 'ja', ogLocale: 'ja_JP' },
  zh: { code: 'zh', shortCode: 'ZH', nativeName: '中文', htmlLang: 'zh', ogLocale: 'zh_CN' },
  ru: { code: 'ru', shortCode: 'RU', nativeName: 'Русский', htmlLang: 'ru', ogLocale: 'ru_RU' },
};

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface GuideItem {
  badge: string;
  title: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  mergeVideos: string;
  competitors: string;
}

export interface UIMessages {
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImageAlt: string;
    appSchemaName: string;
    howToSchemaName: string;
  };
  nav: {
    brandName: string;
    brandAria: string;
    languageLabel: string;
    languageAria: string;
    themeToDarkAria: string;
    themeToLightAria: string;
    githubAria: string;
    installPwa: string;
    installPwaAria: string;
    installModalTitle: string;
    installModalDesc: string;
    installModalIos: string;
    installModalDesktop: string;
    installModalClose: string;
    supportDev: string;
    supportDevAria: string;
    openMenuAria: string;
    closeMenuAria: string;
    githubLabel: string;
  };
  hero: {
    title: string;
  };
  merger: {
    dropzoneTitle: string;
    dropzoneSubtitle: string;
    dropzoneDragActive: string;
    selectVideosBtn: string;
    addMoreVideosBtn: '+ Add More Videos' | string;
    supportedFormatsHint: string;
    needTwoClipsHint: string;
    storyboardHeading: string;
    clipsReadyTemplate: string;
    totalDurationLabel: string;
    clearAllBtn: string;
    dragToReorderHint: string;
    moveLeftAria: string;
    moveRightAria: string;
    removeClipAria: string;
    aspectRatioLabel: string;
    aspectAuto: string;
    aspect16x9: string;
    aspect9x16: string;
    aspect1x1: string;
    mergeModeLabel: string;
    modeFastTitle: string;
    modeFastDesc: string;
    modeSmartTitle: string;
    modeSmartDesc: string;
    aspectRequiresSmartNote: string;
    audioLabel: string;
    audioKeep: string;
    audioMute: string;
    mergeActionBtnTemplate: string;
    mergeActionNeedMoreBtn: string;
    progressTitle: string;
    statusLoadingEngine: string;
    statusPreparingClips: string;
    statusFastMerging: string;
    statusSmartMerging: string;
    statusFallbackSmart: string;
    statusFinalizing: string;
    privacyBadge: string;
    cancelMergeBtn: string;
    resultBannerTemplate: string;
    resultSizeLabel: string;
    downloadBtn: string;
    mergeMoreBtn: string;
    editStoryboardBtn: string;
    supportCardTitle: string;
    supportCardDesc: string;
    supportCardBtn: string;
    errorInvalidFiles: string;
    errorTooFewClips: string;
    errorMergeFailed: string;
    errorCancelled: string;
    errorDismiss: string;
    unknownDuration: string;
  };
  belowFold: {
    breadcrumbHome: string;
    breadcrumbTools: string;
    breadcrumbCurrent: string;
    howTitle: string;
    howSteps: [StepItem, StepItem, StepItem];
    guidesTitle: string;
    guides: [GuideItem, GuideItem, GuideItem];
    comparisonTitle: string;
    comparisonSubtitle: string;
    comparisonHeaders: [string, string, string];
    comparisonRows: ComparisonRow[];
    featuresTitle: string;
    features: [FeatureItem, FeatureItem, FeatureItem, FeatureItem];
    faqTitle: string;
    faqs: FAQItem[];
    footerPrivacy: string;
    footerOpenSource: string;
    footerSupport: string;
  };
}

const TARGET_KEYWORDS_EN =
  'how to merge videos, merge video, merge videos online, online merge videos, merge two videos, merge videos free, merge video online, how to merge 2 videos, how to merge videos together, combine videos, combine videos online, merge videos iphone, merge iphone videos, iphone merge videos, merge videos on iphone, how to merge videos iphone, how to merge the speed of a video on iphone, merge two videos iphone, merge videos in iphone, how to merge videos in iphone, merge 2 videos iphone, how to merge two videos on iphone, merge videos android, merge youtube videos, youtube videos, youtube merge videos, how to merge videos on youtube, app to merge videos, video compressor, online video editor, video editor, trim video online, video editor online, video trimmer';

export const ui: Record<Locale, UIMessages> = {
  en: {
    seo: {
      title: 'Merge Videos Online — Combine Videos Free (No Watermark)',
      description:
        'Merge videos online 100% free with zero uploads & no watermark. Combine MP4, iPhone MOV & YouTube clips privately in your browser.',
      keywords: TARGET_KEYWORDS_EN,
      ogImageAlt: 'MergeVideos — Free Online Video Merger with Zero Uploads and No Watermark',
      appSchemaName: 'MergeVideos Online',
      howToSchemaName: 'How to Merge Videos Online for Free Without a Watermark',
    },
    nav: {
      brandName: 'MergeVideos',
      brandAria: 'MergeVideos Home',
      languageLabel: 'Language',
      languageAria: 'Select language',
      themeToDarkAria: 'Switch to dark mode',
      themeToLightAria: 'Switch to light mode',
      githubAria: 'View MergeVideos source code on GitHub',
      installPwa: 'Add to Home Screen',
      installPwaAria: 'Add MergeVideos to Home Screen',
      installModalTitle: 'Install MergeVideos App',
      installModalDesc: 'Use MergeVideos like a native app right from your desktop or home screen.',
      installModalIos: 'On iPhone / iPad Safari: tap Share, then choose "Add to Home Screen".',
      installModalDesktop: 'On Chrome, Edge, or Android: open the browser menu and click "Install app" or the install icon in the address bar.',
      installModalClose: 'Got it',
      supportDev: 'Support the Developer',
      supportDevAria: 'Support the developer with a coffee',
      openMenuAria: 'Open navigation menu',
      closeMenuAria: 'Close navigation menu',
      githubLabel: 'GitHub',
    },
    hero: {
      title: 'Merge Videos Online',
    },
    merger: {
      dropzoneTitle: 'Drop 2 or more videos here to combine them',
      dropzoneSubtitle: '100% private in-browser merging — your videos never leave your device',
      dropzoneDragActive: 'Release to add videos to your storyboard',
      selectVideosBtn: 'Select Videos to Merge',
      addMoreVideosBtn: '+ Add More Videos',
      supportedFormatsHint: 'Supports MP4, MOV, WebM, MKV & AVI • No watermark',
      needTwoClipsHint: 'Add at least 1 more video clip to start merging',
      storyboardHeading: 'Clip Storyboard',
      clipsReadyTemplate: '{count} Clips Ready',
      totalDurationLabel: 'Total Duration',
      clearAllBtn: 'Clear All',
      dragToReorderHint: 'Drag clips or use arrows to reorder',
      moveLeftAria: 'Move clip left',
      moveRightAria: 'Move clip right',
      removeClipAria: 'Remove clip',
      aspectRatioLabel: 'Output Aspect Ratio',
      aspectAuto: 'Auto / Original',
      aspect16x9: '16:9 YouTube Landscape',
      aspect9x16: '9:16 TikTok & iPhone Vertical',
      aspect1x1: '1:1 Square',
      mergeModeLabel: 'Merge Engine Mode',
      modeFastTitle: 'Fast Instant Merge (No Re-encoding)',
      modeFastDesc: '1-second lossless stream copy when clips share codecs and resolution',
      modeSmartTitle: 'Smart Compatible Merge (Mix Any Resolutions)',
      modeSmartDesc: 'Normalizes iPhone MOV, Android MP4 & WebM into one seamless video',
      aspectRequiresSmartNote: 'Custom aspect ratios automatically use Smart Compatible Merge.',
      audioLabel: 'Audio Track',
      audioKeep: 'Keep Audio',
      audioMute: 'Mute Audio',
      mergeActionBtnTemplate: 'Merge {count} Videos Now',
      mergeActionNeedMoreBtn: 'Add at Least 2 Videos to Merge',
      progressTitle: 'Combining Your Videos',
      statusLoadingEngine: 'Loading video engine into browser RAM...',
      statusPreparingClips: 'Staging video clips locally...',
      statusFastMerging: 'Joining clips losslessly...',
      statusSmartMerging: 'Merging Clips & Syncing Audio...',
      statusFallbackSmart: 'Mixed formats detected — switching to Smart Compatible Merge...',
      statusFinalizing: 'Finalizing merged video file...',
      privacyBadge: '100% Local Browser RAM Processing — Zero Server Uploads, No Watermark',
      cancelMergeBtn: 'Cancel Merge',
      resultBannerTemplate: '{count} Clips Combined • Total Duration: {duration}',
      resultSizeLabel: 'Output Size',
      downloadBtn: 'Download Merged Video',
      mergeMoreBtn: 'Merge New Videos',
      editStoryboardBtn: 'Back to Storyboard',
      supportCardTitle: 'Saved you time without uploads or watermarks?',
      supportCardDesc: 'MergeVideos is free and open source. A quick coffee helps keep it fast and ad-free.',
      supportCardBtn: 'Buy Me a Coffee',
      errorInvalidFiles: 'Some dropped items were not supported video files and were skipped.',
      errorTooFewClips: 'Please add at least 2 video files to merge.',
      errorMergeFailed: 'Could not merge these clips in Fast Mode. Try Smart Compatible Merge or fewer large clips.',
      errorCancelled: 'Video merge was cancelled.',
      errorDismiss: 'Dismiss',
      unknownDuration: '--:--',
    },
    belowFold: {
      breadcrumbHome: 'Home',
      breadcrumbTools: 'Video Editing Tools',
      breadcrumbCurrent: 'Merge Videos Online',
      howTitle: 'How to Merge Videos Online in 3 Simple Steps',
      howSteps: [
        {
          title: '1. Drop Your Video Clips',
          description:
            "Drop two or more MP4, iPhone MOV, or WebM video files into the MergeVideos workspace (or click 'Select Videos to Merge').",
        },
        {
          title: '2. Reorder & Choose Aspect Ratio',
          description:
            'Drag and drop the video cards to arrange their playback order and pick your desired aspect ratio (Original, 16:9, 9:16, or 1:1).',
        },
        {
          title: '3. Merge & Download Instantly',
          description:
            "Click 'Merge Videos Now' to combine your clips 100% locally in your browser RAM and download your unified MP4 file instantly.",
        },
      ],
      guidesTitle: 'Combine Videos Free Across iPhone, Android & YouTube',
      guides: [
        {
          badge: 'iPhone & iPad MOV',
          title: 'How to Merge Two Videos on iPhone & iPad',
          description:
            'Need to merge 2 videos on iPhone without installing an app? Open MergeVideos in Safari, select iPhone MOV clips from Photos, pick 9:16 Vertical or Original, and combine videos together in browser RAM with zero watermark.',
        },
        {
          badge: 'Android & Desktop',
          title: 'Combine Mixed Android MP4, WebM & MKV Clips',
          description:
            'Want to merge videos on Android, Windows, or Mac? Use Fast Instant Merge for 1-second lossless stream copy or Smart Compatible Merge to unify mixed resolutions and frame rates into one clean video.',
        },
        {
          badge: 'YouTube & Social',
          title: 'Merge YouTube Videos Together in 1080p',
          description:
            'Preparing a compilation, intro + outro, or Shorts reel? Choose 16:9 YouTube Landscape, 9:16 TikTok Vertical, or 1:1 Square to auto-scale and letterbox every clip seamlessly without watermarks.',
        },
      ],
      comparisonTitle: 'MergeVideos vs Cloud Online Video Editors',
      comparisonSubtitle:
        'See why creators combine videos online with MergeVideos instead of uploading to Clideo, CapCut Web, or Canva.',
      comparisonHeaders: ['Capability', 'MergeVideos (Browser RAM)', 'Cloud Editors (Clideo / CapCut / Canva)'],
      comparisonRows: [
        {
          feature: 'Processing Privacy',
          mergeVideos: '100% Client-Side WebAssembly — zero server uploads',
          competitors: 'Uploads your private videos to remote cloud servers',
        },
        {
          feature: 'Watermarks on Free Tier',
          mergeVideos: 'Zero watermarks on every export, forever',
          competitors: 'Corner watermarks unless you pay for a subscription',
        },
        {
          feature: 'Upload Wait Time',
          mergeVideos: '0 seconds — clips open straight from local disk',
          competitors: 'Slow uploads before editing even starts',
        },
        {
          feature: 'Account & Sign-Up',
          mergeVideos: 'No login, no email, no daily export limits',
          competitors: 'Account wall required before downloading',
        },
        {
          feature: '1-Second Lossless Merge',
          mergeVideos: 'Instant stream copy (-c copy) for matching clips',
          competitors: 'Forces full server re-encoding on every job',
        },
      ],
      featuresTitle: 'Why Creators Choose MergeVideos',
      features: [
        {
          title: 'Zero Server Uploads',
          description:
            'Powered by WebAssembly FFmpeg inside your browser tab. Private footage never touches an external server.',
        },
        {
          title: 'Dual-Mode Merge Engine',
          description:
            'Instant lossless stream copy for matching clips, plus smart normalization for mixed iPhone and Android formats.',
        },
        {
          title: 'Zero Watermarks or Signups',
          description:
            'Export crisp full-length videos right away without accounts, daily quotas, or corner logos.',
        },
        {
          title: 'Social Aspect Ratios',
          description:
            'Auto-fit clips into 16:9 YouTube, 9:16 TikTok & Reels, or 1:1 Square with clean letterboxing.',
        },
      ],
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'How do I merge two videos on iPhone or Android for free without an app?',
          answer:
            "Open MergeVideos in Safari or Chrome, select two or more videos from your camera roll, arrange their order, and tap 'Merge Videos'. Everything processes right inside your mobile browser with no watermark and no app installation.",
        },
        {
          question: 'Why is MergeVideos faster and safer than Clideo or CapCut Web?',
          answer:
            "Traditional tools force you to upload heavy video files to slow cloud servers and add watermarks unless you pay a monthly subscription. MergeVideos runs 100% locally in your device's RAM using WebAssembly—meaning zero upload wait times, complete privacy, and zero watermarks.",
        },
        {
          question: 'Can I combine videos that have different resolutions or formats?',
          answer:
            "Yes! Use 'Fast Instant Merge' for clips recorded on the same device, or select 'Smart Compatible Merge' to automatically normalize and combine mixed MP4, MOV, and WebM videos of different sizes into one smooth 1080p video.",
        },
        {
          question: 'Are my videos uploaded to a server when I merge them?',
          answer:
            'No. MergeVideos runs FFmpeg compiled to WebAssembly directly in your browser memory. Your video files never leave your computer or phone.',
        },
        {
          question: 'Is there any watermark or time limit?',
          answer:
            'Never. MergeVideos adds zero watermarks and has no artificial clip count limits. Processing capacity depends only on your device memory.',
        },
        {
          question: 'Which video formats are supported?',
          answer:
            'You can import MP4, MOV, WebM, MKV, and AVI files. Merged output is saved as universally compatible MP4 (or WebM when stream-copying WebM clips).',
        },
      ],
      footerPrivacy: '100% Client-Side • Zero Uploads • No Watermark',
      footerOpenSource: 'GitHub',
      footerSupport: 'Support the Developer',
    },
  },

  es: {
    seo: {
      title: 'Unir Videos Online — Juntar Videos Gratis (Sin Marca)',
      description:
        'Une videos online gratis, sin subidas ni marca de agua. Combina MP4, MOV de iPhone y clips de YouTube al instante en tu navegador.',
      keywords:
        'unir videos online, juntar videos gratis, combinar videos sin marca de agua, unir dos videos iphone, juntar videos android, unir videos youtube, ' +
        TARGET_KEYWORDS_EN,
      ogImageAlt: 'MergeVideos — Unir Videos Online Gratis Sin Marca de Agua y Sin Subidas',
      appSchemaName: 'MergeVideos Online',
      howToSchemaName: 'Cómo Unir Videos Online Gratis Sin Marca de Agua',
    },
    nav: {
      brandName: 'MergeVideos',
      brandAria: 'Inicio de MergeVideos',
      languageLabel: 'Idioma',
      languageAria: 'Seleccionar idioma',
      themeToDarkAria: 'Cambiar a modo oscuro',
      themeToLightAria: 'Cambiar a modo claro',
      githubAria: 'Ver código fuente de MergeVideos en GitHub',
      installPwa: 'Añadir a inicio',
      installPwaAria: 'Añadir MergeVideos a la pantalla de inicio',
      installModalTitle: 'Instalar aplicación MergeVideos',
      installModalDesc: 'Usa MergeVideos como una app nativa desde tu escritorio o pantalla de inicio.',
      installModalIos: 'En Safari de iPhone / iPad: pulsa Compartir y elige "Añadir a pantalla de inicio".',
      installModalDesktop:
        'En Chrome, Edge o Android: abre el menú del navegador y haz clic en "Instalar aplicación" o en el icono de la barra de direcciones.',
      installModalClose: 'Entendido',
      supportDev: 'Apoyar al desarrollador',
      supportDevAria: 'Apoyar al desarrollador con un café',
      openMenuAria: 'Abrir menú de navegación',
      closeMenuAria: 'Cerrar menú de navegación',
      githubLabel: 'GitHub',
    },
    hero: {
      title: 'Unir Videos Online',
    },
    merger: {
      dropzoneTitle: 'Arrastra 2 o más videos aquí para combinarlos',
      dropzoneSubtitle: 'Unión 100% privada en tu navegador — tus videos nunca salen de tu dispositivo',
      dropzoneDragActive: 'Suelta para añadir los videos a tu guion gráfico',
      selectVideosBtn: 'Seleccionar Videos para Unir',
      addMoreVideosBtn: '+ Añadir Más Videos',
      supportedFormatsHint: 'Compatible con MP4, MOV, WebM, MKV y AVI • Sin marca de agua',
      needTwoClipsHint: 'Añade al menos 1 clip de video más para empezar a unir',
      storyboardHeading: 'Guion Gráfico de Clips',
      clipsReadyTemplate: '{count} Clips Listos',
      totalDurationLabel: 'Duración Total',
      clearAllBtn: 'Limpiar Todo',
      dragToReorderHint: 'Arrastra los clips o usa las flechas para reordenar',
      moveLeftAria: 'Mover clip a la izquierda',
      moveRightAria: 'Mover clip a la derecha',
      removeClipAria: 'Eliminar clip',
      aspectRatioLabel: 'Relación de Aspecto',
      aspectAuto: 'Auto / Original',
      aspect16x9: '16:9 YouTube Horizontal',
      aspect9x16: '9:16 TikTok y iPhone Vertical',
      aspect1x1: '1:1 Cuadrado',
      mergeModeLabel: 'Modo del Motor de Unión',
      modeFastTitle: 'Unión Rápida Instantánea (Sin Recodificar)',
      modeFastDesc: 'Copia sin pérdida en 1 segundo cuando los clips comparten códec y resolución',
      modeSmartTitle: 'Unión Inteligente Compatible (Mezcla Resoluciones)',
      modeSmartDesc: 'Normaliza MOV de iPhone, MP4 de Android y WebM en un solo video fluido',
      aspectRequiresSmartNote: 'Las relaciones de aspecto personalizadas usan automáticamente la Unión Inteligente Compatible.',
      audioLabel: 'Pista de Audio',
      audioKeep: 'Mantener Audio',
      audioMute: 'Silenciar Audio',
      mergeActionBtnTemplate: 'Unir {count} Videos Ahora',
      mergeActionNeedMoreBtn: 'Añade al Menos 2 Videos para Unir',
      progressTitle: 'Combinando Tus Videos',
      statusLoadingEngine: 'Cargando motor de video en la RAM del navegador...',
      statusPreparingClips: 'Preparando clips localmente...',
      statusFastMerging: 'Uniendo clips sin pérdida...',
      statusSmartMerging: 'Uniendo Clips y Sincronizando Audio...',
      statusFallbackSmart: 'Formatos mixtos detectados — cambiando a Unión Inteligente Compatible...',
      statusFinalizing: 'Finalizando archivo de video unido...',
      privacyBadge: 'Procesamiento 100% en RAM Local — Cero Subidas al Servidor, Sin Marca de Agua',
      cancelMergeBtn: 'Cancelar Unión',
      resultBannerTemplate: '{count} Clips Combinados • Duración Total: {duration}',
      resultSizeLabel: 'Tamaño Final',
      downloadBtn: 'Descargar Video Unido',
      mergeMoreBtn: 'Unir Nuevos Videos',
      editStoryboardBtn: 'Volver al Guion',
      supportCardTitle: '¿Te ahorró tiempo sin subidas ni marcas de agua?',
      supportCardDesc: 'MergeVideos es gratuito y de código abierto. Un café ayuda a mantenerlo rápido y sin anuncios.',
      supportCardBtn: 'Invítame a un Café',
      errorInvalidFiles: 'Algunos archivos arrastrados no eran videos compatibles y se omitieron.',
      errorTooFewClips: 'Por favor añade al menos 2 archivos de video para unir.',
      errorMergeFailed: 'No se pudieron unir estos clips en Modo Rápido. Prueba Unión Inteligente Compatible o menos clips grandes.',
      errorCancelled: 'La unión de videos fue cancelada.',
      errorDismiss: 'Cerrar',
      unknownDuration: '--:--',
    },
    belowFold: {
      breadcrumbHome: 'Inicio',
      breadcrumbTools: 'Herramientas de Edición de Video',
      breadcrumbCurrent: 'Unir Videos Online',
      howTitle: 'Cómo Unir Videos Online Gratis en 3 Pasos',
      howSteps: [
        {
          title: '1. Suelta Tus Clips de Video',
          description: 'Arrastra dos o más videos MP4, MOV de iPhone o WebM al espacio de MergeVideos o pulsa Seleccionar Videos.',
        },
        {
          title: '2. Ordena y Elige Relación de Aspecto',
          description: 'Reordena las tarjetas del guion gráfico y selecciona Original, 16:9 YouTube, 9:16 TikTok o 1:1 Cuadrado.',
        },
        {
          title: '3. Une y Descarga al Instante',
          description: 'Pulsa Unir Videos Ahora para combinar tus clips 100% en la RAM del navegador y descargar tu MP4 sin marcas.',
        },
      ],
      guidesTitle: 'Combina Videos Gratis en iPhone, Android y YouTube',
      guides: [
        {
          badge: 'MOV de iPhone e iPad',
          title: 'Cómo Unir Dos Videos en iPhone sin Instalar Apps',
          description:
            'Abre MergeVideos en Safari, elige dos o más clips MOV de tu carrete, selecciona 9:16 Vertical u Original y júntalos localmente sin marca de agua.',
        },
        {
          badge: 'Android y Escritorio',
          title: 'Junta Clips Mixtos MP4, WebM y MKV sin Errores',
          description:
            'Usa Unión Rápida Instantánea para copiar sin pérdida en 1 segundo o Unión Inteligente Compatible para unificar resoluciones y FPS distintos.',
        },
        {
          badge: 'YouTube y Redes',
          title: 'Une Videos de YouTube en 1080p sin Marcas de Agua',
          description:
            '¿Creas recopilaciones, intros o Reels? Elige 16:9 Horizontal, 9:16 Vertical o 1:1 Cuadrado y ajusta cada escena automáticamente.',
        },
      ],
      comparisonTitle: 'MergeVideos vs Editores Online en la Nube',
      comparisonSubtitle:
        'Descubre por qué los creadores prefieren unir videos localmente con MergeVideos frente a Clideo, CapCut Web o Canva.',
      comparisonHeaders: ['Característica', 'MergeVideos (RAM del Navegador)', 'Editores en la Nube (Clideo / CapCut / Canva)'],
      comparisonRows: [
        {
          feature: 'Privacidad de Archivos',
          mergeVideos: '100% WebAssembly local — cero subidas a servidores',
          competitors: 'Sube tus videos privados a servidores externos',
        },
        {
          feature: 'Marca de Agua Gratis',
          mergeVideos: 'Nunca añade marcas de agua en ningún video',
          competitors: 'Añade marca de agua salvo suscripción de pago',
        },
        {
          feature: 'Tiempo de Espera',
          mergeVideos: '0 segundos — abre directamente desde tu disco',
          competitors: 'Largos tiempos de subida antes de editar',
        },
        {
          feature: 'Registro / Cuenta',
          mergeVideos: 'Sin cuenta, sin correo, sin límites diarios',
          competitors: 'Exige iniciar sesión para descargar el resultado',
        },
        {
          feature: 'Unión Instantánea 1s',
          mergeVideos: 'Copia directa sin recodificar (-c copy)',
          competitors: 'Recodifica en servidor en todos los casos',
        },
      ],
      featuresTitle: 'Por Qué los Creadores Eligen MergeVideos',
      features: [
        {
          title: 'Cero Subidas al Servidor',
          description: 'Impulsado por FFmpeg WebAssembly dentro de tu pestaña. Tus grabaciones privadas nunca salen de tu equipo.',
        },
        {
          title: 'Motor Dual de Unión',
          description: 'Copia instantánea sin pérdida para clips iguales y normalización inteligente para mezclar iPhone y Android.',
        },
        {
          title: 'Sin Marcas de Agua ni Registros',
          description: 'Exporta videos completos al instante sin cuentas, límites diarios ni logotipos superpuestos.',
        },
        {
          title: 'Formatos para Redes Sociales',
          description: 'Ajusta automáticamente clips a 16:9 YouTube, 9:16 TikTok y Reels o 1:1 Cuadrado sin recortes feos.',
        },
      ],
      faqTitle: 'Preguntas Frecuentes',
      faqs: [
        {
          question: '¿Cómo unir dos videos en iPhone o Android gratis sin descargar ninguna app?',
          answer:
            'Abre MergeVideos en Safari o Chrome, selecciona dos o más videos de tu galería, ordena los clips y pulsa Unir Videos. Todo se procesa dentro del navegador móvil sin marcas de agua ni instalaciones.',
        },
        {
          question: '¿Por qué MergeVideos es más rápido y seguro que Clideo o CapCut Web?',
          answer:
            'Las plataformas tradicionales te obligan a subir archivos pesados a servidores lentos y añaden marcas de agua si no pagas. MergeVideos se ejecuta 100% en la memoria RAM de tu dispositivo mediante WebAssembly: cero esperas de subida, privacidad total y cero marcas.',
        },
        {
          question: '¿Puedo combinar videos con diferentes resoluciones o formatos?',
          answer:
            '¡Sí! Usa Unión Rápida Instantánea para clips grabados con el mismo dispositivo o activa Unión Inteligente Compatible para normalizar y combinar MP4, MOV y WebM de distintos tamaños en un solo video fluido de 1080p.',
        },
        {
          question: '¿Se suben mis videos a algún servidor al unirlos?',
          answer:
            'No. MergeVideos ejecuta FFmpeg compilado en WebAssembly directamente en la memoria de tu navegador. Tus archivos nunca salen de tu dispositivo.',
        },
        {
          question: '¿Hay marcas de agua o límite de duración?',
          answer: 'Nunca. MergeVideos no añade marcas de agua ni límites artificiales.',
        },
        {
          question: '¿Qué formatos de video son compatibles?',
          answer: 'Puedes importar archivos MP4, MOV, WebM, MKV y AVI y descargar en MP4 universal (o WebM al copiar WebM).',
        },
      ],
      footerPrivacy: '100% Local • Cero Subidas • Sin Marca de Agua',
      footerOpenSource: 'GitHub',
      footerSupport: 'Apoyar al desarrollador',
    },
  },

  pt: {
    seo: {
      title: 'Juntar Vídeos Online — Combinar Grátis (Sem Marca d’Água)',
      description:
        'Junte vídeos online grátis, sem upload e sem marca d’água. Combine MP4, MOV de iPhone e clipes do YouTube direto no seu navegador.',
      keywords:
        'juntar videos online, combinar videos gratis, unir dois videos sem marca dagua, juntar videos iphone, juntar videos android, juntar videos youtube, ' +
        TARGET_KEYWORDS_EN,
      ogImageAlt: 'MergeVideos — Juntar Vídeos Online Grátis Sem Marca d’Água',
      appSchemaName: 'MergeVideos Online',
      howToSchemaName: 'Como Juntar Vídeos Online Grátis Sem Marca d’Água',
    },
    nav: {
      brandName: 'MergeVideos',
      brandAria: 'Página inicial do MergeVideos',
      languageLabel: 'Idioma',
      languageAria: 'Selecionar idioma',
      themeToDarkAria: 'Mudar para modo escuro',
      themeToLightAria: 'Mudar para modo claro',
      githubAria: 'Ver código-fonte do MergeVideos no GitHub',
      installPwa: 'Adicionar à Tela Inicial',
      installPwaAria: 'Adicionar MergeVideos à Tela Inicial',
      installModalTitle: 'Instalar App MergeVideos',
      installModalDesc: 'Use o MergeVideos como um aplicativo nativo direto da sua área de trabalho ou tela inicial.',
      installModalIos: 'No Safari do iPhone / iPad: toque em Compartilhar e escolha "Adicionar à Tela de Início".',
      installModalDesktop:
        'No Chrome, Edge ou Android: abra o menu do navegador e clique em "Instalar aplicativo" ou no ícone da barra de endereço.',
      installModalClose: 'Entendi',
      supportDev: 'Apoiar o Desenvolvedor',
      supportDevAria: 'Apoiar o desenvolvedor com um café',
      openMenuAria: 'Abrir menu de navegação',
      closeMenuAria: 'Fechar menu de navegação',
      githubLabel: 'GitHub',
    },
    hero: {
      title: 'Juntar Vídeos Online',
    },
    merger: {
      dropzoneTitle: 'Solte 2 ou mais vídeos aqui para combiná-los',
      dropzoneSubtitle: 'Junção 100% privada no navegador — seus vídeos nunca saem do dispositivo',
      dropzoneDragActive: 'Solte para adicionar os vídeos ao storyboard',
      selectVideosBtn: 'Selecionar Vídeos para Juntar',
      addMoreVideosBtn: '+ Adicionar Mais Vídeos',
      supportedFormatsHint: 'Suporta MP4, MOV, WebM, MKV e AVI • Sem marca d’água',
      needTwoClipsHint: 'Adicione pelo menos mais 1 clipe de vídeo para juntar',
      storyboardHeading: 'Storyboard de Clipes',
      clipsReadyTemplate: '{count} Clipes Prontos',
      totalDurationLabel: 'Duração Total',
      clearAllBtn: 'Limpar Tudo',
      dragToReorderHint: 'Arraste os clipes ou use as setas para reordenar',
      moveLeftAria: 'Mover clipe para a esquerda',
      moveRightAria: 'Mover clipe para a direita',
      removeClipAria: 'Remover clipe',
      aspectRatioLabel: 'Proporção de Saída',
      aspectAuto: 'Auto / Original',
      aspect16x9: '16:9 YouTube Paisagem',
      aspect9x16: '9:16 TikTok e iPhone Vertical',
      aspect1x1: '1:1 Quadrado',
      mergeModeLabel: 'Modo do Motor de Junção',
      modeFastTitle: 'Junção Rápida Instantânea (Sem Recodificar)',
      modeFastDesc: 'Cópia sem perdas em 1 segundo quando os clipes têm mesmo codec e resolução',
      modeSmartTitle: 'Junção Inteligente Compatível (Mistura Resoluções)',
      modeSmartDesc: 'Normaliza MOV do iPhone, MP4 do Android e WebM em um único vídeo contínuo',
      aspectRequiresSmartNote: 'Proporções personalizadas ativam automaticamente a Junção Inteligente Compatível.',
      audioLabel: 'Faixa de Áudio',
      audioKeep: 'Manter Áudio',
      audioMute: 'Silenciar Áudio',
      mergeActionBtnTemplate: 'Juntar {count} Vídeos Agora',
      mergeActionNeedMoreBtn: 'Adicione pelo Menos 2 Vídeos',
      progressTitle: 'Combinando Seus Vídeos',
      statusLoadingEngine: 'Carregando motor de vídeo na RAM do navegador...',
      statusPreparingClips: 'Preparando clipes localmente...',
      statusFastMerging: 'Unindo clipes sem perdas...',
      statusSmartMerging: 'Unindo Clipes e Sincronizando Áudio...',
      statusFallbackSmart: 'Formatos mistos detectados — alternando para Junção Inteligente Compatível...',
      statusFinalizing: 'Finalizando arquivo de vídeo unido...',
      privacyBadge: 'Processamento 100% na RAM Local — Zero Uploads ao Servidor, Sem Marca d’Água',
      cancelMergeBtn: 'Cancelar Junção',
      resultBannerTemplate: '{count} Clipes Combinados • Duração Total: {duration}',
      resultSizeLabel: 'Tamanho Final',
      downloadBtn: 'Baixar Vídeo Combinado',
      mergeMoreBtn: 'Juntar Novos Vídeos',
      editStoryboardBtn: 'Voltar ao Storyboard',
      supportCardTitle: 'Poupou tempo sem uploads e sem marca d’água?',
      supportCardDesc: 'O MergeVideos é gratuito e open source. Um café ajuda a mantê-lo rápido e sem anúncios.',
      supportCardBtn: 'Pagar um Café',
      errorInvalidFiles: 'Alguns arquivos enviados não eram vídeos compatíveis e foram ignorados.',
      errorTooFewClips: 'Adicione pelo menos 2 arquivos de vídeo para combinar.',
      errorMergeFailed: 'Não foi possível juntar no Modo Rápido. Tente a Junção Inteligente Compatível ou menos clipes grandes.',
      errorCancelled: 'A junção de vídeos foi cancelada.',
      errorDismiss: 'Fechar',
      unknownDuration: '--:--',
    },
    belowFold: {
      breadcrumbHome: 'Início',
      breadcrumbTools: 'Ferramentas de Edição de Vídeo',
      breadcrumbCurrent: 'Juntar Vídeos Online',
      howTitle: 'Como Juntar Vídeos Online Grátis em 3 Passos',
      howSteps: [
        {
          title: '1. Solte Seus Clipes',
          description: 'Arraste dois ou mais arquivos MP4, MOV do iPhone ou WebM para a área do MergeVideos ou clique em Selecionar Vídeos.',
        },
        {
          title: '2. Reordene e Escolha a Proporção',
          description: 'Organize a ordem no storyboard e escolha Original, 16:9 YouTube, 9:16 TikTok ou 1:1 Quadrado.',
        },
        {
          title: '3. Junte e Baixe na Hora',
          description: 'Clique em Juntar Vídeos Agora para unir tudo na RAM do navegador e baixar seu MP4 sem marca d’água.',
        },
      ],
      guidesTitle: 'Combine Vídeos Grátis no iPhone, Android e YouTube',
      guides: [
        {
          badge: 'MOV iPhone e iPad',
          title: 'Como Juntar Dois Vídeos no iPhone sem Aplicativo',
          description:
            'Abra o MergeVideos no Safari, selecione 2 ou mais vídeos MOV do rolo da câmera, escolha 9:16 Vertical ou Original e una localmente sem marca d’água.',
        },
        {
          badge: 'Android e Computador',
          title: 'Unir Clipes Mistos MP4, WebM e MKV',
          description:
            'Use a Junção Rápida Instantânea de 1 segundo para clipes iguais ou a Junção Inteligente Compatível para combinar resoluções diferentes.',
        },
        {
          badge: 'YouTube e Reels',
          title: 'Juntar Vídeos para YouTube em 1080p',
          description:
            'Prepare compilações, intros ou Shorts usando 16:9 Paisagem, 9:16 Vertical ou 1:1 Quadrado com ajuste automático sem cortes.',
        },
      ],
      comparisonTitle: 'MergeVideos vs Editores na Nuvem',
      comparisonSubtitle:
        'Veja por que criadores juntam vídeos online com o MergeVideos em vez de enviar arquivos para Clideo, CapCut Web ou Canva.',
      comparisonHeaders: ['Recurso', 'MergeVideos (RAM Local)', 'Editores na Nuvem (Clideo / CapCut / Canva)'],
      comparisonRows: [
        {
          feature: 'Privacidade Total',
          mergeVideos: '100% WebAssembly no navegador — zero uploads',
          competitors: 'Envia seus vídeos pessoais para servidores externos',
        },
        {
          feature: 'Marca d’Água Gratuita',
          mergeVideos: 'Zero marca d’água em todas as exportações',
          competitors: 'Marca d’água fixa sem plano pago',
        },
        {
          feature: 'Tempo de Upload',
          mergeVideos: '0 segundos — leitura direta do dispositivo',
          competitors: 'Espera longa enviando vídeos grandes',
        },
        {
          feature: 'Cadastro Obrigatório',
          mergeVideos: 'Sem login, sem e-mail, sem cota diária',
          competitors: 'Exige conta antes do download',
        },
        {
          feature: 'Cópia Direta em 1s',
          mergeVideos: 'Cópia sem perdas (-c copy) quando compatível',
          competitors: 'Sempre reprocessa no servidor',
        },
      ],
      featuresTitle: 'Por Que Criadores Escolhem o MergeVideos',
      features: [
        {
          title: 'Zero Uploads para Servidores',
          description: 'Movido a FFmpeg WebAssembly na própria aba do navegador. Seus vídeos privados nunca saem do aparelho.',
        },
        {
          title: 'Motor Duplo de Junção',
          description: 'Cópia instantânea sem perdas para clipes iguais e normalização inteligente para misturar iPhone e Android.',
        },
        {
          title: 'Sem Marca d’Água ou Cadastro',
          description: 'Exporte vídeos completos imediatamente, sem contas, cotas diárias ou logotipos.',
        },
        {
          title: 'Proporções para Redes Sociais',
          description: 'Ajuste clipes para 16:9 YouTube, 9:16 TikTok e Reels ou 1:1 Quadrado com barras limpas.',
        },
      ],
      faqTitle: 'Perguntas Frequentes',
      faqs: [
        {
          question: 'Como juntar dois vídeos no iPhone ou Android grátis sem aplicativo?',
          answer:
            'Abra o MergeVideos no Safari ou Chrome, selecione dois ou mais vídeos da galeria, ajuste a ordem e toque em Juntar Vídeos. Tudo roda direto no navegador do celular sem marca d’água.',
        },
        {
          question: 'Por que o MergeVideos é mais rápido e seguro que Clideo ou CapCut Web?',
          answer:
            'Ferramentas tradicionais exigem upload de arquivos pesados para servidores lentos e colocam marca d’água sem assinatura. O MergeVideos processa 100% na RAM local via WebAssembly: zero espera de envio, privacidade absoluta e zero marca d’água.',
        },
        {
          question: 'Posso combinar vídeos com resoluções ou formatos diferentes?',
          answer:
            'Sim! Use a Junção Rápida Instantânea para clipes do mesmo aparelho ou a Junção Inteligente Compatível para unificar MP4, MOV e WebM de tamanhos variados em um vídeo 1080p suave.',
        },
        {
          question: 'Meus vídeos são enviados para algum servidor?',
          answer: 'Não. O FFmpeg em WebAssembly executa exclusivamente na memória do seu navegador.',
        },
        {
          question: 'Existe marca d’água ou limite de uso?',
          answer: 'Nunca. O MergeVideos não adiciona marcas d’água nem limites artificiais.',
        },
        {
          question: 'Quais formatos de vídeo são aceitos?',
          answer: 'Importe MP4, MOV, WebM, MKV e AVI e baixe em MP4 universal (ou WebM na cópia direta de WebM).',
        },
      ],
      footerPrivacy: '100% Local • Zero Uploads • Sem Marca d’Água',
      footerOpenSource: 'GitHub',
      footerSupport: 'Apoiar o Desenvolvedor',
    },
  },

  de: {
    seo: {
      title: 'Videos Zusammenfügen Online — Kostenlos ohne Wasserzeichen',
      description:
        'Videos online kostenlos verbinden ohne Upload und ohne Wasserzeichen. Kombiniere MP4, iPhone MOV & YouTube-Clips lokal im Browser.',
      keywords:
        'videos zusammenfügen online, videos verbinden kostenlos, zwei videos zusammenfügen iphone, videos ohne wasserzeichen verbinden, ' +
        TARGET_KEYWORDS_EN,
      ogImageAlt: 'MergeVideos — Videos Online Zusammenfügen Ohne Upload und Ohne Wasserzeichen',
      appSchemaName: 'MergeVideos Online',
      howToSchemaName: 'Videos Kostenlos Online Ohne Wasserzeichen Zusammenfügen',
    },
    nav: {
      brandName: 'MergeVideos',
      brandAria: 'MergeVideos Startseite',
      languageLabel: 'Sprache',
      languageAria: 'Sprache auswählen',
      themeToDarkAria: 'Zum Dunkelmodus wechseln',
      themeToLightAria: 'Zum Hellmodus wechseln',
      githubAria: 'MergeVideos Quellcode auf GitHub ansehen',
      installPwa: 'Zum Startbildschirm',
      installPwaAria: 'MergeVideos zum Startbildschirm hinzufügen',
      installModalTitle: 'MergeVideos App installieren',
      installModalDesc: 'Nutze MergeVideos wie eine native App direkt vom Desktop oder Startbildschirm.',
      installModalIos: 'In iPhone / iPad Safari: Tippe auf Teilen und wähle „Zum Home-Bildschirm“.',
      installModalDesktop:
        'In Chrome, Edge oder Android: Öffne das Browser-Menü und klicke auf „App installieren“ oder auf das Symbol in der Adressleiste.',
      installModalClose: 'Verstanden',
      supportDev: 'Entwickler unterstützen',
      supportDevAria: 'Entwickler mit einem Kaffee unterstützen',
      openMenuAria: 'Navigationsmenü öffnen',
      closeMenuAria: 'Navigationsmenü schließen',
      githubLabel: 'GitHub',
    },
    hero: {
      title: 'Videos Online Zusammenfügen',
    },
    merger: {
      dropzoneTitle: '2 oder mehr Videos hier ablegen, um sie zu verbinden',
      dropzoneSubtitle: '100% privat im Browser — deine Videos verlassen niemals dein Gerät',
      dropzoneDragActive: 'Loslassen, um Videos zum Storyboard hinzuzufügen',
      selectVideosBtn: 'Videos zum Verbinden auswählen',
      addMoreVideosBtn: '+ Weitere Videos hinzufügen',
      supportedFormatsHint: 'Unterstützt MP4, MOV, WebM, MKV & AVI • Kein Wasserzeichen',
      needTwoClipsHint: 'Füge mindestens 1 weiteren Videoclip zum Zusammenfügen hinzu',
      storyboardHeading: 'Clip-Storyboard',
      clipsReadyTemplate: '{count} Clips bereit',
      totalDurationLabel: 'Gesamtdauer',
      clearAllBtn: 'Alle entfernen',
      dragToReorderHint: 'Clips ziehen oder Pfeile zum Sortieren nutzen',
      moveLeftAria: 'Clip nach links verschieben',
      moveRightAria: 'Clip nach rechts verschieben',
      removeClipAria: 'Clip entfernen',
      aspectRatioLabel: 'Ausgabe-Seitenverhältnis',
      aspectAuto: 'Auto / Original',
      aspect16x9: '16:9 YouTube Querformat',
      aspect9x16: '9:16 TikTok & iPhone Hochformat',
      aspect1x1: '1:1 Quadratisch',
      mergeModeLabel: 'Merge-Engine-Modus',
      modeFastTitle: 'Schnelles Sofort-Merge (Ohne Neukodierung)',
      modeFastDesc: 'Verlustfreie 1-Sekunden-Kopie bei gleichem Codec und gleicher Auflösung',
      modeSmartTitle: 'Smart-Kompatibel-Merge (Beliebige Auflösungen)',
      modeSmartDesc: 'Normalisiert iPhone MOV, Android MP4 & WebM zu einem nahtlosen Video',
      aspectRequiresSmartNote: 'Benutzerdefinierte Seitenverhältnisse nutzen automatisch Smart-Kompatibel-Merge.',
      audioLabel: 'Audiospur',
      audioKeep: 'Audio behalten',
      audioMute: 'Audio stummschalten',
      mergeActionBtnTemplate: '{count} Videos jetzt verbinden',
      mergeActionNeedMoreBtn: 'Mindestens 2 Videos hinzufügen',
      progressTitle: 'Videos werden verbunden',
      statusLoadingEngine: 'Video-Engine wird in den Browser-RAM geladen...',
      statusPreparingClips: 'Videoclips werden lokal vorbereitet...',
      statusFastMerging: 'Clips werden verlustfrei zusammengefügt...',
      statusSmartMerging: 'Clips werden verbunden & Audio synchronisiert...',
      statusFallbackSmart: 'Gemischte Formate erkannt — wechsle zu Smart-Kompatibel-Merge...',
      statusFinalizing: 'Zusammengefügte Videodatei wird finalisiert...',
      privacyBadge: '100% Lokale Browser-RAM-Verarbeitung — Keine Server-Uploads, Kein Wasserzeichen',
      cancelMergeBtn: 'Vorgang abbrechen',
      resultBannerTemplate: '{count} Clips verbunden • Gesamtdauer: {duration}',
      resultSizeLabel: 'Dateigröße',
      downloadBtn: 'Verbundenes Video herunterladen',
      mergeMoreBtn: 'Neue Videos verbinden',
      editStoryboardBtn: 'Zurück zum Storyboard',
      supportCardTitle: 'Zeit gespart ohne Uploads und Wasserzeichen?',
      supportCardDesc: 'MergeVideos ist kostenlos & Open Source. Ein Kaffee hilft, das Tool schnell und werbefrei zu halten.',
      supportCardBtn: 'Kaffee spendieren',
      errorInvalidFiles: 'Einige Dateien waren keine unterstützten Videoformate und wurden übersprungen.',
      errorTooFewClips: 'Bitte füge mindestens 2 Videodateien zum Verbinden hinzu.',
      errorMergeFailed: 'Schnell-Merge war für diese Clips nicht möglich. Nutze Smart-Kompatibel-Merge oder weniger große Clips.',
      errorCancelled: 'Video-Verbindung wurde abgebrochen.',
      errorDismiss: 'Schließen',
      unknownDuration: '--:--',
    },
    belowFold: {
      breadcrumbHome: 'Startseite',
      breadcrumbTools: 'Videobearbeitungs-Tools',
      breadcrumbCurrent: 'Videos Online Zusammenfügen',
      howTitle: 'Videos in 3 einfachen Schritten kostenlos zusammenfügen',
      howSteps: [
        {
          title: '1. Clips ablegen',
          description: 'Ziehe zwei oder mehr MP4-, iPhone MOV- oder WebM-Dateien in das MergeVideos-Feld oder klicke auf Videos auswählen.',
        },
        {
          title: '2. Reihenfolge & Format wählen',
          description: 'Sortiere die Videokarten per Drag-and-Drop und wähle Original, 16:9, 9:16 oder 1:1.',
        },
        {
          title: '3. Verbinden & Herunterladen',
          description: 'Klicke auf Videos jetzt verbinden, um alles lokal im Browser-RAM zu kombinieren und das fertige MP4 sofort zu speichern.',
        },
      ],
      guidesTitle: 'Videos verbinden auf iPhone, Android & YouTube',
      guides: [
        {
          badge: 'iPhone & iPad MOV',
          title: 'Zwei Videos auf dem iPhone ohne App zusammenfügen',
          description:
            'Öffne MergeVideos in Safari, wähle iPhone MOV-Clips aus der Mediathek, nutze 9:16 Hochformat oder Original und verbinde alles ohne Wasserzeichen.',
        },
        {
          badge: 'Android & Desktop',
          title: 'Gemischte MP4-, WebM- & MKV-Clips verbinden',
          description:
            'Nutze das 1-Sekunden-Sofort-Merge für identische Clips oder Smart-Kompatibel-Merge für verschiedene Auflösungen und Bildraten.',
        },
        {
          badge: 'YouTube & Shorts',
          title: 'YouTube-Videos in 1080p nahtlos kombinieren',
          description:
            'Perfekt für Intros, Zusammenschnitte oder Reels: 16:9 Querformat, 9:16 Hochformat oder 1:1 Quadrat mit sauberem Letterboxing.',
        },
      ],
      comparisonTitle: 'MergeVideos vs Cloud-Videoeditoren',
      comparisonSubtitle:
        'Warum Creator Videos lokal mit MergeVideos zusammenfügen statt auf Clideo, CapCut Web oder Canva hochzuladen.',
      comparisonHeaders: ['Funktion', 'MergeVideos (Browser-RAM)', 'Cloud-Editoren (Clideo / CapCut / Canva)'],
      comparisonRows: [
        {
          feature: 'Datenschutz',
          mergeVideos: '100% Client-Side WebAssembly — kein Upload',
          competitors: 'Lädt private Aufnahmen auf fremde Server hoch',
        },
        {
          feature: 'Wasserzeichen (Gratis)',
          mergeVideos: 'Niemals Wasserzeichen auf Exporten',
          competitors: 'Wasserzeichen ohne kostenpflichtiges Abo',
        },
        {
          feature: 'Upload-Wartezeit',
          mergeVideos: '0 Sekunden — sofortiger Start von der Festplatte',
          competitors: 'Langer Upload vor dem eigentlichen Schnitt',
        },
        {
          feature: 'Konto / Anmeldung',
          mergeVideos: 'Kein Login, kein Tageslimit',
          competitors: 'Account-Zwang vor dem Herunterladen',
        },
        {
          feature: '1-Sekunden Stream-Copy',
          mergeVideos: 'Verlustfreie Direktkopie (-c copy)',
          competitors: 'Erzwingt Server-Neukodierung',
        },
      ],
      featuresTitle: 'Warum Creator MergeVideos wählen',
      features: [
        {
          title: 'Keine Server-Uploads',
          description: 'Angetrieben von FFmpeg WebAssembly direkt im Browser-Tab. Private Aufnahmen verlassen nie dein Gerät.',
        },
        {
          title: 'Dual-Mode Merge-Engine',
          description: 'Sofortiger Stream-Copy ohne Neukodierung oder smarte Normalisierung für gemischte iPhone- & Android-Clips.',
        },
        {
          title: 'Ohne Wasserzeichen & Anmeldung',
          description: 'Exportiere komplette Videos direkt ohne Konto, Tageslimit oder eingeblendete Logos.',
        },
        {
          title: 'Social-Media-Formate',
          description: 'Skaliert Clips automatisch in 16:9 YouTube, 9:16 TikTok & Reels oder 1:1 Quadrat mit sauberem Letterboxing.',
        },
      ],
      faqTitle: 'Häufig gestellte Fragen',
      faqs: [
        {
          question: 'Wie füge ich zwei Videos auf iPhone oder Android kostenlos ohne App zusammen?',
          answer:
            'Öffne MergeVideos in Safari oder Chrome, wähle zwei oder mehr Videos aus deiner Galerie, sortiere die Reihenfolge und tippe auf Videos verbinden. Alles läuft direkt im mobilen Browser ohne Wasserzeichen.',
        },
        {
          question: 'Warum ist MergeVideos schneller und sicherer als Clideo oder CapCut Web?',
          answer:
            'Herkömmliche Dienste laden große Dateien auf langsame Cloud-Server und fügen ohne Abo Wasserzeichen ein. MergeVideos arbeitet per WebAssembly zu 100% lokal im Arbeitsspeicher — null Wartezeit, voller Datenschutz, kein Wasserzeichen.',
        },
        {
          question: 'Kann ich Videos mit unterschiedlichen Auflösungen oder Formaten kombinieren?',
          answer:
            'Ja! Wähle Schnelles Sofort-Merge für Clips vom selben Gerät oder Smart-Kompatibel-Merge, um gemischte MP4-, MOV- und WebM-Videos automatisch in ein einheitliches 1080p-Video zu wandeln.',
        },
        {
          question: 'Werden meine Videos auf einen Server hochgeladen?',
          answer: 'Nein. FFmpeg läuft als WebAssembly direkt im Arbeitsspeicher deines Browsers.',
        },
        {
          question: 'Gibt es Wasserzeichen oder Zeitlimits?',
          answer: 'Niemals. MergeVideos setzt keine Wasserzeichen und keine künstlichen Clip-Limits.',
        },
        {
          question: 'Welche Videoformate werden unterstützt?',
          answer: 'Importiere MP4, MOV, WebM, MKV und AVI und speichere als universelles MP4 (bzw. WebM bei WebM-Direktkopie).',
        },
      ],
      footerPrivacy: '100% Lokal • Kein Upload • Kein Wasserzeichen',
      footerOpenSource: 'GitHub',
      footerSupport: 'Entwickler unterstützen',
    },
  },

  fr: {
    seo: {
      title: 'Fusionner Vidéos en Ligne — Gratuit Sans Filigrane',
      description:
        'Fusionnez des vidéos en ligne gratuitement, sans envoi ni filigrane. Combinez MP4, MOV iPhone et clips YouTube dans votre navigateur.',
      keywords:
        'fusionner videos en ligne, assembler deux videos gratuit, coller videos sans filigrane, fusionner videos iphone, ' +
        TARGET_KEYWORDS_EN,
      ogImageAlt: 'MergeVideos — Fusionner des Vidéos en Ligne Gratuitement Sans Filigrane',
      appSchemaName: 'MergeVideos Online',
      howToSchemaName: 'Comment Fusionner des Vidéos en Ligne Gratuitement Sans Filigrane',
    },
    nav: {
      brandName: 'MergeVideos',
      brandAria: 'Accueil MergeVideos',
      languageLabel: 'Langue',
      languageAria: 'Choisir la langue',
      themeToDarkAria: 'Passer au mode sombre',
      themeToLightAria: 'Passer au mode clair',
      githubAria: 'Voir le code source de MergeVideos sur GitHub',
      installPwa: 'Ajouter à l’écran d’accueil',
      installPwaAria: 'Ajouter MergeVideos à l’écran d’accueil',
      installModalTitle: 'Installer l’application MergeVideos',
      installModalDesc: 'Utilisez MergeVideos comme une application native depuis votre bureau ou écran d’accueil.',
      installModalIos: 'Sur Safari iPhone / iPad : touchez Partager puis « Sur l’écran d’accueil ».',
      installModalDesktop:
        'Sur Chrome, Edge ou Android : ouvrez le menu du navigateur et cliquez sur « Installer l’application » ou l’icône dans la barre d’adresse.',
      installModalClose: 'Compris',
      supportDev: 'Soutenir le développeur',
      supportDevAria: 'Soutenir le développeur avec un café',
      openMenuAria: 'Ouvrir le menu de navigation',
      closeMenuAria: 'Fermer le menu de navigation',
      githubLabel: 'GitHub',
    },
    hero: {
      title: 'Fusionner des Vidéos en Ligne',
    },
    merger: {
      dropzoneTitle: 'Déposez 2 vidéos ou plus ici pour les assembler',
      dropzoneSubtitle: 'Fusion 100% privée dans votre navigateur — vos vidéos ne quittent jamais votre appareil',
      dropzoneDragActive: 'Relâchez pour ajouter les vidéos au storyboard',
      selectVideosBtn: 'Sélectionner des Vidéos',
      addMoreVideosBtn: '+ Ajouter d’autres vidéos',
      supportedFormatsHint: 'Compatible MP4, MOV, WebM, MKV & AVI • Sans filigrane',
      needTwoClipsHint: 'Ajoutez au moins 1 autre extrait vidéo pour lancer la fusion',
      storyboardHeading: 'Storyboard des Extraits',
      clipsReadyTemplate: '{count} Extraits Prêts',
      totalDurationLabel: 'Durée Totale',
      clearAllBtn: 'Tout effacer',
      dragToReorderHint: 'Glissez les extraits ou utilisez les flèches pour réorganiser',
      moveLeftAria: 'Déplacer vers la gauche',
      moveRightAria: 'Déplacer vers la droite',
      removeClipAria: 'Supprimer l’extrait',
      aspectRatioLabel: 'Format de Sortie',
      aspectAuto: 'Auto / Original',
      aspect16x9: '16:9 YouTube Paysage',
      aspect9x16: '9:16 TikTok & iPhone Vertical',
      aspect1x1: '1:1 Carré',
      mergeModeLabel: 'Mode du Moteur de Fusion',
      modeFastTitle: 'Fusion Rapide Instantanée (Sans Réencodage)',
      modeFastDesc: 'Copie sans perte en 1 seconde si les extraits partagent codec et résolution',
      modeSmartTitle: 'Fusion Intelligente Compatible (Formats Mixtes)',
      modeSmartDesc: 'Normalise MOV iPhone, MP4 Android et WebM en une seule vidéo fluide',
      aspectRequiresSmartNote: 'Les formats personnalisés utilisent automatiquement la Fusion Intelligente Compatible.',
      audioLabel: 'Piste Audio',
      audioKeep: 'Garder l’audio',
      audioMute: 'Couper le son',
      mergeActionBtnTemplate: 'Fusionner {count} Vidéos',
      mergeActionNeedMoreBtn: 'Ajoutez au moins 2 vidéos',
      progressTitle: 'Assemblage de Vos Vidéos',
      statusLoadingEngine: 'Chargement du moteur vidéo dans la RAM du navigateur...',
      statusPreparingClips: 'Préparation locale des extraits...',
      statusFastMerging: 'Assemblage sans perte en cours...',
      statusSmartMerging: 'Fusion des Extraits et Synchronisation Audio...',
      statusFallbackSmart: 'Formats mixtes détectés — passage en Fusion Intelligente Compatible...',
      statusFinalizing: 'Finalisation du fichier vidéo fusionné...',
      privacyBadge: 'Traitement 100% en RAM Locale — Zéro Envoi Serveur, Sans Filigrane',
      cancelMergeBtn: 'Annuler la fusion',
      resultBannerTemplate: '{count} Extraits Assemblés • Durée Totale : {duration}',
      resultSizeLabel: 'Taille Finale',
      downloadBtn: 'Télécharger la Vidéo Fusionnée',
      mergeMoreBtn: 'Nouvelle Fusion',
      editStoryboardBtn: 'Retour au Storyboard',
      supportCardTitle: 'Gain de temps sans envoi ni filigrane ?',
      supportCardDesc: 'MergeVideos est gratuit et open source. Un café aide à le garder rapide et sans publicité.',
      supportCardBtn: 'Offrir un Café',
      errorInvalidFiles: 'Certains fichiers déposés n’étaient pas des vidéos prises en charge et ont été ignorés.',
      errorTooFewClips: 'Veuillez ajouter au moins 2 fichiers vidéo pour fusionner.',
      errorMergeFailed: 'Impossible de fusionner en Mode Rapide. Essayez la Fusion Intelligente Compatible ou moins de gros fichiers.',
      errorCancelled: 'La fusion vidéo a été annulée.',
      errorDismiss: 'Fermer',
      unknownDuration: '--:--',
    },
    belowFold: {
      breadcrumbHome: 'Accueil',
      breadcrumbTools: 'Outils de Montage Vidéo',
      breadcrumbCurrent: 'Fusionner des Vidéos en Ligne',
      howTitle: 'Comment Fusionner des Vidéos en Ligne en 3 Étapes',
      howSteps: [
        {
          title: '1. Déposez vos extraits',
          description: 'Glissez deux fichiers MP4, MOV iPhone ou WebM dans MergeVideos ou cliquez sur Sélectionner des Vidéos.',
        },
        {
          title: '2. Réorganisez & Choisissez le format',
          description: 'Classez vos cartes sur le storyboard et choisissez Original, 16:9, 9:16 ou 1:1.',
        },
        {
          title: '3. Fusionnez & Téléchargez',
          description: 'Cliquez sur Fusionner pour tout assembler dans la RAM du navigateur et télécharger votre MP4 sans filigrane.',
        },
      ],
      guidesTitle: 'Assemblez Vos Vidéos sur iPhone, Android & YouTube',
      guides: [
        {
          badge: 'MOV iPhone & iPad',
          title: 'Fusionner deux vidéos sur iPhone sans application',
          description:
            'Ouvrez MergeVideos dans Safari, sélectionnez vos clips MOV iPhone, choisissez 9:16 Vertical ou Original et assemblez localement sans filigrane.',
        },
        {
          badge: 'Android & Ordinateur',
          title: 'Combiner MP4 Android, WebM et MKV mixtes',
          description:
            'Utilisez la Fusion Rapide en 1 seconde pour les clips identiques ou la Fusion Intelligente Compatible pour harmoniser des résolutions variées.',
        },
        {
          badge: 'YouTube & Réseaux',
          title: 'Assembler des vidéos YouTube en 1080p',
          description:
            'Créez des compilations, intros ou Shorts au format 16:9 Paysage, 9:16 Vertical ou 1:1 Carré avec mise à l’échelle automatique.',
        },
      ],
      comparisonTitle: 'MergeVideos vs Éditeurs Vidéo Cloud',
      comparisonSubtitle:
        'Pourquoi les créateurs préfèrent fusionner leurs vidéos localement avec MergeVideos plutôt que sur Clideo, CapCut Web ou Canva.',
      comparisonHeaders: ['Critère', 'MergeVideos (RAM Navigateur)', 'Éditeurs Cloud (Clideo / CapCut / Canva)'],
      comparisonRows: [
        {
          feature: 'Confidentialité',
          mergeVideos: '100% WebAssembly local — zéro envoi serveur',
          competitors: 'Envoie vos vidéos privées sur des serveurs tiers',
        },
        {
          feature: 'Filigrane Gratuit',
          mergeVideos: 'Aucun filigrane sur vos exports, à vie',
          competitors: 'Logo imposé sans abonnement mensuel',
        },
        {
          feature: 'Temps d’envoi',
          mergeVideos: '0 seconde — lecture directe depuis l’appareil',
          competitors: 'Attente d’upload avant de pouvoir monter',
        },
        {
          feature: 'Compte requis',
          mergeVideos: 'Sans inscription ni quota quotidien',
          competitors: 'Connexion obligatoire avant téléchargement',
        },
        {
          feature: 'Copie instantanée 1s',
          mergeVideos: 'Copie sans perte (-c copy) pour clips similaires',
          competitors: 'Réencodage serveur systématique',
        },
      ],
      featuresTitle: 'Pourquoi les Créateurs Choisissent MergeVideos',
      features: [
        {
          title: 'Zéro Envoi Serveur',
          description: 'Propulsé par FFmpeg WebAssembly dans votre onglet. Vos vidéos privées restent sur votre appareil.',
        },
        {
          title: 'Double Moteur de Fusion',
          description: 'Copie de flux instantanée sans perte et normalisation intelligente pour mélanger iPhone et Android.',
        },
        {
          title: 'Sans Filigrane ni Inscription',
          description: 'Exportez vos vidéos immédiatement sans compte, quota journalier ni logo ajouté.',
        },
        {
          title: 'Formats Réseaux Sociaux',
          description: 'Adaptez automatiquement vos clips en 16:9 YouTube, 9:16 TikTok & Reels ou 1:1 Carré.',
        },
      ],
      faqTitle: 'Questions Fréquentes',
      faqs: [
        {
          question: 'Comment fusionner deux vidéos sur iPhone ou Android gratuitement sans application ?',
          answer:
            'Ouvrez MergeVideos dans Safari ou Chrome, sélectionnez deux vidéos ou plus dans votre pellicule, organisez l’ordre et touchez Fusionner. Tout se traite dans votre navigateur mobile sans filigrane.',
        },
        {
          question: 'Pourquoi MergeVideos est-il plus rapide et plus sûr que Clideo ou CapCut Web ?',
          answer:
            'Les outils classiques imposent l’envoi de gros fichiers vers des serveurs lents et ajoutent un filigrane sans abonnement. MergeVideos s’exécute 100% localement en RAM via WebAssembly : zéro attente, confidentialité totale, zéro filigrane.',
        },
        {
          question: 'Puis-je combiner des vidéos de résolutions ou de formats différents ?',
          answer:
            'Oui ! Utilisez la Fusion Rapide pour des clips identiques ou choisissez la Fusion Intelligente Compatible pour normaliser et assembler MP4, MOV et WebM en une vidéo 1080p fluide.',
        },
        {
          question: 'Mes vidéos sont-elles envoyées sur un serveur ?',
          answer: 'Non. FFmpeg WebAssembly fonctionne exclusivement dans la mémoire de votre navigateur.',
        },
        {
          question: 'Y a-t-il un filigrane ou une limite de durée ?',
          answer: 'Jamais. MergeVideos n’ajoute aucun filigrane ni limite artificielle.',
        },
        {
          question: 'Quels formats vidéo sont pris en charge ?',
          answer: 'Importez MP4, MOV, WebM, MKV et AVI et téléchargez en MP4 universel (ou WebM en copie directe).',
        },
      ],
      footerPrivacy: '100% Local • Zéro Envoi • Sans Filigrane',
      footerOpenSource: 'GitHub',
      footerSupport: 'Soutenir le développeur',
    },
  },

  ja: {
    seo: {
      title: '動画結合オンライン — 無料で複数動画を連結（透かしなし）',
      description:
        'アップロード不要・透かしなしで動画を無料結合。MP4・iPhone MOV・YouTube動画をブラウザ内だけで安全に1本へまとめます。',
      keywords:
        '動画結合 オンライン, 動画 連結 無料, iPhone 動画 結合, Android 動画 結合, 透かしなし 動画結合, YouTube 動画 つなげる, ' +
        TARGET_KEYWORDS_EN,
      ogImageAlt: 'MergeVideos — アップロード不要・透かしなしの無料オンライン動画結合ツール',
      appSchemaName: 'MergeVideos Online',
      howToSchemaName: '透かしなしで動画を無料オンライン結合する方法',
    },
    nav: {
      brandName: 'MergeVideos',
      brandAria: 'MergeVideos ホーム',
      languageLabel: '言語',
      languageAria: '言語を選択',
      themeToDarkAria: 'ダークモードに切り替え',
      themeToLightAria: 'ライトモードに切り替え',
      githubAria: 'GitHubでMergeVideosのソースコードを見る',
      installPwa: 'ホーム画面に追加',
      installPwaAria: 'MergeVideosをホーム画面に追加',
      installModalTitle: 'MergeVideosアプリをインストール',
      installModalDesc: 'デスクトップやホーム画面からネイティブアプリのようにすぐ起動できます。',
      installModalIos: 'iPhone / iPadのSafariでは：共有ボタンをタップし、「ホーム画面に追加」を選択してください。',
      installModalDesktop:
        'Chrome・Edge・Androidでは：ブラウザメニューから「アプリをインストール」またはアドレスバーのインストールアイコンをクリックします。',
      installModalClose: '閉じる',
      supportDev: '開発者を支援',
      supportDevAria: 'コーヒーで開発者を支援する',
      openMenuAria: 'ナビゲーションメニューを開く',
      closeMenuAria: 'ナビゲーションメニューを閉じる',
      githubLabel: 'GitHub',
    },
    hero: {
      title: 'オンラインで動画を結合',
    },
    merger: {
      dropzoneTitle: '2つ以上の動画をここにドロップして結合',
      dropzoneSubtitle: 'ブラウザ内で100%プライベート処理 — 動画が外部サーバーに送信されることはありません',
      dropzoneDragActive: 'ドロップしてストーリーボードに追加',
      selectVideosBtn: '結合する動画を選択',
      addMoreVideosBtn: '+ 動画を追加',
      supportedFormatsHint: 'MP4・MOV・WebM・MKV・AVI対応 • 透かしなし',
      needTwoClipsHint: '結合するにはあと1本以上動画を追加してください',
      storyboardHeading: 'クリップ ストーリーボード',
      clipsReadyTemplate: '{count}本のクリップ準備完了',
      totalDurationLabel: '合計再生時間',
      clearAllBtn: 'すべてクリア',
      dragToReorderHint: 'ドラッグまたは矢印ボタンで順番を入れ替え',
      moveLeftAria: 'クリップを左へ移動',
      moveRightAria: 'クリップを右へ移動',
      removeClipAria: 'クリップを削除',
      aspectRatioLabel: '出力アスペクト比',
      aspectAuto: '自動 / オリジナル',
      aspect16x9: '16:9 YouTube 横長',
      aspect9x16: '9:16 TikTok・iPhone 縦長',
      aspect1x1: '1:1 正方形',
      mergeModeLabel: '結合エンジンモード',
      modeFastTitle: '高速ダイレクト結合（再エンコードなし）',
      modeFastDesc: 'コーデックと解像度が同じ場合、劣化なしで約1秒で結合',
      modeSmartTitle: 'スマート互換結合（異なる解像度もOK）',
      modeSmartDesc: 'iPhone MOV・Android MP4・WebMを自動で整えて滑らかに結合',
      aspectRequiresSmartNote: 'カスタムアスペクト比を選択するとスマート互換結合が自動適用されます。',
      audioLabel: '音声トラック',
      audioKeep: '音声を残す',
      audioMute: '音声をミュート',
      mergeActionBtnTemplate: '{count}本の動画を今すぐ結合',
      mergeActionNeedMoreBtn: '2本以上の動画を追加してください',
      progressTitle: '動画を結合しています',
      statusLoadingEngine: '動画エンジンをブラウザRAMに読み込み中...',
      statusPreparingClips: 'クリップをローカルで準備中...',
      statusFastMerging: '無劣化でクリップを連結中...',
      statusSmartMerging: 'クリップ結合と音声同期を実行中...',
      statusFallbackSmart: '異なる形式を検出 — スマート互換結合へ自動切替中...',
      statusFinalizing: '結合済み動画ファイルを書き出し中...',
      privacyBadge: '100% ローカルブラウザRAM処理 — サーバーアップロードなし・透かしなし',
      cancelMergeBtn: '結合をキャンセル',
      resultBannerTemplate: '{count}本のクリップを結合完了 • 合計時間: {duration}',
      resultSizeLabel: '出力サイズ',
      downloadBtn: '結合した動画をダウンロード',
      mergeMoreBtn: '別の動画を結合',
      editStoryboardBtn: 'ストーリーボードに戻る',
      supportCardTitle: 'アップロード不要・透かしなしで作業が捗りましたか？',
      supportCardDesc: 'MergeVideosは無料・オープンソースです。コーヒー1杯の支援で広告なしの高速開発を続けられます。',
      supportCardBtn: 'コーヒーを贈る',
      errorInvalidFiles: '対応していないファイルが含まれていたためスキップしました。',
      errorTooFewClips: '結合するには2本以上の動画ファイルを追加してください。',
      errorMergeFailed: '高速モードで結合できませんでした。スマート互換結合を試すか、ファイル数を減らしてください。',
      errorCancelled: '動画の結合をキャンセルしました。',
      errorDismiss: '閉じる',
      unknownDuration: '--:--',
    },
    belowFold: {
      breadcrumbHome: 'ホーム',
      breadcrumbTools: '動画編集ツール',
      breadcrumbCurrent: 'オンラインで動画を結合',
      howTitle: '3ステップで動画を無料・透かしなし結合',
      howSteps: [
        {
          title: '1. 動画をドロップ',
          description: '2本以上のMP4・iPhone MOV・WebMファイルをMergeVideosの枠にドロップ（または選択ボタンをクリック）します。',
        },
        {
          title: '2. 順番とアスペクト比を選択',
          description: '動画カードをドラッグして再生順を並べ替え、オリジナル / 16:9 / 9:16 / 1:1から選びます。',
        },
        {
          title: '3. 結合して即ダウンロード',
          description: '「今すぐ結合」をクリックするとブラウザRAM上で完結し、結合済みMP4をすぐ保存できます。',
        },
      ],
      guidesTitle: 'iPhone・Android・YouTube動画を自在に連結',
      guides: [
        {
          badge: 'iPhone & iPad MOV',
          title: 'アプリなしでiPhoneの2本の動画を結合する方法',
          description:
            'SafariでMergeVideosを開き、カメラロールからiPhone MOV動画を選択。9:16縦長またはオリジナルを選んで透かしなしで結合できます。',
        },
        {
          badge: 'Android & PC',
          title: 'Android MP4・WebM・MKVの混在クリップを結合',
          description:
            '同仕様なら1秒の高速ダイレクト結合、異なる解像度やフレームレートが混在してもスマート互換結合でエラーなく1本に統一します。',
        },
        {
          badge: 'YouTube & SNS',
          title: 'YouTube動画・ショート動画を1080pで結合',
          description:
            'まとめ動画やOP/ED追加に最適。16:9横長・9:16縦長・1:1正方形へ余白を自動調整して美しく出力します。',
        },
      ],
      comparisonTitle: 'MergeVideos とクラウド動画編集ツールの比較',
      comparisonSubtitle:
        'Clideo・CapCut Web・Canvaへアップロードする代わりにMergeVideosが選ばれる理由。',
      comparisonHeaders: ['比較項目', 'MergeVideos（ブラウザRAM処理）', 'クラウド編集（Clideo / CapCut / Canva）'],
      comparisonRows: [
        {
          feature: 'プライバシー保護',
          mergeVideos: '100% クライアント側WebAssembly — サーバー送信ゼロ',
          competitors: 'プライベート動画を外部クラウドへアップロード',
        },
        {
          feature: '無料版ウォーターマーク',
          mergeVideos: '常に透かし（ロゴ）ゼロ',
          competitors: '有料プラン未加入では透かしが入る',
        },
        {
          feature: 'アップロード待ち時間',
          mergeVideos: '0秒 — 端末から即読み込み',
          competitors: '編集前に長い送信待ちが発生',
        },
        {
          feature: 'ログイン・回数制限',
          mergeVideos: '登録不要・メール不要・回数無制限',
          competitors: 'ダウンロード前にアカウント登録が必要',
        },
        {
          feature: '1秒の無劣化コピー',
          mergeVideos: '同形式は再エンコードなしで即連結 (-c copy)',
          competitors: '毎回サーバー側で再エンコード',
        },
      ],
      featuresTitle: 'MergeVideosが選ばれる理由',
      features: [
        {
          title: 'サーバーアップロード一切なし',
          description: 'ブラウザ上で動作するWebAssembly版FFmpegにより、プライベート動画が外部に送信されません。',
        },
        {
          title: 'デュアル結合エンジン',
          description: '同形式は超高速コピー、iPhoneとAndroidの混在クリップはスマート正規化でエラーなく結合します。',
        },
        {
          title: '透かし・会員登録不要',
          description: 'ログインや回数制限、画面端のウォーターマークなしでフルサイズ動画を書き出せます。',
        },
        {
          title: 'SNS向けアスペクト比プリセット',
          description: '16:9 YouTube・9:16 TikTok/リール・1:1正方形へ黒帯付きできれいに自動フィット。',
        },
      ],
      faqTitle: 'よくある質問',
      faqs: [
        {
          question: 'アプリを使わずにiPhoneやAndroidで2本の動画を無料で結合するには？',
          answer:
            'SafariまたはChromeでMergeVideosを開き、カメラロールから2本以上の動画を選んで順番を整え、「動画を結合」をタップするだけです。透かしもアプリインストールも不要でモバイルブラウザ内で完結します。',
        },
        {
          question: 'なぜClideoやCapCut Webより高速で安全なのですか？',
          answer:
            '従来のクラウドツールは重い動画を遅いサーバーへ送信し、有料プランでないと透かしが入ります。MergeVideosはWebAssemblyを使って端末のRAM上で100%ローカル実行するため、送信待ちゼロ・完全プライバシー・透かしゼロを実現しています。',
        },
        {
          question: '解像度や形式が異なる動画も1本に結合できますか？',
          answer:
            'はい。同じ端末の動画は「高速ダイレクト結合」、MP4・MOV・WebMなど異なる解像度や形式が混ざっている場合は「スマート互換結合」を選べば自動で1080p動画に統一して滑らかに結合します。',
        },
        {
          question: '結合時に動画がサーバーへアップロードされますか？',
          answer: 'いいえ。WebAssembly版FFmpegがブラウザメモリ内のみで動作し、端末の外にファイルが出ることはありません。',
        },
        {
          question: 'ウォーターマーク（透かし）や時間制限はありますか？',
          answer: '一切ありません。透かしも人工的なクリップ数制限もゼロです。',
        },
        {
          question: 'どの動画形式に対応していますか？',
          answer: 'MP4・MOV・WebM・MKV・AVIを読み込み、汎用性の高いMP4（WebM直結時はWebM）で出力します。',
        },
      ],
      footerPrivacy: '100% クライアント処理 • アップロードゼロ • 透かしなし',
      footerOpenSource: 'GitHub',
      footerSupport: '開発者を支援',
    },
  },

  zh: {
    seo: {
      title: '在线合并视频 — 免费无水印拼接多个视频（零上传）',
      description:
        '100%免费浏览器本地合并视频，零上传无水印。轻松拼接MP4、iPhone MOV与YouTube高清片段。',
      keywords:
        '在线合并视频, 免费拼接视频, 无水印合并视频, iPhone合并两个视频, 安卓合并视频, YouTube视频合并, ' +
        TARGET_KEYWORDS_EN,
      ogImageAlt: 'MergeVideos — 免费在线视频合并工具，零上传无水印',
      appSchemaName: 'MergeVideos Online',
      howToSchemaName: '如何免费在线无水印合并多个视频',
    },
    nav: {
      brandName: 'MergeVideos',
      brandAria: 'MergeVideos 首页',
      languageLabel: '语言',
      languageAria: '选择语言',
      themeToDarkAria: '切换到深色模式',
      themeToLightAria: '切换到浅色模式',
      githubAria: '在 GitHub 查看 MergeVideos 源码',
      installPwa: '添加到主屏幕',
      installPwaAria: '将 MergeVideos 添加到主屏幕',
      installModalTitle: '安装 MergeVideos 应用',
      installModalDesc: '将 MergeVideos 添加到桌面或主屏幕，像原生应用一样随时快速打开。',
      installModalIos: '在 iPhone / iPad Safari 中：点击“分享”按钮，然后选择“添加到主屏幕”。',
      installModalDesktop:
        '在 Chrome、Edge 或 Android 上：打开浏览器菜单点击“安装应用”，或点击地址栏右侧的安装图标。',
      installModalClose: '知道了',
      supportDev: '支持开发者',
      supportDevAria: '请开发者喝杯咖啡',
      openMenuAria: '打开导航菜单',
      closeMenuAria: '关闭导航菜单',
      githubLabel: 'GitHub',
    },
    hero: {
      title: '在线合并视频',
    },
    merger: {
      dropzoneTitle: '拖放 2 个或更多视频到此处即可合并',
      dropzoneSubtitle: '100% 浏览器本地私密合并 — 视频绝不会离开您的设备',
      dropzoneDragActive: '松开鼠标将视频添加到故事板',
      selectVideosBtn: '选择要合并的视频',
      addMoreVideosBtn: '+ 添加更多视频',
      supportedFormatsHint: '支持 MP4、MOV、WebM、MKV 和 AVI • 无水印',
      needTwoClipsHint: '请再添加至少 1 个视频片段以开始合并',
      storyboardHeading: '片段故事板',
      clipsReadyTemplate: '已就绪 {count} 个片段',
      totalDurationLabel: '总时长',
      clearAllBtn: '清空全部',
      dragToReorderHint: '拖动片段卡片或点击箭头调整顺序',
      moveLeftAria: '向左移动片段',
      moveRightAria: '向右移动片段',
      removeClipAria: '移除片段',
      aspectRatioLabel: '输出画面比例',
      aspectAuto: '自动 / 原始比例',
      aspect16x9: '16:9 YouTube 横屏',
      aspect9x16: '9:16 TikTok 与 iPhone 竖屏',
      aspect1x1: '1:1 正方形',
      mergeModeLabel: '合并引擎模式',
      modeFastTitle: '极速无损直拼（不重新编码）',
      modeFastDesc: '编码与分辨率相同时约 1 秒无损拼接',
      modeSmartTitle: '智能兼容合并（混合任意分辨率）',
      modeSmartDesc: '自动统一 iPhone MOV、Android MP4 与 WebM 格式并流畅拼接',
      aspectRequiresSmartNote: '选择自定义画面比例时将自动启用智能兼容合并。',
      audioLabel: '音频轨道',
      audioKeep: '保留音频',
      audioMute: '静音无声',
      mergeActionBtnTemplate: '立即合并 {count} 个视频',
      mergeActionNeedMoreBtn: '请至少添加 2 个视频',
      progressTitle: '正在合并您的视频',
      statusLoadingEngine: '正在将视频处理引擎加载至浏览器内存...',
      statusPreparingClips: '正在本地准备视频片段...',
      statusFastMerging: '正在无损极速拼接片段...',
      statusSmartMerging: '正在合并片段并同步音频...',
      statusFallbackSmart: '检测到混合视频格式 — 正在自动切换为智能兼容合并...',
      statusFinalizing: '正在生成最终合并视频...',
      privacyBadge: '100% 本地浏览器内存处理 — 零服务器上传，无任何水印',
      cancelMergeBtn: '取消合并',
      resultBannerTemplate: '已合并 {count} 个片段 • 总时长：{duration}',
      resultSizeLabel: '输出大小',
      downloadBtn: '下载合并后的视频',
      mergeMoreBtn: '合并新视频',
      editStoryboardBtn: '返回故事板',
      supportCardTitle: '零上传、无水印帮您省下时间了吗？',
      supportCardDesc: 'MergeVideos 完全免费且开源。一杯咖啡即可支持我们保持无广告与极速体验。',
      supportCardBtn: '请我喝咖啡',
      errorInvalidFiles: '部分拖入文件不是受支持的视频格式，已自动跳过。',
      errorTooFewClips: '请至少添加 2 个视频文件后再进行合并。',
      errorMergeFailed: '极速模式无法直接合并这些片段，请尝试智能兼容合并或减少大视频数量。',
      errorCancelled: '已取消视频合并。',
      errorDismiss: '关闭',
      unknownDuration: '--:--',
    },
    belowFold: {
      breadcrumbHome: '首页',
      breadcrumbTools: '视频编辑工具',
      breadcrumbCurrent: '在线合并视频',
      howTitle: '3 步免费无水印合并多个视频',
      howSteps: [
        {
          title: '1. 拖入视频片段',
          description: '将两个及以上 MP4、iPhone MOV 或 WebM 视频拖入 MergeVideos 工作区（或点击选择视频）。',
        },
        {
          title: '2. 调整顺序并选择比例',
          description: '拖动故事板卡片排列播放顺序，选择原始比例、16:9、9:16 或 1:1 画面尺寸。',
        },
        {
          title: '3. 立即合并并下载',
          description: '点击立即合并视频，100% 在浏览器内存中完成拼接并即时下载无水印 MP4。',
        },
      ],
      guidesTitle: '全面支持 iPhone、安卓与 YouTube 视频合并',
      guides: [
        {
          badge: 'iPhone 与 iPad MOV',
          title: '无需安装 App 如何在 iPhone 上合并两个视频',
          description:
            '在 Safari 中打开 MergeVideos，从相册选择两个及以上 iPhone MOV 视频，选择 9:16 竖屏或原比例，浏览器本地直接无水印拼接。',
        },
        {
          badge: '安卓与桌面端',
          title: '无缝混合安卓 MP4、WebM 与 MKV 片段',
          description:
            '同规格视频支持 1 秒极速直拼；混合分辨率或帧率时启用智能兼容合并，自动统一格式零报错。',
        },
        {
          badge: 'YouTube 与短视频',
          title: '无水印合并 1080p YouTube 与竖屏短视频',
          description:
            '制作片头片尾拼接或合集？一键切换 16:9 横屏、9:16 竖屏或 1:1 正方形，智能补边不裁切画面。',
        },
      ],
      comparisonTitle: 'MergeVideos 与云端视频编辑工具对比',
      comparisonSubtitle:
        '了解为什么创作者选择在本地使用 MergeVideos，而不是上传到 Clideo、CapCut Web 或 Canva。',
      comparisonHeaders: ['对比维度', 'MergeVideos（浏览器内存）', '云端工具（Clideo / CapCut Web / Canva）'],
      comparisonRows: [
        {
          feature: '隐私安全',
          mergeVideos: '100% 本地 WebAssembly 处理 — 零服务器上传',
          competitors: '必须将私密视频上传至第三方云服务器',
        },
        {
          feature: '免费导出水印',
          mergeVideos: '永远无任何角落水印',
          competitors: '免费版强制添加水印，去水印需付费订阅',
        },
        {
          feature: '上传等待时间',
          mergeVideos: '0 秒等待 — 直接从本地硬盘读取',
          competitors: '动辄等待数分钟上传大视频文件',
        },
        {
          feature: '账号与注册',
          mergeVideos: '免登录、无邮箱验证、无次数限制',
          competitors: '导出下载前强制要求登录或付费墙',
        },
        {
          feature: '1 秒极速直拼',
          mergeVideos: '同编码片段直接无损流拷贝 (-c copy)',
          competitors: '每次均需服务器完整重编码',
        },
      ],
      featuresTitle: '创作者选择 MergeVideos 的原因',
      features: [
        {
          title: '零服务器上传',
          description: '由浏览器内运行的 WebAssembly FFmpeg 驱动，私密视频全程不离开您的设备。',
        },
        {
          title: '双模合并引擎',
          description: '同规格视频秒级无损直拼；iPhone 与安卓混合视频自动标准化无缝融合。',
        },
        {
          title: '无水印、免注册',
          description: '无需登录账号，没有每日导出次数限制，也不会添加任何角标水印。',
        },
        {
          title: '热门社交平台比例',
          description: '一键适配 16:9 YouTube、9:16 抖音/TikTok 竖屏或 1:1 正方形并智能补边。',
        },
      ],
      faqTitle: '常见问题',
      faqs: [
        {
          question: '无需下载 App，如何在 iPhone 或安卓手机上免费合并两个视频？',
          answer:
            '在 Safari 或 Chrome 中打开 MergeVideos，从相册选取两个或更多视频，排列顺序后点击“立即合并视频”。全部处理在手机浏览器中本地完成，无水印、免安装。',
        },
        {
          question: '为什么 MergeVideos 比 Clideo 或 CapCut Web 更快、更安全？',
          answer:
            '传统云端工具强迫您上传大体积视频并添加水印（除非按月付费）。MergeVideos 通过 WebAssembly 完全在您设备的内存中本地运行，零上传等待、完全保护隐私且永久无水印。',
        },
        {
          question: '可以合并不同分辨率或不同格式的视频吗？',
          answer:
            '可以！同设备拍摄的片段可用“极速无损直拼”；若混合了不同尺寸或格式的 MP4、MOV 和 WebM，选择“智能兼容合并”即可自动标准化并合成为流畅的 1080p 视频。',
        },
        {
          question: '合并视频时文件会上传到服务器吗？',
          answer: '不会。WebAssembly 版 FFmpeg 仅在您的浏览器内存中运行，文件绝不离开您的设备。',
        },
        {
          question: '会有水印或时长限制吗？',
          answer: '完全没有。MergeVideos 不添加任何水印，也没有人为的数量限制。',
        },
        {
          question: '支持哪些视频格式？',
          answer: '支持导入 MP4、MOV、WebM、MKV 和 AVI，导出为通用 MP4（纯 WebM 直拼输出 WebM）。',
        },
      ],
      footerPrivacy: '100% 本地运行 • 零上传 • 无水印',
      footerOpenSource: 'GitHub',
      footerSupport: '支持开发者',
    },
  },

  ru: {
    seo: {
      title: 'Объединить Видео Онлайн — Бесплатно без Водяных Знаков',
      description:
        'Склейте видео онлайн бесплатно, без загрузки и водяных знаков. Объединяйте MP4, iPhone MOV и ролики YouTube прямо в браузере.',
      keywords:
        'объединить видео онлайн, склеить два видео бесплатно, соединить видео без водяных знаков, объединить видео iphone, объединить видео android, ' +
        TARGET_KEYWORDS_EN,
      ogImageAlt: 'MergeVideos — Объединить Видео Онлайн Бесплатно и Без Водяных Знаков',
      appSchemaName: 'MergeVideos Online',
      howToSchemaName: 'Как Объединить Видео Онлайн Бесплатно Без Водяных Знаков',
    },
    nav: {
      brandName: 'MergeVideos',
      brandAria: 'Главная MergeVideos',
      languageLabel: 'Язык',
      languageAria: 'Выбрать язык',
      themeToDarkAria: 'Переключить на тёмную тему',
      themeToLightAria: 'Переключить на светлую тему',
      githubAria: 'Открыть исходный код MergeVideos на GitHub',
      installPwa: 'На экран «Домой»',
      installPwaAria: 'Добавить MergeVideos на экран «Домой»',
      installModalTitle: 'Установить приложение MergeVideos',
      installModalDesc: 'Запускайте MergeVideos как нативное приложение с рабочего стола или главного экрана.',
      installModalIos: 'В Safari на iPhone / iPad: нажмите «Поделиться» и выберите «На экран „Домой“».',
      installModalDesktop:
        'В Chrome, Edge или Android: откройте меню браузера и нажмите «Установить приложение» или значок в адресной строке.',
      installModalClose: 'Понятно',
      supportDev: 'Поддержать автора',
      supportDevAria: 'Поддержать разработчика чашкой кофе',
      openMenuAria: 'Открыть меню навигации',
      closeMenuAria: 'Закрыть меню навигации',
      githubLabel: 'GitHub',
    },
    hero: {
      title: 'Объединить Видео Онлайн',
    },
    merger: {
      dropzoneTitle: 'Перетащите сюда 2 или более видео для склейки',
      dropzoneSubtitle: '100% приватное объединение в браузере — файлы не покидают ваше устройство',
      dropzoneDragActive: 'Отпустите, чтобы добавить видео на раскадровку',
      selectVideosBtn: 'Выбрать Видео для Склейки',
      addMoreVideosBtn: '+ Добавить Ещё Видео',
      supportedFormatsHint: 'Поддержка MP4, MOV, WebM, MKV и AVI • Без водяных знаков',
      needTwoClipsHint: 'Добавьте ещё хотя бы 1 видеоклип для объединения',
      storyboardHeading: 'Раскадровка Клипов',
      clipsReadyTemplate: 'Готово клипов: {count}',
      totalDurationLabel: 'Общая длительность',
      clearAllBtn: 'Очистить всё',
      dragToReorderHint: 'Перетащите клипы или используйте стрелки для порядка',
      moveLeftAria: 'Переместить клип влево',
      moveRightAria: 'Переместить клип вправо',
      removeClipAria: 'Удалить клип',
      aspectRatioLabel: 'Соотношение сторон',
      aspectAuto: 'Авто / Оригинал',
      aspect16x9: '16:9 YouTube Горизонтальное',
      aspect9x16: '9:16 TikTok и iPhone Вертикальное',
      aspect1x1: '1:1 Квадрат',
      mergeModeLabel: 'Режим движка склейки',
      modeFastTitle: 'Быстрая склейка (Без перекодирования)',
      modeFastDesc: 'Мгновенное копирование без потерь за 1 секунду при совпадении кодеков',
      modeSmartTitle: 'Умная совместимая склейка (Любые разрешения)',
      modeSmartDesc: 'Приводит iPhone MOV, Android MP4 и WebM к единому стандарту без ошибок',
      aspectRequiresSmartNote: 'Выбор соотношения сторон автоматически включает Умную совместимую склейку.',
      audioLabel: 'Звуковая дорожка',
      audioKeep: 'Сохранить звук',
      audioMute: 'Без звука',
      mergeActionBtnTemplate: 'Объединить {count} Видео',
      mergeActionNeedMoreBtn: 'Добавьте минимум 2 видео',
      progressTitle: 'Объединяем ваши видео',
      statusLoadingEngine: 'Загрузка видеодвижка в оперативную память браузера...',
      statusPreparingClips: 'Локальная подготовка видеоклипов...',
      statusFastMerging: 'Склейка клипов без перекодирования...',
      statusSmartMerging: 'Объединение клипов и синхронизация звука...',
      statusFallbackSmart: 'Обнаружены разные форматы — переключаемся на Умную совместимую склейку...',
      statusFinalizing: 'Сохранение итогового видеофайла...',
      privacyBadge: '100% обработка в RAM браузера — без загрузки на сервер и без водяных знаков',
      cancelMergeBtn: 'Отменить склейку',
      resultBannerTemplate: 'Объединено клипов: {count} • Общая длительность: {duration}',
      resultSizeLabel: 'Размер файла',
      downloadBtn: 'Скачать Объединённое Видео',
      mergeMoreBtn: 'Склеить Новые Видео',
      editStoryboardBtn: 'Назад к раскадровке',
      supportCardTitle: 'Сэкономили время без загрузок и водяных знаков?',
      supportCardDesc: 'MergeVideos бесплатен и открыт. Чашка кофе поможет развивать проект без рекламы.',
      supportCardBtn: 'Угостить кофе',
      errorInvalidFiles: 'Некоторые файлы не являются поддерживаемыми видео и были пропущены.',
      errorTooFewClips: 'Пожалуйста, добавьте не менее 2 видеофайлов для склейки.',
      errorMergeFailed: 'Быстрая склейка не удалась для этих файлов. Попробуйте Умную совместимую склейку или меньше крупных клипов.',
      errorCancelled: 'Объединение видео отменено.',
      errorDismiss: 'Закрыть',
      unknownDuration: '--:--',
    },
    belowFold: {
      breadcrumbHome: 'Главная',
      breadcrumbTools: 'Инструменты для видео',
      breadcrumbCurrent: 'Объединить Видео Онлайн',
      howTitle: 'Как объединить видео бесплатно за 3 шага',
      howSteps: [
        {
          title: '1. Добавьте видеоклипы',
          description: 'Перетащите два или более файла MP4, iPhone MOV или WebM в окно MergeVideos (или нажмите «Выбрать Видео»).',
        },
        {
          title: '2. Задайте порядок и формат',
          description: 'Переместите карточки на раскадровке и выберите Оригинал, 16:9, 9:16 или 1:1.',
        },
        {
          title: '3. Склейте и скачайте сразу',
          description: 'Нажмите «Объединить Видео», чтобы соединить клипы локально в памяти браузера и скачать готовый MP4 без знаков.',
        },
      ],
      guidesTitle: 'Склейка видео на iPhone, Android и для YouTube',
      guides: [
        {
          badge: 'MOV с iPhone и iPad',
          title: 'Как соединить два видео на iPhone без приложения',
          description:
            'Откройте MergeVideos в Safari, выберите два или более MOV-клипа из медиатеки, задайте 9:16 или Оригинал и объедините без водяных знаков.',
        },
        {
          badge: 'Android и ПК',
          title: 'Объединяйте смешанные MP4, WebM и MKV',
          description:
            'Используйте Быструю склейку за 1 секунду для одинаковых файлов или Умную совместимую склейку для разных разрешений и FPS.',
        },
        {
          badge: 'YouTube и Shorts',
          title: 'Склейка видео для YouTube в 1080p без знаков',
          description:
            'Готовите нарезку, интро или Shorts? Выбирайте 16:9 Горизонтальное, 9:16 Вертикальное или 1:1 Квадрат с аккуратным масштабированием.',
        },
      ],
      comparisonTitle: 'MergeVideos против облачных видеоредакторов',
      comparisonSubtitle:
        'Почему авторы склеивают видео локально в MergeVideos вместо загрузки в Clideo, CapCut Web или Canva.',
      comparisonHeaders: ['Параметр', 'MergeVideos (RAM браузера)', 'Облачные сервисы (Clideo / CapCut / Canva)'],
      comparisonRows: [
        {
          feature: 'Приватность',
          mergeVideos: '100% локально на WebAssembly — ноль загрузок',
          competitors: 'Отправляет личные видео на сторонние серверы',
        },
        {
          feature: 'Водяной знак бесплатно',
          mergeVideos: 'Без водяных знаков всегда',
          competitors: 'Логотип в углу без платной подписки',
        },
        {
          feature: 'Время ожидания',
          mergeVideos: '0 секунд — старт сразу с диска',
          competitors: 'Долгая загрузка файлов до начала монтажа',
        },
        {
          feature: 'Регистрация',
          mergeVideos: 'Без аккаунта, без почты и лимитов',
          competitors: 'Требует вход перед скачиванием',
        },
        {
          feature: 'Мгновенное копирование',
          mergeVideos: 'Прямая склейка за 1 сек (-c copy)',
          competitors: 'Принудительное перекодирование на сервере',
        },
      ],
      featuresTitle: 'Почему авторы выбирают MergeVideos',
      features: [
        {
          title: 'Ноль загрузок на сервер',
          description: 'Работает на базе FFmpeg WebAssembly прямо во вкладке браузера. Личные записи остаются у вас.',
        },
        {
          title: 'Двойной движок склейки',
          description: 'Мгновенная склейка без потери качества и умная нормализация для смешанных клипов с iPhone и Android.',
        },
        {
          title: 'Без водяных знаков и регистрации',
          description: 'Экспортируйте готовые видео сразу без аккаунтов, дневных лимитов и логотипов в углу.',
        },
        {
          title: 'Форматы для соцсетей',
          description: 'Автоматическая подгонка под 16:9 YouTube, 9:16 TikTok и Reels или 1:1 Квадрат с аккуратными полями.',
        },
      ],
      faqTitle: 'Частые вопросы',
      faqs: [
        {
          question: 'Как бесплатно соединить два видео на iPhone или Android без приложения?',
          answer:
            'Откройте MergeVideos в Safari или Chrome, выберите два или более видео из галереи, расставьте порядок и нажмите «Объединить Видео». Всё работает прямо в мобильном браузере без водяных знаков и установки программ.',
        },
        {
          question: 'Почему MergeVideos быстрее и безопаснее, чем Clideo или CapCut Web?',
          answer:
            'Обычные сервисы требуют загружать тяжёлые файлы на медленные серверы и ставят водяной знак без подписки. MergeVideos работает на 100% локально в оперативной памяти устройства через WebAssembly — без ожидания загрузки, с полной приватностью и без водяных знаков.',
        },
        {
          question: 'Можно ли объединить видео с разным разрешением или форматом?',
          answer:
            'Да! Выберите Быструю склейку для одинаковых роликов или Умную совместимую склейку, чтобы объединить разные MP4, MOV и WebM в единое плавное видео 1080p.',
        },
        {
          question: 'Загружаются ли мои видео на сервер при объединении?',
          answer: 'Нет. FFmpeg WebAssembly работает исключительно в памяти вашего браузера.',
        },
        {
          question: 'Есть ли водяные знаки или ограничения по длительности?',
          answer: 'Никогда. MergeVideos не добавляет водяные знаки и не ставит искусственных ограничений.',
        },
        {
          question: 'Какие форматы видео поддерживаются?',
          answer: 'Импорт MP4, MOV, WebM, MKV и AVI; сохранение в универсальный MP4 (или WebM при прямом копировании).',
        },
      ],
      footerPrivacy: '100% Локально • Без загрузок • Без водяных знаков',
      footerOpenSource: 'GitHub',
      footerSupport: 'Поддержать автора',
    },
  },
};
