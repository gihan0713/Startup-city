import React from 'react';
import type { StartupIdea } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface StartupIdeaCardProps {
  idea: StartupIdea;
  index: number;
}

const Section: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactElement }> = ({ title, children, icon }) => (
  <div className="mt-6">
    <h3 className="text-xl font-bold text-brand-teal flex items-center mb-2">
        <span className="mr-2">{icon}</span>
        {title}
    </h3>
    <div className="prose prose-invert prose-p:text-brand-text prose-li:text-brand-text prose-a:text-blue-400 hover:prose-a:text-blue-300 text-brand-text space-y-2">
      {children}
    </div>
  </div>
);

export const StartupIdeaCard: React.FC<StartupIdeaCardProps> = ({ idea, index }) => {
    const { t } = useLanguage();
    // A simple function to render markdown-like text (e.g., "- " lists)
    const renderMarkdown = (text: string) => {
        return text.split('\n').map((line, i) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                return <li key={i} className="ml-4 list-disc">{trimmedLine.substring(2)}</li>;
            }
            if (/^\d+\.\s/.test(trimmedLine)) {
                return <li key={i} className="ml-4 list-decimal">{trimmedLine.substring(trimmedLine.indexOf(' ') + 1)}</li>;
            }
            return <p key={i}>{line}</p>;
        });
    };

    return (
    <div className="bg-brand-secondary rounded-xl shadow-lg p-6 md:p-8 border border-brand-accent/50 animate-slide-up" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}>
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-brand-teal to-blue-400 text-transparent bg-clip-text mb-2">
        {idea.title}
      </h2>
      <p className="text-brand-light italic">{idea.description}</p>
      
      <div className="mt-6 border-t border-brand-accent/30 pt-6">
        
        <Section title={t('cardHowToStart')} icon={<IconRocket />}>
          {renderMarkdown(idea.howToStart)}
        </Section>
        
        <Section title={t('cardKeysToSuccess')} icon={<IconKey />}>
          {renderMarkdown(idea.howToSucceed)}
        </Section>
        
        <Section title={t('cardScalingStrategy')} icon={<IconChart />}>
          {renderMarkdown(idea.howToScale)}
        </Section>

        <Section title={t('cardMonthlyBenefits')} icon={<IconHeart />}>
           {renderMarkdown(idea.monthlyBenefits)}
        </Section>

        <Section title={t('cardResources')} icon={<IconBook />}>
            <h4 className="font-semibold text-brand-light">{t('cardHelpfulLinks')}:</h4>
            <ul className="list-disc pl-5">
                {idea.resources.links.map((link, i) => <li key={i}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a></li>)}
            </ul>
             <h4 className="font-semibold text-brand-light mt-4">{t('cardLocalHelpCenters')}:</h4>
            <ul className="list-disc pl-5">
                {idea.resources.helpCenters.map((center, i) => <li key={i}><a href={center.url} target="_blank" rel="noopener noreferrer">{center.name}</a></li>)}
            </ul>
             <h4 className="font-semibold text-brand-light mt-4">{t('cardRecommendedTools')}:</h4>
            <ul className="list-disc pl-5">
                {idea.resources.tools.map((tool, i) => <li key={i}><a href={tool.url} target="_blank" rel="noopener noreferrer">{tool.name}</a></li>)}
            </ul>
        </Section>
        
        <Section title={t('cardAutomationWorkflow')} icon={<IconAutomation />}>
            <p className="italic">{idea.makeAutomation.description}</p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
                {idea.makeAutomation.steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
        </Section>

      </div>
    </div>
  );
};

// SVG Icons defined as components for reusability
const IconRocket: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const IconKey: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 9z" /></svg>;
const IconChart: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconBook: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const IconAutomation: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconHeart: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.318a4.5 4.5 0 010-6.364z" /></svg>;
