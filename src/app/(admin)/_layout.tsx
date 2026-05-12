// src/app/(admin)/_layout.tsx
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { isCurrentUserAdmin } from '../../lib/adminAuth';

export default function AdminLayout() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        checkAdminAccess();
    }, []);

    const checkAdminAccess = async () => {
        const admin = await isCurrentUserAdmin();
        if (!admin) {
            router.replace('/(tabs)');
        }
        setIsAdmin(admin);
    };

    if (isAdmin === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#eab308" />
            </View>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="deposits" />
            <Stack.Screen name="withdraws" />
            <Stack.Screen name="winners" />
            <Stack.Screen name="card-stats" />
            <Stack.Screen name="support" />
            <Stack.Screen name="users" />
            <Stack.Screen name="reports" />
        </Stack>
    );
}