// lib/standardCards.ts

export type DobnaCardData = {
  cardNumber: number;
  row1: number[];
  row2: number[];
  row3: number[];
};

// کارت‌های استاندارد (برای استفاده در کلاینت بدون نیاز به دیتابیس)
export const STANDARD_CARDS: DobnaCardData[] = [
  { cardNumber: 1, row1: [1, 0, 22, 0, 45, 53, 0, 78, 0], row2: [0, 14, 0, 37, 0, 0, 67, 0, 85], row3: [7, 0, 0, 32, 48, 59, 0, 72, 90] },
  { cardNumber: 2, row1: [0, 11, 23, 35, 0, 0, 64, 0, 83], row2: [5, 0, 0, 0, 44, 58, 0, 77, 0], row3: [0, 18, 29, 0, 49, 0, 61, 79, 86] },
  { cardNumber: 3, row1: [3, 0, 0, 31, 0, 56, 68, 0, 81], row2: [0, 12, 28, 0, 42, 0, 0, 73, 0], row3: [9, 0, 0, 38, 47, 0, 69, 0, 88] },
  { cardNumber: 4, row1: [0, 15, 24, 0, 41, 52, 0, 71, 82], row2: [2, 0, 0, 34, 0, 0, 62, 0, 0], row3: [8, 0, 27, 39, 0, 57, 0, 76, 89] },
  { cardNumber: 5, row1: [6, 0, 21, 33, 0, 54, 66, 0, 84], row2: [0, 13, 0, 0, 46, 0, 63, 75, 0], row3: [0, 19, 26, 0, 43, 55, 0, 74, 87] },
  { cardNumber: 6, row1: [0, 16, 25, 0, 0, 51, 0, 70, 80], row2: [4, 0, 0, 36, 47, 0, 65, 0, 88], row3: [0, 20, 0, 39, 0, 58, 0, 77, 90] },
  { cardNumber: 7, row1: [8, 0, 20, 34, 0, 55, 0, 74, 85], row2: [0, 17, 0, 0, 44, 0, 66, 79, 0], row3: [1, 0, 28, 0, 49, 57, 0, 0, 87] },
  { cardNumber: 8, row1: [0, 10, 0, 30, 45, 0, 62, 0, 82], row2: [5, 0, 24, 0, 0, 53, 0, 76, 0], row3: [9, 0, 0, 38, 48, 0, 69, 78, 90] },
  { cardNumber: 9, row1: [2, 0, 21, 0, 42, 56, 0, 71, 84], row2: [0, 14, 0, 35, 0, 0, 64, 0, 86], row3: [7, 0, 29, 0, 49, 58, 0, 75, 0] },
  { cardNumber: 10, row1: [0, 18, 26, 37, 0, 52, 67, 0, 83], row2: [3, 0, 0, 0, 46, 0, 0, 73, 89], row3: [0, 11, 0, 39, 47, 59, 68, 0, 0] },
  { cardNumber: 11, row1: [4, 0, 22, 0, 43, 54, 0, 72, 81], row2: [0, 12, 0, 34, 0, 0, 63, 0, 87], row3: [6, 0, 27, 0, 48, 57, 0, 77, 90] },
  { cardNumber: 12, row1: [0, 13, 23, 0, 41, 55, 65, 0, 85], row2: [7, 0, 0, 36, 0, 0, 0, 74, 0], row3: [0, 19, 0, 38, 49, 56, 68, 79, 0] },
  { cardNumber: 13, row1: [1, 0, 25, 33, 0, 51, 0, 70, 88], row2: [0, 15, 0, 0, 45, 0, 62, 0, 0], row3: [8, 0, 28, 0, 47, 58, 0, 76, 89] },
  { cardNumber: 14, row1: [0, 10, 0, 31, 44, 0, 66, 0, 82], row2: [5, 0, 24, 0, 0, 53, 0, 75, 86], row3: [9, 0, 0, 39, 48, 0, 69, 78, 0] },
  { cardNumber: 15, row1: [2, 0, 20, 0, 42, 56, 0, 71, 84], row2: [0, 16, 0, 35, 0, 0, 64, 0, 87], row3: [7, 0, 29, 0, 49, 57, 0, 74, 90] },
  { cardNumber: 16, row1: [0, 17, 26, 37, 0, 52, 67, 0, 83], row2: [3, 0, 0, 0, 46, 0, 0, 73, 88], row3: [0, 12, 0, 38, 47, 59, 68, 0, 0] },
  { cardNumber: 17, row1: [4, 0, 21, 0, 43, 54, 0, 72, 81], row2: [0, 11, 0, 34, 0, 0, 63, 0, 86], row3: [6, 0, 27, 0, 48, 56, 0, 77, 90] },
  { cardNumber: 18, row1: [0, 14, 23, 0, 41, 55, 65, 0, 85], row2: [8, 0, 0, 36, 0, 0, 0, 74, 0], row3: [0, 18, 0, 39, 49, 57, 67, 78, 0] },
  { cardNumber: 19, row1: [1, 0, 24, 32, 0, 50, 0, 70, 89], row2: [0, 15, 0, 0, 44, 0, 61, 0, 0], row3: [9, 0, 28, 0, 47, 58, 0, 76, 88] },
  { cardNumber: 20, row1: [0, 19, 0, 30, 45, 0, 66, 0, 82], row2: [5, 0, 25, 0, 0, 53, 0, 75, 86], row3: [8, 0, 0, 38, 48, 0, 69, 77, 0] },
  { cardNumber: 21, row1: [2, 0, 22, 0, 42, 56, 0, 71, 83], row2: [0, 13, 0, 35, 0, 0, 64, 0, 87], row3: [7, 0, 29, 0, 49, 57, 0, 74, 90] },
  { cardNumber: 22, row1: [0, 16, 26, 37, 0, 52, 67, 0, 84], row2: [3, 0, 0, 0, 46, 0, 0, 73, 89], row3: [0, 11, 0, 39, 47, 58, 68, 0, 0] },
  { cardNumber: 23, row1: [4, 0, 20, 0, 43, 54, 0, 72, 81], row2: [0, 12, 0, 34, 0, 0, 63, 0, 86], row3: [6, 0, 27, 0, 48, 56, 0, 77, 90] },
  { cardNumber: 24, row1: [0, 17, 23, 0, 41, 55, 65, 0, 85], row2: [8, 0, 0, 36, 0, 0, 0, 74, 0], row3: [0, 18, 0, 38, 49, 57, 67, 79, 0] },
  { cardNumber: 25, row1: [1, 0, 25, 33, 0, 51, 0, 70, 88], row2: [0, 14, 0, 0, 45, 0, 62, 0, 0], row3: [9, 0, 28, 0, 47, 58, 0, 76, 89] },
  { cardNumber: 26, row1: [0, 10, 0, 31, 44, 0, 66, 0, 82], row2: [5, 0, 24, 0, 0, 53, 0, 75, 86], row3: [8, 0, 0, 39, 48, 0, 69, 78, 0] },
  { cardNumber: 27, row1: [2, 0, 21, 0, 42, 56, 0, 71, 84], row2: [0, 15, 0, 35, 0, 0, 64, 0, 87], row3: [7, 0, 29, 0, 49, 57, 0, 74, 90] },
  { cardNumber: 28, row1: [0, 19, 26, 37, 0, 52, 67, 0, 83], row2: [3, 0, 0, 0, 46, 0, 0, 73, 88], row3: [0, 11, 0, 38, 47, 59, 68, 0, 0] },
  { cardNumber: 29, row1: [4, 0, 22, 0, 43, 54, 0, 72, 81], row2: [0, 13, 0, 34, 0, 0, 63, 0, 86], row3: [6, 0, 27, 0, 48, 56, 0, 77, 90] },
  { cardNumber: 30, row1: [0, 18, 23, 0, 41, 55, 65, 0, 85], row2: [8, 0, 0, 36, 0, 0, 0, 74, 0], row3: [0, 16, 0, 39, 49, 57, 67, 79, 0] }
];

// گرفتن کارت بر اساس شماره
export function getCardByNumber(cardNumber: number): BingoCardData | null {
  return STANDARD_CARDS.find(card => card.cardNumber === cardNumber) || null;
}

// گرفتن چند کارت مشخص
export function getCardsByNumbers(cardNumbers: number[]): BingoCardData[] {
  return STANDARD_CARDS.filter(card => cardNumbers.includes(card.cardNumber));
}

// گرفتن کارت‌های باقیمانده (برای پر کردن ۳۰ کارت)
export function getRemainingCards(assignedCardNumbers: number[]): BingoCardData[] {
  return STANDARD_CARDS.filter(card => !assignedCardNumbers.includes(card.cardNumber));
}

// تابع توزیع کارت به بازیکنان (با کارت‌های استاندارد)
export function distributeStandardCards(
  players: { userId: string; userName: string; requestedCards: number }[]
): { userId: string; userName: string; cards: BingoCardData[] }[] {
  const result: { userId: string; userName: string; cards: BingoCardData[] }[] = [];
  let nextCardIndex = 0;
  
  for (const player of players) {
    const playerCards: BingoCardData[] = [];
    for (let i = 0; i < player.requestedCards && nextCardIndex < STANDARD_CARDS.length; i++) {
      playerCards.push(STANDARD_CARDS[nextCardIndex]);
      nextCardIndex++;
    }
    result.push({
      userId: player.userId,
      userName: player.userName,
      cards: playerCards
    });
  }
  
  return result;
}

// اعتبارسنجی یک کارت (بر اساس استانداردهای بینگو)
export function validateStandardCard(card: BingoCardData): boolean {
  // 1. بررسی ابعاد
  if (card.row1.length !== 9 || card.row2.length !== 9 || card.row3.length !== 9) {
    return false;
  }
  
  // 2. بررسی هر ردیف دقیقاً 5 عدد داشته باشد (0 نشان‌دهنده خالی)
  const countNumbers = (row: number[]) => row.filter(n => n !== 0).length;
  if (countNumbers(card.row1) !== 5 || countNumbers(card.row2) !== 5 || countNumbers(card.row3) !== 5) {
    return false;
  }
  
  // 3. بررسی هر ستون حداکثر 2 عدد داشته باشد
  for (let col = 0; col < 9; col++) {
    const columnNumbers = [card.row1[col], card.row2[col], card.row3[col]].filter(n => n !== 0);
    if (columnNumbers.length > 2) {
      return false;
    }
    // بررسی ترتیب صعودی در ستون
    for (let i = 0; i < columnNumbers.length - 1; i++) {
      if (columnNumbers[i] > columnNumbers[i + 1]) {
        return false;
      }
    }
  }
  
  // 4. بررسی عدم تکرار اعداد در کل کارت
  const allNumbers = [...card.row1, ...card.row2, ...card.row3].filter(n => n !== 0);
  const uniqueNumbers = new Set(allNumbers);
  if (allNumbers.length !== uniqueNumbers.size) {
    return false;
  }
  
  // 5. بررسی محدوده اعداد (1 تا 90)
  for (const num of allNumbers) {
    if (num < 1 || num > 90) {
      return false;
    }
  }
  
  return true;
}

// نمایش کارت به صورت گرافیکی در console
export function printStandardCard(card: BingoCardData) {
  console.log(`\n📋 کارت استاندارد شماره ${card.cardNumber}:`);
  console.log('┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐');
  
  const rows = [card.row1, card.row2, card.row3];
  for (let row of rows) {
    let rowStr = '│';
    for (let val of row) {
      if (val === 0) {
        rowStr += '  ○  │';
      } else {
        rowStr += ` ${val.toString().padStart(2, ' ')}  │`;
      }
    }
    console.log(rowStr);
    console.log('├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤');
  }
  console.log('└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘');
}

// اعتبارسنجی همه 30 کارت استاندارد
export function validateAllStandardCards(): boolean {
  let allValid = true;
  for (const card of STANDARD_CARDS) {
    if (!validateStandardCard(card)) {
      console.error(`❌ کارت شماره ${card.cardNumber} نامعتبر است!`);
      allValid = false;
    } else {
      console.log(`✅ کارت شماره ${card.cardNumber} معتبر است`);
    }
  }
  return allValid;
}




// src/lib/standardCards.ts

export interface BingoCard {
    cardNumber: number;
    row1: number[];
    row2: number[];
    row3: number[];
}

// ============================================
// ۶۰ کارت استاندارد بینگو (۳×۹، هر ردیف ۵ عدد)
// ============================================

export const STANDARD_CARDS: BingoCard[] = [
    // کارت‌های 1 تا 10
    {
        cardNumber: 1,
        row1: [1, 0, 22, 0, 45, 53, 0, 78, 0],
        row2: [0, 14, 0, 37, 0, 0, 67, 0, 85],
        row3: [7, 0, 0, 32, 48, 59, 0, 72, 90]
    },
    {
        cardNumber: 2,
        row1: [0, 11, 23, 35, 0, 0, 64, 0, 83],
        row2: [5, 0, 0, 0, 44, 58, 0, 77, 0],
        row3: [0, 18, 29, 0, 49, 0, 61, 79, 86]
    },
    {
        cardNumber: 3,
        row1: [3, 0, 0, 31, 0, 56, 68, 0, 81],
        row2: [0, 12, 28, 0, 42, 0, 0, 73, 0],
        row3: [9, 0, 0, 38, 47, 0, 69, 0, 88]
    },
    {
        cardNumber: 4,
        row1: [0, 15, 24, 0, 41, 52, 0, 71, 82],
        row2: [2, 0, 0, 34, 0, 0, 62, 0, 0],
        row3: [8, 0, 27, 39, 0, 57, 0, 76, 89]
    },
    {
        cardNumber: 5,
        row1: [6, 0, 21, 33, 0, 54, 66, 0, 84],
        row2: [0, 13, 0, 0, 46, 0, 63, 75, 0],
        row3: [0, 19, 26, 0, 43, 55, 0, 74, 87]
    },
    {
        cardNumber: 6,
        row1: [0, 16, 25, 0, 0, 51, 0, 70, 80],
        row2: [4, 0, 0, 36, 47, 0, 65, 0, 88],
        row3: [0, 20, 0, 39, 0, 58, 0, 77, 90]
    },
    {
        cardNumber: 7,
        row1: [8, 0, 20, 34, 0, 55, 0, 74, 85],
        row2: [0, 17, 0, 0, 44, 0, 66, 79, 0],
        row3: [1, 0, 28, 0, 49, 57, 0, 0, 87]
    },
    {
        cardNumber: 8,
        row1: [0, 10, 0, 30, 45, 0, 62, 0, 82],
        row2: [5, 0, 24, 0, 0, 53, 0, 76, 0],
        row3: [9, 0, 0, 38, 48, 0, 69, 78, 90]
    },
    {
        cardNumber: 9,
        row1: [0, 11, 21, 0, 41, 50, 0, 0, 80],
        row2: [2, 0, 0, 32, 0, 53, 61, 0, 83],
        row3: [9, 15, 0, 0, 46, 58, 0, 74, 0]
    },
    {
        cardNumber: 10,
        row1: [0, 18, 26, 37, 0, 52, 67, 0, 83],
        row2: [3, 0, 0, 0, 46, 0, 0, 73, 89],
        row3: [0, 11, 0, 39, 47, 59, 68, 0, 0]
    },
    // کارت‌های 11 تا 20
    {
        cardNumber: 11,
        row1: [4, 0, 22, 0, 43, 54, 0, 72, 81],
        row2: [0, 12, 0, 34, 0, 0, 63, 0, 87],
        row3: [6, 0, 27, 0, 48, 57, 0, 77, 90]
    },
    {
        cardNumber: 12,
        row1: [0, 13, 23, 0, 41, 55, 65, 0, 85],
        row2: [7, 0, 0, 36, 0, 0, 0, 74, 0],
        row3: [0, 19, 0, 38, 49, 56, 68, 79, 0]
    },
    {
        cardNumber: 13,
        row1: [1, 0, 25, 33, 0, 51, 0, 70, 88],
        row2: [0, 15, 0, 0, 45, 0, 62, 0, 0],
        row3: [8, 0, 28, 0, 47, 58, 0, 76, 89]
    },
    {
        cardNumber: 14,
        row1: [0, 10, 0, 31, 44, 0, 66, 0, 82],
        row2: [5, 0, 24, 0, 0, 53, 0, 75, 86],
        row3: [9, 0, 0, 39, 48, 0, 69, 78, 0]
    },
    {
        cardNumber: 15,
        row1: [2, 0, 20, 0, 42, 56, 0, 71, 84],
        row2: [0, 16, 0, 35, 0, 0, 64, 0, 87],
        row3: [7, 0, 29, 0, 49, 57, 0, 74, 90]
    },
    {
        cardNumber: 16,
        row1: [0, 17, 26, 37, 0, 52, 67, 0, 83],
        row2: [3, 0, 0, 0, 46, 0, 0, 73, 88],
        row3: [0, 12, 0, 38, 47, 59, 68, 0, 0]
    },
    {
        cardNumber: 17,
        row1: [4, 0, 21, 0, 43, 54, 0, 72, 81],
        row2: [0, 11, 0, 34, 0, 0, 63, 0, 86],
        row3: [6, 0, 27, 0, 48, 56, 0, 77, 90]
    },
    {
        cardNumber: 18,
        row1: [0, 14, 23, 0, 41, 55, 65, 0, 85],
        row2: [8, 0, 0, 36, 0, 0, 0, 74, 0],
        row3: [0, 18, 0, 39, 49, 57, 67, 78, 0]
    },
    {
        cardNumber: 19,
        row1: [1, 0, 24, 32, 0, 50, 0, 70, 89],
        row2: [0, 15, 0, 0, 44, 0, 61, 0, 0],
        row3: [9, 0, 28, 0, 47, 58, 0, 76, 88]
    },
    {
        cardNumber: 20,
        row1: [0, 19, 0, 30, 45, 0, 66, 0, 82],
        row2: [5, 0, 25, 0, 0, 53, 0, 75, 86],
        row3: [8, 0, 0, 38, 48, 0, 69, 77, 0]
    },
    // کارت‌های 21 تا 30
    {
        cardNumber: 21,
        row1: [2, 0, 22, 0, 42, 56, 0, 71, 83],
        row2: [0, 13, 0, 35, 0, 0, 64, 0, 87],
        row3: [7, 0, 29, 0, 49, 57, 0, 74, 90]
    },
    {
        cardNumber: 22,
        row1: [0, 16, 26, 37, 0, 52, 67, 0, 84],
        row2: [3, 0, 0, 0, 46, 0, 0, 73, 89],
        row3: [0, 11, 0, 39, 47, 58, 68, 0, 0]
    },
    {
        cardNumber: 23,
        row1: [4, 0, 20, 0, 43, 54, 0, 72, 81],
        row2: [0, 12, 0, 34, 0, 0, 63, 0, 86],
        row3: [6, 0, 27, 0, 48, 56, 0, 77, 90]
    },
    {
        cardNumber: 24,
        row1: [0, 17, 23, 0, 41, 55, 65, 0, 85],
        row2: [8, 0, 0, 36, 0, 0, 0, 74, 0],
        row3: [0, 18, 0, 38, 49, 57, 67, 79, 0]
    },
    {
        cardNumber: 25,
        row1: [1, 0, 25, 33, 0, 51, 0, 70, 88],
        row2: [0, 14, 0, 0, 45, 0, 62, 0, 0],
        row3: [9, 0, 28, 0, 47, 58, 0, 76, 89]
    },
    {
        cardNumber: 26,
        row1: [0, 10, 0, 31, 44, 0, 66, 0, 82],
        row2: [5, 0, 24, 0, 0, 53, 0, 75, 86],
        row3: [8, 0, 0, 39, 48, 0, 69, 78, 0]
    },
    {
        cardNumber: 27,
        row1: [2, 0, 21, 0, 42, 56, 0, 71, 84],
        row2: [0, 15, 0, 35, 0, 0, 64, 0, 87],
        row3: [7, 0, 29, 0, 49, 57, 0, 74, 90]
    },
    {
        cardNumber: 28,
        row1: [0, 19, 26, 37, 0, 52, 67, 0, 83],
        row2: [3, 0, 0, 0, 46, 0, 0, 73, 88],
        row3: [0, 11, 0, 38, 47, 59, 68, 0, 0]
    },
    {
        cardNumber: 29,
        row1: [4, 0, 22, 0, 43, 54, 0, 72, 81],
        row2: [0, 13, 0, 34, 0, 0, 63, 0, 86],
        row3: [6, 0, 27, 0, 48, 56, 0, 77, 90]
    },
    {
        cardNumber: 30,
        row1: [0, 18, 23, 0, 41, 55, 65, 0, 85],
        row2: [8, 0, 0, 36, 0, 0, 0, 74, 0],
        row3: [0, 16, 0, 39, 49, 57, 67, 79, 0]
    },
    // کارت‌های 31 تا 40
    {
        cardNumber: 31,
        row1: [1, 0, 20, 34, 0, 50, 0, 70, 82],
        row2: [0, 12, 0, 0, 45, 53, 61, 0, 86],
        row3: [9, 0, 28, 0, 48, 0, 68, 76, 90]
    },
    {
        cardNumber: 32,
        row1: [0, 14, 24, 0, 42, 54, 66, 0, 83],
        row2: [3, 0, 0, 35, 0, 0, 0, 73, 87],
        row3: [6, 0, 27, 38, 0, 58, 0, 78, 89]
    },
    {
        cardNumber: 33,
        row1: [4, 0, 0, 31, 44, 55, 0, 71, 84],
        row2: [0, 16, 25, 0, 0, 0, 64, 77, 0],
        row3: [8, 0, 29, 39, 47, 56, 0, 0, 88]
    },
    {
        cardNumber: 34,
        row1: [0, 10, 21, 0, 41, 52, 0, 74, 80],
        row2: [2, 0, 0, 33, 46, 57, 63, 0, 85],
        row3: [7, 15, 0, 0, 0, 59, 67, 79, 0]
    },
    {
        cardNumber: 35,
        row1: [5, 0, 22, 32, 0, 51, 0, 72, 81],
        row2: [0, 11, 0, 0, 43, 0, 65, 75, 90],
        row3: [0, 19, 26, 37, 48, 0, 69, 0, 86]
    },
    {
        cardNumber: 36,
        row1: [0, 17, 23, 36, 0, 0, 62, 0, 84],
        row2: [9, 0, 0, 0, 44, 53, 0, 74, 88],
        row3: [1, 0, 28, 39, 49, 56, 0, 0, 87]
    },
    {
        cardNumber: 37,
        row1: [3, 0, 25, 0, 42, 54, 66, 0, 82],
        row2: [0, 13, 0, 34, 0, 58, 0, 76, 0],
        row3: [8, 0, 0, 38, 47, 0, 68, 77, 89]
    },
    {
        cardNumber: 38,
        row1: [0, 18, 20, 35, 0, 51, 0, 73, 83],
        row2: [6, 0, 0, 0, 45, 55, 64, 0, 86],
        row3: [0, 14, 29, 0, 0, 57, 67, 78, 90]
    },
    {
        cardNumber: 39,
        row1: [2, 0, 24, 0, 41, 52, 61, 0, 85],
        row2: [0, 10, 0, 37, 0, 0, 0, 75, 88],
        row3: [7, 16, 0, 38, 46, 59, 69, 0, 0]
    },
    {
        cardNumber: 40,
        row1: [0, 15, 21, 33, 0, 50, 0, 72, 81],
        row2: [9, 0, 0, 0, 43, 56, 62, 0, 87],
        row3: [4, 0, 28, 0, 48, 0, 65, 77, 89]
    },
    // کارت‌های 41 تا 50
    {
        cardNumber: 41,
        row1: [1, 0, 22, 34, 0, 53, 0, 70, 84],
        row2: [0, 12, 0, 0, 45, 0, 63, 76, 0],
        row3: [8, 19, 0, 37, 47, 56, 0, 0, 90]
    },
    {
        cardNumber: 42,
        row1: [0, 14, 25, 0, 42, 51, 65, 0, 82],
        row2: [5, 0, 0, 35, 0, 0, 0, 74, 88],
        row3: [7, 0, 26, 38, 49, 57, 68, 0, 86]
    },
    {
        cardNumber: 43,
        row1: [3, 0, 0, 31, 44, 55, 0, 71, 83],
        row2: [0, 16, 23, 0, 0, 0, 64, 77, 0],
        row3: [9, 0, 28, 39, 48, 58, 0, 0, 89]
    },
    {
        cardNumber: 44,
        row1: [0, 10, 20, 0, 41, 52, 0, 73, 80],
        row2: [2, 0, 0, 33, 46, 54, 61, 0, 85],
        row3: [6, 15, 0, 0, 0, 59, 66, 78, 0]
    },
    {
        cardNumber: 45,
        row1: [4, 0, 21, 32, 0, 50, 0, 72, 81],
        row2: [0, 11, 0, 0, 43, 0, 62, 75, 90],
        row3: [0, 18, 27, 36, 47, 56, 0, 0, 87]
    },
    {
        cardNumber: 46,
        row1: [0, 17, 24, 35, 0, 0, 65, 0, 84],
        row2: [8, 0, 0, 0, 44, 53, 0, 74, 86],
        row3: [1, 0, 29, 38, 48, 57, 0, 0, 89]
    },
    {
        cardNumber: 47,
        row1: [5, 0, 22, 0, 42, 54, 66, 0, 82],
        row2: [0, 13, 0, 34, 0, 58, 0, 76, 0],
        row3: [7, 0, 0, 37, 46, 0, 67, 77, 88]
    },
    {
        cardNumber: 48,
        row1: [0, 19, 20, 36, 0, 51, 0, 73, 83],
        row2: [6, 0, 0, 0, 45, 55, 64, 0, 87],
        row3: [0, 14, 28, 0, 0, 56, 68, 78, 90]
    },
    {
        cardNumber: 49,
        row1: [2, 0, 23, 0, 41, 52, 61, 0, 85],
        row2: [0, 10, 0, 35, 0, 0, 0, 75, 88],
        row3: [9, 16, 0, 39, 47, 59, 69, 0, 0]
    },
    {
        cardNumber: 50,
        row1: [0, 15, 21, 33, 0, 50, 0, 72, 81],
        row2: [8, 0, 0, 0, 43, 56, 62, 0, 86],
        row3: [4, 0, 27, 0, 48, 0, 65, 77, 89]
    },
    // کارت‌های 51 تا 60
    {
        cardNumber: 51,
        row1: [1, 0, 20, 34, 0, 53, 0, 70, 84],
        row2: [0, 12, 0, 0, 45, 0, 63, 76, 0],
        row3: [7, 18, 0, 37, 47, 56, 0, 0, 90]
    },
    {
        cardNumber: 52,
        row1: [0, 14, 24, 0, 42, 51, 65, 0, 82],
        row2: [5, 0, 0, 35, 0, 0, 0, 74, 88],
        row3: [6, 0, 26, 38, 49, 57, 68, 0, 86]
    },
    {
        cardNumber: 53,
        row1: [3, 0, 0, 31, 44, 55, 0, 71, 83],
        row2: [0, 16, 23, 0, 0, 0, 64, 77, 0],
        row3: [8, 0, 28, 39, 48, 58, 0, 0, 89]
    },
    {
        cardNumber: 54,
        row1: [0, 10, 20, 0, 41, 52, 0, 73, 80],
        row2: [2, 0, 0, 33, 46, 54, 61, 0, 85],
        row3: [9, 15, 0, 0, 0, 59, 66, 78, 0]
    },
    {
        cardNumber: 55,
        row1: [4, 0, 21, 32, 0, 50, 0, 72, 81],
        row2: [0, 11, 0, 0, 43, 0, 62, 75, 90],
        row3: [0, 18, 27, 36, 47, 56, 0, 0, 87]
    },
    {
        cardNumber: 56,
        row1: [0, 17, 24, 35, 0, 0, 65, 0, 84],
        row2: [8, 0, 0, 0, 44, 53, 0, 74, 86],
        row3: [1, 0, 29, 38, 48, 57, 0, 0, 89]
    },
    {
        cardNumber: 57,
        row1: [5, 0, 22, 0, 42, 54, 66, 0, 82],
        row2: [0, 13, 0, 34, 0, 58, 0, 76, 0],
        row3: [7, 0, 0, 37, 46, 0, 67, 77, 88]
    },
    {
        cardNumber: 58,
        row1: [0, 19, 20, 36, 0, 51, 0, 73, 83],
        row2: [6, 0, 0, 0, 45, 55, 64, 0, 87],
        row3: [0, 14, 28, 0, 0, 56, 68, 78, 90]
    },
    {
        cardNumber: 59,
        row1: [2, 0, 23, 0, 41, 52, 61, 0, 85],
        row2: [0, 10, 0, 35, 0, 0, 0, 75, 88],
        row3: [9, 16, 0, 39, 47, 59, 69, 0, 0]
    },
    {
        cardNumber: 60,
        row1: [0, 15, 21, 33, 0, 50, 0, 72, 81],
        row2: [8, 0, 0, 0, 43, 56, 62, 0, 86],
        row3: [4, 0, 27, 0, 48, 0, 65, 77, 89]
    }
];

// ============================================
// توابع کمکی
// ============================================

/**
 * دریافت کارت بر اساس شماره
 */
export function getCardByNumber(cardNumber: number): BingoCard | null {
    return STANDARD_CARDS.find(card => card.cardNumber === cardNumber) || null;
}

/**
 * دریافت چند کارت مشخص
 */
export function getCardsByNumbers(cardNumbers: number[]): BingoCard[] {
    return STANDARD_CARDS.filter(card => cardNumbers.includes(card.cardNumber));
}

/**
 * دریافت کارت‌های باقیمانده برای پر کردن ۶۰ کارت
 */
export function getRemainingCards(assignedCardNumbers: number[]): BingoCard[] {
    return STANDARD_CARDS.filter(card => !assignedCardNumbers.includes(card.cardNumber));
}

/**
 * اعتبارسنجی یک کارت (بر اساس استانداردهای بینگو)
 */
export function validateCard(card: BingoCard): boolean {
    // 1. بررسی ابعاد
    if (card.row1.length !== 9 || card.row2.length !== 9 || card.row3.length !== 9) {
        console.error(`Card ${card.cardNumber}: Invalid dimensions`);
        return false;
    }
    
    // 2. بررسی هر ردیف دقیقاً 5 عدد داشته باشد (0 نشان‌دهنده خالی)
    const countNumbers = (row: number[]) => row.filter(n => n !== 0).length;
    if (countNumbers(card.row1) !== 5 || countNumbers(card.row2) !== 5 || countNumbers(card.row3) !== 5) {
        console.error(`Card ${card.cardNumber}: Each row must have exactly 5 numbers`);
        return false;
    }
    
    // 3. بررسی هر ستون حداکثر 2 عدد داشته باشد
    for (let col = 0; col < 9; col++) {
        const columnNumbers = [card.row1[col], card.row2[col], card.row3[col]].filter(n => n !== 0);
        if (columnNumbers.length > 2) {
            console.error(`Card ${card.cardNumber}: Column ${col + 1} has ${columnNumbers.length} numbers (max 2)`);
            return false;
        }
        // بررسی ترتیب صعودی در ستون
        for (let i = 0; i < columnNumbers.length - 1; i++) {
            if (columnNumbers[i] > columnNumbers[i + 1]) {
                console.error(`Card ${card.cardNumber}: Column ${col + 1} numbers not in ascending order`);
                return false;
            }
        }
    }
    
    // 4. بررسی عدم تکرار اعداد در کل کارت
    const allNumbers = [...card.row1, ...card.row2, ...card.row3].filter(n => n !== 0);
    const uniqueNumbers = new Set(allNumbers);
    if (allNumbers.length !== uniqueNumbers.size) {
        console.error(`Card ${card.cardNumber}: Duplicate numbers found`);
        return false;
    }
    
    // 5. بررسی محدوده اعداد (1 تا 90)
    for (const num of allNumbers) {
        if (num < 1 || num > 90) {
            console.error(`Card ${card.cardNumber}: Number ${num} out of range (1-90)`);
            return false;
        }
    }
    
    return true;
}

/**
 * اعتبارسنجی همه ۶۰ کارت
 */
export function validateAllCards(): boolean {
    let allValid = true;
    for (const card of STANDARD_CARDS) {
        if (!validateCard(card)) {
            console.error(`❌ Card ${card.cardNumber} is INVALID!`);
            allValid = false;
        } else {
            console.log(`✅ Card ${card.cardNumber} is valid`);
        }
    }
    console.log(`\n📊 Total: ${STANDARD_CARDS.length} cards, Valid: ${STANDARD_CARDS.filter(c => validateCard(c)).length}`);
    return allValid;
}

/**
 * نمایش کارت در console برای دیباگ
 */
export function printCard(card: BingoCard): void {
    console.log(`\n📋 کارت شماره ${card.cardNumber}:`);
    console.log('┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐');
    
    const rows = [card.row1, card.row2, card.row3];
    for (const row of rows) {
        let rowStr = '│';
        for (const val of row) {
            if (val === 0) {
                rowStr += '  ○  │';
            } else {
                rowStr += ` ${val.toString().padStart(2, ' ')}  │`;
            }
        }
        console.log(rowStr);
        console.log('├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤');
    }
    console.log('└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘');
}

/**
 * توزیع کارت به بازیکنان (حداکثر 5 کارت برای هر کاربر)
 */
export function distributeCardsToPlayers(
    players: { userId: string; userName: string; requestedCards: number }[]
): { userId: string; userName: string; cards: BingoCard[] }[] {
    const result: { userId: string; userName: string; cards: BingoCard[] }[] = [];
    let nextCardIndex = 0;
    const maxCardsPerPlayer = 5;
    
    for (const player of players) {
        const requested = Math.min(player.requestedCards, maxCardsPerPlayer);
        const playerCards: BingoCard[] = [];
        
        for (let i = 0; i < requested && nextCardIndex < STANDARD_CARDS.length; i++) {
            playerCards.push(STANDARD_CARDS[nextCardIndex]);
            nextCardIndex++;
        }
        
        result.push({
            userId: player.userId,
            userName: player.userName,
            cards: playerCards
        });
    }
    
    return result;
}