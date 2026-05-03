// lib/cardDistribution.ts

export interface CardAssignment {
  cardId: number;      // 1 تا 30
  userId: string;
  userName: string;
  cardData: (number | null)[][];
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