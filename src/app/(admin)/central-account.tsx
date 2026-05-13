// src/app/(admin)/central-account.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';

export default function CentralAccountScreen() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        account_number: '1111111111',
        balance: 0,
        total_commission: 0,
        total_locked: 0,
    });

    useEffect(() => {
        loadCentralAccount();
    }, []);

    const loadCentralAccount = async () => {
        const { data } = await supabase
            .from('central_account')
            .select('*')
            .single();
        
        if (data) {
            setStats(data);
        }
        setLoading(false);
    };

    return (
        <LinearGradient colors={['#0a0a1a', '#12122a']} style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 16, paddingTop: 50 }}>
                <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
                    <Text style={{ color: '#eab308', fontSize: 16 }}>← بازگشت</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
                    🏦 حساب مرکزی دوبنا
                </Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#eab308" />
                ) : (
                    <>
                        <View style={{
                            backgroundColor: '#1a1a2e',
                            borderRadius: 20,
                            padding: 24,
                            alignItems: 'center',
                            marginBottom: 20,
                        }}>
                            <Text style={{ color: '#a0aec0', fontSize: 12, marginBottom: 4 }}>
                                شماره حساب مرکزی
                            </Text>
                            <Text style={{ color: '#eab308', fontSize: 28, fontWeight: 'bold', letterSpacing: 3 }}>
                                {stats.account_number}
                            </Text>
                        </View>

                        <View style={{
                            backgroundColor: '#1a1a2e',
                            borderRadius: 16,
                            padding: 16,
                            marginBottom: 12,
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                <Text style={{ color: '#a0aec0' }}>موجودی کل:</Text>
                                <Text style={{ color: '#eab308', fontSize: 18, fontWeight: 'bold' }}>
                                    {stats.balance.toLocaleString()} تومان
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                <Text style={{ color: '#a0aec0' }}>کل کارمزدهای دریافتی:</Text>
                                <Text style={{ color: '#10b981', fontSize: 18, fontWeight: 'bold' }}>
                                    {stats.total_commission.toLocaleString()} تومان
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#a0aec0' }}>کل مبالغ قفل شده:</Text>
                                <Text style={{ color: '#f59e0b', fontSize: 18, fontWeight: 'bold' }}>
                                    {stats.total_locked.toLocaleString()} تومان
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            backgroundColor: '#1a1a2e',
                            borderRadius: 16,
                            padding: 16,
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 12 }}>📊 خلاصه</Text>
                            <Text style={{ color: '#a0aec0', fontSize: 13, lineHeight: 22 }}>
                                • کارمزد هر انتقال: ۱٪ از مبلغ
                                {'\n'}
                                • حداقل انتقال: ۱۰,۰۰۰ تومان
                                {'\n'}
                                • حداکثر انتقال: ۱,۰۰۰,۰۰۰ تومان
                                {'\n'}
                                • قفل گروه خصوصی: ۱,۰۰۰,۰۰۰ تومان
                                {'\n'}
                                • قفل گروه عمومی: ۱۰,۰۰۰,۰۰۰ تومان
                            </Text>
                        </View>
                    </>
                )}
            </ScrollView>
        </LinearGradient>
    );
}