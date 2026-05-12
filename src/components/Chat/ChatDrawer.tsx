// src/components/Chat/ChatDrawer.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import { useChat } from '../../hooks/useChat';
import { useAuthStore } from '../../stores/authStore';

const { width, height } = Dimensions.get('window');

interface ChatDrawerProps {
    visible: boolean;
    roomId: string;
    onClose: () => void;
}

export default function ChatDrawer({ visible, roomId, onClose }: ChatDrawerProps) {
    const { user } = useAuthStore();
    const [messageText, setMessageText] = useState('');
    const flatListRef = useRef<FlatList>(null);
    
    // انیمیشن کشویی
    const translateX = useRef(new Animated.Value(width)).current;
    
    const {
        messages,
        isLoading,
        isSending,
        error,
        sendMessage
    } = useChat({
        roomId,
        userId: user?.id || '',
        onNewMessage: () => {
            // اسکرول به پایین برای پیام جدید
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    });
    
    // کنترل انیمیشن باز و بسته شدن
    useEffect(() => {
        if (visible) {
            Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
                speed: 20,
                bounciness: 8
            }).start();
        } else {
            Animated.spring(translateX, {
                toValue: width,
                useNativeDriver: true,
                speed: 20,
                bounciness: 8
            }).start();
        }
    }, [visible]);
    
    const handleSendMessage = async () => {
        if (messageText.trim().length === 0) {
            Alert.alert('خطا', 'لطفاً متن پیام را وارد کنید');
            return;
        }
        
        if (messageText.length > 150) {
            Alert.alert('خطا', 'پیام نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد');
            return;
        }
        
        const success = await sendMessage(messageText);
        if (success) {
            setMessageText('');
        }
    };
    
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fa-IR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    
    const renderMessage = ({ item }: { item: any }) => {
        const isMyMessage = item.user_id === user?.id;
        
        return (
            <View className={`flex-row mb-3 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                <View className={`max-w-[80%] ${isMyMessage ? 'items-end' : 'items-start'}`}>
                    {!isMyMessage && (
                        <Text className="text-gray-400 text-xs mb-1 mr-2">
                            {item.username}
                        </Text>
                    )}
                    <View className={`rounded-xl p-3 ${isMyMessage ? 'bg-yellow-600' : 'bg-gray-700'}`}>
                        <Text className="text-white text-base">
                            {item.message}
                        </Text>
                    </View>
                    <Text className="text-gray-500 text-xs mt-1 mx-2">
                        {formatTime(item.created_at)}
                    </Text>
                </View>
            </View>
        );
    };
    
    return (
        <Animated.View 
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: width,
                height: height,
                backgroundColor: '#1a1a2e',
                transform: [{ translateX }],
                zIndex: 1000,
                elevation: 10
            }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                {/* هدر */}
                <View className="bg-gray-800 p-4 flex-row justify-between items-center border-b border-gray-700">
                    <Text className="text-white text-lg font-bold">
                        💬 چت گروهی
                    </Text>
                    <TouchableOpacity onPress={onClose} className="p-2">
                        <Text className="text-gray-400 text-xl">✕</Text>
                    </TouchableOpacity>
                </View>
                
                {/* تعداد پیام‌ها */}
                <View className="bg-gray-900 px-4 py-2 border-b border-gray-800">
                    <Text className="text-gray-500 text-xs">
                        {messages.length} پیام اخیر
                    </Text>
                </View>
                
                {/* لیست پیام‌ها */}
                {isLoading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#eab308" />
                        <Text className="text-gray-400 mt-2">در حال بارگذاری پیام‌ها...</Text>
                    </View>
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderMessage}
                        contentContainerStyle={{ padding: 16 }}
                        onContentSizeChange={() => {
                            flatListRef.current?.scrollToEnd({ animated: false });
                        }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View className="flex-1 justify-center items-center py-20">
                                <Text className="text-gray-500 text-center">
                                    هنوز پیامی ارسال نشده است
                                </Text>
                                <Text className="text-gray-600 text-center text-sm mt-2">
                                    اولین پیام را شما بفرستید!
                                </Text>
                            </View>
                        }
                    />
                )}
                
                {/* خطا */}
                {error && (
                    <View className="bg-red-900/50 mx-4 mb-2 p-2 rounded-lg">
                        <Text className="text-red-400 text-center text-sm">
                            {error}
                        </Text>
                    </View>
                )}
                
                {/* ورودی پیام */}
                <View className="bg-gray-800 p-3 flex-row items-center border-t border-gray-700">
                    <TextInput
                        className="flex-1 bg-gray-700 rounded-full px-4 py-3 text-white mr-2"
                        placeholder="پیام خود را بنویسید... (حداکثر ۱۵۰ کاراکتر)"
                        placeholderTextColor="#666"
                        value={messageText}
                        onChangeText={setMessageText}
                        multiline
                        maxLength={150}
                        editable={!isSending}
                    />
                    <TouchableOpacity
                        onPress={handleSendMessage}
                        disabled={isSending || !messageText.trim()}
                        className={`w-12 h-12 rounded-full justify-center items-center ${
                            messageText.trim() ? 'bg-yellow-600' : 'bg-gray-600'
                        }`}
                    >
                        {isSending ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text className="text-white text-xl">➤</Text>
                        )}
                    </TouchableOpacity>
                </View>
                
                {/* نشانگر تعداد کاراکتر */}
                <View className="bg-gray-800 px-4 pb-2">
                    <Text className={`text-right text-xs ${messageText.length > 140 ? 'text-red-400' : 'text-gray-500'}`}>
                        {messageText.length}/150
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </Animated.View>
    );
}