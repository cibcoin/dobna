// src/app/(drawer)/_layout.tsx
import { Stack } from 'expo-router';

export default function DrawerLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="account" />
            <Stack.Screen name="deposit-withdraw" />
            <Stack.Screen name="transfer" />
            <Stack.Screen name="financial-reports" />
            <Stack.Screen name="my-wins" />
            <Stack.Screen name="create-group" />
            <Stack.Screen name="top-groups" />
            <Stack.Screen name="support" />
            <Stack.Screen name="faq" />
            <Stack.Screen name="terms" />
        </Stack>
    );
}