// src/components/lobby/FloatingChatButton.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    PanResponder,
    Dimensions,
} from 'react-native';
import { useUIStore } from '../../stores/uiStore';
import { colors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

interface FloatingChatButtonProps {
    unreadCount?: number;
    onPress: () => void;
}

export default function FloatingChatButton({ unreadCount = 0, onPress }: FloatingChatButtonProps) {
    const { theme } = useUIStore();
    const currentColors = colors[theme];
    
    const [position] = useState(new Animated.ValueXY({ x: width - 70, y: height - 120 }));
    const [isDragging, setIsDragging] = useState(false);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            setIsDragging(true);
        },
        onPanResponderMove: (_, gesture) => {
            Animated.event([
                { dx: position.x, dy: position.y },
            ], { useNativeDriver: false })(_, gesture);
        },
        onPanResponderRelease: (_, gesture) => {
            setIsDragging(false);
            // محدود کردن به لبه‌های صفحه
            let newX = position.x._value;
            let newY = position.y._value;
            
            // محدودیت افقی
            if (newX < 10) newX = 10;
            if (newX > width - 60) newX = width - 60;
            
            // محدودیت عمودی
            if (newY < 100) newY = 100;
            if (newY > height - 150) newY = height - 150;
            
            Animated.spring(position, {
                toValue: { x: newX, y: newY },
                useNativeDriver: false,
                speed: 10,
                bounciness: 5,
            }).start();
        },
    });

    const handlePress = () => {
        if (!isDragging) {
            onPress();
        }
    };

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    transform: position.getTranslateTransform(),
                    zIndex: 1000,
                },
            ]}
            {...panResponder.panHandlers}
        >
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={0.8}
                style={[
                    styles.button,
                    { backgroundColor: currentColors.primary },
                ]}
            >
                <Text style={styles.chatIcon}>💬</Text>
                {unreadCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = {
    button: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    chatIcon: {
        fontSize: 28,
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#ef4444',
        borderRadius: 12,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
};