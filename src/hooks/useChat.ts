// src/hooks/useChat.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { getLastMessages, sendMessage, ChatMessage } from '../services/chatService';

interface UseChatOptions {
    roomId: string;
    userId: string;
    onNewMessage?: (message: ChatMessage) => void;
}

export function useChat({ roomId, userId, onNewMessage }: UseChatOptions) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const subscriptionRef = useRef<any>(null);
    
    // بارگذاری پیام‌های اولیه
    const loadMessages = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        const msgs = await getLastMessages(roomId);
        setMessages(msgs);
        setIsLoading(false);
    }, [roomId]);
    
    // ارسال پیام جدید
    const sendNewMessage = useCallback(async (text: string) => {
        if (text.length === 0 || text.length > 150) {
            setError('پیام باید بین ۱ تا ۱۵۰ کاراکتر باشد');
            return false;
        }
        
        setIsSending(true);
        setError(null);
        
        try {
            const newMessage = await sendMessage(roomId, userId, text);
            if (newMessage) {
                // پیام به صورت خودکار از طریق Realtime اضافه می‌شود
                return true;
            }
            return false;
        } catch (err: any) {
            setError(err.message || 'خطا در ارسال پیام');
            return false;
        } finally {
            setIsSending(false);
        }
    }, [roomId, userId]);
    
    // راه‌اندازی Realtime subscription
    useEffect(() => {
        if (!roomId) return;
        
        // بارگذاری پیام‌های اولیه
        loadMessages();
        
        // اشتراک‌گذاری برای پیام‌های جدید
        const subscription = supabase
            .channel(`room-chat:${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'room_chat_messages',
                    filter: `room_id=eq.${roomId}`
                },
                async (payload) => {
                    // دریافت اطلاعات کامل پیام جدید
                    const { data: newMsg } = await supabase
                        .from('room_chat_messages')
                        .select(`
                            id,
                            room_id,
                            user_id,
                            message,
                            created_at,
                            profiles!inner (
                                username,
                                avatar_url
                            )
                        `)
                        .eq('id', payload.new.id)
                        .single();
                    
                    if (newMsg) {
                        const formattedMessage: ChatMessage = {
                            id: newMsg.id,
                            room_id: newMsg.room_id,
                            user_id: newMsg.user_id,
                            username: newMsg.profiles.username,
                            avatar_url: newMsg.profiles.avatar_url,
                            message: newMsg.message,
                            created_at: newMsg.created_at
                        };
                        
                        setMessages(prev => [...prev, formattedMessage]);
                        onNewMessage?.(formattedMessage);
                    }
                }
            )
            .subscribe();
        
        subscriptionRef.current = subscription;
        
        return () => {
            if (subscriptionRef.current) {
                supabase.removeChannel(subscriptionRef.current);
            }
        };
    }, [roomId, loadMessages, onNewMessage]);
    
    return {
        messages,
        isLoading,
        isSending,
        error,
        sendMessage: sendNewMessage,
        reloadMessages: loadMessages
    };
}