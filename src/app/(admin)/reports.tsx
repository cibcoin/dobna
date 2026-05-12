// src/app/(admin)/reports.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Share,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';

export default function DailyReportScreen() {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<any>(null);

    const generateReport = async () => {
        setLoading(true);
        const today = new Date().toISOString().split('T')[0];
        
        // واریزها
        const { data: deposits } = await supabase
            .from('transactions')
            .select('user_id, amount, profiles(username, full_name, phone)')
            .eq('type', 'deposit')
            .eq('status', 'completed')
            .gte('created_at', today);
        
        // برداشتها
        const { data: withdraws } = await supabase
            .from('withdraw_requests')
            .select('user_id, amount, status, profiles(username, full_name, phone, card_number)')
            .gte('created_at', today);
        
        // برندگان
        const { data: winners } = await supabase
            .from('winners_history')
            .select('winner_user_name, prize_amount, winner_type, card_number')
            .gte('created_at', today);
        
        // آمار کارت‌ها
        const { data: cardStats } = await supabase
            .from('daily_card_stats')
            .select('*')
            .eq('stat_date', today);
        
        setReport({
            date: today,
            deposits,
            withdraws,
            winners,
            cardStats,
            totalDeposit: deposits?.reduce((s, d) => s + d.amount, 0) || 0,
            totalWithdraw: withdraws?.filter(w => w.status === 'completed').reduce((s, w) => s + w.amount, 0) || 0,
            totalPrizes: winners?.reduce((s, w) => s + w.prize_amount, 0) || 0,
        });
        
        setLoading(false);
    };

    const shareReport = async () => {
        if (!report) return;
        
        const reportText = `
📊 گزارش روزانه دوبنا
📅 تاریخ: ${new Date(report.date).toLocaleDateString('fa-IR')}

💰 واریزها:
${report.deposits?.map(d => `- ${d.profiles?.username}: ${d.amount.toLocaleString()} تومان`).join('\n') || 'هیچ'}
مجموع: ${report.totalDeposit.toLocaleString()} تومان

💸 برداشتها:
${report.withdraws?.filter(w => w.status === 'completed').map(w => `- ${w.profiles?.username}: ${w.amount.toLocaleString()} تومان (${w.status === 'pending' ? 'در انتظار' : 'تأیید'})`).join('\n') || 'هیچ'}
مجموع: ${report.totalWithdraw.toLocaleString()} تومان

🏆 برندگان:
${report.winners?.map(w => `- ${w.winner_user_name}: ${w.prize_amount.toLocaleString()} تومان (${w.winner_type === 'line' ? 'برد خطی' : 'برد پر'} - کارت #${w.card_number})`).join('\n') || 'هیچ'}
مجموع جوایز: ${report.totalPrizes.toLocaleString()} تومان

📈 آمار کارت‌های برنده:
${report.cardStats?.map(c => `- کارت #${c.card_number}: ${c.win_count} بار (${c.win_type === 'line' ? 'خطی' : 'پر'}) - ${c.total_prize.toLocaleString()} تومان`).join('\n') || 'هیچ'}

---
دوبنا - بازی آنلاین بینگو
dobna.ir
        `;
        
        await Share.share({ message: reportText });
    };

    return (
        <LinearGradient colors={['#0a0a1a', '#12122a']} style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 16, paddingTop: 50 }}>
                <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
                    <Text style={{ color: '#eab308', fontSize: 16 }}>← بازگشت</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
                    گزارشات روزانه
                </Text>
            </View>
            
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <TouchableOpacity
                    onPress={generateReport}
                    style={{ backgroundColor: '#eab308', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 20 }}
                >
                    <Text style={{ color: '#0a0a1a', fontWeight: 'bold', fontSize: 16 }}>
                        📊 ایجاد گزارش امروز
                    </Text>
                </TouchableOpacity>
                
                {loading && <ActivityIndicator size="large" color="#eab308" />}
                
                {report && (
                    <>
                        <View style={{ backgroundColor: '#1a1a2e', borderRadius: 16, padding: 16, marginBottom: 16 }}>
                            <Text style={{ color: '#eab308', fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
                                خلاصه امروز
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                <Text style={{ color: '#a0aec0' }}>مجموع واریز:</Text>
                                <Text style={{ color: '#10b981', fontWeight: 'bold' }}>{report.totalDeposit.toLocaleString()} تومان</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                <Text style={{ color: '#a0aec0' }}>مجموع برداشت:</Text>
                                <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>{report.totalWithdraw.toLocaleString()} تومان</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#a0aec0' }}>مجموع جوایز:</Text>
                                <Text style={{ color: '#eab308', fontWeight: 'bold' }}>{report.totalPrizes.toLocaleString()} تومان</Text>
                            </View>
                        </View>
                        
                        <TouchableOpacity
                            onPress={shareReport}
                            style={{ backgroundColor: '#3b82f6', padding: 16, borderRadius: 12, alignItems: 'center' }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>📤 اشتراک‌گذاری گزارش</Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
        </LinearGradient>
    );
}