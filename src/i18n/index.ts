import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// وارد کردن فایل‌های ترجمه
import faCommon from './locales/fa/common.json';
import faGame from './locales/fa/game.json';
import faRoom from './locales/fa/room.json';
import faTransaction from './locales/fa/transaction.json';
import faErrors from './locales/fa/errors.json';

import enCommon from './locales/en/common.json';
import enGame from './locales/en/game.json';
import enRoom from './locales/en/room.json';
import enTransaction from './locales/en/transaction.json';
import enErrors from './locales/en/errors.json';

// تعریف نوع برای ترجمه‌ها
export type TranslationKeys = {
  common: typeof faCommon;
  game: typeof faGame;
  room: typeof faRoom;
  transaction: typeof faTransaction;
  errors: typeof faErrors;
};

// ترکیب همه ترجمه‌ها برای هر زبان
const translations = {
  fa: {
    common: faCommon,
    game: faGame,
    room: faRoom,
    transaction: faTransaction,
    errors: faErrors,
  },
  en: {
    common: enCommon,
    game: enGame,
    room: enRoom,
    transaction: enTransaction,
    errors: enErrors,
  },
};

// ایجاد نمونه i18n
const i18n = new I18n(translations);

// تنظیم زبان پیش‌فرض
i18n.defaultLocale = 'fa';
i18n.locale = 'fa';
i18n.enableFallback = true;

// کلید ذخیره زبان در storage
const STORAGE_KEY = 'app_language';

/**
 * دریافت زبان ذخیره شده و تنظیم آن
 */
export async function loadSavedLanguage(): Promise<string> {
  try {
    const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);
    if (savedLanguage === 'fa' || savedLanguage === 'en') {
      i18n.locale = savedLanguage;
      return savedLanguage;
    }
  } catch (error) {
    console.error('Error loading language:', error);
  }
  return i18n.locale;
}

/**
 * تغییر زبان برنامه
 */
export async function setLanguage(language: 'fa' | 'en'): Promise<void> {
  i18n.locale = language;
  await AsyncStorage.setItem(STORAGE_KEY, language);
  
  // تغییر جهت صفحه برای فارسی (راست‌چین)
  if (language === 'fa') {
    // برای وب
    if (typeof document !== 'undefined') {
      document.body.dir = 'rtl';
    }
  } else {
    if (typeof document !== 'undefined') {
      document.body.dir = 'ltr';
    }
  }
}

/**
 * تابع ترجمه با پشتیبانی از namespace
 */
export function t(
  key: string,
  params?: Record<string, string | number>,
  namespace: keyof TranslationKeys = 'common'
): string {
  const fullKey = `${namespace}.${key}`;
  let translation = i18n.t(fullKey);
  
  // جایگزینی پارامترها
  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      translation = translation.replace(`{{${paramKey}}}`, String(paramValue));
    });
  }
  
  return translation;
}

/**
 * هوک استفاده از ترجمه (برای استفاده در کامپوننت‌ها)
 */
export function useTranslation() {
  return {
    t,
    locale: i18n.locale,
    setLanguage,
    isRTL: i18n.locale === 'fa',
  };
}

export { i18n };