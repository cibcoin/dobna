// src/components/UI/Stepper.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface StepperProps {
    value: number;
    onIncrease: () => void;
    onDecrease: () => void;
    min: number;
    max: number;
    colors: any;
}

export default function Stepper({ value, onIncrease, onDecrease, min, max, colors }: StepperProps) {
    return (
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
            <TouchableOpacity
                onPress={onDecrease}
                disabled={value <= min}
                style={[styles.button, { backgroundColor: colors.surfaceLight, opacity: value <= min ? 0.5 : 1 }]}
            >
                <Text style={[styles.buttonText, { color: colors.primary }]}>-</Text>
            </TouchableOpacity>
            <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
            <TouchableOpacity
                onPress={onIncrease}
                disabled={value >= max}
                style={[styles.button, { backgroundColor: colors.surfaceLight, opacity: value >= max ? 0.5 : 1 }]}
            >
                <Text style={[styles.buttonText, { color: colors.primary }]}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        overflow: 'hidden',
    },
    button: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    value: {
        width: 60,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});