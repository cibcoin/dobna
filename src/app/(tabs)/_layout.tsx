// src/app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { useTranslation } from '../../i18n/hooks/useTranslation';

export default function TabsLayout() {
    const { t } = useTranslation();

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#1a1a2e',
                    borderTopColor: '#2d3748',
                },
                tabBarActiveTintColor: '#eab308',
                tabBarInactiveTintColor: '#718096',
                headerStyle: {
                    backgroundColor: '#1a1a2e',
                },
                headerTintColor: '#fff',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: t('games', {}, 'common'),
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: size, color }}>🎲</Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: t('profile', {}, 'common'),
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: size, color }}>👤</Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: t('chat', {}, 'common'),
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: size, color }}>💬</Text>
                    ),
                }}
            />
        </Tabs>
    );
}