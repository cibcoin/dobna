// src/app/(drawer)/transfer.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';

export default function TransferScreen() {
    const { user, balance } = useAuthStore();
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [username, setUsername] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipient, setRecipient] = useState<{ name: string; id: string } | null>(null);

    const handleSearchUser = async () => {
        if (username.length < 3) {
            Alert.alert('خطا', 'حداقل ۳ کاراکتر وارد کنید');
            return;
        }
        
        setLoading(true);
        // شبیه‌سازی جستجو
        setTimeout(() => {
            if (username === 'reza' || username === '@reza') {
                setRecipient({ name: 'رضا علیپور', id: 'user123' });
            } else {
                Alert.alert('خطا', 'کاربر یافت نشد');
                setRecipient(null);
            }
            setLoading(false);
        }, 1000);
    };

    const handleTransfer = async () => {
        const amountNum = parseInt(amount);
        
        if (!recipient) {
            Alert.alert('خطا', 'کاربر گیرنده را انتخاب کنید');
            return;
        }
        
        if (isNaN(amountNum) || amountNum < 10000) {
            Alert.alert('خطا', 'حداقل مبلغ انتقال ۱۰,۰۰۰ تومان است');
            return;
        }
        
        if (amountNum > 1000000) {
            Alert.alert('خطا', 'حداکثر مبلغ انتقال ۱,۰۰۰,۰۰۰ تومان است');
            return;
        }
        
        if (amountNum > (balance || 0)) {
            Alert.alert('خطا', 'موجودی کافی نیست');
            return;
        }
        
        setLoading(true);
        
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'انتقال موفق',
                `مبلغ ${amountNum.toLocaleString()} تومان با موفقیت به ${recipient.name} انتقال یافت`,
                [{ text: 'باشه', onPress: () => {
                    setUsername('');
                    setAmount('');
                    setDescription('');
                    setRecipient(null);
                    router.back();
                }}]
            );
        }, 1500);
    };

    return (
        <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            
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
                    انتقال اعتبار
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {/* موجودی فعلی */}
                <View style={{
                    backgroundColor: currentColors.surfaceLight,
                    borderRadius: 16,
                    padding: 16,
                    alignItems: 'center',
                    marginBottom: 24,
                }}>
                    <Text style={{ color: currentColors.textSecondary, marginBottom: 4 }}>موجودی قابل انتقال</Text>
                    <Text style={{ color: currentColors.primary, fontSize: 28, fontWeight: 'bold' }}>
                        {balance?.toLocaleString()} تومان
                    </Text>
                </View>

                {/* جستجوی کاربر */}
                <Text style={{ color: currentColors.textSecondary, marginBottom: 8 }}>نام کاربری گیرنده</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
                    <TextInput
                        style={{
                            flex: 1,
                            backgroundColor: currentColors.surfaceLight,
                            borderRadius: 12,
                            padding: 14,
                            color: currentColors.text,
                        }}
                        placeholder="@username"
                        placeholderTextColor={currentColors.textMuted}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        onPress={handleSearchUser}
                        disabled={loading}
                        style={{
                            backgroundColor: currentColors.primary,
                            paddingHorizontal: 20,
                            borderRadius: 12,
                            justifyContent: 'center',
                        }}
                    >
                        {loading ? <ActivityIndicator size="small" color="white" /> : <Text style={{ color: 'white' }}>جستجو</Text>}
                    </TouchableOpacity>
                </View>

                {/* نمایش کاربر پیدا شده */}
                {recipient && (
                    <View style={{
                        backgroundColor: currentColors.surfaceLight,
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 24,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <View>
                            <Text style={{ color: currentColors.text, fontWeight: 'bold' }}>{recipient.name}</Text>
                            <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>کاربر تأیید شده</Text>
                        </View>
                        <Text style={{ fontSize: 24 }}>✓</Text>
                    </View>
                )}

                {/* مبلغ انتقال */}
                <Text style={{ color: currentColors.textSecondary, marginBottom: 8 }}>مبلغ (تومان)</Text>
                <TextInput
                    style={{
                        backgroundColor: currentColors.surfaceLight,
                        borderRadius: 12,
                        padding: 14,
                        color: currentColors.text,
                        fontSize: 16,
                        marginBottom: 16,
                    }}
                    placeholder="مبلغ را وارد کنید (۱۰,۰۰۰ تا ۱,۰۰۰,۰۰۰)"
                    placeholderTextColor={currentColors.textMuted}
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />

                {/* توضیحات */}
                <Text style={{ color: currentColors.textSecondary, marginBottom: 8 }}>توضیحات (اختیاری)</Text>
                <TextInput
                    style={{
                        backgroundColor: currentColors.surfaceLight,
                        borderRadius: 12,
                        padding: 14,
                        color: currentColors.text,
                        height: 80,
                        textAlignVertical: 'top',
                        marginBottom: 24,
                    }}
                    placeholder="توضیحات خود را وارد کنید"
                    placeholderTextColor={currentColors.textMuted}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                />

                {/* دکمه انتقال */}
                <TouchableOpacity
                    onPress={handleTransfer}
                    disabled={loading || !recipient || !amount}
                    style={{
                        backgroundColor: (recipient && amount) ? currentColors.primary : currentColors.textMuted,
                        paddingVertical: 16,
                        borderRadius: 12,
                        alignItems: 'center',
                    }}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>انتقال اعتبار</Text>
                    )}
                </TouchableOpacity>

                {/* محدودیت‌ها */}
                <View style={{ marginTop: 24, padding: 16, backgroundColor: currentColors.surfaceLight, borderRadius: 12 }}>
                    <Text style={{ color: currentColors.primary, fontWeight: 'bold', marginBottom: 8 }}>محدودیت‌های انتقال</Text>
                    <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>• حداقل مبلغ: ۱۰,۰۰۰ تومان</Text>
                    <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>• حداکثر مبلغ: ۱,۰۰۰,۰۰۰ تومان</Text>
                    <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>• سقف روزانه: ۱۰,۰۰۰,۰۰۰ تومان</Text>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
// اضافه کردن بخش نمایش شماره حساب خود کاربر

import AccountCard from '../../components/profile/AccountCard';

// در صفحه انتقال اعتبار، در بالا:
<ScrollView>
    {/* نمایش حساب خود کاربر */}
    <AccountCard />
    
    {/* بقیه محتوای صفحه انتقال */}
</ScrollView>