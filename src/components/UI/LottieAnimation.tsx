// src/components/UI/LottieAnimation.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { animations, AnimationKey } from '../../lib/animations';

interface LottieAnimationProps {
    name: AnimationKey;
    loop?: boolean;
    autoPlay?: boolean;
    speed?: number;
    style?: ViewStyle;
    onFinish?: () => void;
}

export default function LottieAnimation({
    name,
    loop = true,
    autoPlay = true,
    speed = 1,
    style,
    onFinish,
}: LottieAnimationProps) {
    const animationRef = useRef<LottieView>(null);

    useEffect(() => {
        if (autoPlay && animationRef.current) {
            animationRef.current.play();
        }
    }, [autoPlay]);

    return (
        <View style={[styles.container, style]}>
            <LottieView
                ref={animationRef}
                source={animations[name]}
                loop={loop}
                speed={speed}
                onAnimationFinish={onFinish}
                style={styles.animation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: '100%',
        height: '100%',
    },
});