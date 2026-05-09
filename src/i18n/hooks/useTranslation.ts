import { useCallback } from 'react';
import { useLanguageStore } from '../../stores/languageStore';
import { t as translate, setLanguage as setLang } from '../index';

export function useTranslation() {
  const { locale, setLocale } = useLanguageStore();
  
  const t = useCallback((
    key: string,
    params?: Record<string, string | number>,
    namespace: 'common' | 'game' | 'room' | 'transaction' | 'errors' = 'common'
  ): string => {
    return translate(key, params, namespace);
  }, [locale]);
  
  const setLanguage = useCallback(async (language: 'fa' | 'en') => {
    await setLang(language);
    setLocale(language);
  }, []);
  
  return {
    t,
    locale,
    setLanguage,
    isRTL: locale === 'fa',
  };
}