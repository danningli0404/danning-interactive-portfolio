'use client';

import { useEffect } from 'react';
import { localizedHref, type Locale } from '@/lib/i18n';

export function LanguageSwitch({ locale, path }: { locale: Locale; path: string }) {
  useEffect(() => { document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'; }, [locale]);

  return <div className="language-switch" role="group" aria-label={locale === 'zh' ? '切换语言' : 'Language'}>
    {(['en', 'zh'] as const).map(language => <a key={language}
      href={localizedHref(path, language)} lang={language === 'zh' ? 'zh-CN' : 'en'}
      hrefLang={language === 'zh' ? 'zh-CN' : 'en'} aria-current={locale === language ? 'true' : undefined}
      aria-label={language === 'zh' ? '切换到中文' : 'Switch to English'}
      onClick={event => { event.currentTarget.hash = window.location.hash; }}
    >{language === 'zh' ? '中文' : 'EN'}</a>)}
  </div>;
}
