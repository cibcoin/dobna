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