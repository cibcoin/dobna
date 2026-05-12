// src/constants/avatars.ts

export interface Avatar {
    id: number;
    name: string;
    nameEn: string;
    image: any; // require image
    isDefault?: boolean;
    isVip?: boolean;
}

// آواتارهای پیش‌فرض سیستم
export const DEFAULT_AVATARS: Avatar[] = [
    {
        id: 1,
        name: 'آواتار پیش‌فرض',
        nameEn: 'Default Avatar',
        image: require('../../assets/images/avatars/default-avatar.png'),
        isDefault: true,
    },
    {
        id: 2,
        name: 'آواتار حرفه‌ای',
        nameEn: 'Pro Avatar',
        image: require('../../assets/images/avatars/avatar-1.png'),
    },
    {
        id: 3,
        name: 'آواتار کلاسیک',
        nameEn: 'Classic Avatar',
        image: require('../../assets/images/avatars/avatar-2.png'),
    },
    {
        id: 4,
        name: 'آواتار مدرن',
        nameEn: 'Modern Avatar',
        image: require('../../assets/images/avatars/avatar-3.png'),
    },
    {
        id: 5,
        name: 'آواتار خاص',
        nameEn: 'Special Avatar',
        image: require('../../assets/images/avatars/avatar-4.png'),
    },
    {
        id: 6,
        name: 'آواتار طلایی',
        nameEn: 'Golden Avatar',
        image: require('../../assets/images/avatars/avatar-5.png'),
        isVip: true,
    },
    {
        id: 7,
        name: 'آواتار برنده',
        nameEn: 'Winner Avatar',
        image: require('../../assets/images/avatars/avatar-winner.png'),
        isVip: true,
    },
    {
        id: 8,
        name: 'آواتار VIP',
        nameEn: 'VIP Avatar',
        image: require('../../assets/images/avatars/avatar-vip.png'),
        isVip: true,
    },
];

// آواتار پیش‌فرض (برای زمانی که کاربر آواتاری انتخاب نکرده)
export const DEFAULT_AVATAR = DEFAULT_AVATARS[0].image;

// گرفتن آواتار بر اساس ID
export function getAvatarById(id: number): Avatar | undefined {
    return DEFAULT_AVATARS.find(avatar => avatar.id === id);
}

// گرفتن آواتار تصادفی (برای کاربران جدید)
export function getRandomAvatar(): Avatar {
    const nonVipAvatars = DEFAULT_AVATARS.filter(a => !a.isVip);
    const randomIndex = Math.floor(Math.random() * nonVipAvatars.length);
    return nonVipAvatars[randomIndex];
}