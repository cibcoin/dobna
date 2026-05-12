// src/app/(drawer)/my-wins.tsx
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
const SAMPLE_WINS = [
    { id: '1', amount: 121500, type: 'line', room: '۵,۰۰۰ تومانی', date: '۱۴۰۳/۰۲/۱۵', time: '۱۵:۳۰' },
    { id: '2', amount: 243000, type: 'full', room: '۱۰,۰۰۰ تومانی', date: '۱۴۰۳/۰۲/۱۴', time: '۲۲:۱۵' },
    { id: '3', amount: 54000, type: 'line', room: '۲۰,۰۰۰ تومانی', date: '۱۴۰۳/۰۲/۱۳', time: '۱۸:۴۵' },
    { id: '4', amount: 121500, type: 'line', room: '۵,۰۰۰ تومانی', date: '۱۴۰۳/۰۲/۱۲', time: '۱۲:۰۰' },
    { id: '5', amount: 486000, type: 'full', room: '۲۰,۰۰۰ تومانی', date: '۱۴۰۳/۰۲/۱۰', time: '۲۰:۳۰' },
];

export default function MyWinsScreen() {
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    const [filter, setFilter] = useState<'all' | 'line' | 'full'>('all');

    const filteredWins = SAMPLE_WINS.filter(win => {
        if (filter === 'all') return true;
        return win.type === filter;
    });

    const totalAmount = filteredWins.reduce((sum, win) => sum + win.amount, 0);

    const renderWinItem = ({ item }: { item: typeof SAMPLE_WINS[0] }) => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: currentColors.border,
        }}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Text style={{ fontSize: 18 }}>{item.type === 'line' ? '📊' : '🏆'}</Text>
                    <Text style={{ color: currentColors.text, fontWeight: 'bold' }}>
                        {item.type === 'line' ? 'برد خطی' : 'برد پر'}
                    </Text>
                </View>
                <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>
                    {item.room} | {item.date} - {item.time}
                </Text>
            </View>
            <Text style={{ color: currentColors.primary, fontWeight: 'bold', fontSize: 16 }}>
                {item.amount.toLocaleString()} تومان
            </Text>
        </View>
    );

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
                    لیست بردهای من
                </Text>
                <View style={{ width: 40 }} />
            </View>

            {/* مجموع بردها */}
            <View style={{
                margin: 16,
                backgroundColor: currentColors.surfaceLight,
                borderRadius: 16,
                padding: 16,
                alignItems: 'center',
            }}>
                <Text style={{ color: currentColors.textSecondary, marginBottom: 4 }}>مجموع بردها</Text>
                <Text style={{ color: currentColors.primary, fontSize: 28, fontWeight: 'bold' }}>
                    {totalAmount.toLocaleString()} تومان
                </Text>
            </View>

            {/* فیلترها */}
            <View style={{
                flexDirection: 'row',
                marginHorizontal: 16,
                marginBottom: 16,
                backgroundColor: currentColors.surfaceLight,
                borderRadius: 12,
                padding: 4,
            }}>
                {[
                    { id: 'all', label: 'همه', icon: '📋' },
                    { id: 'line', label: 'خطی', icon: '📊' },
                    { id: 'full', label: 'پر', icon: '🏆' },
                ].map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => setFilter(item.id as any)}
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            paddingVertical: 10,
                            borderRadius: 8,
                            backgroundColor: filter === item.id ? currentColors.primary : 'transparent',
                        }}
                    >
                        <Text>{item.icon}</Text>
                        <Text style={{ color: filter === item.id ? currentColors.surface : currentColors.textSecondary }}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* لیست بردها */}
            <FlatList
                data={filteredWins}
                renderItem={renderWinItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={{ padding: 40, alignItems: 'center' }}>
                        <Text style={{ fontSize: 48, marginBottom: 16 }}>🏆</Text>
                        <Text style={{ color: currentColors.textSecondary }}>هنوز بردی ثبت نشده است</Text>
                    </View>
                }
            />
        </LinearGradient>
    );
}