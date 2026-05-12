// src/app/(auth)/phone-login.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import CountryPicker from '../../components/auth/CountryPicker';
import { DEFAULT_COUNTRY, Country } from '../../constants/countries';
import { sendOTP } from '../../lib/auth';
import { useTranslation } from '../../i18n/hooks/useTranslation';

export default function PhoneLoginScreen() {
    const { t, isRTL } = useTranslation();
    const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const isValidPhone = phoneNumber.length >= 10 && phoneNumber.length <= 15;
    const isFormValid = isValidPhone;

    const handleSendOTP = async () => {
        if (!isFormValid) return;

        setLoading(true);
        const fullPhoneNumber = `+${country.dialCode}${phoneNumber}`;
        
        const result = await sendOTP(fullPhoneNumber);
        
        if (result.success) {
            // ذخیره شماره موبایل برای صفحه بعد
            router.push({
                pathname: '/(auth)/verify-otp',
                params: { phone: fullPhoneNumber, countryCode: country.code }
            });
        } else {
            Alert.alert('خطا', result.error || 'ارسال کد تأیید با مشکل مواجه شد');
        }
        
        setLoading(false);
    };

    return (
        <LinearGradient
            colors={['#0f0c29', '#302b63', '#24243e']}
            className="flex-1"
        >
            <StatusBar style="light" />
            
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                >
                    <View className="flex-1 justify-center px-6">
                        {/* عنوان */}
                        <Text className="text-white text-xl font-bold text-center mb-8">
                            {t('enter_phone_title', {}, 'auth')}
                        </Text>

                        {/* انتخاب کشور */}
                        <Text className="text-gray-400 text-sm mb-2">
                            {t('country', {}, 'auth')}
                        </Text>
                        <CountryPicker
                            value={country}
                            onChange={setCountry}
                        />

                        {/* شماره موبایل */}
                        <Text className="text-gray-400 text-sm mb-2 mt-4">
                            {t('phone_number', {}, 'auth')}
                        </Text>
                        <View className="flex-row items-center bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                            <View className="bg-gray-700 px-4 py-4">
                                <Text className="text-white text-base">+{country.dialCode}</Text>
                            </View>
                            <TextInput
                                className="flex-1 text-white text-base p-4"
                                placeholder={t('phone_placeholder', {}, 'auth')}
                                placeholderTextColor="#666"
                                keyboardType="phone-pad"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                maxLength={15}
                            />
                        </View>

                        {/* دکمه تأیید */}
                        <TouchableOpacity
                            onPress={handleSendOTP}
                            disabled={!isFormValid || loading}
                            className={`py-4 rounded-xl mt-8 ${
                                isFormValid ? 'bg-green-500' : 'bg-gray-600'
                            }`}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-white text-center text-lg font-bold">
                                    {t('confirm_continue', {}, 'auth')}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}