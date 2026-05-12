// src/components/lobby/RoomCard.tsx
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useUIStore } from '../../stores/uiStore';
import { colors } from '../../constants/colors';

interface RoomCardProps {
    id: number;
    name: string;
    price: number;
    prize: string;
    players: number;
    maxPlayers: number;
    image: any;
    color: string;
    gradientColors: string[];
}

export default function RoomCard({
    id,
    name,
    price,
    prize,
    players,
    maxPlayers,
    image,
    color,
    gradientColors,
}: RoomCardProps) {
    const { theme } = useUIStore();
    const currentColors = colors[theme];

    const handlePress = () => {
        router.push(`/game/${id}`);
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            style={styles.container}
        >
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                {/* تصویر اسکناس */}
                <View style={styles.imageContainer}>
                    <Image
                        source={image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* اطلاعات اتاق */}
                <View style={styles.infoContainer}>
                    <Text style={[styles.roomName, { color: currentColors.text }]}>
                        {name}
                    </Text>
                    <View style={styles.prizeContainer}>
                        <Text style={[styles.prizeLabel, { color: currentColors.textMuted }]}>
                            جایزه:
                        </Text>
                        <Text style={[styles.prizeAmount, { color: currentColors.primary }]}>
                            {prize} تومان
                        </Text>
                    </View>
                </View>

                {/* تعداد بازیکنان آنلاین */}
                <View style={styles.playersContainer}>
                    <View style={styles.onlineIndicator} />
                    <Text style={[styles.playersCount, { color: currentColors.textSecondary }]}>
                        {players} / {maxPlayers}
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 6,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    imageContainer: {
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 55,
        height: 35,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 12,
    },
    roomName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    prizeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    prizeLabel: {
        fontSize: 10,
        marginRight: 4,
    },
    prizeAmount: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    playersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    onlineIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22c55e',
        marginRight: 4,
    },
    playersCount: {
        fontSize: 11,
    },
});