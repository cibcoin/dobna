// src/services/profileService.ts
import { supabase } from '../lib/supabase';
import { decode } from 'base64-arraybuffer';

/**
 * آپلود آواتار توسط کاربر
 * @param userId - شناسه کاربر
 * @param base64Image - تصویر به صورت base64
 * @returns آدرس آواتار آپلود شده
 */
export async function uploadAvatar(userId: string, base64Image: string): Promise<string | null> {
    try {
        // تبدیل base64 به blob
        const base64Data = base64Image.split(',')[1];
        const filePath = `${userId}/${Date.now()}.png`;
        
        // آپلود به Supabase Storage
        const { data, error } = await supabase.storage
            .from('avatars')
            .upload(filePath, decode(base64Data), {
                contentType: 'image/png',
                upsert: true,
            });
        
        if (error) throw error;
        
        // دریافت URL عمومی
        const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);
        
        // بروزرسانی پروفایل کاربر
        await supabase
            .from('profiles')
            .update({ avatar_url: urlData.publicUrl })
            .eq('id', userId);
        
        return urlData.publicUrl;
    } catch (error) {
        console.error('Error uploading avatar:', error);
        return null;
    }
}

/**
 * حذف آواتار کاربر (بازگشت به آواتار پیش‌فرض)
 */
export async function removeAvatar(userId: string): Promise<boolean> {
    try {
        // حذف فایل از storage
        const { error: listError } = await supabase.storage
            .from('avatars')
            .remove([`${userId}`]);
        
        if (listError) console.error('Error removing avatar:', listError);
        
        // بروزرسانی پروفایل به آواتار پیش‌فرض
        await supabase
            .from('profiles')
            .update({ avatar_url: null })
            .eq('id', userId);
        
        return true;
    } catch (error) {
        console.error('Error removing avatar:', error);
        return false;
    }
}