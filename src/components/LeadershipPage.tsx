import React from 'react';
import { PageId } from '../types';
import { getLeadershipStories } from '../data/portfolioData';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface LeadershipPageProps {
  onNavigate: (page: PageId) => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const leadershipStories = getLeadershipStories(language);

  return (
    <section id="leadership" className="w-full bg-[#5E6044] text-[#F2EBDD] border-b border-black/15">
      <div className="max-w-4xl mx-auto py-12 md:py-20 px-5 sm:px-8 md:px-12 space-y-10">
        {/* Title */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#DDD8C4] uppercase tracking-wider">
            {t.leadership.sectionNum}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F2EBDD] tracking-tight">
            {t.leadership.title}
          </h1>
        </div>

        {/* Stories */}
        <div className="space-y-4">
          {leadershipStories.map((story, idx) => (
            <article
              key={story.id}
              className="p-6 sm:p-7 border border-white/15 bg-white/10 rounded-xs space-y-3.5 backdrop-blur-xs shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:border-white/25 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#DDD8C4] block">
                    0{idx + 1} · {story.period}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#F2EBDD]">
                    {story.roleTitle}
                  </h2>
                  <span className="text-xs font-mono text-[#DDD8C4] block">
                    {story.organization}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-0">
                  {story.metrics.map((m, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono bg-black/30 border border-white/20 text-[#F2EBDD] px-2.5 py-0.5 rounded-xs"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#F2EBDD]/85 pt-1 leading-relaxed">
                {story.highlight}
              </p>
            </article>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 flex justify-between items-center text-sm font-semibold border-t border-white/10">
          <button
            onClick={() => onNavigate('research')}
            className="inline-flex items-center gap-2 text-[#F2EBDD]/75 hover:text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.leadership.prevSection}</span>
          </button>
          <button
            onClick={() => onNavigate('activities')}
            className="inline-flex items-center gap-2 text-[#F2EBDD] hover:text-white cursor-pointer transition-colors"
          >
            <span>{t.leadership.nextSection}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
