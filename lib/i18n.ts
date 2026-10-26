export type Locale = 'en' | 'zh';
export type SearchParams = Record<string, string | string[] | undefined>;

export function getLocale(params: SearchParams = {}): Locale {
  return params.lang === 'en' ? 'en' : 'zh';
}

export function localizedHref(path: string, locale: Locale) {
  const [pathname, hash] = path.split('#');
  const base = process.env.NEXT_PUBLIC_PAGES_BASE_PATH ?? '';
  return `${base}${locale === 'en' ? '/en' : ''}${pathname || '/'}${hash ? `#${hash}` : ''}`;
}

