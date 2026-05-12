// src/app/(drawer)/account.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Switch,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';
import Avatar from '../../components/UI/Avatar';
import { supabase } from '../../lib/supabase';

export default function AccountScreen() {
    const { user, updateUser } = useAuthStore();
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [fullName, setFullName] = useState(user?.full_name || '');
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isEditing, setIsEditing] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const handleSave = async () => {
        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: fullName,
                username: username,
                email: email,
            })
            .eq('id', user?.id);
        
        if (error) {
            Alert.alert('خطا', 'مشکلی در ذخیره اطلاعات پیش آمد');
        } else {
            updateUser({ full_name: fullName, username, email });
            setIsEditing(false);
            Alert.alert('موفق', 'اطلاعات با موفقیت ذخیره شد');
        }
    };

    return (
        <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            
            {/* هدر */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingTop: 50,
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: currentColors.border,
            }}>
                <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
                    <Text style={{ color: currentColors.text, fontSize: 24 }}>←</Text>
                </TouchableOpacity>
                <Text style={{ color: currentColors.text, fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>
                    حساب کاربری
                </Text>
                {isEditing ? (
                    <TouchableOpacity onPress={handleSave} style={{ padding: 8 }}>
                        <Text style={{ color: currentColors.primary, fontSize: 16, fontWeight: 'bold' }}>ذخیره</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setIsEditing(true)} style={{ padding: 8 }}>
                        <Text style={{ color: currentColors.primary, fontSize: 16 }}>✏️</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {/* آواتار */}
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <Avatar avatarUrl={user?.avatar_url} size={100} />
                    <TouchableOpacity style={{ marginTop: 8 }}>
                        <Text style={{ color: currentColors.primary }}>تغییر آواتار</Text>
                    </TouchableOpacity>
                </View>

                {/* فرم اطلاعات */}
                <View style={{ gap: 16 }}>
                    <View>
                        <Text style={{ color: currentColors.textSecondary, marginBottom: 4 }}>نام کامل</Text>
                        {isEditing ? (
                            <TextInput
                                style={{
                                    backgroundColor: currentColors.surfaceLight,
                                    borderRadius: 12,
                                    padding: 12,
                                    color: currentColors.text,
                                }}
                                value={fullName}
                                onChangeText={setFullName}
                                placeholder="نام خود را وارد کنید"
                                placeholderTextColor={currentColors.textMuted}
                            />
                        ) : (
                            <Text style={{ color: currentColors.text, fontSize: 16 }}>{fullName || 'نام ثبت نشده'}</Text>
                        )}
                    </View>

                    <View>
                        <Text style={{ color: currentColors.textSecondary, marginBottom: 4 }}>نام کاربری</Text>
                        {isEditing ? (
                            <TextInput
                                style={{
                                    backgroundColor: currentColors.surfaceLight,
                                    borderRadius: 12,
                                    padding: 12,
                                    color: currentColors.text,
                                }}
                                value={username}
                                onChangeText={setUsername}
                                placeholder="@username"
                                placeholderTextColor={currentColors.textMuted}
                                autoCapitalize="none"
                            />
                        ) : (
                            <Text style={{ color: currentColors.text, fontSize: 16 }}>@{username || 'username'}</Text>
                        )}
                    </View>

                    <View>
                        <Text style={{ color: currentColors.textSecondary, marginBottom: 4 }}>شماره موبایل</Text>
                        <Text style={{ color: currentColors.text, fontSize: 16 }}>{user?.phone || '+989********'}</Text>
                    </View>

                    <View>
                        <Text style={{ color: currentColors.textSecondary, marginBottom: 4 }}>ایمیل</Text>
                        {isEditing ? (
                            <TextInput
                                style={{
                                    backgroundColor: currentColors.surfaceLight,
                                    borderRadius: 12,
                                    padding: 12,
                                    color: currentColors.text,
                                }}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="ایمیل خود را وارد کنید"
                                placeholderTextColor={currentColors.textMuted}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        ) : (
                            <Text style={{ color: currentColors.text, fontSize: 16 }}>{email || 'ثبت نشده'}</Text>
                        )}
                    </View>
                </View>

                {/* تنظیمات اعلان‌ها */}
                <View style={{ marginTop: 32 }}>
                    <Text style={{ color: currentColors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
                        تنظیمات
                    </Text>
                    
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: currentColors.border,
                    }}>
                        <Text style={{ color: currentColors.text }}>اعلان‌ها</Text>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: currentColors.textMuted, true: currentColors.primary }}
                        />
                    </View>
                    
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 12,
                    }}>
                        <Text style={{ color: currentColors.text }}>صدای بازی</Text>
                        <Switch
                            value={soundEnabled}
                            onValueChange={setSoundEnabled}
                            trackColor={{ false: currentColors.textMuted, true: currentColors.primary }}
                        />
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}