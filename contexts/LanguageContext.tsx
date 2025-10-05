import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});
  const [fallbackTranslations, setFallbackTranslations] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Fetch fallback English translations once on initial load.
    fetch('/locales/en.json')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setFallbackTranslations(data);
        if (language === 'en') {
          setTranslations(data);
        }
      })
      .catch(error => console.error('Failed to load fallback language file:', error));
  }, []);

  useEffect(() => {
    // Fetch the selected language file if it's not English (which is already loaded).
    if (language === 'en') {
      setTranslations(fallbackTranslations);
      return;
    }
    
    fetch(`/locales/${language}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Could not load language file: ${language}`);
        }
        return response.json();
      })
      .then(data => setTranslations(data))
      .catch(error => {
        console.error(error);
        // Fallback to English if the selected language fails to load
        setTranslations(fallbackTranslations);
      });
  }, [language, fallbackTranslations]);

  const t = useCallback((key: string, replacements?: { [key: string]: string | number }): string => {
    let translation = translations?.[key] || fallbackTranslations?.[key] || key;
    if (replacements) {
      Object.keys(replacements).forEach(rKey => {
        const value = replacements[rKey];
        translation = translation.replace(new RegExp(`\\{${rKey}\\}`, 'g'), String(value));
      });
    }
    return translation;
  }, [translations, fallbackTranslations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {Object.keys(fallbackTranslations).length > 0 ? children : null}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const languages = [
    { code: 'en', nativeName: 'English' },
    { code: 'es', nativeName: 'Español' },
    { code: 'zh', nativeName: '中文' },
    { code: 'hi', nativeName: 'हिन्दी' },
    { code: 'de', nativeName: 'Deutsch' },
    { code: 'it', nativeName: 'Italiano' },
    { code: 'ja', nativeName: '日本語' },
    { code: 'ko', nativeName: '한국어' },
    { code: 'ru', nativeName: 'Русский' },
    { code: 'si', nativeName: 'සිංහල' },
    { code: 'ta', nativeName: 'தமிழ்' },
];