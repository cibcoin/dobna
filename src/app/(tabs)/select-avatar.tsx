// src/app/(tabs)/select-avatar.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Avatar from '../../components/UI/Avatar';
import { DEFAULT_AVATARS } from '../../constants/avatars';
import { uploadAvatar } from '../../services/profileService';
import { useAuthStore } from '../../stores/authStore';

export default function SelectAvatarScreen() {
    const { user } = useAuthStore();
    const [selectedAvatarId, setSelectedAvatarId] = useState<number>(1);
    const [isUploading, setIsUploading] = useState(false);
    
    const pickImage = async () => {
        // درخواست دسترسی
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('خطا', 'برای انتخاب تصویر به دسترسی نیاز داریم');
            return;
        }
        
        // انتخاب تصویر
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true,
        });
        
        if (!result.canceled && result.assets[0].base64) {
            setIsUploading(true);
            const avatarUrl = await uploadAvatar(user?.id || '', result.assets[0].base64);
            setIsUploading(false);
            
            if (avatarUrl) {
                Alert.alert('موفق', 'آواتار شما با موفقیت تغییر کرد');
            } else {
                Alert.alert('خطا', 'مشکلی در آپلود آواتار پیش آمده');
            }
        }
    };
    
    const renderAvatarItem = ({ item }: { item: typeof DEFAULT_AVATARS[0] }) => (
        <TouchableOpacity
            onPress={() => setSelectedAvatarId(item.id)}
            className={`m-2 p-2 rounded-xl ${
                selectedAvatarId === item.id ? 'bg-yellow-600/20 border border-yellow-600' : 'bg-gray-800'
            }`}
        >
            <Avatar avatarId={item.id} size={80} />
            <Text className="text-white text-center mt-2 text-xs">
                {item.name}
            </Text>
            {item.isVip && (
                <View className="absolute top-1 right-1 bg-yellow-600 rounded-full px-1">
                    <Text className="text-black text-[8px] font-bold">VIP</Text>
                </View>
            )}
        </TouchableOpacity>
    );
    
    return (
        <View className="flex-1 bg-gray-900 p-4">
            <Text className="text-white text-2xl font-bold text-center mb-6">
                انتخاب آواتار
            </Text>
            
            {/* آواتار فعلی */}
            <View className="items-center mb-8">
                <Avatar
                    avatarId={selectedAvatarId}
                    size={120}
                    isEditable
                    onPress={pickImage}
                />
                <Text className="text-gray-400 text-sm mt-2">
                    برای تغییر تصویر کلیک کنید
                </Text>
            </View>
            
            {/* لیست آواتارهای پیش‌فرض */}
            <Text className="text-white text-lg font-bold mb-4">
                آواتارهای پیش‌فرض
            </Text>
            
            <FlatList
                data={DEFAULT_AVATARS}
                renderItem={renderAvatarItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
            
            {isUploading && (
                <View className="absolute inset-0 bg-black/50 justify-center items-center">
                    <ActivityIndicator size="large" color="#eab308" />
                    <Text className="text-white mt-4">در حال آپلود آواتار...</Text>
                </View>
            )}
        </View>
    );
}