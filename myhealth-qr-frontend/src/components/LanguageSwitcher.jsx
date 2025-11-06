import { Globe } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguageStore();

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-secondary-50 transition-all shadow-sm hover:shadow-md">
        <Globe className="w-5 h-5 text-secondary-600" />
        <span className="text-sm font-medium text-secondary-700 hidden sm:inline">
          {languages.find(l => l.code === language)?.flag}
        </span>
      </button>
      
      <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full text-left px-4 py-3 hover:bg-secondary-50 transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center gap-3 ${
              language === lang.code ? 'bg-accent-50 text-accent-700' : 'text-secondary-700'
            }`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
            {language === lang.code && (
              <span className="ltr:ml-auto rtl:mr-auto text-accent-600">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
