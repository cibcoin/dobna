// src/app/(drawer)/deposit-withdraw.tsx
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

const DEPOSIT_AMOUNTS = [50000, 100000, 200000, 500000, 1000000, 2000000];
const WITHDRAW_AMOUNTS = [100000, 200000, 500000, 1000000];

export default function DepositWithdrawScreen() {
    const { user, balance } = useAuthStore();
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

    const handleAmountChange = (value: string) => {
        setAmount(value);
        setSelectedPreset(null);
    };

    const handlePresetAmount = (presetAmount: number) => {
        setAmount(presetAmount.toString());
        setSelectedPreset(presetAmount);
    };

    const handleSubmit = async () => {
        const amountNum = parseInt(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            Alert.alert('خطا', 'مبلغ معتبر وارد کنید');
            return;
        }

        if (activeTab === 'withdraw' && amountNum > (balance || 0)) {
            Alert.alert('خطا', 'موجودی کافی نیست');
            return;
        }

        setLoading(true);
        
        // شبیه‌سازی درخواست
        setTimeout(() => {
            setLoading(false);
            if (activeTab === 'deposit') {
                Alert.alert(
                    'شارژ حساب',
                    `درخواست شارژ ${amountNum.toLocaleString()} تومان ثبت شد.\nشماره کارت: ********1234\nشماره شبا: IR**************5678`,
                    [{ text: 'باشه' }]
                );
            } else {
                Alert.alert(
                    'برداشت وجه',
                    `درخواست برداشت ${amountNum.toLocaleString()} تومان ثبت شد.\nحداکثر ۲۴ ساعت کاری طول می‌کشد.`,
                    [{ text: 'باشه' }]
                );
            }
            setAmount('');
        }, 1500);
    };

    const currentAmounts = activeTab === 'deposit' ? DEPOSIT_AMOUNTS : WITHDRAW_AMOUNTS;

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
                    واریز و برداشت
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {/* موجودی فعلی */}
                <View style={{
                    backgroundColor: currentColors.surfaceLight,
                    borderRadius: 16,
                    padding: 16,
                    alignItems: 'center',
                    marginBottom: 24,
                }}>
                    <Text style={{ color: currentColors.textSecondary, marginBottom: 4 }}>موجودی حساب</Text>
                    <Text style={{ color: currentColors.primary, fontSize: 28, fontWeight: 'bold' }}>
                        {balance?.toLocaleString()} تومان
                    </Text>
                </View>

                {/* تب‌ها */}
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: currentColors.surfaceLight,
                    borderRadius: 12,
                    padding: 4,
                    marginBottom: 24,
                }}>
                    <TouchableOpacity
                        onPress={() => setActiveTab('deposit')}
                        style={{
                            flex: 1,
                            paddingVertical: 12,
                            borderRadius: 8,
                            backgroundColor: activeTab === 'deposit' ? currentColors.primary : 'transparent',
                        }}
                    >
                        <Text style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: activeTab === 'deposit' ? currentColors.surface : currentColors.textSecondary,
                        }}>واریز</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActiveTab('withdraw')}
                        style={{
                            flex: 1,
                            paddingVertical: 12,
                            borderRadius: 8,
                            backgroundColor: activeTab === 'withdraw' ? currentColors.primary : 'transparent',
                        }}
                    >
                        <Text style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: activeTab === 'withdraw' ? currentColors.surface : currentColors.textSecondary,
                        }}>برداشت</Text>
                    </TouchableOpacity>
                </View>

                {/* مبالغ پیشنهادی */}
                <Text style={{ color: currentColors.textSecondary, marginBottom: 12 }}>مبالغ پیشنهادی</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
                    {currentAmounts.map((presetAmount) => (
                        <TouchableOpacity
                            key={presetAmount}
                            onPress={() => handlePresetAmount(presetAmount)}
                            style={{
                                backgroundColor: selectedPreset === presetAmount ? currentColors.primary : currentColors.surfaceLight,
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                borderRadius: 20,
                            }}
                        >
                            <Text style={{ color: selectedPreset === presetAmount ? currentColors.surface : currentColors.text }}>
                                {presetAmount.toLocaleString()} تومان
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ورودی مبلغ */}
                <Text style={{ color: currentColors.textSecondary, marginBottom: 8 }}>مبلغ (تومان)</Text>
                <TextInput
                    style={{
                        backgroundColor: currentColors.surfaceLight,
                        borderRadius: 12,
                        padding: 14,
                        color: currentColors.text,
                        fontSize: 16,
                        marginBottom: 24,
                    }}
                    placeholder="مبلغ را وارد کنید"
                    placeholderTextColor={currentColors.textMuted}
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={handleAmountChange}
                />

                {/* دکمه اقدام */}
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={loading || !amount}
                    style={{
                        backgroundColor: amount ? currentColors.primary : currentColors.textMuted,
                        paddingVertical: 16,
                        borderRadius: 12,
                        alignItems: 'center',
                    }}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                            {activeTab === 'deposit' ? 'شارژ حساب' : 'درخواست برداشت'}
                        </Text>
                    )}
                </TouchableOpacity>

                {/* اطلاعات اضافی */}
                <View style={{ marginTop: 24, padding: 16, backgroundColor: currentColors.surfaceLight, borderRadius: 12 }}>
                    <Text style={{ color: currentColors.textSecondary, fontSize: 12, textAlign: 'center' }}>
                        {activeTab === 'deposit' 
                            ? 'حداقل مبلغ واریز ۵۰,۰۰۰ تومان | حداکثر ۱۰,۰۰۰,۰۰۰ تومان'
                            : 'حداقل مبلغ برداشت ۱۰۰,۰۰۰ تومان | زمان تسویه حداکثر ۲۴ ساعت'
                        }
                    </Text>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}