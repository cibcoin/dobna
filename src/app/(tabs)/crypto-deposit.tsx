// src/app/(tabs)/crypto-deposit.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Share,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';
import * as Clipboard from 'expo-clipboard';

export default function CryptoDepositScreen() {
    const { user } = useAuthStore();
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [selectedCurrency, setSelectedCurrency] = useState<'USDT' | 'SOL'>('USDT');
    const [loading, setLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [minDeposit, setMinDeposit] = useState<number>(10); // حداقل 10 USDT

    useEffect(() => {
        loadExchangeRate();
    }, [selectedCurrency]);

    const loadExchangeRate = async () => {
        const { data } = await supabase
            .from('exchange_rates')
            .select('effective_rate')
            .eq('currency', selectedCurrency)
            .order('fetched_at', { ascending: false })
            .limit(1)
            .single();
        
        if (data) {
            setExchangeRate(data.effective_rate);
        }
    };

    const handleCurrencySelect = (currency: 'USDT' | 'SOL') => {
        setSelectedCurrency(currency);
        setWalletAddress(null);
    };

    const handleRequestDeposit = async () => {
        setLoading(true);
        
        // درخواست به سرور برای ایجاد آدرس واریز
        const response = await fetch('/api/crypto/deposit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: user?.id,
                currency: selectedCurrency,
            }),
        });
        
        const data = await response.json();
        
        if (data.address) {
            setWalletAddress(data.address);
        } else {
            Alert.alert('خطا', 'مشکلی در ایجاد آدرس واریز پیش آمد');
        }
        
        setLoading(false);
    };

    const copyAddress = async () => {
        if (walletAddress) {
            await Clipboard.setStringAsync(walletAddress);
            Alert.alert('✅ کپی شد', 'آدرس کیف پول با موفقیت کپی شد');
        }
    };

    const shareAddress = async () => {
        const message = `
💰 واریز رمز ارز به دوبنا

🪙 ارز: ${selectedCurrency}
📋 آدرس: ${walletAddress}
📊 نرخ تبدیل: 1 ${selectedCurrency} = ${exchangeRate?.toLocaleString()} تومان

⚠️ فقط از شبکه ${selectedCurrency === 'USDT' ? 'TRC20' : 'Solana'} واریز کنید.
        `;
        
        await Share.share({ message });
    };

    const getNetworkInfo = () => {
        if (selectedCurrency === 'USDT') {
            return {
                network: 'TRC20 (TRON)',
                warning: 'فقط از شبکه TRC20 واریز کنید. واریز از شبکه‌های دیگر منجر به از دست رفتن دارایی می‌شود.',
                minAmount: '10 USDT',
            };
        }
        return {
            network: 'Solana',
            warning: 'فقط از شبکه Solana واریز کنید. آدرس باید با "sol" شروع شود.',
            minAmount: '0.1 SOL',
        };
    };

    const networkInfo = getNetworkInfo();

    if (!walletAddress) {
        // مرحله 1: انتخاب ارز و درخواست آدرس
        return (
            <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 16, paddingTop: 50 }}>
                    <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
                        <Text style={{ color: currentColors.primary, fontSize: 16 }}>← بازگشت</Text>
                    </TouchableOpacity>
                    <Text style={{ color: currentColors.text, fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>
                        💰 واریز با رمز ارز
                    </Text>
                </View>
                
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    {/* انتخاب ارز */}
                    <Text style={{ color: currentColors.textSecondary, marginBottom: 8 }}>انتخاب رمز ارز</Text>
                    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
                        <TouchableOpacity
                            onPress={() => handleCurrencySelect('USDT')}
                            style={{
                                flex: 1,
                                backgroundColor: selectedCurrency === 'USDT' ? currentColors.primary : currentColors.surfaceLight,
                                padding: 16,
                                borderRadius: 12,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 24, marginBottom: 4 }}>💵</Text>
                            <Text style={{ color: selectedCurrency === 'USDT' ? '#1a1a2e' : currentColors.text, fontWeight: 'bold' }}>
                                USDT (TRC20)
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleCurrencySelect('SOL')}
                            style={{
                                flex: 1,
                                backgroundColor: selectedCurrency === 'SOL' ? currentColors.primary : currentColors.surfaceLight,
                                padding: 16,
                                borderRadius: 12,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 24, marginBottom: 4 }}>⚡</Text>
                            <Text style={{ color: selectedCurrency === 'SOL' ? '#1a1a2e' : currentColors.text, fontWeight: 'bold' }}>
                                Solana (SOL)
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* نرخ تبدیل */}
                    <View style={{
                        backgroundColor: currentColors.surfaceLight,
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 24,
                    }}>
                        <Text style={{ color: currentColors.textSecondary, marginBottom: 4 }}>نرخ تبدیل لحظه‌ای</Text>
                        <Text style={{ color: currentColors.primary, fontSize: 20, fontWeight: 'bold' }}>
                            1 {selectedCurrency} = {exchangeRate?.toLocaleString()} تومان
                        </Text>
                        <Text style={{ color: currentColors.textMuted, fontSize: 12, marginTop: 8 }}>
                            حداقل واریز: {networkInfo.minAmount}
                        </Text>
                    </View>
                    
                    {/* دکمه درخواست */}
                    <TouchableOpacity
                        onPress={handleRequestDeposit}
                        disabled={loading}
                        style={{
                            backgroundColor: currentColors.primary,
                            paddingVertical: 16,
                            borderRadius: 12,
                            alignItems: 'center',
                        }}
                    >
                        {loading ? <ActivityIndicator color="#1a1a2e" /> : (
                            <Text style={{ color: '#1a1a2e', fontWeight: 'bold', fontSize: 16 }}>
                                دریافت آدرس واریز
                            </Text>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </LinearGradient>
        );
    }
    
    // مرحله 2: نمایش آدرس واریز و QR Code
    return (
        <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 50 }}>
                <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
                    <Text style={{ color: currentColors.primary, fontSize: 16 }}>← بازگشت</Text>
                </TouchableOpacity>
                
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <Text style={{ color: currentColors.text, fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>
                        واریز {selectedCurrency}
                    </Text>
                    <Text style={{ color: currentColors.textSecondary, textAlign: 'center' }}>
                        مبلغ مورد نظر را به آدرس زیر واریز کنید
                    </Text>
                </View>
                
                {/* QR Code */}
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <QRCode
                        value={walletAddress}
                        size={200}
                        backgroundColor={currentColors.surface}
                        color={currentColors.primary}
                    />
                </View>
                
                {/* آدرس کیف پول */}
                <View style={{
                    backgroundColor: currentColors.surfaceLight,
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 16,
                }}>
                    <Text style={{ color: currentColors.textSecondary, marginBottom: 4 }}>آدرس کیف پول</Text>
                    <Text style={{ color: currentColors.text, fontSize: 14, fontFamily: 'monospace', marginBottom: 12 }}>
                        {walletAddress}
                    </Text>
                    
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <TouchableOpacity
                            onPress={copyAddress}
                            style={{ flex: 1, backgroundColor: currentColors.surface, paddingVertical: 10, borderRadius: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
                        >
                            <Text>📋</Text>
                            <Text style={{ color: currentColors.text }}>کپی آدرس</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={shareAddress}
                            style={{ flex: 1, backgroundColor: currentColors.surface, paddingVertical: 10, borderRadius: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
                        >
                            <Text>📤</Text>
                            <Text style={{ color: currentColors.text }}>اشتراک‌گذاری</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* شبکه و هشدار */}
                <View style={{
                    backgroundColor: '#ef444420',
                    borderRadius: 16,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: '#ef444440',
                }}>
                    <Text style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: 8 }}>⚠️ توجه مهم</Text>
                    <Text style={{ color: currentColors.textSecondary, fontSize: 13 }}>
                        • شبکه: {networkInfo.network}
                        {'\n'}
                        • {networkInfo.warning}
                        {'\n'}
                        • پس از واریز، موجودی شما به صورت خودکار به تومان تبدیل می‌شود
                        {'\n'}
                        • زمان تأیید واریز معمولاً 1-5 دقیقه است
                    </Text>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}