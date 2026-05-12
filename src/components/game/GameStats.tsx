// src/components/game/GameStats.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface GameStatsProps {
    lineWinner: string | null;
    fullWinner: string | null;
    colors: any;
}

export default function GameStats({ lineWinner, fullWinner, colors }: GameStatsProps) {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: colors.surfaceLight,
            marginHorizontal: 12,
            marginVertical: 8,
            borderRadius: 16,
        }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: colors.textSecondary, fontSize: 12 }}>برنده خطی</Text>
                <Text style={{ color: lineWinner ? '#10b981' : colors.textMuted, fontWeight: 'bold' }}>
                    {lineWinner || '---'}
                </Text>
            </View>
            <View style={{ width: 1, backgroundColor: colors.border }} />
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: colors.textSecondary, fontSize: 12 }}>برنده پر</Text>
                <Text style={{ color: fullWinner ? '#eab308' : colors.textMuted, fontWeight: 'bold' }}>
                    {fullWinner || '---'}
                </Text>
            </View>
        </View>
    );
}