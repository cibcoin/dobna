// src/styles/fonts.ts
import * as Font from 'expo-font';

// تعریف خانواده فونت‌ها
export const FontFamily = {
  // فارسی - وزیر متن
  PersianRegular: 'Vazirmatn-Regular',
  PersianBold: 'Vazirmatn-Bold',
  PersianExtraBold: 'Vazirmatn-ExtraBold',
  
  // انگلیسی - Cairo
  EnglishRegular: 'Cairo-Regular',
  EnglishBold: 'Cairo-Bold',
  
  // اعداد - Orbitron
  NumberRegular: 'Orbitron-Regular',
  NumberBold: 'Orbitron-Bold',
};

// نقشه فونت بر اساس نوع متن
export const getFontFamily = (
  isRTL: boolean = true,
  isBold: boolean = false,
  isNumber: boolean = false
): string => {
  if (isNumber) {
    return isBold ? FontFamily.NumberBold : FontFamily.NumberRegular;
  }
  
  if (isRTL) {
    return isBold ? FontFamily.PersianBold : FontFamily.PersianRegular;
  }
  
  return isBold ? FontFamily.EnglishBold : FontFamily.EnglishRegular;
};

// بارگذاری فونت‌ها
export async function loadFonts(): Promise<void> {
  await Font.loadAsync({
    [FontFamily.PersianRegular]: require('../../assets/fonts/Vazirmatn-Regular.ttf'),
    [FontFamily.PersianBold]: require('../../assets/fonts/Vazirmatn-Bold.ttf'),
    [FontFamily.PersianExtraBold]: require('../../assets/fonts/Vazirmatn-ExtraBold.ttf'),
    [FontFamily.EnglishRegular]: require('../../assets/fonts/Cairo-Regular.ttf'),
    [FontFamily.EnglishBold]: require('../../assets/fonts/Cairo-Bold.ttf'),
    [FontFamily.NumberRegular]: require('../../assets/fonts/Orbitron-Regular.ttf'),
    [FontFamily.NumberBold]: require('../../assets/fonts/Orbitron-Bold.ttf'),
  });
}

// استایل‌های پیش‌فرض با فونت
export const typography = {
  // متن فارسی معمولی
  textPersian: {
    fontFamily: FontFamily.PersianRegular,
    fontSize: 14,
    includeFontPadding: false,
  },
  textPersianBold: {
    fontFamily: FontFamily.PersianBold,
    fontSize: 14,
    includeFontPadding: false,
  },
  
  // متن انگلیسی
  textEnglish: {
    fontFamily: FontFamily.EnglishRegular,
    fontSize: 14,
  },
  textEnglishBold: {
    fontFamily: FontFamily.EnglishBold,
    fontSize: 14,
  },
  
  // اعداد (مبلغ‌ها، زمان، شماره کارت)
  textNumber: {
    fontFamily: FontFamily.NumberRegular,
    fontSize: 16,
    letterSpacing: 1,
  },
  textNumberBold: {
    fontFamily: FontFamily.NumberBold,
    fontSize: 18,
    letterSpacing: 1,
  },
  
  // هدرهای بزرگ
  h1: {
    fontFamily: FontFamily.PersianExtraBold,
    fontSize: 24,
  },
  h2: {
    fontFamily: FontFamily.PersianBold,
    fontSize: 20,
  },
  h3: {
    fontFamily: FontFamily.PersianBold,
    fontSize: 18,
  },
};