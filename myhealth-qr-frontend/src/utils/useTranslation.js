import { useLanguageStore } from '../store/languageStore';
import { translations } from '../i18n/translations';

export const useTranslation = () => {
  const language = useLanguageStore((state) => state.language);
  
  const t = (key) => {
    return translations[language]?.[key] || translations.fr[key] || key;
  };
  
  return { t, language };
};
