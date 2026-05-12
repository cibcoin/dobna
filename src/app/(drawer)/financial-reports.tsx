// src/app/(drawer)/financial-reports.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';

// داده‌های نمونه
const SAMPLE_TRANSACTIONS = [
    { id: '1', type: 'deposit', amount: 500000, date: '۱۴۰۳/۰۲/۱۵', status: 'completed', description: 'شارژ حساب' },
    { id: '2', type: 'transfer_out', amount: 100000, date: '۱۴۰۳/۰۲/۱۴', status: 'completed', description: 'انتقال به @reza' },
    { id: '3', type: 'game_win', amount: 121500, date: '۱۴۰۳/۰۲/۱۳', status: 'completed', description: 'برد خطی - اتاق ۵,۰۰۰ تومانی' },
    { id: '4', type: 'game_entry', amount: 15000, date: '۱۴۰۳/۰۲/۱۳', status: 'completed', description: 'ورود به بازی - ۳ کارت' },
    { id: '5', type: 'transfer_in', amount: 200000, date: '۱۴۰۳/۰۲/۱۲', status: 'completed', description: 'دریافت از @sara' },
    { id: '6', type: 'withdraw', amount: 300000, date: '۱۴۰۳/۰۲/۱۰', status: 'pending', description: 'درخواست برداشت' },
];

const typeConfig = {
    deposit: { label: 'واریز', icon: '💰', color: '#10b981' },
    withdraw: { label: 'برداشت', icon: '💸', color: '#ef4444' },
    transfer_out: { label: 'انتقال (خروج)', icon: '📤', color: '#f59e0b' },
    transfer_in: { label: 'انتقال (ورود)', icon: '📥', color: '#22c55e' },
    game_win: { label: 'برد در بازی', icon: '🏆', color: '#eab308' },
    game_entry: { label: 'شرکت در بازی', icon: '🎲', color: '#8b5cf6' },
};

export default function FinancialReportsScreen() {
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    const getTransactionColor = (type: string) => {
        const config = typeConfig[type as keyof typeof typeConfig];
        if (type === 'game_entry' || type === 'transfer_out' || type === 'withdraw') {
            return currentColors.error;
        }
        return currentColors.success;
    };

    const getAmountPrefix = (type: string) => {
        if (type === 'game_entry' || type === 'transfer_out' || type === 'withdraw') {
            return '-';
        }
        if (type === 'game_win' || type === 'transfer_in' || type === 'deposit') {
            return '+';
        }
        return '';
    };

    const filteredTransactions = selectedFilter === 'all' 
        ? SAMPLE_TRANSACTIONS 
        : SAMPLE_TRANSACTIONS.filter(t => t.type === selectedFilter);

    const calculateTotals = () => {
        let income = 0;
        let expense = 0;
        filteredTransactions.forEach(t => {
            if (t.type === 'game_win' || t.type === 'transfer_in' || t.type === 'deposit') {
                income += t.amount;
            } else {
                expense += t.amount;
            }
        });
        return { income, expense, balance: income - expense };
    };

    const totals = calculateTotals();

    const renderTransactionItem = ({ item }: { item: typeof SAMPLE_TRANSACTIONS[0] }) => {
        const config = typeConfig[item.type as keyof typeof typeConfig];
        const prefix = getAmountPrefix(item.type);
        const amountColor = getTransactionColor(item.type);

        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: currentColors.border,
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <Text style={{ fontSize: 28 }}>{config?.icon || '📄'}</Text>
                    <View>
                        <Text style={{ color: currentColors.text, fontWeight: 'bold' }}>{config?.label || item.type}</Text>
                        <Text style={{ color: currentColors.textSecondary, fontSize: 11 }}>{item.date}</Text>
                        <Text style={{ color: currentColors.textMuted, fontSize: 10 }}>{item.description}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ color: amountColor, fontWeight: 'bold' }}>
                        {prefix} {item.amount.toLocaleString()} تومان
                    </Text>
                    <View style={{
                        backgroundColor: item.status === 'completed' ? '#10b98120' : '#f59e0b20',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 12,
                        marginTop: 4,
                    }}>
                        <Text style={{
                            color: item.status === 'completed' ? '#10b981' : '#f59e0b',
                            fontSize: 10,
                        }}>
                            {item.status === 'completed' ? 'تأیید شده' : 'در انتظار'}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const filterOptions = [
        { id: 'all', label: 'همه', icon: '📋' },
        { id: 'deposit', label: 'واریز', icon: '💰' },
        { id: 'withdraw', label: 'برداشت', icon: '💸' },
        { id: 'transfer_out', label: 'انتقال خروج', icon: '📤' },
        { id: 'game_win', label: 'برد', icon: '🏆' },
    ];

    return (
        <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            
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
                    گزارشات مالی
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* کارت‌های خلاصه */}
                <View style={{ flexDirection: 'row', gap: 12, margin: 16 }}>
                    <View style={{
                        flex: 1,
                        backgroundColor: currentColors.surfaceLight,
                        borderRadius: 16,
                        padding: 12,
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>مجموع واریز</Text>
                        <Text style={{ color: currentColors.success, fontWeight: 'bold', fontSize: 16 }}>
                            {totals.income.toLocaleString()}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        backgroundColor: currentColors.surfaceLight,
                        borderRadius: 16,
                        padding: 12,
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>مجموع برداشت</Text>
                        <Text style={{ color: currentColors.error, fontWeight: 'bold', fontSize: 16 }}>
                            {totals.expense.toLocaleString()}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        backgroundColor: currentColors.primary + '20',
                        borderRadius: 16,
                        padding: 12,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: currentColors.primary + '40',
                    }}>
                        <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>مانده حساب</Text>
                        <Text style={{ color: currentColors.primary, fontWeight: 'bold', fontSize: 16 }}>
                            {totals.balance.toLocaleString()}
                        </Text>
                    </View>
                </View>

                {/* فیلترها */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: 16, marginBottom: 16 }}>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        {filterOptions.map((filter) => (
                            <TouchableOpacity
                                key={filter.id}
                                onPress={() => setSelectedFilter(filter.id)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 6,
                                    paddingHorizontal: 14,
                                    paddingVertical: 8,
                                    borderRadius: 20,
                                    backgroundColor: selectedFilter === filter.id ? currentColors.primary : currentColors.surfaceLight,
                                }}
                            >
                                <Text>{filter.icon}</Text>
                                <Text style={{ color: selectedFilter === filter.id ? currentColors.surface : currentColors.text }}>
                                    {filter.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                {/* لیست تراکنش‌ها */}
                <FlatList
                    data={filteredTransactions}
                    renderItem={renderTransactionItem}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    ListEmptyComponent={
                        <View style={{ padding: 40, alignItems: 'center' }}>
                            <Text style={{ fontSize: 48, marginBottom: 16 }}>📭</Text>
                            <Text style={{ color: currentColors.textSecondary }}>هیچ تراکنشی یافت نشد</Text>
                        </View>
                    }
                />
            </ScrollView>
        </LinearGradient>
    );
}