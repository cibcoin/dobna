// src/constants/roomTiers.ts

export interface RoomTier {
  id: number;
  name: string;
  nameEn: string;
  cardPrice: number;
  totalCards: number;
  linePrizePercentage: number;
  fullHousePrizePercentage: number;
  platformFeePercentage: number;
  image: string;
}

export const ROOM_TIERS: RoomTier[] = [
  {
    id: 1,
    name: '۵,۰۰۰ تومانی',
    nameEn: '5,000 Toman',
    cardPrice: 5000,
    totalCards: 30,
    linePrizePercentage: 9,
    fullHousePrizePercentage: 81,
    platformFeePercentage: 10,
    image: '@assets/images/notes/5000.png'
  },
  {
    id: 2,
    name: '۱۰,۰۰۰ تومانی',
    nameEn: '10,000 Toman',
    cardPrice: 10000,
    totalCards: 30,
    linePrizePercentage: 9,
    fullHousePrizePercentage: 81,
    platformFeePercentage: 10,
    image: '@assets/images/notes/10000.png'
  },
  {
    id: 3,
    name: '۲۰,۰۰۰ تومانی',
    nameEn: '20,000 Toman',
    cardPrice: 20000,
    totalCards: 30,
    linePrizePercentage: 9,
    fullHousePrizePercentage: 81,
    platformFeePercentage: 10,
    image: '@assets/images/notes/20000.png'
  },
  {
    id: 4,
    name: '۵۰,۰۰۰ تومانی',
    nameEn: '50,000 Toman',
    cardPrice: 50000,
    totalCards: 30,
    linePrizePercentage: 9,
    fullHousePrizePercentage: 81,
    platformFeePercentage: 10,
    image: '@assets/images/notes/50000.png'
  },
  {
    id: 5,
    name: '۱۰۰,۰۰۰ تومانی',
    nameEn: '100,000 Toman',
    cardPrice: 100000,
    totalCards: 30,
    linePrizePercentage: 9,
    fullHousePrizePercentage: 81,
    platformFeePercentage: 10,
    image: '@assets/images/notes/100000.png'
  }
];