// lib/gameLogic.ts

export interface BingoCard {
  id: string;
  numbers: number[][]; // 3x9 matrix
  marked: boolean[][];
  lineCompleted: boolean[];
}

// تولید کارت تصادفی
export function generateRandomCard(): number[][] {
  const card: number[][] = [[], [], []];
  
  for (let col = 0; col < 9; col++) {
    let colNumbers: number[];
    
    // محدوده اعداد هر ستون
    switch(col) {
      case 0: colNumbers = Array.from({length: 9}, (_, i) => i + 1); break;
      case 1: colNumbers = Array.from({length: 10}, (_, i) => i + 10); break;
      case 2: colNumbers = Array.from({length: 10}, (_, i) => i + 20); break;
      case 3: colNumbers = Array.from({length: 10}, (_, i) => i + 30); break;
      case 4: colNumbers = Array.from({length: 10}, (_, i) => i + 40); break;
      case 5: colNumbers = Array.from({length: 10}, (_, i) => i + 50); break;
      case 6: colNumbers = Array.from({length: 10}, (_, i) => i + 60); break;
      case 7: colNumbers = Array.from({length: 10}, (_, i) => i + 70); break;
      case 8: colNumbers = Array.from({length: 11}, (_, i) => i + 80); break;
      default: colNumbers = [];
    }
    
    // انتخاب 2 عدد تصادفی برای هر ستون
    const shuffled = [...colNumbers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selected = shuffled.slice(0, 2);
    
    // قرار دادن در ردیف‌های تصادفی
    const rows = [0, 1, 2];
    for (let i = rows.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rows[i], rows[j]] = [rows[j], rows[i]];
    }
    
    for (let row = 0; row < 3; row++) {
      if (rows[row] < selected.length) {
        card[row][col] = selected[rows[row]];
      } else {
        card[row][col] = 0; // خالی
      }
    }
  }
  
  return card;
}

// علامت‌گذاری عدد روی کارت
export function markNumber(card: BingoCard, number: number): BingoCard {
  const newMarked = card.marked.map(row => [...row]);
  
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 9; col++) {
      if (card.numbers[row][col] === number) {
        newMarked[row][col] = true;
      }
    }
  }
  
  // بررسی تکمیل شدن ردیف‌ها
  const newLineCompleted = [...card.lineCompleted];
  for (let row = 0; row < 3; row++) {
    if (!newLineCompleted[row]) {
      const rowComplete = card.numbers[row].every((num, col) => 
        num === 0 || newMarked[row][col]
      );
      if (rowComplete) {
        newLineCompleted[row] = true;
      }
    }
  }
  
  return {
    ...card,
    marked: newMarked,
    lineCompleted: newLineCompleted
  };
}

// بررسی برنده خطی (اولین ردیف کامل)
export function checkLineWinner(cards: BingoCard[]): { cardIndex: number; lineIndex: number } | null {
  for (let i = 0; i < cards.length; i++) {
    for (let line = 0; line < 3; line++) {
      if (cards[i].lineCompleted[line] && !cards[i].lineCompleted[line]) {
        return { cardIndex: i, lineIndex: line };
      }
    }
  }
  return null;
}

// بررسی برنده پر (تمام کارت کامل شده)
export function checkFullHouseWinner(card: BingoCard): boolean {
  return card.numbers.every((row, rowIndex) =>
    row.every((num, colIndex) => num === 0 || card.marked[rowIndex][colIndex])
  );
}

// پخش صدای عدد
export function playNumberSound(number: number, language: 'fa' | 'en' = 'fa') {
  const utterance = new SpeechSynthesisUtterance(
    language === 'fa' ? number.toLocaleString('fa-IR') : number.toString()
  );
  utterance.lang = language === 'fa' ? 'fa-IR' : 'en-US';
  utterance.rate = 0.9;
  speechSynthesis.cancel(); // توقف صدای قبلی
  speechSynthesis.speak(utterance);
}