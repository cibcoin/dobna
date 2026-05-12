import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    const { data, error } = await supabase.from('profiles').select('count');
    if (error) {
      console.error('Connection error:', error);
      setConnected(false);
    } else {
      setConnected(true);
    }
  };

  return (
    <View className="flex-1 bg-gray-900 justify-center items-center p-4">
      <Text className="text-white text-2xl font-bold mb-4">
        🎲 بازی بینگو
      </Text>
      
      <View className={`px-4 py-2 rounded-lg mb-6 ${connected ? 'bg-green-600' : 'bg-red-600'}`}>
        <Text className="text-white">
          {connected ? '✅ متصل به Supabase' : '❌ خطا در اتصال'}
        </Text>
      </View>
      
      <TouchableOpacity 
        className="bg-yellow-600 px-6 py-3 rounded-lg"
        onPress={() => Alert.alert('خوش آمدید', 'بازی در حال ساخت است...')}
      >
        <Text className="text-white text-lg font-bold">شروع بازی</Text>
      </TouchableOpacity>
    </View>
  );
}
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from '../i18n/hooks/useTranslation';
import { Link } from 'expo-router';
import { APP_CONFIG } from '../constants/config';

export default function HomeScreen() {
  const { t, isRTL } = useTranslation();
  
  return (
    <View className="flex-1 bg-gray-900">
      {/* هدر با لوگو */}
      <View className="items-center pt-12 pb-6">
        <Text className="text-yellow-500 text-4xl font-bold">
          {t('app_name', {}, 'common')}
        </Text>
        <Text className="text-gray-400 text-sm mt-1">
          {t('app_subtitle', {}, 'common')}
        </Text>
      </View>
      
      {/* محتوای اصلی */}
      <View className="flex-1 px-4">
        <Link href="/(tabs)" asChild>
          <TouchableOpacity className="bg-yellow-600 rounded-xl p-4 mb-4">
            <Text className="text-white text-center font-bold text-lg">
              {t('start_game', {}, 'common') || 'شروع بازی'}
            </Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/(tabs)/rooms" asChild>
          <TouchableOpacity className="bg-gray-800 rounded-xl p-4">
            <Text className="text-white text-center font-bold text-lg">
              {t('public_rooms', {}, 'room')}
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      
      {/* فوتر با دامنه */}
      <View className="py-4 items-center">
        <Text className="text-gray-600 text-xs">
          {APP_CONFIG.domain}
        </Text>
      </View>
    </View>
  );
}