// lib/judgeClient.ts

import { supabase } from './supabase';

export interface WinnerInfo {
  userId: string;
  userName: string;
  cardNumber: number;
  lineIndex?: number;
  prizeAmount: number;
}

export class JudgeClient {
  private gameId: string;
  private onWinnerCallback?: (winners: WinnerInfo[], type: 'line' | 'full_house') => void;
  private subscription: any;
  
  constructor(gameId: string) {
    this.gameId = gameId;
  }
  
  // شروع گوش دادن به اعلام برنده
  async startListening(onWinner: (winners: WinnerInfo[], type: 'line' | 'full_house') => void) {
    this.onWinnerCallback = onWinner;
    
    // گوش دادن به کانال Realtime برای اعلام برنده
    this.subscription = supabase
      .channel(`judge:${this.gameId}`)
      .on('broadcast', { event: 'winner_declared' }, async ({ payload }) => {
        const { winner_type, winners, each_prize } = payload;
        
        const winnerInfos: WinnerInfo[] = winners.map((w: any) => ({
          userId: w.user_id,
          userName: w.user_name,
          cardNumber: w.card_number,
          lineIndex: w.line_index,
          prizeAmount: each_prize
        }));
        
        // نمایش انیمیشن برنده شدن
        this.showWinnerAnimation(winnerInfos, winner_type);
        
        // فراخوانی callback
        this.onWinnerCallback?.(winnerInfos, winner_type);
      })
      .subscribe();
  }
  
  // اعلام عدد جدید به داور
  async callNumber(number: number) {
    // فراخوانی تابع داور در سرور
    const { data, error } = await supabase.rpc('judge_check_winner', {
      p_game_id: this.gameId,
      p_number_called: number
    });
    
    if (error) {
      console.error('Judge error:', error);
      return;
    }
    
    if (data.success) {
      // برنده پیدا شد، اعلام به همه بازیکنان
      await this.announceWinner(data);
      
      // تسویه حساب خودکار
      await this.settlePrizes();
    }
    
    return data;
  }
  
  // اعلام برنده به همه بازیکنان
  private async announceWinner(winnerData: any) {
    await supabase.channel(`judge:${this.gameId}`).send({
      type: 'broadcast',
      event: 'winner_declared',
      payload: {
        winner_type: winnerData.winner_type,
        winners: winnerData.winners,
        each_prize: winnerData.each_prize,
        timestamp: Date.now()
      }
    });
  }
  
  // تسویه حساب خودکار
  private async settlePrizes() {
    const { data, error } = await supabase.rpc('auto_settle_prizes', {
      p_game_id: this.gameId
    });
    
    if (error) {
      console.error('Settlement error:', error);
    } else {
      console.log('Prizes settled:', data);
    }
  }
  
  // نمایش انیمیشن برنده شدن در UI
  private showWinnerAnimation(winners: WinnerInfo[], type: 'line' | 'full_house') {
    // این تابع در کامپوننت UI پیاده‌سازی می‌شود
    // می‌تواند شامل: افکت کنفتی، صدای تشویق، فلش کارت برنده و...
    console.log(`🎉 Winner ${type}:`, winners);
  }
  
  // توقف گوش دادن
  stopListening() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}