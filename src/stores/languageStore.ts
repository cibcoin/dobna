import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageState {
  locale: 'fa' | 'en';
  setLocale: (locale: 'fa' | 'en') => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      locale: 'fa',
      setLocale: (locale) => set({ locale }),
      toggleLanguage: () => set((state) => ({ 
        locale: state.locale === 'fa' ? 'en' : 'fa' 
      })),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);