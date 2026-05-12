// src/components/game/WinnerModal.tsx
import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const { width, height } = Dimensions.get('window');

interface WinnerModalProps {
    visible: boolean;
    winners: { type: 'line' | 'full'; name: string; amount: number }[];
    onClose: () => void;
    colors: any;
}

export default function WinnerModal({ visible, winners, onClose, colors }: WinnerModalProps) {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    speed: 12,
                    bounciness: 10,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            scaleAnim.setValue(0);
            opacityAnim.setValue(0);
        }
    }, [visible]);

    const getWinnerIcon = (type: string) => {
        return type === 'line' ? '📊' : '🏆';
    };

    const getWinnerTitle = (type: string) => {
        return type === 'line' ? 'برنده خطی' : 'برنده اصلی';
    };

    const getWinnerColor = (type: string) => {
        return type === 'line' ? '#10b981' : '#eab308';
    };

    return (
        <Modal visible={visible} transparent animationType="none">
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.8)',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ConfettiCannon
                    count={200}
                    origin={{ x: width / 2, y: -100 }}
                    fallSpeed={3000}
                    fadeOut={true}
                    autoStart={visible}
                />
                
                <Animated.View style={{
                    backgroundColor: colors.surface,
                    borderRadius: 32,
                    padding: 24,
                    alignItems: 'center',
                    width: width - 48,
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                    borderWidth: 2,
                    borderColor: colors.primary,
                }}>
                    <Text style={{ fontSize: 64, marginBottom: 16 }}>🎉</Text>
                    <Text style={{ color: colors.primary, fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
                        برنده اعلام شد!
                    </Text>
                    
                    {winners.map((winner, index) => (
                        <View key={index} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            paddingVertical: 12,
                            borderBottomWidth: index < winners.length - 1 ? 1 : 0,
                            borderBottomColor: colors.border,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                <Text style={{ fontSize: 32 }}>{getWinnerIcon(winner.type)}</Text>
                                <View>
                                    <Text style={{ color: getWinnerColor(winner.type), fontWeight: 'bold' }}>
                                        {getWinnerTitle(winner.type)}
                                    </Text>
                                    <Text style={{ color: colors.text }}>{winner.name}</Text>
                                </View>
                            </View>
                            <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 16 }}>
                                {winner.amount.toLocaleString()} تومان
                            </Text>
                        </View>
                    ))}
                    
                    <TouchableOpacity
                        onPress={onClose}
                        style={{
                            backgroundColor: colors.primary,
                            paddingVertical: 12,
                            paddingHorizontal: 32,
                            borderRadius: 30,
                            marginTop: 24,
                        }}
                    >
                        <Text style={{ color: colors.surface, fontWeight: 'bold' }}>بازگشت به بازی</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
}