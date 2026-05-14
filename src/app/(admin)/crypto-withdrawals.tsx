// src/app/(admin)/crypto-withdrawals.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';

export default function CryptoWithdrawalsScreen() {
    const { user } = useAuthStore();
    const [withdrawals, setWithdrawals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWithdrawals();
    }, []);

    const loadWithdrawals = async () => {
        const { data } = await supabase
            .from('crypto_withdraw_requests')
            .select(`
                *,
                profiles (username, full_name, phone)
            `)
            .eq('status', 'pending')
            .order('created_at', { ascending: true });
        
        setWithdrawals(data || []);
        setLoading(false);
    };

    const processWithdrawal = async (withdrawal: any) => {
        Alert.alert(
            'پرداخت برداشت',
            `مبلغ ${withdrawal.amount_crypto} ${withdrawal.currency} به آدرس ${withdrawal.destination_address} ارسال شود؟`,
            [
                { text: 'انصراف', style: 'cancel' },
                {
                    text: 'تأیید و ارسال',
                    onPress: async () => {
                        // در اینجا با API سرویس رمز ارز ارتباط برقرار کنید
                        // و تراکنش خروجی را انجام دهید
                        
                        // پس از موفقیت آمیز بودن تراکنش:
                        await supabase
                            .from('crypto_withdraw_requests')
                            .update({
                                status: 'completed',
                                processed_by: user?.id,
                                processed_at: new Date().toISOString(),
                                transaction_hash: '0x...', // هش تراکنش واقعی
                            })
                            .eq('id', withdrawal.id);
                        
                        Alert.alert('موفق', 'برداشت با موفقیت انجام شد');
                        loadWithdrawals();
                    },
                },
            ]
        );
    };

    const rejectWithdrawal = async (withdrawal: any) => {
        // برگرداندن موجودی به کاربر
        const { data: userAccount } = await supabase
            .from('user_accounts')
            .select('balance')
            .eq('user_id', withdrawal.user_id)
            .single();
        
        await supabase
            .from('user_accounts')
            .update({ balance: (userAccount?.balance || 0) + withdrawal.amount_toman })
            .eq('user_id', withdrawal.user_id);
        
        await supabase
            .from('crypto_withdraw_requests')
            .update({
                status: 'rejected',
                processed_by: user?.id,
                processed_at: new Date().toISOString(),
            })
            .eq('id', withdrawal.id);
        
        Alert.alert('موفق', 'درخواست برداشت رد شد');
        loadWithdrawals();
    };

    return (
        <LinearGradient colors={['#0a0a1a', '#12122a']} style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 16, paddingTop: 50 }}>
                <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
                    <Text style={{ color: '#eab308', fontSize: 16 }}>← بازگشت</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
                    💰 برداشت‌های رمز ارز
                </Text>
            </View>
            
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#eab308" />
                ) : withdrawals.length === 0 ? (
                    <Text style={{ color: '#a0aec0', textAlign: 'center', padding: 40 }}>
                        هیچ درخواست برداشتی وجود ندارد
                    </Text>
                ) : (
                    withdrawals.map((item) => (
                        <View key={item.id} style={{
                            backgroundColor: '#1a1a2e',
                            borderRadius: 16,
                            padding: 16,
                            marginBottom: 12,
                        }}>
                            <Text style={{ color: '#eab308', fontWeight: 'bold' }}>
                                {item.profiles?.username}
                            </Text>
                            <Text style={{ color: '#a0aec0', fontSize: 12 }}>
                                {item.profiles?.phone}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginVertical: 8 }}>
                                {item.amount_crypto} {item.currency}
                            </Text>
                            <Text style={{ color: '#6b7280', fontSize: 11 }}>
                                معادل: {item.amount_toman.toLocaleString()} تومان
                            </Text>
                            <Text style={{ color: '#6b7280', fontSize: 11 }}>
                                آدرس مقصد: {item.destination_address}
                            </Text>
                            
                            <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
                                <TouchableOpacity
                                    onPress={() => processWithdrawal(item)}
                                    style={{ flex: 1, backgroundColor: '#10b981', paddingVertical: 10, borderRadius: 8, alignItems: 'center' }}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>✓ پرداخت و تأیید</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => rejectWithdrawal(item)}
                                    style={{ flex: 1, backgroundColor: '#ef4444', paddingVertical: 10, borderRadius: 8, alignItems: 'center' }}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>✗ رد</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </LinearGradient>
    );
}