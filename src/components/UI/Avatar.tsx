// src/components/UI/Avatar.tsx
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { DEFAULT_AVATAR, DEFAULT_AVATARS, getAvatarById } from '../../constants/avatars';

interface AvatarProps {
    userId?: string;
    avatarUrl?: string | null;
    avatarId?: number;  // برای آواتارهای پیش‌فرض
    size?: number;
    onPress?: () => void;
    style?: ViewStyle;
    isEditable?: boolean;
}

export default function Avatar({
    userId,
    avatarUrl,
    avatarId,
    size = 50,
    onPress,
    style,
    isEditable = false,
}: AvatarProps) {
    // تعیین منبع تصویر
    const getImageSource = () => {
        // اولویت ۱: آدرس URL (آواتار آپلودی کاربر)
        if (avatarUrl) {
            return { uri: avatarUrl };
        }
        
        // اولویت ۲: آواتار پیش‌فرض بر اساس ID
        if (avatarId) {
            const avatar = getAvatarById(avatarId);
            if (avatar) return avatar.image;
        }
        
        // اولویت ۳: آواتار پیش‌فرض کلی
        return DEFAULT_AVATAR;
    };
    
    const AvatarImage = (
        <Image
            source={getImageSource()}
            style={[
                styles.avatar,
                { width: size, height: size, borderRadius: size / 2 },
                style,
            ]}
            defaultSource={DEFAULT_AVATAR}
        />
    );
    
    if (onPress || isEditable) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                {AvatarImage}
                {isEditable && (
                    <View style={[styles.editBadge, { right: size * 0.05, bottom: size * 0.05 }]}>
                        <Image
                            source={require('../../../assets/icons/ui/edit-icon.png')}
                            style={styles.editIcon}
                        />
                    </View>
                )}
            </TouchableOpacity>
        );
    }
    
    return AvatarImage;
}

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: '#2d3748',
        borderWidth: 2,
        borderColor: '#eab308',
    },
    editBadge: {
        position: 'absolute',
        backgroundColor: '#eab308',
        borderRadius: 12,
        padding: 4,
    },
    editIcon: {
        width: 12,
        height: 12,
        tintColor: '#1a1a2e',
    },
});