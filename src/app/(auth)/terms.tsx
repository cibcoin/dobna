// src/app/(auth)/terms.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from '../../i18n/hooks/useTranslation';

export default function TermsScreen() {
    const { t } = useTranslation();
    const { tab } = useLocalSearchParams<{ tab: string }>();
    const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(tab === 'privacy' ? 'privacy' : 'terms');

    return (
        <LinearGradient
            colors={['#0f0c29', '#302b63', '#24243e']}
            className="flex-1"
        >
            <StatusBar style="light" />
            
            <SafeAreaView className="flex-1">
                {/* هدر */}
                <View className="flex-row items-center px-4 pt-4">
                    <TouchableOpacity onPress={() => router.back()} className="p-2">
                        <Text className="text-gray-400 text-2xl">←</Text>
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold flex-1 text-center ml-8">
                        {activeTab === 'terms' ? t('terms', {}, 'common') : t('privacy', {}, 'common')}
                    </Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* تب‌ها */}
                <View className="flex-row mx-4 mt-6 bg-gray-800 rounded-xl p-1">
                    <TouchableOpacity
                        onPress={() => setActiveTab('terms')}
                        className={`flex-1 py-3 rounded-lg ${
                            activeTab === 'terms' ? 'bg-yellow-600' : ''
                        }`}
                    >
                        <Text className={`text-center font-bold ${
                            activeTab === 'terms' ? 'text-white' : 'text-gray-400'
                        }`}>
                            {t('terms', {}, 'common')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActiveTab('privacy')}
                        className={`flex-1 py-3 rounded-lg ${
                            activeTab === 'privacy' ? 'bg-yellow-600' : ''
                        }`}
                    >
                        <Text className={`text-center font-bold ${
                            activeTab === 'privacy' ? 'text-white' : 'text-gray-400'
                        }`}>
                            {t('privacy', {}, 'common')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* محتوا */}
                <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
                    <Text className="text-white text-lg font-bold mb-4">
                        {activeTab === 'terms' ? 'قوانین و شرایط استفاده از دوبنا' : 'حریم خصوصی در دوبنا'}
                    </Text>
                    
                    <Text className="text-gray-300 text-base leading-7 mb-4">
                        {activeTab === 'terms' ? (
                            <>
                                کاربر محترم،
                                {'\n\n'}
                                افتخار ماست که شما دوبنا را انتخاب نموده‌اید. دوبنا باور دارد که حقوق شهروندی 
                                کاربران در چارچوب قانون اساسی باید رعایت گردد و لذا متعهد به رعایت ارزش‌های 
                                حقوقی ذیل است:
                                {'\n\n'}
                                • کاربران دارای آزادی عقیده و اندیشه و بیان هستند.
                                {'\n\n'}
                                • حریم خصوصی کاربران باید همواره رعایت شود و اشخاص نسبت به حریم شخصی خویش 
                                حمایت شوند و تجسس در گفتگوهای اشخاص علی‌الاصل ممنوع است.
                                {'\n\n'}
                                • تفتیش عقاید به هر دلیل و قصدی نسبت به کاربران ممنوع است و نباید بر اساس 
                                عقاید و باورها تبعیضی نسبت به ایشان اعمال شود.
                                {'\n\n'}
                                • کاربران فارغ از جنسیت، زبان، قومیت، دین و وضعیت اقتصادی و اجتماعی و 
                                جهت‌گیری سیاسی و سایر موارد تحت شمول حقوق شهروندی، دارای برابری هستند.
                                {'\n\n'}
                                • دسترسی به اطلاعات و اخبار از حقوق شهروندی کاربران است.
                                {'\n\n'}
                                • کاربران در تشخیص خیر و صلاح خویش و انتخاب مخاطبان، دوستان، گروه‌ها و 
                                محیط‌های خود آزاد هستند.
                            </>
                        ) : (
                            <>
                                حریم خصوصی شما برای ما بسیار مهم است. دوبنا متعهد به حفظ اطلاعات شخصی 
                                کاربران خود می‌باشد.
                                {'\n\n'}
                                • اطلاعاتی که جمع‌آوری می‌کنیم:
                                شماره تلفن، نام کاربری، تراکنش‌های مالی، تاریخچه بازی
                                {'\n\n'}
                                • نحوه استفاده از اطلاعات:
                                برای احراز هویت، پرداخت‌ها، بهبود تجربه کاربری و پشتیبانی
                                {'\n\n'}
                                • به اشتراک‌گذاری اطلاعات:
                                اطلاعات شما بدون رضایت شما با شخص ثالثی به اشتراک گذاشته نمی‌شود
                                {'\n\n'}
                                • امنیت اطلاعات:
                                ما از پروتکل‌های امنیتی پیشرفته برای حفاظت از اطلاعات شما استفاده می‌کنیم
                            </>
                        )}
                    </Text>
                    
                    <View className="h-8" />
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}