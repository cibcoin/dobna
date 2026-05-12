// src/app/game-room/select-cards.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';
import Stepper from '../../components/UI/Stepper';
import { supabase } from '../../lib/supabase';

export default function SelectCardsScreen() {
    const { tierId, tierName, cardPrice, roomId } = useLocalSearchParams();
    const { user, balance, updateBalance } = useAuthStore();
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [cardsCount, setCardsCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState<any[]>([]);
    const [countdown, setCountdown] = useState(150);
    const [isWaiting, setIsWaiting] = useState(false);
    const [joined, setJoined] = useState(false);

    const totalPrice = cardsCount * parseInt(cardPrice as string);
    const canJoin = balance >= totalPrice;

    useEffect(() => {
        if (isWaiting) {
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        startGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isWaiting]);

    // دریافت بازیکنان آنلاین اتاق
    useEffect(() => {
        if (roomId) {
            fetchPlayers();
            
            const subscription = supabase
                .channel(`room:${roomId}`)
                .on('presence', { event: 'sync' }, () => {
                    fetchPlayers();
                })
                .subscribe();
            
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [roomId]);

    const fetchPlayers = async () => {
        const { data } = await supabase
            .from('room_members')
            .select('user_id, profiles(username, avatar_url), cards_count')
            .eq('room_id', roomId);
        
        if (data) {
            setPlayers(data);
        }
    };

    const handleJoinRoom = async () => {
        if (!canJoin) {
            Alert.alert('خطا', 'موجودی کافی نیست');
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
        
        // ثبت در اتاق
        await supabase
            .from('room_members')
            .insert({
                room_id: roomId,
                user_id: user?.id,
                cards_count: cardsCount,
            });
        
        setJoined(true);
        setIsWaiting(true);
        setLoading(false);
    };

    const startGame = () => {
        // هدایت به صفحه بازی
        router.push({
            pathname: `/game/${roomId}`,
            params: { 
                tierId,
                tierName,
                cardPrice,
                cardsCount: cardsCount.toString(),
            }
        });
    };

    return (
        <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            
            <SafeAreaView style={{ flex: 1 }}>
                {/* هدر با موجودی */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: currentColors.surface,
                }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={{ color: currentColors.text, fontSize: 24 }}>←</Text>
                    </TouchableOpacity>
                    <Text style={{ color: currentColors.primary, fontWeight: 'bold', fontSize: 16 }}>
                        {tierName}
                    </Text>
                    <View style={{
                        backgroundColor: currentColors.surfaceLight,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 20,
                    }}>
                        <Text style={{ color: currentColors.text, fontSize: 12 }}>
                            💰 {balance?.toLocaleString()} تومان
                        </Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                    {!joined ? (
                        // صفحه انتخاب تعداد کارت
                        <>
                            <Text style={{ color: currentColors.text, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>
                                انتخاب تعداد کارت
                            </Text>
                            
                            <View style={{
                                backgroundColor: currentColors.surfaceLight,
                                borderRadius: 20,
                                padding: 24,
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                                <Text style={{ color: currentColors.textSecondary, marginBottom: 16 }}>تعداد کارت‌ها (حداکثر ۳)</Text>
                                <Stepper
                                    value={cardsCount}
                                    onIncrease={() => setCardsCount(prev => Math.min(3, prev + 1))}
                                    onDecrease={() => setCardsCount(prev => Math.max(1, prev - 1))}
                                    min={1}
                                    max={3}
                                    colors={currentColors}
                                />
                                
                                <View style={{ marginTop: 24, alignItems: 'center' }}>
                                    <Text style={{ color: currentColors.textSecondary }}>مبلغ قابل پرداخت</Text>
                                    <Text style={{ color: currentColors.primary, fontSize: 28, fontWeight: 'bold' }}>
                                        {totalPrice.toLocaleString()} تومان
                                    </Text>
                                </View>
                            </View>
                            
                            <TouchableOpacity
                                onPress={handleJoinRoom}
                                disabled={loading || !canJoin}
                                style={{
                                    backgroundColor: canJoin ? '#10b981' : currentColors.textMuted,
                                    paddingVertical: 16,
                                    borderRadius: 12,
                                    alignItems: 'center',
                                }}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                                        تأیید و {totalPrice.toLocaleString()} تومان
                                    </Text>
                                )}
                            </TouchableOpacity>
                            
                            {!canJoin && (
                                <Text style={{ color: currentColors.error, textAlign: 'center', marginTop: 12, fontSize: 12 }}>
                                    موجودی کافی نیست. لطفاً شارژ کنید.
                                </Text>
                            )}
                        </>
                    ) : (
                        // صفحه انتظار برای شروع بازی
                        <>
                            <View style={{
                                backgroundColor: currentColors.surfaceLight,
                                borderRadius: 20,
                                padding: 24,
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                                <Text style={{ color: currentColors.textSecondary, marginBottom: 8 }}>شروع بازی در</Text>
                                <Text style={{ color: currentColors.primary, fontSize: 48, fontWeight: 'bold', fontFamily: 'Orbitron-Bold' }}>
                                    {countdown}
                                </Text>
                                <Text style={{ color: currentColors.textSecondary }}>ثانیه</Text>
                            </View>
                            
                            {/* لیست بازیکنان حاضر */}
                            <Text style={{ color: currentColors.text, fontWeight: 'bold', marginBottom: 12 }}>
                                بازیکنان حاضر ({players.length} نفر)
                            </Text>
                            
                            {players.map((player) => (
                                <View key={player.user_id} style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: currentColors.border,
                                }}>
                                    <Text style={{ color: currentColors.text }}>
                                        {player.profiles?.username || 'کاربر'}
                                    </Text>
                                    <View style={{
                                        backgroundColor: currentColors.primary + '20',
                                        paddingHorizontal: 8,
                                        paddingVertical: 2,
                                        borderRadius: 12,
                                    }}>
                                        <Text style={{ color: currentColors.primary, fontSize: 12 }}>
                                            {player.cards_count} کارت
                                        </Text>
                                    </View>
                                </View>
                            ))}
                            
                            {players.length === 0 && (
                                <Text style={{ color: currentColors.textSecondary, textAlign: 'center', padding: 20 }}>
                                    در انتظار حضور سایر بازیکنان...
                                </Text>
                            )}
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}