// src/app/(drawer)/top-groups.tsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';

const TOP_GROUPS = [
    { id: '1', name: 'پادشاهان بینگو', members: 1245, wins: 3452, rank: 1 },
    { id: '2', name: 'ستاره‌های بازی', members: 982, wins: 2876, rank: 2 },
    { id: '3', name: 'مبارزان بینگو', members: 756, wins: 2143, rank: 3 },
    { id: '4', name: 'طلایی‌های دوبنا', members: 543, wins: 1876, rank: 4 },
    { id: '5', name: 'قهرمانان نئون', members: 432, wins: 1567, rank: 5 },
];

export default function TopGroupsScreen() {
    const { theme } = useThemeStore();
    const currentColors = colors[theme];

    const renderGroupItem = ({ item, index }: { item: typeof TOP_GROUPS[0], index: number }) => (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 14,
            backgroundColor: currentColors.surfaceLight,
            borderRadius: 12,
            marginBottom: 8,
        }}>
            <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: item.rank === 1 ? '#eab308' : item.rank === 2 ? '#94a3b8' : item.rank === 3 ? '#cd7f32' : currentColors.surface,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{ color: item.rank <= 3 ? '#1a1a2e' : currentColors.text, fontWeight: 'bold', fontSize: 16 }}>
                    {item.rank}
                </Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ color: currentColors.text, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>
                    👥 {item.members.toLocaleString()} عضو | 🏆 {item.wins.toLocaleString()} برد
                </Text>
            </View>
            <TouchableOpacity style={{
                backgroundColor: currentColors.primary + '20',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
            }}>
                <Text style={{ color: currentColors.primary, fontSize: 12 }}>مشاهده</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal