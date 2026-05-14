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

// src/app/(tabs)/index.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LobbyHeader from '../../components/lobby/LobbyHeader';
import RoomCard from '../../components/lobby/RoomCard';
import FloatingChatButton from '../../components/lobby/FloatingChatButton';
import LobbyFooter from '../../components/lobby/LobbyFooter';
import GlobalChatDrawer from '../../components/chat/GlobalChatDrawer';
import { useUIStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { colors } from '../../constants/colors';

// اطلاعات اتاق‌های بازی
const ROOMS = [
    {
        id: 1,
        name: '۵,۰۰۰ تومانی',
        price: 5000,
        prize: '۱۲۱,۵۰۰',
        players: 12,
        maxPlayers: 30,
        image: require('../../../assets/images/notes/5000.png'),
        color: '#10b981',
        gradientColors: ['rgba(16,185,129,0.15)', 'rgba(16,185,129,0.05)'],
    },
    {
        id: 2,
        name: '۱۰,۰۰۰ تومانی',
        price: 10000,
        prize: '۲۴۳,۰۰۰',
        players: 24,
        maxPlayers: 30,
        image: require('../../../assets/images/notes/10000.png'),
        color: '#3b82f6',
        gradientColors: ['rgba(59,130,246,0.15)', 'rgba(59,130,246,0.05)'],
    },
    {
        id: 3,
        name: '۲۰,۰۰۰ تومانی',
        price: 20000,
        prize: '۴۸۶,۰۰۰',
        players: 18,
        maxPlayers: 30,
        image: require('../../../assets/images/notes/20000.png'),
        color: '#8b5cf6',
        gradientColors: ['rgba(139,92,246,0.15)', 'rgba(139,92,246,0.05)'],
    },
    {
        id: 4,
        name: '۵۰,۰۰۰ تومانی',
        price: 50000,
        prize: '۱,۲۱۵,۰۰۰',
        players: 8,
        maxPlayers: 30,
        image: require('../../../assets/images/notes/50000.png'),
        color: '#f59e0b',
        gradientColors: ['rgba(245,158,11,0.15)', 'rgba(245,158,11,0.05)'],
    },
    {
        id: 5,
        name: '۱۰۰,۰۰۰ تومانی',
        price: 100000,
        prize: '۲,۴۳۰,۰۰۰',
        players: 5,
        maxPlayers: 30,
        image: require('../../../assets/images/notes/100000.png'),
        color: '#ef4444',
        gradientColors: ['rgba(239,68,68,0.15)', 'rgba(239,68,68,0.05)'],
    },
];

export default function LobbyScreen() {
    const { theme } = useUIStore();
    const { user } = useAuthStore();
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3); // نمونه عدد
    const currentColors = colors[theme];

    useEffect(() => {
        StatusBar.setBarStyle(theme === 'dark' ? 'light-content' : 'dark-content');
        StatusBar.setBackgroundColor(currentColors.background);
    }, [theme]);

    return (
        <LinearGradient
            colors={[currentColors.background, currentColors.surface]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                {/* هدر */}
                <LobbyHeader />

                {/* لیست اتاق‌ها */}
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {ROOMS.map((room) => (
                        <RoomCard
                            key={room.id}
                            {...room}
                        />
                    ))}
                    <View style={styles.bottomPadding} />
                </ScrollView>

                {/* فوتر */}
                <LobbyFooter />

                {/* دکمه شناور چت */}
                <FloatingChatButton
                    unreadCount={unreadCount}
                    onPress={() => setIsChatVisible(true)}
                />

                {/* صفحه کشویی چت عمومی */}
                <GlobalChatDrawer
                    visible={isChatVisible}
                    onClose={() => setIsChatVisible(false)}
                    onMessageRead={() => setUnreadCount(0)}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingVertical: 12,
    },
    bottomPadding: {
        height: 20,
    },
});
// src/app/(tabs)/index.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';

const ROOM_TIERS = [
    { id: 1, name: '۵,۰۰۰ تومانی', price: 5000, prize: '۲۴۳,۰۰۰', icon: '💰', gradient: ['#10b98120', '#10b98105'] },
    { id: 2, name: '۱۰,۰۰۰ تومانی', price: 10000, prize: '۴۸۶,۰۰۰', icon: '💰', gradient: ['#3b82f620', '#3b82f605'] },
    { id: 3, name: '۲۰,۰۰۰ تومانی', price: 20000, prize: '۹۷۲,۰۰۰', icon: '💰', gradient: ['#8b5cf620', '#8b5cf605'] },
    { id: 4, name: '۵۰,۰۰۰ تومانی', price: 50000, prize: '۲,۴۳۰,۰۰۰', icon: '💰', gradient: ['#f59e0b20', '#f59e0b05'] },
    { id: 5, name: '۱۰۰,۰۰۰ تومانی', price: 100000, prize: '۴,۸۶۰,۰۰۰', icon: '💰', gradient: ['#ef444420', '#ef444405'] },
];

export default function LobbyScreen() {
    const { user } = useAuthStore();
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [selectedTier, setSelectedTier] = useState<number | null>(null);
    const [topGroups, setTopGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadTopGroups();
    }, []);

    const loadTopGroups = async () => {
        const { data } = await supabase
            .from('group_leaderboard')
            .select(`
                group_id,
                rank,
                score,
                games_played,
                groups (id, name, avatar_url, total_members)
            `)
            .order('rank', { ascending: true })
            .limit(5);
        
        if (data) {
            setTopGroups(data);
        }
        setLoading(false);
    };

    const handleTierSelect = async (tierId: number) => {
        setSelectedTier(tierId);
        
        // پیدا کردن بهترین گروه برای این تالار
        const { data: bestGroup } = await supabase
            .rpc('find_best_group_for_tier', { p_tier_id: tierId });
        
        if (bestGroup) {
            // هدایت به صفحه بازی در آن گروه
            router.push({
                pathname: `/group-game/${bestGroup}`,
                params: { tierId: tierId.toString() }
            });
        } else {
            // اگر گروهی وجود نداشت، پیشنهاد ساخت گروه
            router.push({
                pathname: '/(drawer)/create-group',
                params: { suggestedTier: tierId, isPublic: true }
            });
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadTopGroups();
        setRefreshing(false);
    };

    return (
        <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {/* هدر خوش‌آمدگویی */}
                <View style={{ padding: 20, paddingTop: 50 }}>
                    <Text style={{ color: currentColors.text, fontSize: 24, fontWeight: 'bold' }}>
                        خوش آمدی، {user?.username} 👋
                    </Text>
                    <Text style={{ color: currentColors.textSecondary, fontSize: 14, marginTop: 4 }}>
                        به بزرگترین جامعه بینگوی ایران بپیوندید
                    </Text>
                </View>

                {/* گروه‌های برتر */}
                <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
                    <Text style={{ color: currentColors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
                        🏆 گروه‌های برتر
                    </Text>
                    
                    {loading ? (
                        <ActivityIndicator size="large" color={currentColors.primary} />
                    ) : topGroups.map((group, index) => (
                        <TouchableOpacity
                            key={group.group_id}
                            onPress={() => router.push(`/group/${group.group_id}`)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: currentColors.surfaceLight,
                                borderRadius: 16,
                                padding: 12,
                                marginBottom: 8,
                            }}
                        >
                            <View style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: index === 0 ? '#eab308' : index === 1 ? '#94a3b8' : index === 2 ? '#cd7f32' : currentColors.surface,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{ color: index < 3 ? '#1a1a2e' : currentColors.text, fontWeight: 'bold', fontSize: 16 }}>
                                    {group.rank}
                                </Text>
                            </View>
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={{ color: currentColors.text, fontWeight: 'bold' }}>
                                    {group.groups?.name}
                                </Text>
                                <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>
                                    👥 {group.groups?.total_members} عضو | 🎮 {group.games_played} بازی
                                </Text>
                            </View>
                            <Text style={{ color: currentColors.primary, fontWeight: 'bold' }}>
                                {group.score} امتیاز
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* تالارهای بازی */}
                <Text style={{ color: currentColors.text, fontSize: 18, fontWeight: 'bold', marginHorizontal: 16, marginBottom: 12 }}>
                    🎲 تالارهای بازی
                </Text>
                
                {ROOM_TIERS.map((tier) => (
                    <TouchableOpacity
                        key={tier.id}
                        onPress={() => handleTierSelect(tier.id)}
                        style={{
                            marginHorizontal: 16,
                            marginBottom: 12,
                            borderRadius: 16,
                            overflow: 'hidden',
                        }}
                    >
                        <LinearGradient
                            colors={tier.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 16,
                                borderWidth: 1,
                                borderColor: currentColors.border,
                                borderRadius: 16,
                            }}
                        >
                            <View style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: currentColors.surfaceLight,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{ fontSize: 24 }}>{tier.icon}</Text>
                            </View>
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={{ color: currentColors.text, fontSize: 16, fontWeight: 'bold' }}>
                                    {tier.name}
                                </Text>
                                <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>
                                    حداکثر جایزه: {tier.prize.toLocaleString()} تومان
                                </Text>
                            </View>
                            <View style={{
                                backgroundColor: currentColors.primary,
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 20,
                            }}>
                                <Text style={{ color: '#1a1a2e', fontWeight: 'bold', fontSize: 12 }}>
                                    شرکت
                                </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}

                {/* دکمه ساخت گروه جدید */}
                <TouchableOpacity
                    onPress={() => router.push('/(drawer)/create-group')}
                    style={{
                        margin: 16,
                        backgroundColor: currentColors.primary + '20',
                        padding: 16,
                        borderRadius: 16,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: currentColors.primary + '40',
                        borderStyle: 'dashed',
                    }}
                >
                    <Text style={{ fontSize: 20, marginRight: 8 }}>➕</Text>
                    <Text style={{ color: currentColors.primary, fontWeight: 'bold', fontSize: 14 }}>
                        ساخت گروه جدید و شروع بازی
                    </Text>
                </TouchableOpacity>
                
                <View style={{ height: 40 }} />
            </ScrollView>
        </LinearGradient>
    );
}