// src/components/lobby/LobbyHeader.tsx
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { colors } from '../../constants/colors';
import Avatar from '../UI/Avatar';

export default function LobbyHeader() {
    const { user, balance } = useAuthStore();
    const { theme } = useUIStore();
    const currentColors = colors[theme];

    return (
        <View 
            style={[
                styles.container,
                { 
                    backgroundColor: currentColors.surface,
                    borderBottomColor: currentColors.border,
                }
            ]}
        >
            {/* قسمت چپ - آواتار و نام کاربر */}
            <TouchableOpacity 
                onPress={() => router.push('/profile')}
                style={styles.leftSection}
                activeOpacity={0.7}
            >
                <Avatar 
                    avatarUrl={user?.avatar_url}
                    size={52}
                />
                <View style={styles.userInfo}>
                    <Text style={[styles.userName, { color: currentColors.text }]}>
                        {user?.username || 'کاربر مهمان'}
                    </Text>
                    <Text style={[styles.userNickname, { color: currentColors.textSecondary }]}>
                        @{user?.nickname || user?.username?.toLowerCase() || 'guest'}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* قسمت وسط - لوگو و موجودی */}
            <View style={styles.centerSection}>
                <Text style={[styles.logo, { 
                    color: currentColors.primary,
                    textShadowColor: currentColors.primaryDark,
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 3,
                }]}>
                    DOBNA
                </Text>
                <View style={styles.balanceContainer}>
                    <Text style={[styles.balanceLabel, { color: currentColors.textMuted }]}>
                        اعتبار و موجودی:
                    </Text>
                    <Text style={[styles.balanceAmount, { color: currentColors.primary }]}>
                        {balance?.toLocaleString('fa-IR')} تومان
                    </Text>
                </View>
            </View>

            {/* قسمت راست - منوی همبرگری */}
            <TouchableOpacity 
                onPress={() => router.push('/settings')}
                style={styles.menuButton}
                activeOpacity={0.7}
            >
                <View style={[styles.hamburgerLine, { backgroundColor: currentColors.text }]} />
                <View style={[styles.hamburgerLine, { backgroundColor: currentColors.text }]} />
                <View style={[styles.hamburgerLine, { backgroundColor: currentColors.text }]} />
                <View style={[styles.hamburgerLineShort, { backgroundColor: currentColors.text }]} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
    },
    userInfo: {
        marginLeft: 10,
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    userNickname: {
        fontSize: 11,
    },
    centerSection: {
        flex: 3,
        alignItems: 'center',
    },
    logo: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 2,
    },
    balanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    balanceLabel: {
        fontSize: 10,
        marginRight: 4,
    },
    balanceAmount: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    menuButton: {
        flex: 1,
        alignItems: 'flex-end',
        paddingVertical: 8,
    },
    hamburgerLine: {
        width: 22,
        height: 2,
        marginVertical: 2,
        borderRadius: 1,
    },
    hamburgerLineShort: {
        width: 16,
        height: 2,
        marginVertical: 2,
        borderRadius: 1,
        alignSelf: 'flex-end',
    },
});