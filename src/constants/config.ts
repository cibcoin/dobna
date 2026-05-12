// src/constants/config.ts

export const APP_CONFIG = {
  name: 'دوبنا',
  nameEn: 'DOBNA',
  domain: 'https://dobna.ir',
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.dobna.ir',
  supportEmail: 'support@dobna.ir',
  supportPhone: '+98',
  version: '1.0.0',
};

export const SOCIAL_LINKS = {
  website: 'https://dobna.ir',
  instagram: 'https://instagram.com/dobna',
  telegram: 'https://t.me/dobna',
  support: 'https://t.me/dobna_support',
};

export const TRANSFER_LIMITS = {
  minAmount: 10000,      // حداقل 10,000 تومان
  maxAmount: 1000000,    // حداکثر 1,000,000 تومان
  dailyLimit: 10000000,  // سقف روزانه 10,000,000 تومان
};

export const GAME_CONFIG = {
  cardsPerRoom: 30,
  maxCardsPerPlayer: 3,
  countdownSeconds: 150,
  numberAnnounceInterval: 2500, // 2.5 ثانیه
};