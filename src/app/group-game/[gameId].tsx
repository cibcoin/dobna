// src/app/group-game/[gameId].tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';
import Stepper from '../../components/UI/Stepper';

export default function GroupGameScreen() {
    const { gameId, groupId, tierId } = useLocalSearchParams();
    const { user, balance, updateBalance } = useAuthStore();
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [cardsCount, setCardsCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [gameInfo, setGameInfo] = useState<any>(null);
    const [players, setPlayers] = useState<any[]>([]);
    
    const cardPrice = [0, 5000, 10000, 20000, 50000, 100000][Number(tierId)];
    const totalPrice = cardsCount * cardPrice;
    const canJoin = balance >= totalPrice;

    useEffect(() => {
        loadGameInfo();
        loadPlayers();
    }, [gameId]);

    const loadGameInfo = async () => {
        const { data } = await supabase
            .from('group_games')
            .select('*')
            .eq('id', gameId)
            .single();
        setGameInfo(data);
    };

    const loadPlayers = async () => {
        const { data } = await supabase
            .from('game_cards_new')
            .select('user_id, profiles(username)')
            .eq('game_id', gameId);
        
        if (data) {
            setPlayers(data);
        }
    };

    const joinGame = async () => {
        if (!canJoin) {
            Alert.alert('خطا', 'موجودی کافی نیست');
            return;
        }
        
        if (gameInfo?.current_cards + cardsCount > 60) {
            Alert.alert('خطا', `تعداد کارت‌های باقیمانده: ${60 - gameInfo.current_cards}`);
            return;
        }
        
        setLoading(true);
        
        // کسر موجودی
        const newBalance = balance - totalPrice;
        await supabase
            .from('profiles')
            .update({ balance: newBalance })
            .eq('id', user?.id);
        updateBalance(newBalance);
        
        // تولید کارت‌ها و ثبت در بازی
        for (let i = 0; i < cardsCount; i++) {
            await supabase
                .from('game_cards_new')
                .insert({
                    game_id: gameId,
                    user_id: user?.id,
                    card_number: (gameInfo?.current_cards || 0) + i + 1,
                    card_data: generateRandomCard(), // تابع تولید کارت تصادفی
                });
        }
        
        // بروزرسانی تعداد کارت‌های بازی
        await supabase
            .from('group_games')
            .update({ current_cards: (gameInfo?.current_cards || 0) + cardsCount })
            .eq('id', gameId);
        
        setLoading(false);
        
        // هدایت به صفحه انتظار
        router.push({
            pathname: `/group-game-wait/${gameId}`,
            params: { groupId, tierId }
        });
    };

    return (
        <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={{ color: currentColors.text, fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
                    انتخاب تعداد کارت
                </Text>
                
                <View style={{
                    backgroundColor: currentColors.surfaceLight,
                    borderRadius: 20,
                    padding: 24,
                    alignItems: 'center',
                    marginBottom: 24,
                }}>
                    <Text style={{ color: currentColors.textSecondary, marginBottom: 16 }}>
                        تعداد کارت‌ها (حداکثر ۵)
                    </Text>
                    <Stepper
                        value={cardsCount}
                        onIncrease={() => setCardsCount(prev => Math.min(5, prev + 1))}
                        onDecrease={() => setCardsCount(prev => Math.max(1, prev - 1))}
                        min={1}
                        max={5}
                        colors={currentColors}
                    />
                    
                    <View style={{ marginTop: 24, alignItems: 'center' }}>
                        <Text style={{ color: currentColors.textSecondary }}>مبلغ قابل پرداخت</Text>
                        <Text style={{ color: currentColors.primary, fontSize: 28, fontWeight: 'bold' }}>
                            {totalPrice.toLocaleString()} تومان
                        </Text>
                    </View>
                </View>
                
                {/* نمایش بازیکنان حاضر */}
                <Text style={{ color: currentColors.text, fontWeight: 'bold', marginBottom: 12 }}>
                    🎮 بازیکنان حاضر ({players.length} نفر)
                </Text>
                {players.map((player) => (
                    <View key={player.user_id} style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 8,
                    }}>
                        <Text style={{ color: currentColors.text }}>{player.profiles?.username}</Text>
                    </View>
                ))}
                
                <TouchableOpacity
                    onPress={joinGame}
                    disabled={loading || !canJoin}
                    style={{
                        backgroundColor: canJoin ? '#10b981' : currentColors.textMuted,
                        paddingVertical: 16,
                        borderRadius: 12,
                        alignItems: 'center',
                        marginTop: 24,
                    }}
                >
                    {loading ? <ActivityIndicator color="white" /> : (
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                            تأیید و شروع بازی
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
}

// تابع تولید کارت تصادفی 3x9
function generateRandomCard(): number[][] {
    // پیاده‌سازی تولید کارت استاندارد بینگو
    return [[1,0,22,0,45,53,0,78,0], [0,14,0,37,0,0,67,0,85], [7,0,0,32,48,59,0,72,90]];
}