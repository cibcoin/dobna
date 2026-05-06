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