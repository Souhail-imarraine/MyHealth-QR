import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLanguageStore = create(
  persist(
    (set, get) => ({
      language: 'fr', // Default language
      
      setLanguage: (lang) => {
        set({ language: lang });
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        // Update direction for RTL languages
        if (lang === 'ar') {
          document.documentElement.dir = 'rtl';
        } else {
          document.documentElement.dir = 'ltr';
        }
      },
      
      getLanguage: () => get().language,
    }),
    {
      name: 'language-storage',
    }
  )
);
