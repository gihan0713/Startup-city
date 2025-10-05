import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LoadingSpinnerProps {
  city: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ city }) => {
  const { t } = useLanguage();
  return (
    <div className="text-center py-10 animate-fade-in">
      <div className="flex justify-center items-center mb-4">
          <svg className="animate-spin h-10 w-10 text-brand-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
      </div>
      <h3 className="text-xl font-semibold text-brand-light">{t('loadingTitle', { city })}</h3>
      <p className="text-brand-accent mt-1">{t('loadingMessage')}</p>
    </div>
  );
};
