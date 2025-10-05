import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface CityInputFormProps {
  onSubmit: (city: string) => void;
  isLoading: boolean;
}

export const CityInputForm: React.FC<CityInputFormProps> = ({ onSubmit, isLoading }) => {
  const [city, setCity] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(city);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-secondary p-6 rounded-xl shadow-2xl">
      <label htmlFor="city-input" className="block text-lg font-medium text-brand-light mb-2">
        {t('enterCityName')}
      </label>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          id="city-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={t('cityInputPlaceholder')}
          className="flex-grow w-full px-4 py-3 bg-brand-primary border-2 border-brand-accent rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-none transition-all duration-300 text-brand-text placeholder-brand-accent"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="flex items-center justify-center px-6 py-3 bg-brand-teal text-brand-primary font-bold rounded-lg hover:bg-opacity-90 transition-all duration-300 disabled:bg-brand-accent disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          {isLoading ? t('generating') : t('generateIdeas')}
        </button>
      </div>
    </form>
  );
};
