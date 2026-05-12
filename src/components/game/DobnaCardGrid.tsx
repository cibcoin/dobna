// src/components/game/BingoCardGrid.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import BingoCard from '../BingoCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32) / 2 - 8;

interface BingoCardGridProps {
    myCards: any[];
    otherCards: any[];
    markedNumbers: Set<number>;
    blinkingNumber: number | null;
    colors: any;
}

export default function BingoCardGrid({
    myCards,
    otherCards,
    markedNumbers,
    blinkingNumber,
    colors,
}: BingoCardGridProps) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12 }}>
            {/* کارت‌های من (در بالا) */}
            {myCards.length > 0 && (
                <>
                    <Text style={{ color: colors.primary, fontWeight: 'bold', marginBottom: 8, marginTop: 4 }}>
                        کارت‌های من ({myCards.length} کارت)
                    </Text>
                    <View style={styles.cardsRow}>
                        {myCards.map((card, index) => (
                            <BingoCard
                                key={card.id}
                                cardNumber={card.card_number}
                                userName={card.username}
                                numbers={card.card_data}
                                markedNumbers={markedNumbers}
                                blinkingNumber={blinkingNumber}
                                width={CARD_WIDTH}
                                colors={colors}
                            />
                        ))}
                    </View>
                </>
            )}
            
            {/* کارت‌های سایر بازیکنان */}
            {otherCards.length > 0 && (
                <>
                    <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 16 }} />
                    <Text style={{ color: colors.textSecondary, fontWeight: 'bold', marginBottom: 8 }}>
                        سایر بازیکنان ({otherCards.length} کارت)
                    </Text>
                    
                    {/* گروه‌بندی بر اساس کاربر */}
                    {Object.entries(
                        otherCards.reduce((acc, card) => {
                            if (!acc[card.user_id]) acc[card.user_id] = [];
                            acc[card.user_id].push(card);
                            return acc;
                        }, {} as Record<string, any[]>)
                    ).map(([userId, cards]) => (
                        <View key={userId} style={{ marginBottom: 16 }}>
                            <Text style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 4 }}>
                                {cards[0].username} ({cards.length} کارت)
                            </Text>
                            <View style={styles.cardsRow}>
                                {cards.map((card) => (
                                    <BingoCard
                                        key={card.id}
                                        cardNumber={card.card_number}
                                        userName={card.username}
                                        numbers={card.card_data}
                                        markedNumbers={markedNumbers}
                                        blinkingNumber={blinkingNumber}
                                        width={CARD_WIDTH}
                                        colors={colors}
                                    />
                                ))}
                            </View>
                        </View>
                    ))}
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    cardsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 8,
    },
});