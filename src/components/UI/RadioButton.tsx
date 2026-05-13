// src/components/UI/RadioButton.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface RadioButtonProps {
    label: string;
    description?: string;
    selected: boolean;
    onPress: () => void;
    colors: any;
}

export default function RadioButton({ label, description, selected, onPress, colors }: RadioButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.7}>
            <View style={[styles.radio, { borderColor: selected ? colors.primary : colors.textMuted }]}>
                {selected && <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />}
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
                {description && <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        marginRight: 12,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 13,
        marginTop: 4,
        lineHeight: 20,
    },
});