// src/components/game/GameHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface GameHeaderProps {
    balance: number;
    linePrize: number;
    fullPrize: number;
    currentNumber: number | null;
    isMuted: boolean;
    onMuteToggle: () => void;
    colors: any;
}

export default function GameHeader({
    balance,
    linePrize,
    fullPrize,
    currentNumber,
    isMuted,
    onMuteToggle,
    colors,
}: GameHeaderProps) {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        }}>
            {/* بخش چپ: موجودی و جوایز */}
            <View style={{ flex: 2 }}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <View style={{
                        backgroundColor: colors.surfaceLight,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12,
                    }}>
                        <Text style={{ color: colors.textSecondary, fontSize: 10 }}>موجودی</Text>
                        <Text style={{ color: colors.primary, fontSize: 12, fontWeight: 'bold' }}>
                            {balance?.toLocaleString()}
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: '#10b98120',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12,
                    }}>
                        <Text style={{ color: colors.textSecondary, fontSize: 10 }}>برد خطی</Text>
                        <Text style={{ color: '#10b981', fontSize: 12, fontWeight: 'bold' }}>
                            {linePrize.toLocaleString()}
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: '#eab30820',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12,
                    }}>
                        <Text style={{ color: colors.textSecondary, fontSize: 10 }}>برد پر</Text>
                        <Text style={{ color: '#eab308', fontSize: 12, fontWeight: 'bold' }}>
                            {fullPrize.toLocaleString()}
                        </Text>
                    </View>
                </View>
            </View>
            
            {/* بخش وسط: عدد فعلی */}
            <View style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                alignItems: 'center',
            }}>
                <Text style={{ color: colors.surface, fontSize: 10 }}>عدد</Text>
                <Text style={{ color: colors.surface, fontSize: 24, fontWeight: 'bold', fontFamily: 'Orbitron-Bold' }}>
                    {currentNumber || '??'}
                </Text>
            </View>
            
            {/* بخش راست: دکمه صدا */}
            <TouchableOpacity onPress={onMuteToggle} style={{ padding: 8 }}>
                <Text style={{ fontSize: 24 }}>{isMuted ? '🔇' : '🔊'}</Text>
            </TouchableOpacity>
        </View>
    );
}