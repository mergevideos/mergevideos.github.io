import { defaultLocale, localeMeta, locales, ui, type Locale, type UIMessages } from './ui';

export function isValidLocale(value: string | undefined): value is Locale {
  return Boolean(value && (locales as readonly string[]).includes(value));
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, firstSegment] = url.pathname.split('/');
  if (isValidLocale(firstSegment)) {
    return firstSegment;
  }
  return defaultLocale;
}

export function getLocalizedPath(locale: Locale, suffixPath = '/'): string {
  const cleanSuffix = suffixPath.startsWith('/') ? suffixPath : `/${suffixPath}`;
  if (locale === defaultLocale) {
    return cleanSuffix;
  }
  return cleanSuffix === '/' ? `/${locale}/` : `/${locale}${cleanSuffix}`;
}

export function useTranslations(locale: Locale): UIMessages {
  return ui[locale] ?? ui[defaultLocale];
}

export function getAlternateLinks(siteOrigin: string, suffixPath = '/') {
  const origin = siteOrigin.replace(/\/$/, '');
  return locales.map((loc) => ({
    locale: loc,
    hreflang: localeMeta[loc].htmlLang,
    href: `${origin}${getLocalizedPath(loc, suffixPath)}`,
  }));
}
