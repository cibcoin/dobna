// src/components/lobby/LobbyFooter.tsx
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { useUIStore } from '../../stores/uiStore';
import { colors } from '../../constants/colors';

interface FooterItem {
    id: string;
    label: string;
    icon: string;
    route: string;
}

const FOOTER_ITEMS: FooterItem[] = [
    { id: 'create_group', label: 'ساخت گروه', icon: '👥', route: '/create-group' },
    { id: 'top_groups', label: 'گروه‌های برتر', icon: '🏆', route: '/top-groups' },
    { id: 'transfer', label: 'انتقال اعتبار', icon: '🔄', route: '/transfer' },
    { id: 'deposit_withdraw', label: 'واریز و برداشت', icon: '💰', route: '/deposit-withdraw' },
];

export default function LobbyFooter() {
    const { theme } = useUIStore();
    const currentColors = colors[theme];

    const handlePress = (route: string) => {
        router.push(route);
    };

    return (
        <View 
            style={[
                styles.container,
                {
                    backgroundColor: currentColors.surface,
                    borderTopColor: currentColors.border,
                }
            ]}
        >
            {FOOTER_ITEMS.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => handlePress(item.route)}
                    style={styles.footerItem}
                    activeOpacity={0.7}
                >
                    <Text style={styles.icon}>{item.icon}</Text>
                    <Text style={[styles.label, { color: currentColors.textSecondary }]}>
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: 25,
        borderTopWidth: 1,
    },
    footerItem: {
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    icon: {
        fontSize: 22,
        marginBottom: 4,
    },
    label: {
        fontSize: 11,
        fontWeight: '500',
    },
});