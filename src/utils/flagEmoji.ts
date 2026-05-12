// src/utils/flagEmoji.ts

/**
 * تبدیل کد دوحرفی ISO 3166-1 به ایموجی پرچم
 * مثال: 'IR' -> '🇮🇷'
 * 
 * روش کار: هر کاراکتر الفبا به یک حرف ایموجی تبدیل می‌شود
 * با استفاده از offset 0x1F1E5 که شروع حروف ایموجی پرچم است
 */
export function getFlagEmoji(countryCode: string): string {
    // تبدیل به حروف بزرگ و گرفتن دو حرف اول
    const code = countryCode.toUpperCase().slice(0, 2);
    
    if (code.length !== 2) return '🏳️'; // پرچم سفید پیش‌فرض
    
    // تبدیل هر حرف به عدد و جمع با offset ایموجی پرچم‌ها
    const offset = 0x1F1E5; // '🇦' = 127462
    const firstChar = code.charCodeAt(0) - 65 + offset; // 'A' -> 0 + offset
    const secondChar = code.charCodeAt(1) - 65 + offset;
    
    return String.fromCodePoint(firstChar, secondChar);
}

/**
 * گرفتن ایموجی بر اساس نام کشور (برای جستجو)
 */
export function getFlagEmojiByName(countryName: string, countriesList: any[]): string {
    const country = countriesList.find(
        c => c.name === countryName || c.nameEn === countryName
    );
    return country?.emoji || getFlagEmoji(country?.code || '') || '🏳️';
}