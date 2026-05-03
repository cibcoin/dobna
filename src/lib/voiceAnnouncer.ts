// lib/voiceAnnouncer.ts
import { Platform } from 'react-native';
import { Audio } from 'expo-av';

export type VoiceLanguage = 'fa' | 'en';
export type AnnounceSpeed = 'slow' | 'normal' | 'fast';

interface AnnouncerConfig {
  language: VoiceLanguage;
  speed: AnnounceSpeed;
  volume: number;
  isMuted: boolean;
}

class VoiceAnnouncer {
  private config: AnnouncerConfig = {
    language: 'fa',
    speed: 'normal',
    volume: 1,
    isMuted: false
  };
  
  private speakingQueue: number[] = [];
  private isSpeaking: boolean = false;
  private currentNumber: number | null = null;
  private onNumberChangeCallbacks: ((number: number) => void)[] = [];
  
  // سرعت اعلام بر حسب میلی‌ثانیه
  private speedMap = {
    slow: 3500,    // 3.5 ثانیه بین هر عدد
    normal: 2500,  // 2.5 ثانیه
    fast: 1500     // 1.5 ثانیه
  };
  
  // دیکشنری تلفظ اعداد به فارسی
  private persianNumbers: { [key: number]: string } = {
    1: 'یک', 2: 'دو', 3: 'سه', 4: 'چهار', 5: 'پنج',
    6: 'شیش', 7: 'هفت', 8: 'هشت', 9: 'نه', 10: 'ده',
    11: 'یازده', 12: 'دوازده', 13: 'سیزده', 14: 'چهارده', 15: 'پونزده',
    16: 'شونزده', 17: 'هفده', 18: 'هجده', 19: 'نوزده', 20: 'بیست',
    21: 'بیست و یک', 22: 'بیست و دو', 23: 'بیست و سه', 24: 'بیست و چهار', 25: 'بیست و پنج',
    26: 'بیست و شیش', 27: 'بیست و هفت', 28: 'بیست و هشت', 29: 'بیست و نه', 30: 'سی',
    31: 'سی و یک', 32: 'سی و دو', 33: 'سی و سه', 34: 'سی و چهار', 35: 'سی و پنج',
    36: 'سی و شیش', 37: 'سی و هفت', 38: 'سی و هشت', 39: 'سی و نه', 40: 'چهل',
    41: 'چهل و یک', 42: 'چهل و دو', 43: 'چهل و سه', 44: 'چهل و چهار', 45: 'چهل و پنج',
    46: 'چهل و شیش', 47: 'چهل و هفت', 48: 'چهل و هشت', 49: 'چهل و نه', 50: 'پنجاه',
    51: 'پنجاه و یک', 52: 'پنجاه و دو', 53: 'پنجاه و سه', 54: 'پنجاه و چهار', 55: 'پنجاه و پنج',
    56: 'پنجاه و شیش', 57: 'پنجاه و هفت', 58: 'پنجاه و هشت', 59: 'پنجاه و نه', 60: 'شصت',
    61: 'شصت و یک', 62: 'شصت و دو', 63: 'شصت و سه', 64: 'شصت و چهار', 65: 'شصت و پنج',
    66: 'شصت و شیش', 67: 'شصت و هفت', 68: 'شصت و هشت', 69: 'شصت و نه', 70: 'هفتاد',
    71: 'هفتاد و یک', 72: 'هفتاد و دو', 73: 'هفتاد و سه', 74: 'هفتاد و چهار', 75: 'هفتاد و پنج',
    76: 'هفتاد و شیش', 77: 'هفتاد و هفت', 78: 'هفتاد و هشت', 79: 'هفتاد و نه', 80: 'هشتاد',
    81: 'هشتاد و یک', 82: 'هشتاد و دو', 83: 'هشتاد و سه', 84: 'هشتاد و چهار', 85: 'هشتاد و پنج',
    86: 'هشتاد و شیش', 87: 'هشتاد و هفت', 88: 'هشتاد و هشت', 89: 'هشتاد و نه', 90: 'نود'
  };
  
  constructor() {
    this.initAudio();
  }
  
  private async initAudio() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false
      });
    } catch (error) {
      console.log('Audio init error:', error);
    }
  }
  
  // تبدیل عدد به متن برای تلفظ
  private getNumberText(number: number, language: VoiceLanguage): string {
    if (language === 'fa') {
      return this.persianNumbers[number] || number.toString();
    } else {
      // برای انگلیسی، اعداد را به صورت حروفی می‌خوانیم
      const englishWords: { [key: number]: string } = {
        1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
        6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
        11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
        16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty',
        30: 'thirty', 40: 'forty', 50: 'fifty', 60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety'
      };
      
      if (number <= 20) {
        return englishWords[number] || number.toString();
      } else if (number < 100) {
        const tens = Math.floor(number / 10) * 10;
        const ones = number % 10;
        if (ones === 0) {
          return englishWords[tens] || number.toString();
        }
        return `${englishWords[tens]} ${englishWords[ones]}`;
      }
      return number.toString();
    }
  }
  
  // پخش صدای عدد
  private async speakNumber(number: number) {
    if (this.config.isMuted) return;
    
    const text = this.getNumberText(number, this.config.language);
    
    // استفاده از Speech API (برای وب و React Native)
    if (Platform.OS === 'web') {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.config.language === 'fa' ? 'fa-IR' : 'en-US';
        utterance.rate = this.config.speed === 'slow' ? 0.8 : this.config.speed === 'fast' ? 1.2 : 1;
        utterance.volume = this.config.volume;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      // برای React Native، از expo-speech استفاده می‌کنیم
      try {
        const { default: Speech } = await import('expo-speech');
        Speech.speak(text, {
          language: this.config.language === 'fa' ? 'fa-IR' : 'en-US',
          rate: this.config.speed === 'slow' ? 0.8 : this.config.speed === 'fast' ? 1.2 : 1,
          pitch: 1,
          volume: this.config.volume
        });
      } catch (error) {
        console.log('Speech error:', error);
      }
    }
    
    // اطلاع به گوش‌کننده‌ها
    this.onNumberChangeCallbacks.forEach(cb => cb(number));
  }
  
  // تولید عدد تصادفی جدید (بدون تکرار در یک جلسه)
  private generateRandomNumber(calledNumbers: Set<number>): number {
    if (calledNumbers.size >= 90) {
      return -1; // همه اعداد اعلام شده‌اند
    }
    
    let random: number;
    do {
      random = Math.floor(Math.random() * 90) + 1;
    } while (calledNumbers.has(random));
    
    return random;
  }
  
  // شروع اعلام اعداد
  public async startAnnouncing(
    onNumberCalled: (number: number) => void,
    onGameEnd?: () => void
  ) {
    const calledNumbers = new Set<number>();
    let isRunning = true;
    
    const announceNext = async () => {
      if (!isRunning) return;
      
      const nextNumber = this.generateRandomNumber(calledNumbers);
      
      if (nextNumber === -1) {
        onGameEnd?.();
        return;
      }
      
      calledNumbers.add(nextNumber);
      this.currentNumber = nextNumber;
      
      // پخش صدا
      await this.speakNumber(nextNumber);
      
      // فراخوانی تابع callback برای اعمال روی کارت
      onNumberCalled(nextNumber);
      
      // صبر برای عدد بعدی
      setTimeout(announceNext, this.speedMap[this.config.speed]);
    };
    
    announceNext();
    
    // برگرداندن تابع stop
    return () => {
      isRunning = false;
      if (Platform.OS === 'web') {
        window.speechSynthesis.cancel();
      }
    };
  }
  
  // تنظیمات
  public setLanguage(language: VoiceLanguage) {
    this.config.language = language;
  }
  
  public setSpeed(speed: AnnounceSpeed) {
    this.config.speed = speed;
  }
  
  public setVolume(volume: number) {
    this.config.volume = Math.max(0, Math.min(1, volume));
  }
  
  public setMuted(muted: boolean) {
    this.config.isMuted = muted;
    if (muted && Platform.OS === 'web') {
      window.speechSynthesis.cancel();
    }
  }
  
  public getCurrentNumber(): number | null {
    return this.currentNumber;
  }
  
  public onNumberChange(callback: (number: number) => void) {
    this.onNumberChangeCallbacks.push(callback);
    return () => {
      const index = this.onNumberChangeCallbacks.indexOf(callback);
      if (index > -1) this.onNumberChangeCallbacks.splice(index, 1);
    };
  }
}

export const voiceAnnouncer = new VoiceAnnouncer();