// src/lib/adminAuth.ts
import { supabase } from './supabase';

// لیست ایمیل‌های مجاز مدیران
export const ADMIN_EMAILS = [
    'admin@dobna.ir',
    'support@dobna.ir',
    'your-email@gmail.com', // ایمیل خودتان
];

// لیست شماره‌های مجاز مدیران
export const ADMIN_PHONES = [
    '+989123456789', // شماره خودتان
];

/**
 * بررسی آیا کاربر فعلی مدیر است
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    // بررسی ایمیل
    if (user.email && ADMIN_EMAILS.includes(user.email)) {
        return true;
    }
    
    // بررسی شماره تلفن
    if (user.phone && ADMIN_PHONES.includes(user.phone)) {
        return true;
    }
    
    // بررسی در دیتابیس
    const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
    
    return data?.is_admin === true;
}

/**
 * دریافت نقش کاربر
 */
export async function getUserRole(): Promise<'admin' | 'user' | null> {
    const isAdmin = await isCurrentUserAdmin();
    if (isAdmin) return 'admin';
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user) return 'user';
    
    return null;
}