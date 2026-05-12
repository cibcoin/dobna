// src/services/chatService.ts
import { supabase } from '../lib/supabase';

export interface ChatMessage {
    id: number;
    room_id: string;
    user_id: string;
    username: string;
    avatar_url?: string;
    message: string;
    created_at: string;
}

/**
 * دریافت ۵۰ پیام آخر یک اتاق
 */
export async function getLastMessages(roomId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
        .rpc('get_last_50_messages', { p_room_id: roomId });
    
    if (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
    
    // مرتب کردن به ترتیب صعودی (قدیمی به جدید)
    return (data || []).reverse();
}

/**
 * ارسال پیام جدید به اتاق
 * @param roomId - شناسه اتاق
 * @param userId - شناسه کاربر
 * @param message - متن پیام (حداکثر ۱۵۰ کاراکتر)
 */
export async function sendMessage(
    roomId: string,
    userId: string,
    message: string
): Promise<ChatMessage | null> {
    // اعتبارسنجی طول پیام
    if (message.length === 0) {
        throw new Error('پیام نمی‌تواند خالی باشد');
    }
    
    if (message.length > 150) {
        throw new Error('پیام نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد');
    }
    
    // دریافت اطلاعات کاربر
    const { data: profile } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', userId)
        .single();
    
    // درج پیام
    const { data, error } = await supabase
        .from('room_chat_messages')
        .insert({
            room_id: roomId,
            user_id: userId,
            message: message.trim()
        })
        .select()
        .single();
    
    if (error) {
        console.error('Error sending message:', error);
        throw new Error('خطا در ارسال پیام');
    }
    
    return {
        ...data,
        username: profile?.username || 'کاربر',
        avatar_url: profile?.avatar_url
    };
}

/**
 * حذف پیام (فقط برای مدیران)
 */
export async function deleteMessage(messageId: number, userId: string, isAdmin: boolean = false): Promise<boolean> {
    if (!isAdmin) {
        throw new Error('شما دسترسی حذف پیام را ندارید');
    }
    
    const { error } = await supabase
        .from('room_chat_messages')
        .delete()
        .eq('id', messageId);
    
    if (error) {
        console.error('Error deleting message:', error);
        return false;
    }
    
    return true;
}