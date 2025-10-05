import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-brand-secondary/50 py-4 mt-12">
      <div className="container mx-auto px-4 text-center text-brand-light text-sm">
        <p>{t('footerDisclaimer')}</p>
        <p>&copy; {new Date().getFullYear()} {t('appName')}</p>
      </div>
    </footer>
  );
};
