// src/app/(admin)/index.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        todayDeposits: 0,
        todayDepositAmount: 0,
        todayWithdraws: 0,
        todayWithdrawAmount: 0,
        todayWinners: 0,
        todayPrizeAmount: 0,
        pendingWithdraws: 0,
        pendingSupport: 0,
        activeUsers: 0,
    });
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const today = new Date().toISOString().split('T')[0];
        
        // واریزهای امروز
        const { data: deposits } = await supabase
            .from('transactions')
            .select('amount')
            .eq('type', 'deposit')
            .eq('status', 'completed')
            .gte('created_at', today);
        
        // برداشت‌های امروز
        const { data: withdraws } = await supabase
            .from('transactions')
            .select('amount')
            .eq('type', 'withdraw')
            .eq('status', 'completed')
            .gte('created_at', today);
        
        // برندگان امروز
        const { data: winners } = await supabase
            .from('winners_history')
            .select('prize_amount')
            .gte('created_at', today);
        
        // درخواست‌های برداشت pending
        const { count: pendingWithdraws } = await supabase
            .from('withdraw_requests')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');
        
        // تیکت‌های پشتیبانی pending
        const { count: pendingSupport } = await supabase
            .from('support_tickets')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');
        
        // کاربران فعال امروز
        const { count: activeUsers } = await supabase
            .from('transactions')
            .select('user_id', { count: 'exact', head: true })
            .gte('created_at', today);
        
        setStats({
            todayDeposits: deposits?.length || 0,
            todayDepositAmount: deposits?.reduce((sum, t) => sum + t.amount, 0) || 0,
            todayWithdraws: withdraws?.length || 0,
            todayWithdrawAmount: withdraws?.reduce((sum, t) => sum + t.amount, 0) || 0,
            todayWinners: winners?.length || 0,
            todayPrizeAmount: winners?.reduce((sum, w) => sum + w.prize_amount, 0) || 0,
            pendingWithdraws: pendingWithdraws || 0,
            pendingSupport: pendingSupport || 0,
            activeUsers: activeUsers || 0,
        });
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadStats();
        setRefreshing(false);
    };

    const StatCard = ({ title, value, icon, color, onPress }: any) => (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: '#1a1a2e',
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <View>
                <Text style={{ color: '#a0aec0', fontSize: 12 }}>{title}</Text>
                <Text style={{ color: color || '#eab308', fontSize: 20, fontWeight: 'bold' }}>
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </Text>
            </View>
            <Text style={{ fontSize: 32 }}>{icon}</Text>
        </TouchableOpacity>
    );

    return (
        <LinearGradient colors={['#0a0a1a', '#12122a']} style={{ flex: 1 }}>
            <StatusBar style="light" />
            
            <ScrollView
                contentContainerStyle={{ padding: 16, paddingTop: 50 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
                    📊 پنل مدیریت دوبنا
                </Text>
                
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                    <View style={{ flex: 1 }}>
                        <StatCard
                            title="واریز امروز"
                            value={`${stats.todayDepositAmount.toLocaleString()} تومان`}
                            icon="💰"
                            color="#10b981"
                            onPress={() => router.push('/admin/deposits')}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <StatCard
                            title="تعداد واریز"
                            value={stats.todayDeposits}
                            icon="📥"
                            color="#10b981"
                            onPress={() => router.push('/admin/deposits')}
                        />
                    </View>
                </View>
                
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                    <View style={{ flex: 1 }}>
                        <StatCard
                            title="برداشت امروز"
                            value={`${stats.todayWithdrawAmount.toLocaleString()} تومان`}
                            icon="💸"
                            color="#ef4444"
                            onPress={() => router.push('/admin/withdraws')}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <StatCard
                            title="تعداد برداشت"
                            value={stats.todayWithdraws}
                            icon="📤"
                            color="#ef4444"
                            onPress={() => router.push('/admin/withdraws')}
                        />
                    </View>
                </View>
                
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                    <View style={{ flex: 1 }}>
                        <StatCard
                            title="جوایز امروز"
                            value={`${stats.todayPrizeAmount.toLocaleString()} تومان`}
                            icon="🏆"
                            color="#eab308"
                            onPress={() => router.push('/admin/winners')}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <StatCard
                            title="تعداد برندگان"
                            value={stats.todayWinners}
                            icon="🎉"
                            color="#eab308"
                            onPress={() => router.push('/admin/winners')}
                        />
                    </View>
                </View>
                
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                    <View style={{ flex: 1 }}>
                        <StatCard
                            title="درخواست برداشت"
                            value={stats.pendingWithdraws}
                            icon="⏳"
                            color="#f59e0b"
                            onPress={() => router.push('/admin/withdraws')}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <StatCard
                            title="تیکت پشتیبانی"
                            value={stats.pendingSupport}
                            icon="🎧"
                            color="#8b5cf6"
                            onPress={() => router.push('/admin/support')}
                        />
                    </View>
                </View>
                
                <StatCard
                    title="کاربران فعال امروز"
                    value={stats.activeUsers}
                    icon="👥"
                    color="#06b6d4"
                    onPress={() => router.push('/admin/users')}
                />
                
                <View style={{ height: 20 }} />
            </ScrollView>
        </LinearGradient>
    );
}