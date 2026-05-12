// src/app/(auth)/verify-otp.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { verifyOTP, sendOTP } from '../../lib/auth';
import { useTranslation } from '../../i18n/hooks/useTranslation';

export default function VerifyOTPScreen() {
    const { t } = useTranslation();
    const { phone, countryCode } = useLocalSearchParams<{ phone: string; countryCode: string }>();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);

    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // حرکت به فیلد بعدی
        if (text.length === 1 && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpCode = code.join('');
        if (otpCode.length !== 6) {
            Alert.alert('خطا', 'کد تأیید ۶ رقمی را وارد کنید');
            return;
        }

        setLoading(true);
        const result = await verifyOTP(phone, otpCode);
        
        if (result.success) {
            // ذخیره اطلاعات کاربر در store
            router.replace('/(tabs)');
        } else {
            Alert.alert('خطا', result.error || 'کد تأیید نامعتبر است');
            setCode(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }
        
        setLoading(false);
    };

    const handleResendCode = async () => {
        if (!canResend) return;
        
        setCanResend(false);
        setResendTimer(60);
        
        const result = await sendOTP(phone);
        if (!result.success) {
            Alert.alert('خطا', 'ارسال مجدد کد با مشکل مواجه شد');
        }
    };

    const handleEditPhone = () => {
        router.back();
    };

    return (
        <LinearGradient
            colors={['#0f0c29', '#302b63', '#24243e']}
            className="flex-1"
        >
            <StatusBar style="light" />
            
            <SafeAreaView className="flex-1">
                <View className="flex-1 justify-center px-6">
                    {/* عنوان */}
                    <Text className="text-white text-xl font-bold text-center mb-2">
                        {t('verify_code_title', {}, 'auth')}
                    </Text>
                    
                    <Text className="text-gray-400 text-center text-sm mb-6">
                        {t('code_sent_to', {}, 'auth')} {phone}
                        {' '}
                        <Text
                            className="text-green-500 underline"
                            onPress={handleEditPhone}
                        >
                            {t('edit', {}, 'common')}
                        </Text>
                    </Text>

                    {/* فیلدهای کد ۶ رقمی */}
                    <View className="flex-row justify-between mb-8">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                className="w-14 h-14 bg-gray-800 rounded-xl text-white text-center text-2xl font-bold border border-gray-700"
                                keyboardType="number-pad"
                                maxLength={1}
                                value={code[index]}
                                onChangeText={(text) => handleCodeChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                            />
                        ))}
                    </View>

                    {/* دکمه تأیید */}
                    <TouchableOpacity
                        onPress={handleVerify}
                        disabled={loading}
                        className="bg-yellow-600 py-4 rounded-xl"
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white text-center text-lg font-bold">
                                {t('confirm', {}, 'common')}
                            </Text>
                        )}
                    </TouchableOpacity>

                    {/* ارسال مجدد کد */}
                    <View className="flex-row justify-center mt-6">
                        <Text className="text-gray-400">
                            {t('resend_code_hint', {}, 'auth')}
                        </Text>
                        {canResend ? (
                            <TouchableOpacity onPress={handleResendCode}>
                                <Text className="text-green-500 font-bold mr-1">
                                    {t('resend_code', {}, 'auth')}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <Text className="text-yellow-500 mr-1">
                                {resendTimer} {t('seconds', {}, 'common')}
                            </Text>
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}