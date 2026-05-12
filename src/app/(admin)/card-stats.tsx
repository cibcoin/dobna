// src/app/(admin)/card-stats.tsx
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
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../lib/supabase';

export default function CardStatsScreen() {
    const [stats, setStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        loadStats();
    }, [selectedDate]);

    const loadStats = async () => {
        setLoading(true);
        
        const { data } = await supabase
            .from('daily_card_stats')
            .select('*')
            .eq('stat_date', selectedDate)
            .order('win_count', { ascending: false });
        
        setStats(data || []);
        setLoading(false);
    };

    const getTopCards = () => {
        const lineWins = stats.filter(s => s.win_type === 'line');
        const fullWins = stats.filter(s => s.win_type === 'full_house');
        
        return {
            topLineCard: lineWins.length > 0 ? lineWins[0] : null,
            topFullCard: fullWins.length > 0 ? fullWins[0] : null,
        };
    };

    const topCards = getTopCards();

    return (
        <LinearGradient colors={['#0a0a1a', '#12122a']} style={{ flex: 1 }}>
            <StatusBar style="light" />
            
            <View style={{ paddingHorizontal: 16, paddingTop: 50 }}>
                <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
                    <Text style={{ color: '#eab308', fontSize: 16 }}>← بازگشت</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
                    آمار کارت‌های برنده
                </Text>
            </View>
            
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {/* انتخاب تاریخ */}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#1a1a2e',
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 20,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: '#eab308' }}>
                        📅 تاریخ: {new Date(selectedDate).toLocaleDateString('fa-IR')}
                    </Text>
                </TouchableOpacity>
                
                {/* کارت‌های برتر */}
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
                    <View style={{ flex: 1, backgroundColor: '#1a1a2e', borderRadius: 16, padding: 16 }}>
                        <Text style={{ color: '#a0aec0', fontSize: 12, marginBottom: 8 }}>پربردترین کارت (خطی)</Text>
                        {topCards.topLineCard ? (
                            <>
                                <Text style={{ color: '#eab308', fontSize: 28, fontWeight: 'bold' }}>
                                    #{topCards.topLineCard.card_number}
                                </Text>
                                <Text style={{ color: '#10b981', fontSize: 14 }}>
                                    {topCards.topLineCard.win_count} بار برنده
                                </Text>
                                <Text style={{ color: '#6b7280', fontSize: 12 }}>
                                    {topCards.topLineCard.total_prize.toLocaleString()} تومان
                                </Text>
                            </>
                        ) : (
                            <Text style={{ color: '#6b7280' }}>داده‌ای موجود نیست</Text>
                        )}
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#1a1a2e', borderRadius: 16, padding: 16 }}>
                        <Text style={{ color: '#a0aec0', fontSize: 12, marginBottom: 8 }}>پربردترین کارت (پر)</Text>
                        {topCards.topFullCard ? (
                            <>
                                <Text style={{ color: '#eab308', fontSize: 28, fontWeight: 'bold' }}>
                                    #{topCards.topFullCard.card_number}
                                </Text>
                                <Text style={{ color: '#10b981', fontSize: 14 }}>
                                    {topCards.topFullCard.win_count} بار برنده
                                </Text>
                                <Text style={{ color: '#6b7280', fontSize: 12 }}>
                                    {topCards.topFullCard.total_prize.toLocaleString()} تومان
                                </Text>
                            </>
                        ) : (
                            <Text style={{ color: '#6b7280' }}>داده‌ای موجود نیست</Text>
                        )}
                    </View>
                </View>
                
                {/* لیست کامل */}
                <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 12 }}>لیست کامل کارت‌ها</Text>
                
                {loading ? (
                    <ActivityIndicator size="large" color="#eab308" />
                ) : stats.length === 0 ? (
                    <Text style={{ color: '#a0aec0', textAlign: 'center', padding: 40 }}>
                        هیچ داده‌ای برای این تاریخ وجود ندارد
                    </Text>
                ) : (
                    stats.map((item) => (
                        <View
                            key={`${item.card_number}-${item.win_type}`}
                            style={{
                                backgroundColor: '#1a1a2e',
                                borderRadius: 12,
                                padding: 12,
                                marginBottom: 8,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <View>
                                <Text style={{ color: '#eab308', fontSize: 18, fontWeight: 'bold' }}>
                                    کارت #{item.card_number}
                                </Text>
                                <Text style={{ color: '#a0aec0', fontSize: 12 }}>
                                    {item.win_type === 'line' ? '📊 برد خطی' : '🏆 برد پر'}
                                </Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ color: '#10b981', fontSize: 16, fontWeight: 'bold' }}>
                                    {item.win_count} بار
                                </Text>
                                <Text style={{ color: '#6b7280', fontSize: 12 }}>
                                    {item.total_prize.toLocaleString()} تومان
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </LinearGradient>
    );
}