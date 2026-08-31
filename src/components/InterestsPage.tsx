import React from 'react';
import { PageId } from '../types';
import { getInterests } from '../data/portfolioData';
import { ArrowLeft, ArrowUp, ArrowUpRight, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface InterestsPageProps {
  onNavigate: (page: PageId) => void;
}

export const InterestsPage: React.FC<InterestsPageProps> = ({ onNavigate }) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const interests = getInterests(language);
  const featured = interests.filter((i) => i.isFeatured);
  const rest = interests.filter((i) => !i.isFeatured);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="interests" className="w-full bg-[#5E6044] text-[#F2EBDD] border-b border-black/15">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto py-12 md:py-20 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 space-y-12">
        {/* Editorial Section Header */}
        <div className="section-heading max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#DDD8C4] uppercase tracking-wider">
              {t.interests.sectionNum}
            </span>
          </div>
          <h1 className="section-h1 font-bold tracking-tight text-[#F2EBDD] lg:whitespace-nowrap">
            {t.interests.title}
          </h1>
          <p className="text-base font-light italic leading-relaxed text-[#DDD8C4] sm:text-lg">
            {t.interests.introLine}
          </p>
        </div>

        {/* Featured interest — photo + tied award */}
        {featured.map((interest) => (
          <article
            key={interest.id}
            id={`interest-card-${interest.id}`}
            className="overflow-hidden rounded-sm border border-white/15 bg-white/[0.04]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {interest.image && (
                <div className="relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-black/30">
                  <img
                    src={interest.image}
                    alt={interest.imageCaption || interest.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  {interest.imageCaption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-10">
                      <p className="text-[11px] font-mono leading-snug text-[#F2EBDD]/90">
                        {interest.imageCaption}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#DDD8C4]">
                  {interest.category}
                </span>
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-[#F2EBDD]">
                    {interest.title}
                  </h2>
                  {interest.description && (
                    <p className="text-base leading-relaxed text-[#E8E4D9]">
                      {interest.description}
                    </p>
                  )}
                </div>

                {interest.awardResult && (
                  <div className="mt-auto space-y-2.5 border-t border-white/15 pt-4">
                    <span className="block text-[11px] font-mono uppercase tracking-widest text-[#DDD8C4]/70">
                      {isVi ? 'Giải thưởng' : 'Award'}
                    </span>
                    <div className="flex items-start gap-3">
                      {interest.certificateImage && interest.certificatePdf && (
                        <a
                          href={interest.certificatePdf}
                          target="_blank"
                          rel="noreferrer"
                          className="group shrink-0"
                          aria-label={isVi ? 'Xem chứng nhận' : 'View certificate'}
                        >
                          <img
                            src={interest.certificateImage}
                            alt=""
                            loading="lazy"
                            className="h-16 w-24 rounded-xs border border-white/20 object-cover transition-opacity group-hover:opacity-90"
                          />
                        </a>
                      )}
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-[#F2EBDD]">{interest.awardResult}</p>
                        {interest.awardCategory && (
                          <p className="text-xs text-[#E8E4D9]">{interest.awardCategory}</p>
                        )}
                        {interest.awardEvent && (
                          <p className="text-[11px] font-mono leading-relaxed text-[#DDD8C4]/70">
                            {interest.awardEvent}
                          </p>
                        )}
                        {interest.certificatePdf && (
                          <a
                            href={interest.certificatePdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 pt-1 text-xs font-mono text-[#DDD8C4] underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                          >
                            <span>{isVi ? 'Xem chứng nhận' : 'View certificate'}</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                    {interest.certificates && interest.certificates.length > 0 && (
                      <div className="space-y-2 border-t border-white/10 pt-3">
                        <span className="block text-[10px] font-mono uppercase tracking-widest text-[#DDD8C4]/70">
                          {isVi ? 'Chứng nhận' : 'Certificates'}
                        </span>
                        <div className="flex flex-col gap-2">
                          {interest.certificates.map((certificate) => (
                            <a
                              key={certificate.pdfUrl}
                              href={certificate.pdfUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="group/certificate flex items-center justify-between gap-3 rounded-xs border border-white/15 bg-black/15 px-3 py-2 text-sm text-[#E8E4D9] transition-colors hover:border-white/30 hover:bg-black/25 hover:text-white"
                            >
                              <span className="flex min-w-0 items-center gap-2">
                                <FileText className="h-3.5 w-3.5 shrink-0 text-[#DDD8C4]" />
                                <span className="truncate">{certificate.title}</span>
                              </span>
                              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover/certificate:translate-x-0.5 group-hover/certificate:-translate-y-0.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}

        {/* Remaining interests */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {rest.map((interest) => (
              <article
                key={interest.id}
                id={`interest-card-${interest.id}`}
                className="flex h-full min-h-[220px] flex-col rounded-sm border border-white/15 bg-white/[0.03] p-5 sm:p-6 opacity-70 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#DDD8C4]">
                  {interest.category}
                </span>
                <div className="mt-auto space-y-3 pt-12">
                  <h2 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight text-[#F2EBDD]">
                    {interest.title}
                  </h2>
                  {interest.description && (
                    <p className="text-base leading-relaxed text-[#E8E4D9]">
                      {interest.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

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
    </section>
  );
};
