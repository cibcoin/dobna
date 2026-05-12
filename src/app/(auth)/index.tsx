// src/app/(auth)/index.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StatusBar,
    SafeAreaView,
    Linking,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { useLanguageStore } from '../../stores/languageStore';
import { supabase } from '../../lib/supabase';

export default function WelcomeScreen() {
    const { t, locale, setLanguage, isRTL } = useTranslation();
    const [showLanguageModal, setShowLanguageModal] = useState(false);

    const openTerms = () => {
        router.push('/(auth)/terms');
    };

    const openPrivacy = () => {
        router.push('/(auth)/terms?tab=privacy');
    };

    return (
        <LinearGradient
            colors={['#0f0c29', '#302b63', '#24243e']}
            className="flex-1"
        >
            <StatusBar barStyle="light-content" backgroundColor="#0f0c29" />
            
            <SafeAreaView className="flex-1">
                <View className="flex-1 justify-center items-center px-6">
                    {/* لوگو */}
                    <View className="items-center mb-4">
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={{ width: 100, height: 100 }}
                            className="mb-2"
                            resizeMode="contain"
                        />
                        <Text className="text-yellow-500 text-3xl font-bold">
                            {t('app_name', {}, 'common')}
                        </Text>
                        <Text className="text-gray-400 text-sm mt-2 text-center">
                            {t('app_subtitle', {}, 'common')}
                        </Text>
                    </View>

                    {/* دکمه زبان */}
                    <TouchableOpacity
                        onPress={() => setShowLanguageModal(true)}
                        className="flex-row items-center mt-8"
                    >
                        <Image
                            source={locale === 'fa' 
                                ? require('../../../assets/icons/flags/iran.svg')
                                : require('../../../assets/icons/flags/us.svg')
                            }
                            style={{ width: 24, height: 24 }}
                        />
                        <Text className="text-gray-300 text-base ml-2">
                            {locale === 'fa' ? 'فارسی | Language' : 'Language | فارسی'}
                        </Text>
                    </TouchableOpacity>

                    {/* شرایط و قوانین */}
                    <Text className="text-gray-400 text-xs text-center mt-8">
                        {t('agree_terms', {}, 'common')}
                        {' '}
                        <Text
                            className="text-green-500 underline"
                            onPress={openTerms}
                        >
                            {t('terms', {}, 'common')}
                        </Text>
                        {' '}
                        {t('and', {}, 'common')}
                        {' '}
                        <Text
                            className="text-green-500 underline"
                            onPress={openPrivacy}
                        >
                            {t('privacy', {}, 'common')}
                        </Text>
                    </Text>

                    {/* دکمه ورود */}
                    <TouchableOpacity
                        onPress={() => router.push('/(auth)/phone-login')}
                        className="w-full bg-yellow-600 py-4 rounded-xl mt-8"
                    >
                        <Text className="text-white text-center text-lg font-bold">
                            {t('login', {}, 'common')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* مودال انتخاب زبان */}
            {showLanguageModal && (
                <View className="absolute inset-0 bg-black/70 justify-center items-center">
                    <View className="bg-gray-800 rounded-2xl p-6 w-4/5">
                        <Text className="text-white text-xl font-bold text-center mb-4">
                            {t('select_language', {}, 'common')}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setLanguage('fa');
                                setShowLanguageModal(false);
                            }}
                            className="flex-row items-center justify-between py-4 border-b border-gray-700"
                        >
                            <Text className="text-white text-lg">فارسی</Text>
                            {locale === 'fa' && (
                                <Text className="text-green-500">✓</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setLanguage('en');
                                setShowLanguageModal(false);
                            }}
                            className="flex-row items-center justify-between py-4"
                        >
                            <Text className="text-white text-lg">English</Text>
                            {locale === 'en' && (
                                <Text className="text-green-500">✓</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setShowLanguageModal(false)}
                            className="mt-4 bg-gray-700 py-3 rounded-xl"
                        >
                            <Text className="text-white text-center">{t('close', {}, 'common')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </LinearGradient>
    );
}