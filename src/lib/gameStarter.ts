// lib/gameStarter.ts

import { supabase } from './supabase';
import { generate30UniqueCards, validateCard } from './standardCards';
import { distributeCardsToPlayers } from './cardDistribution';

interface StartGameParams {
  roomId: string;
  tierId: number;
  players: { userId: string; userName: string; requestedCards: number }[];
}

export async function startNewGame({ roomId, tierId, players }: StartGameParams) {
  try {
    // 1. تولید 30 کارت استاندارد یکتا
    const allCards = generate30UniqueCards();
    
    // 2. اعتبارسنجی همه کارت‌ها
    for (let i = 0; i < allCards.length; i++) {
      if (!validateCard(allCards[i])) {
        console.error(`کارت شماره ${i + 1} نامعتبر است`);
        return { success: false, error: 'Invalid cards generated' };
      }
    }
    
    // 3. توزیع کارت بین بازیکنان
    const { assignments, errors, remainingCards } = distributeCardsToPlayers(players, allCards);
    
    if (errors.length > 0) {
      console.error('Distribution errors:', errors);
      return { success: false, error: errors.join(', ') };
    }
    
    // 4. ثبت در دیتابیس
    const gameId = crypto.randomUUID();
    
    // ذخیره اطلاعات بازی
    const { error: gameError } = await supabase
      .from('active_games')
      .insert({
        id: gameId,
        room_id: roomId,
        tier_id: tierId,
        status: 'active',
        total_players: players.length,
        total_cards: 30,
        started_at: new Date().toISOString()
      });
    
    if (gameError) throw gameError;
    
    // ذخیره کارت‌های هر بازیکن
    for (const assignment of assignments) {
      const { error: cardError } = await supabase
        .from('game_cards_extended')
        .insert({
          game_id: gameId,
          user_id: assignment.userId,
          card_number: assignment.cardId,
          card_data: assignment.cardData,
          marked_numbers: [],
          line_completed: [false, false, false]
        });
      
      if (cardError) throw cardError;
    }
    
    // 5. بروزرسانی status اتاق
    await supabase
      .from('active_rooms')
      .update({ status: 'active', started_at: new Date().toISOString() })
      .eq('id', roomId);
    
    return { 
      success: true, 
      gameId,
      assignments: assignments.map(a => ({
        userId: a.userId,
        userName: a.userName,
        cardId: a.cardId,
        cardData: a.cardData
      }))
    };
    
  } catch (error) {
    console.error('Error starting game:', error);
    return { success: false, error: String(error) };
  }
}