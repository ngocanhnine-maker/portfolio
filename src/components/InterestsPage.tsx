import React from 'react';
import { PageId } from '../types';
import { getInterests } from '../data/portfolioData';
import { ArrowLeft, ArrowUp, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface InterestsPageProps {
  onNavigate: (page: PageId) => void;
}

export const InterestsPage: React.FC<InterestsPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const interests = getInterests(language);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="interests" className="w-full bg-[#5E6044] text-[#F2EBDD] border-b border-black/15">
      <div className="max-w-4xl mx-auto py-12 md:py-20 px-5 sm:px-8 md:px-12 space-y-10">
        {/* Title */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#DDD8C4] uppercase tracking-wider">
            {t.interests.sectionNum}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F2EBDD] tracking-tight">
            {t.interests.title}
          </h1>
        </div>

        {/* Interests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interests.map((interest, idx) => (
            <article
              key={interest.id}
              className="p-6 border border-white/15 bg-white/10 rounded-xs space-y-3 backdrop-blur-xs shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#DDD8C4]">
                  <span>0{idx + 1}</span>
                  <span className="uppercase tracking-wider">{interest.category}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#F2EBDD]">
                  {interest.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#F2EBDD]/85 leading-relaxed">
                  {interest.description}
                </p>
              </div>

              {interest.details && interest.details.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10 mt-3">
                  {interest.details.map((detail) => (
                    <span
                      key={detail}
                      className="px-2 py-0.5 bg-black/30 border border-white/20 text-[11px] font-mono text-[#DDD8C4] rounded-xs"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 flex flex-wrap justify-between items-center gap-3 text-sm font-semibold border-t border-white/10">
          <button
            onClick={() => onNavigate('activities')}
            className="inline-flex items-center gap-2 text-[#F2EBDD]/75 hover:text-white cursor-pointer transition-colors text-xs font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.interests.prevSection}</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('resume')}
              className="inline-flex items-center gap-2 text-[#F2EBDD] hover:text-white cursor-pointer transition-colors text-xs font-mono"
              id="interests-to-resume-btn"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.interests.viewResume}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-[#DDD8C4] hover:text-white cursor-pointer transition-colors text-xs font-mono"
            >
              <span>{t.interests.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
