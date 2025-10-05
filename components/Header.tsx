import React from 'react';
import { useLanguage, languages } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <header className="bg-brand-secondary/50 py-6 text-center shadow-lg">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          <span className="bg-gradient-to-r from-brand-teal to-blue-400 text-transparent bg-clip-text">
            {t('appName')}
          </span>
        </h1>
        <p className="mt-2 text-lg text-brand-light">
          {t('appSubtitle')}
        </p>
        <div className="mt-4 max-w-xs mx-auto">
          <label htmlFor="language-select" className="sr-only">{t('selectLanguageLabel')}</label>
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            className="w-full px-4 py-2 bg-brand-primary border-2 border-brand-accent rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition-all duration-300 text-brand-text"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.nativeName}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
