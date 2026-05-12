// src/components/chat/GlobalChatDrawer.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { useUIStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { colors } from '../../constants/colors';
import { supabase } from '../../lib/supabase';

const { width, height } = Dimensions.get('window');

interface ChatMessage {
    id: string;
    user_id: string;
    username: string;
    avatar_url?: string;
    message: string;
    created_at: string;
}

interface GlobalChatDrawerProps {
    visible: boolean;
    onClose: () => void;
    onMessageRead?: () => void;
}

export default function GlobalChatDrawer({ 
    visible, 
    onClose, 
    onMessageRead 
}: GlobalChatDrawerProps) {
    const { theme } = useUIStore();
    const { user } = useAuthStore();
    const currentColors = colors[theme];
    
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messageText, setMessageText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    
    // انیمیشن کشویی
    const translateX = useRef(new Animated.Value(width)).current;

    // بارگذاری ۳۰ پیام آخر
    const loadMessages = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('global_chat_messages')
            .select(`
                id,
                user_id,
                message,
                created_at,
                profiles (username, avatar_url)
            `)
            .order('created_at', { ascending: false })
            .limit(30);
        
        if (data) {
            const formattedMessages = data.map(msg => ({
                id: msg.id,
                user_id: msg.user_id,
                username: msg.profiles.username,
                avatar_url: msg.profiles.avatar_url,
                message: msg.message,
                created_at: msg.created_at,
            })).reverse(); // مرتب کردن از قدیم به جدید
            
            setMessages(formattedMessages);
        }
        setIsLoading(false);
    };

    // ارسال پیام
    const sendMessage = async () => {
        if (!messageText.trim() || messageText.length > 150) return;
        
        setIsSending(true);
        const { error } = await supabase
            .from('global_chat_messages')
            .insert({
                user_id: user?.id,
                message: messageText.trim(),
            });
        
        if (!error) {
            setMessageText('');
            await loadMessages();
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        }
        setIsSending(false);
    };

    // Realtime برای پیام‌های جدید
    useEffect(() => {
        if (visible) {
            loadMessages();
            
            const subscription = supabase
                .channel('global-chat')
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'global_chat_messages',
                }, () => {
                    loadMessages();
                    onMessageRead?.();
                })
                .subscribe();
            
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [visible]);

    // کنترل انیمیشن
    useEffect(() => {
        if (visible) {
            Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
                speed: 20,
                bounciness: 8,
            }).start();
        } else {
            Animated.spring(translateX, {
                toValue: width,
                useNativeDriver: true,
                speed: 20,
                bounciness: 8,
            }).start();
        }
    }, [visible]);

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    };

    const renderMessage = ({ item }: { item: ChatMessage }) => {
        const isMyMessage = item.user_id === user?.id;
        
        return (
            <View style={{ marginBottom: 12, alignItems: isMyMessage ? 'flex-end' : 'flex-start' }}>
                {!isMyMessage && (
                    <Text style={{ color: currentColors.textSecondary, fontSize: 10, marginBottom: 2, marginRight: 8 }}>
                        {item.username}
                    </Text>
                )}
                <View style={{
                    backgroundColor: isMyMessage ? currentColors.primary : currentColors.surfaceLight,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 20,
                    maxWidth: '80%',
                }}>
                    <Text style={{ color: currentColors.text, fontSize: 14 }}>
                        {item.message}
                    </Text>
                </View>
                <Text style={{ color: currentColors.textMuted, fontSize: 9, marginTop: 2, marginHorizontal: 8 }}>
                    {formatTime(item.created_at)}
                </Text>
            </View>
        );
    };

    return (
        <Animated.View style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: width,
            height: height,
            backgroundColor: currentColors.background,
            transform: [{ translateX }],
            zIndex: 2000,
        }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                {/* هدر */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: currentColors.border,
                    backgroundColor: currentColors.surface,
                }}>
                    <Text style={{ color: currentColors.text, fontSize: 18, fontWeight: 'bold' }}>
                        💬 چت عمومی
                    </Text>
                    <TouchableOpacity onPress={onClose} style={{ padding: 8 }}>
                        <Text style={{ color: currentColors.textMuted, fontSize: 20 }}>✕</Text>
                    </TouchableOpacity>
                </View>

                {/* لیست پیام‌ها */}
                {isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={currentColors.primary} />
                    </View>
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ padding: 16 }}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
                        showsVerticalScrollIndicator={false}
                    />
                )}

                {/* ورودی پیام */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 12,
                    borderTopWidth: 1,
                    borderTopColor: currentColors.border,
                    backgroundColor: currentColors.surface,
                }}>
                    <TextInput
                        style={{
                            flex: 1,
                            backgroundColor: currentColors.surfaceLight,
                            borderRadius: 25,
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            color: currentColors.text,
                            fontSize: 14,
                            marginRight: 10,
                        }}
                        placeholder="پیام خود را بنویسید... (حداکثر ۱۵۰ کاراکتر)"
                        placeholderTextColor={currentColors.textMuted}
                        value={messageText}
                        onChangeText={setMessageText}
                        maxLength={150}
                        multiline
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        disabled={!messageText.trim() || isSending}
                        style={{
                            backgroundColor: messageText.trim() ? currentColors.primary : currentColors.textMuted,
                            width: 44,
                            height: 44,
                            borderRadius: 22,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {isSending ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={{ fontSize: 20 }}>➤</Text>
                        )}
                    </TouchableOpacity>
                </View>
                <Text style={{
                    color: currentColors.textMuted,
                    fontSize: 10,
                    textAlign: 'right',
                    paddingHorizontal: 16,
                    paddingBottom: 8,
                }}>
                    {messageText.length}/150
                </Text>
            </KeyboardAvoidingView>
        </Animated.View>
    );
}