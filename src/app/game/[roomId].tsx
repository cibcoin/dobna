// app/game/[roomId].tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { voiceAnnouncer, VoiceLanguage, AnnounceSpeed } from '../../lib/voiceAnnouncer';
import BingoCardWithBlink from '../../components/BingoCardWithBlink';
import { generateRandomCard, markNumber, checkFullHouseWinner } from '../../lib/gameLogic';

interface PlayerCard {
  id: string;
  cardNumber: number;
  userName: string;
  numbers: number[][];
  markedNumbers: Set<number>;
  lineCompleted: boolean[];
}

export default function GameScreen() {
  const { roomId } = useLocalSearchParams();
  const [myCards, setMyCards] = useState<PlayerCard[]>([]);
  const [otherPlayersCards, setOtherPlayersCards] = useState<PlayerCard[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [blinkingNumber, setBlinkingNumber] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [gameStatus, setGameStatus] = useState<'waiting' | 'active' | 'finished'>('waiting');
  const [countdown, setCountdown] = useState(150);
  const [winners, setWinners] = useState<{ line: any[]; full: any[] }>({ line: [], full: [] });
  const stopAnnouncingRef = useRef<(() => void) | null>(null);
  
  useEffect(() => {
    // بارگذاری کارت‌های کاربر
    loadUserCards();
    
    // اتصال به Realtime برای دریافت اعداد اعلام شده
    const subscription = supabase
      .channel(`game:${roomId}`)
      .on('broadcast', { event: 'number_called' }, ({ payload }) => {
        handleNumberCalled(payload.number);
      })
      .on('broadcast', { event: 'game_winners' }, ({ payload }) => {
        handleGameEnd(payload);
      })
      .subscribe();
    
    // شروع تایمر countdown
    startCountdown();
    
    return () => {
      subscription.unsubscribe();
      if (stopAnnouncingRef.current) {
        stopAnnouncingRef.current();
      }
      voiceAnnouncer.setMuted(true);
    };
  }, []);
  
  const startCountdown = () => {
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
  };
  
  const startGame = async () => {
    setGameStatus('active');
    
    // شروع اعلام اعداد توسط گوینده
    const stopFn = await voiceAnnouncer.startAnnouncing(
      async (number) => {
        // ارسال عدد به سرور
        await supabase.channel(`game:${roomId}`).send({
          type: 'broadcast',
          event: 'number_called',
          payload: { number, callerId: (await supabase.auth.getUser()).data.user?.id }
        });
        
        // اعمال روی کارت‌های محلی
        handleNumberCalled(number);
      },
      () => {
        Alert.alert('پایان بازی', 'همه اعداد اعلام شدند!');
      }
    );
    
    stopAnnouncingRef.current = stopFn;
  };
  
  const handleNumberCalled = (number: number) => {
    setCurrentNumber(number);
    setBlinkingNumber(number);
    
    // بروزرسانی کارت‌های کاربر
    setMyCards(prev => prev.map(card => ({
      ...card,
      markedNumbers: new Set([...card.markedNumbers, number])
    })));
    
    // بررسی برنده شدن
    checkForWinners(number);
    
    // بعد از 0.5 ثانیه چشمک را پاک می‌کنیم
    setTimeout(() => {
      setBlinkingNumber(null);
    }, 500);
  };

// app/game/[roomId].tsx (بخش توزیع کارت)

import { distributeStandardCards, getCardByNumber, STANDARD_CARDS } from '../../lib/standardCards';

// هنگام شروع بازی
const startGameWithStandardCards = async (players: PlayerInfo[]) => {
  // توزیع کارت‌های استاندارد به بازیکنان
  const distribution = distributeStandardCards(players);
  
  // ذخیره در دیتابیس
  for (const player of distribution) {
    for (const card of player.cards) {
      await supabase.from('game_cards_extended').insert({
        game_id: gameId,
        user_id: player.userId,
        card_number: card.cardNumber,
        card_data: [card.row1, card.row2, card.row3],
        marked_numbers: [],
        line_completed: [false, false, false]
      });
    }
  }
  
  console.log('توزیع کارت‌ها:');
  distribution.forEach(p => {
    console.log(`${p.userName}: کارت‌های ${p.cards.map(c => c.cardNumber).join(', ')}`);
  });
};
  
  const checkForWinners = (number: number) => {
    // بررسی برنده خطی در کارت‌های کاربر
    for (const card of myCards) {
      // چک کردن هر ردیف
      for (let row = 0; row < 3; row++) {
        const rowNumbers = card.numbers[row];
        const allMarked = rowNumbers.every(num => 
          num === 0 || card.markedNumbers.has(num)
        );
        
        if (allMarked && !card.lineCompleted[row]) {
          // برنده خطی اعلام شد
          announceWinner('line', card, row);
          return;
        }
      }
      
      // بررسی برنده پر
      if (checkFullHouseWinner({ ...card, marked: [...card.markedNumbers] } as any)) {
        announceWinner('full', card);
        return;
      }
    }
  };
  
  const announceWinner = async (type: 'line' | 'full', card: PlayerCard, lineIndex?: number) => {
    setGameStatus('finished');
    
    // توقف اعلام اعداد
    if (stopAnnouncingRef.current) {
      stopAnnouncingRef.current();
    }
    
    // صدای برنده شدن
    voiceAnnouncer.setMuted(false);
    // پخش صدای "برنده شدید!"
    if (!isMuted) {
      if (Platform.OS === 'web') {
        const utterance = new SpeechSynthesisUtterance(
          type === 'line' ? 'تبریک! شما برنده خطی شدید!' : 'تبریک! شما برنده اصلی شدید!'
        );
        utterance.lang = 'fa-IR';
        window.speechSynthesis.speak(utterance);
      }
    }
    
    // ارسال به سرور
    await supabase.channel(`game:${roomId}`).send({
      type: 'broadcast',
      event: 'game_winners',
      payload: {
        type,
        winnerId: card.id,
        winnerName: card.userName,
        lineIndex,
        timestamp: Date.now()
      }
    });
    
    Alert.alert(
      '🎉 تبریک!',
      type === 'line' 
        ? `شما برنده خطی شدید! مبلغ ${linePrize.toLocaleString()} تومان به حساب شما اضافه شد`
        : `شما برنده اصلی شدید! مبلغ ${fullPrize.toLocaleString()} تومان به حساب شما اضافه شد`,
      [{ text: 'باشه', onPress: () => router.back() }]
    );
  };
  
  const loadUserCards = async () => {
    // دریافت کارت‌های کاربر از دیتابیس
    const { data: cards } = await supabase
      .from('game_cards_extended')
      .select('*')
      .eq('game_id', roomId)
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
    
    if (cards) {
      setMyCards(cards.map(card => ({
        id: card.id,
        cardNumber: card.card_number,
        userName: card.user_name,
        numbers: card.card_data,
        markedNumbers: new Set(card.marked_numbers || []),
        lineCompleted: card.line_completed || [false, false, false]
      })));
    }
  };
  
  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    voiceAnnouncer.setMuted(newMuteState);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* هدر بازی */}
      <View className="bg-gray-800 p-4 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()} className="bg-red-600 px-4 py-2 rounded-lg">
          <Text className="text-white">خروج</Text>
        </TouchableOpacity>
        
        <View className="items-center">
          <Text className="text-yellow-500 text-2xl font-bold">
            {currentNumber || '???'}
          </Text>
          <Text className="text-gray-400 text-xs">آخرین عدد</Text>
        </View>
        
        <View className="flex-row">
          <TouchableOpacity onPress={toggleMute} className="bg-blue-600 p-2 rounded-lg mr-2">
            <Text className="text-white">{isMuted ? '🔇' : '🔊'}</Text>
          </TouchableOpacity>
          
          {gameStatus === 'waiting' && (
            <View className="bg-orange-600 px-3 py-2 rounded-lg">
              <Text className="text-white font-bold">{countdown}s</Text>
            </View>
          )}
        </View>
      </View>
      
      {/* کارت‌های کاربر */}
      <ScrollView className="flex-1 p-2">
        <Text className="text-white text-lg font-bold mb-2">کارت‌های شما</Text>
        {myCards.map((card, index) => (
          <BingoCardWithBlink
            key={card.id}
            cardNumber={card.cardNumber}
            userName={card.userName}
            numbers={card.numbers}
            markedNumbers={card.markedNumbers}
            blinkingNumber={blinkingNumber}
            onBlinkComplete={() => console.log('Blink finished')}
          />
        ))}
        
        <View className="h-px bg-gray-700 my-4" />
        
        <Text className="text-white text-lg font-bold mb-2">سایر بازیکنان</Text>
        {otherPlayersCards.map((card, index) => (
          <BingoCardWithBlink
            key={card.id}
            cardNumber={card.cardNumber}
            userName={card.userName}
            numbers={card.numbers}
            markedNumbers={card.markedNumbers}
            blinkingNumber={blinkingNumber}
          />
        ))}
      </ScrollView>
      
      {/* وضعیت بازی */}
      {gameStatus === 'active' && (
        <View className="bg-green-800 p-3">
          <Text className="text-white text-center">
            🎲 بازی در حال انجام... گوش به صدای گوینده دهید
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
// app/game/[roomId].tsx (بخش اصلی با داور)

import { JudgeClient } from '../../lib/judgeClient';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function GameScreen() {
  const [judge, setJudge] = useState<JudgeClient | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');
  
  useEffect(() => {
    const gameId = roomId as string;
    const judgeClient = new JudgeClient(gameId);
    
    // شروع گوش دادن به اعلام برنده
    judgeClient.startListening((winners, type) => {
      // نمایش انیمیشن برنده شدن
      setShowConfetti(true);
      
      const message = type === 'line' 
        ? `🎉 برنده خطی: ${winners.map(w => w.userName).join(', ')} هر کدام ${winners[0].prizeAmount.toLocaleString()} تومان`
        : `🏆 برنده اصلی: ${winners.map(w => w.userName).join(', ')} هر کدام ${winners[0].prizeAmount.toLocaleString()} تومان`;
      
      setWinnerMessage(message);
      
      // بعد از 5 ثانیه انیمیشن را مخفی کن
      setTimeout(() => setShowConfetti(false), 5000);
    });
    
    setJudge(judgeClient);
    
    return () => {
      judgeClient.stopListening();
    };
  }, []);
  
  const handleNumberCalled = async (number: number) => {
    // اعلام عدد به داور
    const result = await judge?.callNumber(number);
    
    if (result?.success) {
      // بازی تمام شد (برنده پر پیدا شد)
      if (result.winner_type === 'full_house') {
        // توقف اعلام اعداد جدید
        stopGame();
      }
    }
  };
  
  return (
    <View className="flex-1">
      {/* انیمیشن کنفتی */}
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={3000}
          fadeOut={true}
          autoStart={true}
        />
      )}
      
      {/* پیام برنده */}
      {winnerMessage !== '' && (
        <View className="absolute top-20 left-0 right-0 bg-yellow-500 p-4 rounded-lg mx-4 z-50">
          <Text className="text-black text-center font-bold text-lg">
            {winnerMessage}
          </Text>
        </View>
      )}
      
      {/* بقیه صفحه بازی */}
      {/* ... */}
    </View>
  );
}
// app/game/[roomId].tsx - اضافه کردن دکمه چت
import { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ChatDrawer from '../../components/Chat/ChatDrawer';

export default function GameScreen() {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const { roomId } = useLocalSearchParams();
    
    // ... بقیه کدهای صفحه بازی
    
    return (
        <View className="flex-1 bg-gray-900">
            {/* دکمه چت در گوشه چپ پایین */}
            <TouchableOpacity
                onPress={() => {
                    setIsChatVisible(true);
                    setUnreadCount(0);
                }}
                className="absolute left-4 bottom-20 z-50 bg-yellow-600 w-14 h-14 rounded-full justify-center items-center shadow-lg"
                activeOpacity={0.8}
            >
                <Text className="text-white text-2xl">💬</Text>
                {unreadCount > 0 && (
                    <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[20px] h-5 px-1 justify-center items-center">
                        <Text className="text-white text-xs font-bold">{unreadCount}</Text>
                    </View>
                )}
            </TouchableOpacity>
            
            {/* صفحه کشویی چت */}
            <ChatDrawer
                visible={isChatVisible}
                roomId={roomId as string}
                onClose={() => setIsChatVisible(false)}
            />
            
            {/* بقیه محتوای صفحه بازی */}
        </View>
    );
}

// src/app/game/[roomId].tsx
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    SafeAreaView,
    Alert,
    BackHandler,
    AppState,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';
import GameHeader from '../../components/game/GameHeader';
import GameStats from '../../components/game/GameStats';
import BingoCardGrid from '../../components/game/BingoCardGrid';
import WinnerModal from '../../components/game/WinnerModal';
import { supabase } from '../../lib/supabase';
import { voiceAnnouncer } from '../../lib/voiceAnnouncer';
import { generateRandomCard } from '../../lib/standardCards';

// جوایز بر اساس tier
const PRIZES: Record<string, { line: number; full: number }> = {
    '5000': { line: 13500, full: 121500 },
    '10000': { line: 27000, full: 243000 },
    '20000': { line: 54000, full: 486000 },
    '50000': { line: 135000, full: 1215000 },
    '100000': { line: 270000, full: 2430000 },
};

export default function GameScreen() {
    const { roomId, tierId, tierName, cardPrice, cardsCount } = useLocalSearchParams();
    const { user, balance } = useAuthStore();
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [myCards, setMyCards] = useState<any[]>([]);
    const [allCards, setAllCards] = useState<any[]>([]);
    const [markedNumbers, setMarkedNumbers] = useState<Set<number>>(new Set());
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const [blinkingNumber, setBlinkingNumber] = useState<number | null>(null);
    const [lineWinner, setLineWinner] = useState<string | null>(null);
    const [fullWinner, setFullWinner] = useState<string | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [showWinnerModal, setShowWinnerModal] = useState(false);
    const [winners, setWinners] = useState<{ type: 'line' | 'full'; name: string; amount: number }[]>([]);
    const [gameActive, setGameActive] = useState(true);
    
    const stopAnnouncingRef = useRef<(() => void) | null>(null);
    const prizes = PRIZES[tierId as string] || { line: 27000, full: 243000 };

    // بارگذاری کارت‌ها
    useEffect(() => {
        loadCards();
        
        // گوش دادن به تغییرات برد
        const subscription = supabase
            .channel(`game:${roomId}`)
            .on('broadcast', { event: 'number_called' }, ({ payload }) => {
                handleNumberCalled(payload.number);
            })
            .on('broadcast', { event: 'winner_declared' }, ({ payload }) => {
                handleWinnerDeclared(payload);
            })
            .subscribe();
        
        // مدیریت قطعی اینترنت
        const appStateListener = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active' && !gameActive) {
                checkWinnerAfterReconnect();
            }
        });
        
        // دکمه بازگشت
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        
        return () => {
            subscription.unsubscribe();
            appStateListener.remove();
            if (stopAnnouncingRef.current) {
                stopAnnouncingRef.current();
            }
            voiceAnnouncer.setMuted(true);
        };
    }, []);

    const loadCards = async () => {
        // دریافت کارت‌های این بازی
        const { data } = await supabase
            .from('game_cards_extended')
            .select(`
                id,
                card_number,
                user_id,
                card_data,
                profiles (username)
            `)
            .eq('game_id', roomId);
        
        if (data) {
            const formattedCards = data.map(card => ({
                id: card.id,
                card_number: card.card_number,
                user_id: card.user_id,
                username: card.profiles.username,
                card_data: card.card_data,
            }));
            
            setAllCards(formattedCards);
            
            // کارت‌های کاربر جاری
            const userCards = formattedCards.filter(c => c.user_id === user?.id);
            setMyCards(userCards);
        }
    };

    const handleNumberCalled = (number: number) => {
        if (!gameActive) return;
        
        setCurrentNumber(number);
        setBlinkingNumber(number);
        setMarkedNumbers(prev => new Set([...prev, number]));
        
        // پخش صدا
        if (!isMuted) {
            voiceAnnouncer.setMuted(false);
            // پخش صدای عدد
        }
        
        setTimeout(() => setBlinkingNumber(null), 500);
    };

    const handleWinnerDeclared = (payload: any) => {
        setGameActive(false);
        
        if (stopAnnouncingRef.current) {
            stopAnnouncingRef.current();
        }
        
        setWinners(payload.winners);
        setShowWinnerModal(true);
        
        if (payload.winners.find((w: any) => w.userId === user?.id)) {
            // به‌روزرسانی موجودی کاربر
            const totalWin = payload.winners
                .filter((w: any) => w.userId === user?.id)
                .reduce((sum: number, w: any) => sum + w.amount, 0);
            
            // آپدیت موجودی در دیتابیس
            supabase
                .from('profiles')
                .update({ balance: (balance || 0) + totalWin })
                .eq('id', user?.id);
        }
    };

    const checkWinnerAfterReconnect = async () => {
        const { data } = await supabase
            .from('game_sessions')
            .select('line_winner_id, full_house_winner_id, status')
            .eq('id', roomId)
            .single();
        
        if (data?.status === 'finished') {
            if (data.line_winner_id === user?.id) {
                setLineWinner(user?.username || '');
            }
            if (data.full_house_winner_id === user?.id) {
                setFullWinner(user?.username || '');
            }
            setGameActive(false);
        }
    };

    const handleBackPress = () => {
        Alert.alert(
            'خروج از بازی',
            'آیا مطمئن هستید می‌خواهید از بازی خارج شوید؟',
            [
                { text: 'بازگشت به بازی', style: 'cancel' },
                { 
                    text: 'خروج', 
                    style: 'destructive',
                    onPress: () => router.replace('/(tabs)')
                },
            ]
        );
        return true;
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        voiceAnnouncer.setMuted(!isMuted);
    };

    const otherCards = allCards.filter(c => c.user_id !== user?.id);

    return (
        <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            
            <SafeAreaView style={{ flex: 1 }}>
                <GameHeader
                    balance={balance || 0}
                    linePrize={prizes.line}
                    fullPrize={prizes.full}
                    currentNumber={currentNumber}
                    isMuted={isMuted}
                    onMuteToggle={toggleMute}
                    colors={currentColors}
                />
                
                <GameStats
                    lineWinner={lineWinner}
                    fullWinner={fullWinner}
                    colors={currentColors}
                />
                
                <BingoCardGrid
                    myCards={myCards}
                    otherCards={otherCards}
                    markedNumbers={markedNumbers}
                    blinkingNumber={blinkingNumber}
                    colors={currentColors}
                />
                
                <WinnerModal
                    visible={showWinnerModal}
                    winners={winners}
                    onClose={() => {
                        setShowWinnerModal(false);
                        router.replace('/(tabs)');
                    }}
                    colors={currentColors}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}