import React, { useState } from 'react';
import { CityInputForm } from './components/CityInputForm';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { StartupIdeaCard } from './components/StartupIdeaCard';
import { Footer } from './components/Footer';
import { generateStartupIdeas } from './services/geminiService';
import type { StartupIdea } from './types';
import { useLanguage, languages } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [startupIdeas, setStartupIdeas] = useState<StartupIdea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const { language, t } = useLanguage();

  const handleGenerateIdeas = async (cityName: string) => {
    if (!cityName.trim()) {
      setError(t('errorCityRequired'));
      return;
    }

    setIsLoading(true);
    setCity(cityName);
    setError(null);
    setStartupIdeas([]);
    setHasSearched(true);

    try {
      const languageName = languages.find(l => l.code === language)?.nativeName || 'English';
      const ideas = await generateStartupIdeas(cityName, languageName);
      setStartupIdeas(ideas);
    } catch (err) {
      console.error(err);
      setError(t('errorFailedToGenerate'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-primary font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <CityInputForm onSubmit={handleGenerateIdeas} isLoading={isLoading} />
          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg animate-fade-in text-center">
              <p><strong>{t('errorTitle')}:</strong> {error}</p>
            </div>
          )}
          
          <div className="mt-12">
            {isLoading && <LoadingSpinner city={city} />}
            
            {!isLoading && startupIdeas.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-center text-brand-teal animate-fade-in">{t('resultsTitle', { city })}</h2>
                {startupIdeas.map((idea, index) => (
                  <StartupIdeaCard key={index} idea={idea} index={index} />
                ))}
              </div>
            )}

            {!isLoading && hasSearched && startupIdeas.length === 0 && !error && (
               <div className="text-center mt-12 bg-brand-secondary p-8 rounded-lg animate-fade-in">
                  <h3 className="text-2xl font-bold text-brand-teal">{t('noIdeasFoundTitle')}</h3>
                  <p className="mt-2 text-brand-light">{t('noIdeasFoundMessage', { city })}</p>
               </div>
            )}
            
            {!isLoading && !hasSearched && (
              <div className="text-center mt-12 bg-brand-secondary p-8 rounded-lg animate-fade-in">
                <h3 className="text-2xl font-bold text-brand-teal">{t('welcomeTitle')}</h3>
                <p className="mt-2 text-brand-light">{t('welcomeMessage')}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
