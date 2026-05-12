import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from '../i18n/hooks/useTranslation';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function RootLayout() {
  const { isRTL } = useTranslation();
  
  useEffect(() => {
    // تنظیم عنوان صفحه برای وب
    if (Platform.OS === 'web') {
      document.title = 'دوبنا | DOBNA - بازی آنلاین بینگو';
      
      // متا تگ‌های SEO
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'دوبنا: بازی آنلاین بینگو با جایزه نقدی. بازی کن و برنده شو!');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = 'دوبنا: بازی آنلاین بینگو با جایزه نقدی. بازی کن و برنده شو!';
        document.head.appendChild(meta);
      }
    }
  }, []);
  
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a2e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="game/[roomId]" 
          options={{ 
            title: isRTL ? 'بازی بینگو' : 'Bingo Game',
            headerBackTitle: isRTL ? 'بازگشت' : 'Back'
          }}
        />
      </Stack>
    </>
  );
}