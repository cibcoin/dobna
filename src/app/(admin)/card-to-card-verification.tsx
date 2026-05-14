// src/app/(admin)/card-to-card-verification.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';

export default function CardToCardVerificationScreen() {
    const { user } = useAuthStore();
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        const { data } = await supabase
            .from('card_to_card_requests')
            .select(`
                *,
                profiles (username, full_name, phone)
            `)
            .eq('status', 'pending')
            .order('created_at', { ascending: true });
        
        setRequests(data || []);
        setLoading(false);
    };

    const verifyPayment = async (request: any) => {
        Alert.alert(
            'تأیید واریز',
            `مبلغ ${request.amount.toLocaleString()} تومان برای کاربر ${request.profiles.username} تأیید شود؟`,
            [
                { text: 'انصراف', style: 'cancel' },
                {
                    text: 'تأیید',
                    onPress: async () => {
                        // 1. افزایش موجودی کاربر
                        const { data: userAccount } = await supabase
                            .from('user_accounts')
                            .select('balance')
                            .eq('user_id', request.user_id)
                            .single();
                        
                        const newBalance = (userAccount?.balance || 0) + request.amount;
                        
                        await supabase
                            .from('user_accounts')
                            .update({ balance: newBalance })
                            .eq('user_id', request.user_id);
                        
                        // 2. ثبت تراکنش
                        await supabase
                            .from('transactions')
                            .insert({
                                user_id: request.user_id,
                                type: 'deposit',
                                amount: request.amount,
                                balance_before: userAccount?.balance || 0,
                                balance_after: newBalance,
                                status: 'completed',
                                reference_id: request.reference_code,
                            });
                        
                        // 3. بروزرسانی وضعیت درخواست
                        await supabase
                            .from('card_to_card_requests')
                            .update({
                                status: 'paid',
                                verified_by: user?.id,
                                verified_at: new Date().toISOString(),
                            })
                            .eq('id', request.id);
                        
                        // 4. ثبت لاگ
                        await supabase
                            .from('card_to_card_logs')
                            .insert({
                                request_id: request.id,
                                user_id: request.user_id,
                                amount: request.amount,
                                bank_transaction_id: request.transaction_id,
                                admin_id: user?.id,
                            });
                        
                        Alert.alert('موفق', 'واریز تأیید و موجودی کاربر افزایش یافت');
                        loadRequests();
                    },
                },
            ]
        );
    };

    const rejectPayment = async (request: any) => {
        Alert.alert(
            'رد درخواست',
            'آیا مطمئن هستید؟',
            [
                { text: 'انصراف', style: 'cancel' },
                {
                    text: 'رد',
                    style: 'destructive',
                    onPress: async () => {
                        await supabase
                            .from('card_to_card_requests')
                            .update({
                                status: 'cancelled',
                                verified_by: user?.id,
                                verified_at: new Date().toISOString(),
                            })
                            .eq('id', request.id);
                        
                        Alert.alert('موفق', 'درخواست رد شد');
                        loadRequests();
                    },
                },
            ]
        );
    };

    return (
        <LinearGradient colors={['#0a0a1a', '#12122a']} style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 16, paddingTop: 50 }}>
                <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
                    <Text style={{ color: '#eab308', fontSize: 16 }}>← بازگشت</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
                    💳 تأیید واریز کارت به کارت
                </Text>
            </View>
            
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#eab308" />
                ) : requests.length === 0 ? (
                    <Text style={{ color: '#a0aec0', textAlign: 'center', padding: 40 }}>
                        هیچ درخواست واریزی وجود ندارد
                    </Text>
                ) : (
                    requests.map((request) => (
                        <View key={request.id} style={{
                            backgroundColor: '#1a1a2e',
                            borderRadius: 16,
                            padding: 16,
                            marginBottom: 12,
                        }}>
                            <Text style={{ color: '#eab308', fontWeight: 'bold' }}>
                                {request.profiles?.username}
                            </Text>
                            <Text style={{ color: '#a0aec0', fontSize: 12 }}>
                                {request.profiles?.phone}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginVertical: 8 }}>
                                {request.amount.toLocaleString()} تومان
                            </Text>
                            <Text style={{ color: '#6b7280', fontSize: 11 }}>
                                کد پیگیری: {request.reference_code}
                            </Text>
                            {request.transaction_id && (
                                <Text style={{ color: '#6b7280', fontSize: 11 }}>
                                    شماره پیگیری بانکی: {request.transaction_id}
                                </Text>
                            )}
                            {request.receipt_image && (
                                <Image source={{ uri: request.receipt_image }} style={{ width: 100, height: 100, borderRadius: 8, marginVertical: 8 }} />
                            )}
                            
                            <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
                                <TouchableOpacity
                                    onPress={() => verifyPayment(request)}
                                    style={{ flex: 1, backgroundColor: '#10b981', paddingVertical: 10, borderRadius: 8, alignItems: 'center' }}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>✓ تأیید</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => rejectPayment(request)}
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