// components/GameBoard.tsx (بخش اصلی)

import { ScrollView, View, Text } from 'react-native';
import BingoCardWithBlink from './BingoCardWithBlink';

interface GameBoardProps {
  currentUserId: string;
  allCards: CardAssignment[];
  blinkingNumber: number | null;
  onBlinkComplete: () => void;
}

export default function GameBoard({ 
  currentUserId, 
  allCards, 
  blinkingNumber, 
  onBlinkComplete 
}: GameBoardProps) {
  
  // جدا کردن کارت‌های کاربر جاری از سایرین
  const myCards = allCards.filter(card => card.userId === currentUserId);
  const otherPlayersCards = allCards.filter(card => card.userId !== currentUserId);
  
  // گروه‌بندی کارت‌های سایر بازیکنان بر اساس کاربر
  const groupedOtherCards: { [userId: string]: CardAssignment[] } = {};
  for (const card of otherPlayersCards) {
    if (!groupedOtherCards[card.userId]) {
      groupedOtherCards[card.userId] = [];
    }
    groupedOtherCards[card.userId].push(card);
  }
  
  return (
    <ScrollView className="flex-1 p-2">
      {/* کارت‌های من */}
      <Text className="text-white text-lg font-bold mb-2">
        کارت‌های من ({myCards.length} کارت)
      </Text>
      {myCards.map((card, index) => (
        <BingoCardWithBlink
          key={`my-${card.cardId}`}
          cardNumber={card.cardId}
          userName={card.userName}
          numbers={card.cardData}
          markedNumbers={new Set()} // از state بیاد
          blinkingNumber={blinkingNumber}
          onBlinkComplete={onBlinkComplete}
        />
      ))}
      
      {/* جداکننده */}
      <View className="h-px bg-gray-700 my-4" />
      
      {/* کارت‌های سایر بازیکنان */}
      <Text className="text-white text-lg font-bold mb-2">
        سایر بازیکنان ({otherPlayersCards.length} کارت)
      </Text>
      
      {Object.entries(groupedOtherCards).map(([userId, cards]) => (
        <View key={userId} className="mb-4">
          <Text className="text-gray-400 text-sm mb-1">
            {cards[0].userName} ({cards.length} کارت)
          </Text>
          {cards.map((card) => (
            <BingoCardWithBlink
              key={`other-${card.cardId}`}
              cardNumber={card.cardId}
              userName={card.userName}
              numbers={card.cardData}
              markedNumbers={new Set()}
              blinkingNumber={blinkingNumber}
            />
          ))}
        </View>
      ))}
      
      {/* اطلاعات آماری */}
      <View className="bg-gray-800 p-3 rounded-lg mt-4 mb-10">
        <Text className="text-gray-400 text-center text-sm">
          مجموع کارت‌ها: {allCards.length} / 30
        </Text>
        <Text className="text-gray-400 text-center text-sm">
          تعداد بازیکنان: {Object.keys(groupedOtherCards).length + (myCards.length > 0 ? 1 : 0)}
        </Text>
      </View>
    </ScrollView>
  );
}