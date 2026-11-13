import type { APIRoute } from 'astro';
import { localeMeta, locales } from '../i18n/ui';
import { getLocalizedPath } from '../i18n/utils';

export const prerender = true;

const SITE_ORIGIN = 'https://mergevideos.github.io';

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];

  const alternateLinksXml = [
    ...locales.map((loc) => {
      const href = `${SITE_ORIGIN}${getLocalizedPath(loc, '/')}`;
      return `    <xhtml:link rel="alternate" hreflang="${localeMeta[loc].htmlLang}" href="${href}" />`;
    }),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/" />`,
  ].join('\n');

  const urlsXml = locales
    .map((loc) => {
      const pageUrl = `${SITE_ORIGIN}${getLocalizedPath(loc, '/')}`;
      return `  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${alternateLinksXml}
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsXml}
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
