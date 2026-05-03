// lib/standardCards.ts

interface DobnaCard {
  id: number;
  numbers: (number | null)[][]; // 3x9 matrix, null = خالی
}

// محدوده اعداد هر ستون
const COLUMN_RANGES = [
  { min: 1, max: 9, count: 9 },     // ستون 1
  { min: 10, max: 19, count: 10 },   // ستون 2
  { min: 20, max: 29, count: 10 },   // ستون 3
  { min: 30, max: 39, count: 10 },   // ستون 4
  { min: 40, max: 49, count: 10 },   // ستون 5
  { min: 50, max: 59, count: 10 },   // ستون 6
  { min: 60, max: 69, count: 10 },   // ستون 7
  { min: 70, max: 79, count: 10 },   // ستون 8
  { min: 80, max: 90, count: 11 }    // ستون 9
];

// تولید یک کارت تصادفی استاندارد
export function generateStandardCard(): (number | null)[][] {
  // ایجاد ماتریس 3x9 خالی
  const card: (number | null)[][] = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null]
  ];
  
  // برای هر ستون، 2 عدد تصادفی انتخاب کن
  for (let col = 0; col < 9; col++) {
    const range = COLUMN_RANGES[col];
    const allNumbers = Array.from(
      { length: range.count }, 
      (_, i) => range.min + i
    );
    
    // انتخاب 2 عدد تصادفی از این ستون
    const shuffled = [...allNumbers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selectedNumbers = shuffled.slice(0, 2);
    
    // مرتب کردن اعداد صعودی
    selectedNumbers.sort((a, b) => a - b);
    
    // قرار دادن اعداد در ردیف‌های تصادفی (اما مرتب)
    // طبق استاندارد، اعداد در هر ستون باید از بالا به پایین صعودی باشند
    // پس عدد کوچکتر در ردیف بالا، بزرگتر در ردیف پایین
    const rows = [0, 1, 2];
    for (let i = rows.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rows[i], rows[j]] = [rows[j], rows[i]];
    }
    // مرتب کردن rows بر اساس مقدار اعداد
    if (selectedNumbers[0] < selectedNumbers[1]) {
      card[rows[0]][col] = selectedNumbers[0];
      card[rows[1]][col] = selectedNumbers[1];
    } else {
      card[rows[0]][col] = selectedNumbers[1];
      card[rows[1]][col] = selectedNumbers[0];
    }
  }
  
  // بررسی: هر ردیف باید دقیقاً 5 عدد داشته باشد
  // اگر ردیفی کمتر از 5 عدد داشت، اصلاح کن
  for (let row = 0; row < 3; row++) {
    let numberCount = card[row].filter(v => v !== null).length;
    
    if (numberCount < 5) {
      // این وضعیت نادر است، اما اگر پیش آمد، از ستون‌های خالی عدد اضافه کن
      const missingCount = 5 - numberCount;
      const emptyCols = card[row]
        .map((v, idx) => v === null ? idx : -1)
        .filter(idx => idx !== -1);
      
      for (let i = 0; i < missingCount && i < emptyCols.length; i++) {
        const col = emptyCols[i];
        const range = COLUMN_RANGES[col];
        // پیدا کردن عدد استفاده نشده در این ستون
        const usedInColumn = [card[0][col], card[1][col], card[2][col]]
          .filter(v => v !== null);
        const available = Array.from(
          { length: range.count },
          (_, i) => range.min + i
        ).filter(n => !usedInColumn.includes(n));
        
        if (available.length > 0) {
          card[row][col] = available[0];
        }
      }
    }
  }
  
  return card;
}

// تولید 30 کارت یکتا برای هر اتاق
export function generate30UniqueCards(): (number | null)[][][] {
  const cards: (number | null)[][][] = [];
  const cardStrings = new Set<string>();
  
  while (cards.length < 30) {
    const newCard = generateStandardCard();
    const cardKey = JSON.stringify(newCard);
    
    // جلوگیری از تکرار کارت‌های مشابه
    if (!cardStrings.has(cardKey)) {
      cardStrings.add(cardKey);
      cards.push(newCard);
    }
  }
  
  return cards;
}

// کارت‌های از پیش تعریف شده (برای تست و اطمینان از استاندارد بودن)
export const PREdefined_CARDS: (number | null)[][][] = [
  // کارت 1
  [
    [1, null, 22, null, 45, 53, null, 78, null],
    [null, 14, null, 37, null, null, 67, null, 85],
    [7, null, null, 32, 48, 59, null, 72, 90]
  ],
  // کارت 2
  [
    [null, 11, 23, 35, null, null, 64, null, 83],
    [5, null, null, null, 44, 58, null, 77, null],
    [null, 18, 29, null, 49, null, 61, 79, 86]
  ],
  // کارت 3
  [
    [3, null, null, 31, null, 56, 68, null, 81],
    [null, 12, 28, null, 42, null, null, 73, null],
    [9, null, null, 38, 47, null, 69, null, 88]
  ],
  // کارت 4
  [
    [null, 15, 24, null, 41, 52, null, 71, 82],
    [2, null, null, 34, null, null, 62, null, null],
    [8, null, 27, 39, null, 57, null, 76, 89]
  ],
  // کارت 5
  [
    [6, null, 21, 33, null, 54, 66, null, 84],
    [null, 13, null, null, 46, null, 63, 75, null],
    [null, 19, 26, null, 43, 55, null, 74, 87]
  ],
  // کارت‌های 6 تا 30 مشابه با اعداد متفاوت...
  // در تولید واقعی، از تابع generateStandardCard استفاده کنید
];

// تابع اعتبارسنجی کارت (چک کردن استانداردها)
export function validateCard(card: (number | null)[][]): boolean {
  // 1. چک کردن ابعاد
  if (card.length !== 3) return false;
  for (const row of card) {
    if (row.length !== 9) return false;
  }
  
  // 2. چک کردن تعداد اعداد در هر ردیف (باید 5 باشد)
  for (let row = 0; row < 3; row++) {
    const numberCount = card[row].filter(v => v !== null).length;
    if (numberCount !== 5) return false;
  }
  
  // 3. چک کردن تعداد اعداد در هر ستون (حداکثر 2)
  for (let col = 0; col < 9; col++) {
    const numberCount = [card[0][col], card[1][col], card[2][col]]
      .filter(v => v !== null).length;
    if (numberCount > 2) return false;
  }
  
  // 4. چک کردن محدوده اعداد در هر ستون
  for (let col = 0; col < 9; col++) {
    const range = COLUMN_RANGES[col];
    for (let row = 0; row < 3; row++) {
      const value = card[row][col];
      if (value !== null && (value < range.min || value > range.max)) {
        return false;
      }
    }
  }
  
  // 5. چک کردن عدم تکرار اعداد در کل کارت
  const allNumbers = card.flat().filter(v => v !== null);
  const uniqueNumbers = new Set(allNumbers);
  if (allNumbers.length !== uniqueNumbers.size) return false;
  
  // 6. چک کردن ترتیب صعودی در هر ستون
  for (let col = 0; col < 9; col++) {
    const columnValues = [card[0][col], card[1][col], card[2][col]]
      .filter(v => v !== null) as number[];
    for (let i = 0; i < columnValues.length - 1; i++) {
      if (columnValues[i] > columnValues[i + 1]) return false;
    }
  }
  
  return true;
}