import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';

const roomTiers = [
  { id: 1, name: '۵,۰۰۰ تومانی', price: 5000, image: require('../../assets/notes/5000.png') },
  { id: 2, name: '۱۰,۰۰۰ تومانی', price: 10000, image: require('../../assets/notes/10000.png') },
  { id: 3, name: '۲۰,۰۰۰ تومانی', price: 20000, image: require('../../assets/notes/20000.png') },
  { id: 4, name: '۵۰,۰۰۰ تومانی', price: 50000, image: require('../../assets/notes/50000.png') },
  { id: 5, name: '۱۰۰,۰۰۰ تومانی', price: 100000, image: require('../../assets/notes/100000.png') },
];

export default function LobbyScreen() {
  const [balance, setBalance] = useState(0);
  const [selectedCards, setSelectedCards] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchBalance();
    
    // Realtime subscription برای بروزرسانی موجودی
    const subscription = supabase
      .channel('profile-balance')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${user?.id}` },
        (payload) => setBalance(payload.new.balance)
      )
      .subscribe();
      
    return () => { subscription.unsubscribe(); };
  }, []);

  const fetchBalance = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('balance')
      .eq('id', user?.id)
      .single();
    if (data) setBalance(data.balance);
  };

  const joinRoom = async (tierId: number, cardPrice: number) => {
    const totalCost = cardPrice * selectedCards;
    
    if (balance < totalCost) {
      alert('موجودی کافی نیست!');
      return;
    }
    
    setLoading(true);
    
    const { data, error } = await supabase.rpc('add_user_to_room', {
      p_user_id: user?.id,
      p_tier_id: tierId,
      p_cards_count: selectedCards
    });
    
    if (error) {
      alert('خطا در اتصال به اتاق');
    } else if (data.success) {
      if (data.action === 'joined') {
        // هدایت به صفحه بازی
        // navigation.navigate('Game', { roomId: data.room_id });
      } else {
        alert(`در صف انتظار هستید. جایگاه شما: ${data.queue_position}`);
      }
    }
    
    setLoading(false);
  };

  return (
    <ScrollView className="flex-1 bg-gray-900 p-4">
      {/* نمایش موجودی */}
      <View className="bg-green-800 rounded-xl p-4 mb-6">
        <Text className="text-white text-lg">موجودی حساب</Text>
        <Text className="text-white text-3xl font-bold">{balance.toLocaleString()} تومان</Text>
      </View>
      
      {/* انتخاب تعداد کارت */}
      <View className="bg-gray-800 rounded-xl p-4 mb-6">
        <Text className="text-white text-lg mb-3">تعداد کارت‌ها (حداکثر ۳):</Text>
        <View className="flex-row justify-around">
          {[1, 2, 3].map(num => (
            <TouchableOpacity
              key={num}
              onPress={() => setSelectedCards(num)}
              className={`w-16 h-16 rounded-full justify-center items-center ${
                selectedCards === num ? 'bg-yellow-500' : 'bg-gray-600'
              }`}
            >
              <Text className="text-white text-2xl font-bold">{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="text-gray-400 text-center mt-3">
          هزینه کل: {(selectedCards * 5000).toLocaleString()} تومان
        </Text>
      </View>
      
      {/* لیست اتاق‌ها */}
      <Text className="text-white text-xl font-bold mb-4">اتاق‌های عمومی</Text>
      {roomTiers.map((tier) => (
        <TouchableOpacity
          key={tier.id}
          onPress={() => joinRoom(tier.id, tier.price)}
          disabled={loading}
          className="bg-gray-800 rounded-xl p-4 mb-4 flex-row items-center"
        >
          <Image source={tier.image} className="w-20 h-12" resizeMode="contain" />
          <View className="flex-1 ml-4">
            <Text className="text-white text-lg font-bold">{tier.name}</Text>
            <Text className="text-gray-400">هر کارت: {tier.price.toLocaleString()} تومان</Text>
          </View>
          <View className="bg-yellow-600 px-4 py-2 rounded-lg">
            <Text className="text-white">شرکت</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
// src/app/(tabs)/index.tsx
import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../../stores/authStore';
import { useTranslation } from '../../i18n/hooks/useTranslation';

const ROOM_TIERS = [
    { id: 1, name: '۵,۰۰۰ تومانی', price: 5000, prize: '۱۲۱,۵۰۰', color: '#10b981', image: require('../../../assets/images/notes/5000.png') },
    { id: 2, name: '۱۰,۰۰۰ تومانی', price: 10000, prize: '۲۴۳,۰۰۰', color: '#3b82f6', image: require('../../../assets/images/notes/10000.png') },
    { id: 3, name: '۲۰,۰۰۰ تومانی', price: 20000, prize: '۴۸۶,۰۰۰', color: '#8b5cf6', image: require('../../../assets/images/notes/20000.png') },
    { id: 4, name: '۵۰,۰۰۰ تومانی', price: 50000, prize: '۱,۲۱۵,۰۰۰', color: '#f59e0b', image: require('../../../assets/images/notes/50000.png') },
    { id: 5, name: '۱۰۰,۰۰۰ تومانی', price: 100000, prize: '۲,۴۳۰,۰۰۰', color: '#ef4444', image: require('../../../assets/images/notes/100000.png') },
];

export default function LobbyScreen() {
    const { t } = useTranslation();
    const { user, balance } = useAuthStore();

    return (
        <LinearGradient
            colors={['#0f0c29', '#302b63', '#24243e']}
            className="flex-1"
        >
            <ScrollView className="flex-1 px-4 pt-6">
                {/* هدر با موجودی */}
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-gray-400 text-sm">{t('welcome', {}, 'common')}</Text>
                        <Text className="text-white text-xl font-bold">{user?.username}</Text>
                    </View>
                    <View className="bg-gray-800 rounded-xl px-4 py-2">
                        <Text className="text-gray-400 text-xs">{t('balance', {}, 'common')}</Text>
                        <Text className="text-yellow-500 text-lg font-bold font-orbitron">
                            {balance?.toLocaleString()} {t('toman', {}, 'common')}
                        </Text>
                    </View>
                </View>

                {/* کارت‌های اتاق‌ها */}
                <Text className="text-white text-lg font-bold mb-4">{t('public_rooms', {}, 'room')}</Text>
                
                {ROOM_TIERS.map((tier) => (
                    <TouchableOpacity
                        key={tier.id}
                        className="bg-gray-800/80 rounded-2xl p-4 mb-4 flex-row items-center"
                        activeOpacity={0.7}
                    >
                        <Image
                            source={tier.image}
                            className="w-16 h-10"
                            resizeMode="contain"
                        />
                        <View className="flex-1 ml-4">
                            <Text className="text-white text-lg font-bold">{tier.name}</Text>
                            <Text className="text-gray-400 text-sm">
                                {t('entry_fee', {}, 'room')}: {tier.price.toLocaleString()} تومان
                            </Text>
                            <Text className="text-yellow-500 text-sm">
                                🏆 {t('max_prize', {}, 'room')}: {tier.prize.toLocaleString()} تومان
                            </Text>
                        </View>
                        <View className="bg-yellow-600 px-4 py-2 rounded-xl">
                            <Text className="text-white font-bold">{t('play', {}, 'common')}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* دکمه‌های سریع */}
                <View className="flex-row justify-between mt-4 mb-8">
                    <TouchableOpacity className="flex-1 bg-gray-800 rounded-xl p-4 mx-1 items-center">
                        <Text className="text-2xl mb-1">👥</Text>
                        <Text className="text-white text-sm">{t('private_room', {}, 'room')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-gray-800 rounded-xl p-4 mx-1 items-center">
                        <Text className="text-2xl mb-1">💰</Text>
                        <Text className="text-white text-sm">{t('deposit', {}, 'common')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-gray-800 rounded-xl p-4 mx-1 items-center">
                        <Text className="text-2xl mb-1">📤</Text>
                        <Text className="text-white text-sm">{t('transfer', {}, 'common')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}