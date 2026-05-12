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

// src/app/_layout.tsx
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { loadFonts } from '../styles/fonts';
import { useLanguageStore } from '../stores/languageStore';
import { loadSavedLanguage } from '../i18n';

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { setLocale } = useLanguageStore();
  
  useEffect(() => {
    async function prepare() {
      try {
        // بارگذاری فونت‌ها
        await loadFonts();
        
        // بارگذاری زبان ذخیره شده
        const savedLang = await loadSavedLanguage();
        setLocale(savedLang as 'fa' | 'en');
        
        setFontsLoaded(true);
      } catch (error) {
        console.warn('Error loading fonts:', error);
        setFontsLoaded(true); // ادامه حتی با خطا
      }
    }
    
    prepare();
  }, []);
  
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e' }}>
        <ActivityIndicator size="large" color="#eab308" />
      </View>
    );
  }
  
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="game/[roomId]" options={{ title: 'بازی بینگو' }} />
      </Stack>
    </>
  );
}
// src/app/_layout.tsx
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { loadFonts } from '../styles/fonts';
import { useLanguageStore } from '../stores/languageStore';
import { loadSavedLanguage } from '../i18n';

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { setLocale } = useLanguageStore();
  
  useEffect(() => {
    async function prepare() {
      try {
        // بارگذاری فونت‌ها
        await loadFonts();
        
        // بارگذاری زبان ذخیره شده
        const savedLang = await loadSavedLanguage();
        setLocale(savedLang as 'fa' | 'en');
        
        setFontsLoaded(true);
      } catch (error) {
        console.warn('Error loading fonts:', error);
        setFontsLoaded(true); // ادامه حتی با خطا
      }
    }
    
    prepare();
  }, []);
  
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e' }}>
        <ActivityIndicator size="large" color="#eab308" />
      </View>
    );
  }
  
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="game/[roomId]" options={{ title: 'بازی بینگو' }} />
      </Stack>
    </>
  );
}