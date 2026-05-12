// src/constants/countries.ts
export interface Country {
    code: string;
    name: string;
    nameEn: string;
    dialCode: string;
    flag: string;
    emoji: string;
}

export const COUNTRIES: Country[] = [
    { code: 'IR', name: 'ایران', nameEn: 'Iran', dialCode: '98', flag: '🇮🇷', emoji: '🇮🇷' },
    { code: 'AF', name: 'افغانستان', nameEn: 'Afghanistan', dialCode: '93', flag: '🇦🇫', emoji: '🇦🇫' },
    { code: 'AE', name: 'امارات متحده عربی', nameEn: 'United Arab Emirates', dialCode: '971', flag: '🇦🇪', emoji: '🇦🇪' },
    { code: 'US', name: 'آمریکا', nameEn: 'United States', dialCode: '1', flag: '🇺🇸', emoji: '🇺🇸' },
    { code: 'GB', name: 'بریتانیا', nameEn: 'United Kingdom', dialCode: '44', flag: '🇬🇧', emoji: '🇬🇧' },
    { code: 'CA', name: 'کانادا', nameEn: 'Canada', dialCode: '1', flag: '🇨🇦', emoji: '🇨🇦' },
    { code: 'DE', name: 'آلمان', nameEn: 'Germany', dialCode: '49', flag: '🇩🇪', emoji: '🇩🇪' },
    { code: 'FR', name: 'فرانسه', nameEn: 'France', dialCode: '33', flag: '🇫🇷', emoji: '🇫🇷' },
    { code: 'IT', name: 'ایتالیا', nameEn: 'Italy', dialCode: '39', flag: '🇮🇹', emoji: '🇮🇹' },
    { code: 'ES', name: 'اسپانیا', nameEn: 'Spain', dialCode: '34', flag: '🇪🇸', emoji: '🇪🇸' },
    { code: 'TR', name: 'ترکیه', nameEn: 'Turkey', dialCode: '90', flag: '🇹🇷', emoji: '🇹🇷' },
    { code: 'RU', name: 'روسیه', nameEn: 'Russia', dialCode: '7', flag: '🇷🇺', emoji: '🇷🇺' },
    { code: 'CN', name: 'چین', nameEn: 'China', dialCode: '86', flag: '🇨🇳', emoji: '🇨🇳' },
    { code: 'IN', name: 'هند', nameEn: 'India', dialCode: '91', flag: '🇮🇳', emoji: '🇮🇳' },
    { code: 'PK', name: 'پاکستان', nameEn: 'Pakistan', dialCode: '92', flag: '🇵🇰', emoji: '🇵🇰' },
    { code: 'SA', name: 'عربستان سعودی', nameEn: 'Saudi Arabia', dialCode: '966', flag: '🇸🇦', emoji: '🇸🇦' },
    { code: 'QA', name: 'قطر', nameEn: 'Qatar', dialCode: '974', flag: '🇶🇦', emoji: '🇶🇦' },
    { code: 'KW', name: 'کویت', nameEn: 'Kuwait', dialCode: '965', flag: '🇰🇼', emoji: '🇰🇼' },
    { code: 'OM', name: 'عمان', nameEn: 'Oman', dialCode: '968', flag: '🇴🇲', emoji: '🇴🇲' },
    { code: 'BH', name: 'بحرین', nameEn: 'Bahrain', dialCode: '973', flag: '🇧🇭', emoji: '🇧🇭' },
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // ایران

export const getCountryByDialCode = (dialCode: string): Country | undefined => {
    return COUNTRIES.find(c => c.dialCode === dialCode);
};

export const getCountryByCode = (code: string): Country | undefined => {
    return COUNTRIES.find(c => c.code === code);
};