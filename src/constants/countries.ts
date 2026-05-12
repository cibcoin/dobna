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


// src/constants/countries.ts
import { getFlagEmoji } from '../utils/flagEmoji';

export interface Country {
    code: string;        // ISO 3166-1 alpha-2 ('IR')
    name: string;        // نام فارسی
    nameEn: string;      // نام انگلیسی
    dialCode: string;    // کد شماره گیری ('98')
    emoji: string;       // ایموجی پرچم ('🇮🇷')
}

// ساخت لیست کشورها با استفاده از تابع flagEmoji
export const COUNTRIES: Country[] = [
    { code: 'IR', name: 'ایران', nameEn: 'Iran', dialCode: '98', emoji: getFlagEmoji('IR') },
    { code: 'AF', name: 'افغانستان', nameEn: 'Afghanistan', dialCode: '93', emoji: getFlagEmoji('AF') },
    { code: 'AE', name: 'امارات متحده عربی', nameEn: 'UAE', dialCode: '971', emoji: getFlagEmoji('AE') },
    { code: 'US', name: 'آمریکا', nameEn: 'United States', dialCode: '1', emoji: getFlagEmoji('US') },
    { code: 'GB', name: 'بریتانیا', nameEn: 'United Kingdom', dialCode: '44', emoji: getFlagEmoji('GB') },
    { code: 'CA', name: 'کانادا', nameEn: 'Canada', dialCode: '1', emoji: getFlagEmoji('CA') },
    { code: 'DE', name: 'آلمان', nameEn: 'Germany', dialCode: '49', emoji: getFlagEmoji('DE') },
    { code: 'FR', name: 'فرانسه', nameEn: 'France', dialCode: '33', emoji: getFlagEmoji('FR') },
    { code: 'IT', name: 'ایتالیا', nameEn: 'Italy', dialCode: '39', emoji: getFlagEmoji('IT') },
    { code: 'ES', name: 'اسپانیا', nameEn: 'Spain', dialCode: '34', emoji: getFlagEmoji('ES') },
    { code: 'TR', name: 'ترکیه', nameEn: 'Turkey', dialCode: '90', emoji: getFlagEmoji('TR') },
    { code: 'RU', name: 'روسیه', nameEn: 'Russia', dialCode: '7', emoji: getFlagEmoji('RU') },
    { code: 'CN', name: 'چین', nameEn: 'China', dialCode: '86', emoji: getFlagEmoji('CN') },
    { code: 'IN', name: 'هند', nameEn: 'India', dialCode: '91', emoji: getFlagEmoji('IN') },
    { code: 'PK', name: 'پاکستان', nameEn: 'Pakistan', dialCode: '92', emoji: getFlagEmoji('PK') },
    { code: 'SA', name: 'عربستان', nameEn: 'Saudi Arabia', dialCode: '966', emoji: getFlagEmoji('SA') },
    { code: 'QA', name: 'قطر', nameEn: 'Qatar', dialCode: '974', emoji: getFlagEmoji('QA') },
    { code: 'KW', name: 'کویت', nameEn: 'Kuwait', dialCode: '965', emoji: getFlagEmoji('KW') },
    { code: 'OM', name: 'عمان', nameEn: 'Oman', dialCode: '968', emoji: getFlagEmoji('OM') },
    { code: 'BH', name: 'بحرین', nameEn: 'Bahrain', dialCode: '973', emoji: getFlagEmoji('BH') },
    { code: 'IQ', name: 'عراق', nameEn: 'Iraq', dialCode: '964', emoji: getFlagEmoji('IQ') },
    { code: 'SY', name: 'سوریه', nameEn: 'Syria', dialCode: '963', emoji: getFlagEmoji('SY') },
    { code: 'JO', name: 'اردن', nameEn: 'Jordan', dialCode: '962', emoji: getFlagEmoji('JO') },
    { code: 'LB', name: 'لبنان', nameEn: 'Lebanon', dialCode: '961', emoji: getFlagEmoji('LB') },
    { code: 'PS', name: 'فلسطین', nameEn: 'Palestine', dialCode: '970', emoji: getFlagEmoji('PS') },
    { code: 'EG', name: 'مصر', nameEn: 'Egypt', dialCode: '20', emoji: getFlagEmoji('EG') },
    { code: 'MA', name: 'مراکش', nameEn: 'Morocco', dialCode: '212', emoji: getFlagEmoji('MA') },
    { code: 'DZ', name: 'الجزایر', nameEn: 'Algeria', dialCode: '213', emoji: getFlagEmoji('DZ') },
    { code: 'TN', name: 'تونس', nameEn: 'Tunisia', dialCode: '216', emoji: getFlagEmoji('TN') },
    { code: 'LY', name: 'لیبی', nameEn: 'Libya', dialCode: '218', emoji: getFlagEmoji('LY') },
    { code: 'SD', name: 'سودان', nameEn: 'Sudan', dialCode: '249', emoji: getFlagEmoji('SD') },
    { code: 'YE', name: 'یمن', nameEn: 'Yemen', dialCode: '967', emoji: getFlagEmoji('YE') },
    { code: 'AU', name: 'استرالیا', nameEn: 'Australia', dialCode: '61', emoji: getFlagEmoji('AU') },
    { code: 'NZ', name: 'نیوزیلند', nameEn: 'New Zealand', dialCode: '64', emoji: getFlagEmoji('NZ') },
    { code: 'JP', name: 'ژاپن', nameEn: 'Japan', dialCode: '81', emoji: getFlagEmoji('JP') },
    { code: 'KR', name: 'کره جنوبی', nameEn: 'South Korea', dialCode: '82', emoji: getFlagEmoji('KR') },
    { code: 'MY', name: 'مالزی', nameEn: 'Malaysia', dialCode: '60', emoji: getFlagEmoji('MY') },
    { code: 'SG', name: 'سنگاپور', nameEn: 'Singapore', dialCode: '65', emoji: getFlagEmoji('SG') },
    { code: 'TH', name: 'تایلند', nameEn: 'Thailand', dialCode: '66', emoji: getFlagEmoji('TH') },
    { code: 'VN', name: 'ویتنام', nameEn: 'Vietnam', dialCode: '84', emoji: getFlagEmoji('VN') },
    { code: 'ID', name: 'اندونزی', nameEn: 'Indonesia', dialCode: '62', emoji: getFlagEmoji('ID') },
    { code: 'PH', name: 'فیلیپین', nameEn: 'Philippines', dialCode: '63', emoji: getFlagEmoji('PH') },
    { code: 'BR', name: 'برزیل', nameEn: 'Brazil', dialCode: '55', emoji: getFlagEmoji('BR') },
    { code: 'MX', name: 'مکزیک', nameEn: 'Mexico', dialCode: '52', emoji: getFlagEmoji('MX') },
    { code: 'ZA', name: 'آفریقای جنوبی', nameEn: 'South Africa', dialCode: '27', emoji: getFlagEmoji('ZA') },
];

// کشور پیش‌فرض (ایران)
export const DEFAULT_COUNTRY = COUNTRIES[0];

// توابع کمکی
export const getCountryByCode = (code: string) => COUNTRIES.find(c => c.code === code);
export const getCountryByDialCode = (dialCode: string) => COUNTRIES.find(c => c.dialCode === dialCode);
export const getCountryByName = (name: string) => COUNTRIES.find(c => c.name === name || c.nameEn === name);