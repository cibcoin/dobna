// lib/cardDistribution.ts

export interface CardAssignment {
  cardId: number;      // 1 تا 30
  userId: string;
  userName: string;
  cardData: (number | null)[][];
}
// lib/cardDistribution.ts

export interface PlayerInfo {
  userId: string;
  userName: string;
  requestedCards: number;  // 1, 2, یا 3
}

export interface CardAssignment {
  cardId: number;
  userId: string;
  userName: string;
  cardData: (number | null)[][];
}

export function distributeCardsToPlayers(
  players: PlayerInfo[],
  availableCards: (number | null)[][][]
): {
  assignments: CardAssignment[];
  remainingCards: (number | null)[][][];
  errors: string[];
} {
  const assignments: CardAssignment[] = [];
  let nextCardIndex = 0;
  const errors: string[] = [];
  
  // ابتدا بررسی کنیم مجموع کارت‌های درخواستی بیشتر از ۳۰ نباشد
  const totalRequested = players.reduce((sum, p) => sum + p.requestedCards, 0);
  
  if (totalRequested > 30) {
    errors.push(`مجموع کارت‌های درخواستی (${totalRequested}) بیشتر از ۳۰ است`);
    return { assignments, remainingCards: availableCards, errors };
  }
  
  if (totalRequested < 30) {
    errors.push(`اتاق هنوز پر نشده است. ${30 - totalRequested} کارت دیگر نیاز است`);
    return { assignments, remainingCards: availableCards, errors };
  }
  
  // توزیع کارت‌ها به ترتیب درخواست
  for (const player of players) {
    for (let i = 0; i < player.requestedCards; i++) {
      if (nextCardIndex >= availableCards.length) {
        errors.push(`کارت کافی برای ${player.userName} وجود ندارد`);
        break;
      }
      
      assignments.push({
        cardId: nextCardIndex + 1,
        userId: player.userId,
        userName: player.userName,
        cardData: availableCards[nextCardIndex]
      });
      nextCardIndex++;
    }
  }
  
  const remainingCards = availableCards.slice(nextCardIndex);
  
  return { assignments, remainingCards, errors };
}
// توزیع کارت‌ها بین بازیکنان
export function distributeCards(
  players: { userId: string; userName: string; cardsCount: number }[],
  allCards: (number | null)[][][]
): CardAssignment[] {
  const assignments: CardAssignment[] = [];
  let nextCardIndex = 0;
  
  for (const player of players) {
    for (let i = 0; i < player.cardsCount && nextCardIndex < allCards.length; i++) {
      assignments.push({
        cardId: nextCardIndex + 1,
        userId: player.userId,
        userName: player.userName,
        cardData: allCards[nextCardIndex]
      });
      nextCardIndex++;
    }
  }
  
  return assignments;
}

// نمایش کارت در console برای دیباگ
export function printCard(card: (number | null)[][], cardNumber: number) {
  console.log(`\n📋 کارت شماره ${cardNumber}:`);
  console.log('┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐');
  
  for (let row = 0; row < 3; row++) {
    let rowStr = '│';
    for (let col = 0; col < 9; col++) {
      const value = card[row][col];
      if (value === null) {
        rowStr += '  ○  │';
      } else {
        rowStr += ` ${value.toString().padStart(2, ' ')}  │`;
      }
    }
    console.log(rowStr);
    if (row < 2) {
      console.log('├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤');
    }
  }
  console.log('└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘');
}