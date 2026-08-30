import React from 'react';
import { PageId } from '../types';
import { getInterests } from '../data/portfolioData';
import { ArrowLeft, ArrowUp, FileText, ArrowUpRight, Music, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface InterestsPageProps {
  onNavigate: (page: PageId) => void;
}

export const InterestsPage: React.FC<InterestsPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const interests = getInterests(language);

  const featuredInterest = interests.find((i) => i.isFeatured) || interests[0];
  const sideInterests = interests.filter((i) => i.id !== featuredInterest?.id);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="interests" className="w-full bg-[#5E6044] text-[#F2EBDD] border-b border-black/15">
      <div className="max-w-5xl mx-auto py-12 md:py-20 px-5 sm:px-8 md:px-12 space-y-12">
        {/* Editorial Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#DDD8C4] uppercase tracking-wider">
              {t.interests.sectionNum}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F2EBDD] tracking-tight">
            {t.interests.title}
          </h1>
          <p className="text-base sm:text-lg text-[#DDD8C4] font-light leading-relaxed italic pt-1">
            “{t.interests.introLine}”
          </p>
        </div>

        {/* Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Large Featured Interest (~55% width) */}
          {featuredInterest && (
            <article
              id={`featured-interest-${featuredInterest.id}`}
              className="lg:col-span-7 group/featured flex flex-col justify-between space-y-5 bg-white/[0.04] p-5 sm:p-7 rounded-sm border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Number & Category */}
                <div className="flex items-center justify-between text-xs font-mono text-[#DDD8C4]/90 pb-1">
                  <span className="tracking-wider flex items-center gap-2">
                    <span className="font-semibold text-white/90">
                      {featuredInterest.number || '01'} — {featuredInterest.category}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#DDD8C4]/60">
                    <Sparkles className="w-3 h-3 text-[#DDD8C4]/70" />
                    <span>Featured</span>
                  </span>
                </div>

                {/* Full-bleed Editorial Image */}
                {featuredInterest.image && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xs bg-black/20">
                    <img
                      src={featuredInterest.image}
                      alt={featuredInterest.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover/featured:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-xs rounded-xs text-[11px] font-mono text-[#DDD8C4] border border-white/15">
                      <Music className="w-3 h-3 text-[#DDD8C4]" />
                      <span>Studio & Practice</span>
                    </div>
                  </div>
                )}

                {/* Title & Reflection Quote */}
                <div className="space-y-2 pt-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#F2EBDD] tracking-tight group-hover/featured:text-white transition-colors">
                    {featuredInterest.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#F2EBDD]/90 italic leading-relaxed">
                    “{featuredInterest.quote || featuredInterest.description}”
                  </p>
                </div>
              </div>

              {/* Sub-details / Tags if present */}
              {featuredInterest.details && featuredInterest.details.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                  {featuredInterest.details.map((detail) => (
                    <span
                      key={detail}
                      className="px-2.5 py-0.5 bg-black/20 text-[11px] font-mono text-[#DDD8C4] rounded-xs border border-white/10"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              )}
            </article>
          )}

          {/* Right Column: Three Horizontal Editorial Rows (~45% width) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
            <div className="divide-y divide-white/15">
              {sideInterests.map((interest, idx) => (
                <article
                  key={interest.id}
                  id={`interest-row-${interest.id}`}
                  className="py-6 first:pt-0 last:pb-0 group/row cursor-default transition-all duration-300"
                >
                  <div className="space-y-2">
                    {/* Number & Category */}
                    <div className="flex items-center justify-between text-xs font-mono text-[#DDD8C4]/80">
                      <span className="uppercase tracking-wider">
                        {interest.number || `0${idx + 2}`} — {interest.category}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#DDD8C4]/40 opacity-0 -translate-x-1 translate-y-1 group-hover/row:opacity-100 group-hover/row:translate-x-0 group-hover/row:translate-y-0 transition-all duration-300" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#F2EBDD] group-hover/row:translate-x-1 group-hover/row:text-white transition-all duration-300">
                      {interest.title}
                    </h3>

                    {/* Description / Quote */}
                    <p className="text-xs sm:text-sm text-[#DDD8C4] italic leading-relaxed font-light">
                      “{interest.quote || interest.description}”
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Subtle Editorial Accent Divider on Desktop */}
            <div className="hidden lg:block pt-4 text-right">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DDD8C4]/40">
                Personal Archive · Explorations
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Mono-text Line */}
        <div className="pt-6 sm:pt-8 border-t border-white/15">
          <div className="py-2.5 px-4 bg-black/20 border border-white/10 rounded-xs flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-mono text-[#DDD8C4] tracking-wide">
              {t.interests.currentlyText}
            </span>
            <span className="text-[11px] font-mono text-[#DDD8C4]/60 uppercase">
              Hanoi · 2026
            </span>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 flex flex-wrap justify-between items-center gap-3 text-sm font-semibold border-t border-white/10">
          <button
            onClick={() => onNavigate('activities')}
            className="inline-flex items-center gap-2 text-[#F2EBDD]/75 hover:text-white cursor-pointer transition-colors text-xs font-mono"
            id="interests-prev-btn"
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
              id="interests-back-to-top-btn"
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

