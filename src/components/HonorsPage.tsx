import React, { useState, useEffect } from 'react';
import { PageId, AchievementItem } from '../types';
import { getHonorsAndAwards } from '../data/portfolioData';
import { ArrowLeft, ArrowRight, X, ZoomIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface HonorsPageProps {
  onNavigate: (page: PageId) => void;
  initialAwardId?: string;
}

type FilterType = 'all' | 'national_international' | 'city';

export const HonorsPage: React.FC<HonorsPageProps> = ({ onNavigate, initialAwardId }) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const honorsList = getHonorsAndAwards(language);

  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedAward, setSelectedAward] = useState<AchievementItem | null>(null);
  const [drawerAward, setDrawerAward] = useState<AchievementItem | null>(null);
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<{
    url: string;
    title: string;
    caption?: string;
    tag?: string;
  } | null>(null);

  // Sync initialAwardId if triggered from external navigation (e.g. cross-reference from Research)
  useEffect(() => {
    if (initialAwardId) {
      const target = honorsList.find((a) => a.id === initialAwardId);
      if (target) {
        setDrawerAward(target);
      }
    }
  }, [initialAwardId, honorsList]);

  // Lock body scroll when drawer or lightbox is open
  useEffect(() => {
    if (drawerAward || selectedAward || selectedGalleryPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerAward, selectedAward, selectedGalleryPhoto]);

  const filteredAchievements = filter === 'all'
    ? honorsList
    : honorsList.filter((item) => item.level === filter);

  const filterOptions: { id: FilterType; label: string }[] = [
    { id: 'all', label: t.honors.filterAll },
    { id: 'national_international', label: t.honors.filterNational },
    { id: 'city', label: t.honors.filterCity }
  ];

  return (
    <section id="honors" className="w-full min-h-[calc(100vh-3.5rem)] lg:min-h-screen bg-[#5E6044] text-[#F2EBDD] border-b border-black/15 flex flex-col justify-center py-16 md:py-24 px-5 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto w-full space-y-10 lg:space-y-12">
        {/* Header Title & Minimal Filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#DDD8C4] uppercase tracking-widest block font-medium">
              {t.honors.sectionNum}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F2EBDD] tracking-tight">
            {t.honors.title}
          </h1>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFilter(opt.id)}
                className={`px-3 py-1 text-xs font-mono rounded-xs transition-all cursor-pointer ${
                  filter === opt.id
                    ? 'bg-[#F2EBDD] text-[#292929] font-semibold'
                    : 'bg-white/10 border border-white/15 text-[#F2EBDD] hover:bg-white/20'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Gallery: Grid with Equal Row Tracks and Aligned Tops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {filteredAchievements.map((item, idx) => {
            const awardId = item.id || `${item.year}-${item.award}`;
            const isPortrait = item.imageAspect === 'portrait' || item.id === 'wico-2026';

            // Helper to clean redundant scope words from eyebrow award level (e.g. "National Third Prize" -> "Third Prize", "City-level Second Prize" -> "Second Prize")
            const cleanAwardLevel = (rawAward: string) => {
              if (!rawAward) return '';
              return rawAward
                .replace(/^National\s+/i, '')
                .replace(/^City-level\s+/i, '')
                .replace(/^Cấp Thành phố\s+/i, '')
                .replace(/^Cấp Quốc gia\s+/i, '')
                .replace(/^Cấp Thành Phố\s+/i, '')
                .trim();
            };

            const eyebrowAward = cleanAwardLevel(item.award) || item.award;

            return (
              <article
                key={awardId || idx}
                tabIndex={0}
                role="button"
                aria-label={`${item.competition} - ${item.award} (${item.year})`}
                onClick={() => setDrawerAward(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setDrawerAward(item);
                  }
                }}
                className="group relative flex flex-col h-full bg-[#464831] border border-white/[0.14] hover:border-white/30 focus-visible:border-white/45 focus-visible:ring-1 focus-visible:ring-white/45 rounded-xs p-4 sm:p-5 transition-[border-color,background-color] duration-300 ease-out cursor-pointer outline-none select-none"
              >
                {/* 1 & 2: Framed Certificate Container (aspect-aware for portrait vs landscape) with object-contain & Warm Neutral Matting */}
                <div className={`relative w-full ${isPortrait ? 'aspect-[4/5]' : 'aspect-[4/3]'} overflow-hidden rounded-xs bg-[#EAE5D9] p-3 flex items-center justify-center border border-black/10`}>
                  {item.imageUrl ? (
                    <>
                      <img
                        src={item.imageUrl}
                        alt={`${item.award} - ${item.competition}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain object-center transition-[filter] duration-300 ease-out motion-reduce:transition-none"
                        style={{
                          filter: 'grayscale(0.35) saturate(0.85) contrast(1.05)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = 'none';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = 'grayscale(0.35) saturate(0.85) contrast(1.05)';
                        }}
                      />
                      {/* Very light warm-cream tint unification layer */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[#EDE8D9]/[0.06] pointer-events-none opacity-100 group-hover:opacity-0 group-focus-visible:opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4 text-center">
                      <span className="text-xs font-mono text-[#5E6044]/70">{isVi ? 'Đang lưu trữ chứng nhận' : 'Certificate Archiving'}</span>
                    </div>
                  )}
                </div>

                {/* 3 & 4: 3-Line Text Hierarchy (Eyebrow -> Heading -> Meta Row) with Pinned CTA */}
                <div className="flex flex-col flex-1 pt-3 space-y-2">
                  {/* Line 1 (Eyebrow): Award level only, small mono, uppercase, letter-spaced, no badge chrome */}
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#DDD8C4] font-medium leading-tight">
                    {eyebrowAward}
                  </span>

                  {/* Line 2 (Heading): Competition Name as Large Bold Heading */}
                  <h2
                    className="font-bold text-lg sm:text-xl text-[#F2EBDD] tracking-tight leading-snug break-words"
                    style={{ textWrap: 'balance' as any }}
                  >
                    {item.competition}
                  </h2>

                  {/* Line 3 (Meta Row): Year · [Scope Badge] (Never wraps awkwardly, uses gap for bullet) */}
                  <div className="flex items-center gap-2 text-xs font-mono pt-0.5">
                    <span className="font-semibold text-[#DDD8C4] tracking-wider shrink-0">
                      {item.year}
                    </span>
                    <span className="text-[#DDD8C4]/40 select-none shrink-0" aria-hidden="true">·</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-black/40 text-[#DDD8C4] px-1.5 py-0.5 rounded-xs shrink-0 whitespace-nowrap">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* 5: Pinned See More CTA affordance at bottom */}
                  <div className="pt-3 mt-auto">
                    <span className="text-xs font-mono text-[#DDD8C4]/90 group-hover:text-white group-focus-visible:text-white inline-flex items-center gap-1 transition-colors pointer-events-none">
                      <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-white group-focus-visible:decoration-white">
                        {t.honors.seeMore}
                      </span>
                      <span className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none">→</span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Section Navigation */}
        <div className="pt-6 flex justify-between items-center text-sm font-semibold border-t border-white/10">
          <button
            onClick={() => onNavigate('about')}
            className="inline-flex items-center gap-2 text-[#F2EBDD]/75 hover:text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.honors.prevSection}</span>
          </button>
          <button
            onClick={() => onNavigate('education')}
            className="inline-flex items-center gap-2 text-[#F2EBDD] hover:text-white cursor-pointer transition-colors"
          >
            <span>{t.honors.nextSection}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editorial Side Panel / Drawer from Right */}
      {drawerAward && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerAward(null)}
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container */}
          <div
            className="relative w-full max-w-xl h-full bg-[#23261D] text-[#F2EBDD] border-l border-white/15 shadow-2xl z-10 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#23261D]/95 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#DDD8C4]">
                  {drawerAward.year}
                </span>
                <span className="text-white/30 font-mono">/</span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#DDD8C4]/80">
                  {drawerAward.categoryLabel}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setDrawerAward(null)}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-xs transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="p-6 sm:p-8 space-y-8 flex-1">
              {/* Title & Competition Heading */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F2EBDD] leading-snug">
                  {drawerAward.award}
                </h2>
                <p className="text-sm font-mono text-[#DDD8C4]/85 leading-relaxed">
                  {drawerAward.competition}
                </p>
              </div>

              {/* Hero Award Image / Document Container Inside Drawer */}
              {drawerAward.imageUrl && (
                <div className="space-y-2">
                  <div className="relative w-full bg-black/40 border border-white/15 rounded-xs overflow-hidden p-2 flex items-center justify-center min-h-[220px]">
                    <div className="relative group/media w-full flex items-center justify-center">
                      <img
                        src={drawerAward.imageUrl}
                        alt={`${drawerAward.award} - ${drawerAward.competition}`}
                        referrerPolicy="no-referrer"
                        className="max-h-[320px] w-auto max-w-full object-contain rounded-xs shadow-md cursor-pointer"
                        onClick={() => setSelectedAward(drawerAward)}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <button
                          type="button"
                          onClick={() => setSelectedAward(drawerAward)}
                          className="pointer-events-auto px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-white bg-black/80 hover:bg-black rounded-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                        >
                          <ZoomIn className="w-3.5 h-3.5" /> {t.honors.enlarge}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Editorial Sections */}
              <div className="space-y-5 pt-2 border-t border-white/10 text-sm">
                {/* About the Competition */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDD8C4] block font-medium">
                    {t.honors.aboutComp}
                  </span>
                  <p className="text-[#DDD8C4]/85 font-mono text-xs leading-relaxed">
                    {drawerAward.aboutCompetition || (isVi ? '[ Thông tin về cuộc thi và bối cảnh học thuật đang được cập nhật. ]' : '[ Information regarding the competition background and academic framework will be curated here. ]')}
                  </p>
                  {drawerAward.websiteUrl && (
                    <div className="pt-1">
                      <a
                        href={drawerAward.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[#DDD8C4]/80 hover:text-white hover:underline underline-offset-4 transition-colors"
                      >
                        <span>↗ {isVi ? 'Trang thông tin cuộc thi chính thức' : 'Official Competition Website'}</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Level / Scope */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDD8C4] block font-medium">
                    {t.honors.levelScope}
                  </span>
                  <p className="text-[#DDD8C4]/85 font-mono text-xs leading-relaxed">
                    {drawerAward.levelScope || `[ ${drawerAward.categoryLabel} ranking and scope specifications. ]`}
                  </p>
                  {drawerAward.datesLocation && (
                    <p className="text-[#DDD8C4]/70 font-mono text-[11px]">
                      {drawerAward.datesLocation}
                    </p>
                  )}
                </div>

                {/* Result */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDD8C4] block font-medium">
                    {t.honors.resultLabel}
                  </span>
                  <p className="text-[#DDD8C4]/85 font-mono text-xs leading-relaxed">
                    {drawerAward.result || `[ ${drawerAward.award} - ${drawerAward.year} ]`}
                  </p>
                </div>

                {/* Project */}
                {drawerAward.projectTopic && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDD8C4] block font-medium">
                      {t.honors.projectLabel}
                    </span>
                    <p className="text-[#DDD8C4]/90 font-mono text-xs leading-relaxed">
                      {drawerAward.projectTopic}
                    </p>
                  </div>
                )}

                {/* Team Members */}
                {drawerAward.teamMembers && drawerAward.teamMembers.length > 1 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#DDD8C4]/70 block font-medium">
                      {t.honors.teamMembers}
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {drawerAward.teamMembers.map((member, mIdx) => {
                        const isSelf = member === 'Trần Ngọc Ánh' || member.includes('Trần Ngọc Ánh') || member.includes('Tran Ngoc Anh');
                        return (
                          <span
                            key={mIdx}
                            className={`text-[11px] font-mono px-2 py-0.5 rounded-xs border transition-colors ${
                              isSelf
                                ? 'bg-white/10 text-[#F2EBDD] font-medium border-white/25'
                                : 'bg-black/25 text-[#DDD8C4]/70 border-white/10'
                            }`}
                          >
                            {member}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Competition Moments / Editorial Photo Gallery */}
                {drawerAward.gallery && drawerAward.gallery.length > 0 && (
                  <div className="space-y-4 pt-6 border-t border-white/15">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDD8C4] block font-medium">
                          {drawerAward.galleryTitle || t.honors.galleryTitle}
                        </span>
                        <span className="text-[11px] font-mono text-white/50 block mt-0.5">
                          {isVi ? 'Nhật ký hình ảnh · ' : 'Photo Journal · '}{drawerAward.datesLocation || 'Seoul, Korea'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#DDD8C4]/70 uppercase tracking-widest bg-black/40 border border-white/10 px-2 py-0.5 rounded-xs">
                        {drawerAward.gallery.length} {isVi ? 'Ảnh' : 'Photos'}
                      </span>
                    </div>

                    {/* Gallery Asymmetrical Editorial Composition */}
                    <div className="space-y-3.5 pt-1">
                      {drawerAward.gallery.length === 2 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {drawerAward.gallery.map((photo) => (
                            <div
                              key={photo.id}
                              onClick={() =>
                                setSelectedGalleryPhoto({
                                  url: photo.url,
                                  title: photo.caption,
                                  caption: photo.description,
                                  tag: photo.tag
                                })
                              }
                              className="group/photo relative w-full aspect-[16/11] overflow-hidden rounded-xs bg-black/40 border border-white/15 hover:border-white/40 transition-all duration-300 cursor-pointer shadow-md"
                            >
                              <img
                                src={photo.url}
                                alt={photo.caption}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-[1.03]"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-95 group-hover/photo:opacity-100 transition-opacity flex flex-col justify-between p-3.5">
                                <div className="flex items-center justify-between">
                                  {photo.tag && (
                                    <span className="text-[9px] font-mono uppercase tracking-widest bg-black/75 text-[#DDD8C4] border border-white/20 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                                      {photo.tag}
                                    </span>
                                  )}
                                  <span className="text-[10px] font-mono uppercase text-white/90 bg-black/70 px-2 py-0.5 rounded-xs opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center gap-1">
                                    <ZoomIn className="w-3 h-3" /> {t.honors.enlarge}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-[#F2EBDD] font-mono leading-snug">
                                    {photo.caption}
                                  </p>
                                  {photo.description && (
                                    <p className="text-[10px] font-mono text-[#DDD8C4]/70 line-clamp-1 mt-0.5">
                                      {photo.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          {/* 1. Large Featured Hero Photo */}
                          {drawerAward.gallery[0] && (
                            <div
                              onClick={() =>
                                setSelectedGalleryPhoto({
                                  url: drawerAward.gallery![0].url,
                                  title: drawerAward.gallery![0].caption,
                                  caption: drawerAward.gallery![0].description,
                                  tag: drawerAward.gallery![0].tag
                                })
                              }
                              className="group/photo relative w-full aspect-[16/10] overflow-hidden rounded-xs bg-black/40 border border-white/15 hover:border-white/40 transition-all duration-300 cursor-pointer shadow-md"
                            >
                              <img
                                src={drawerAward.gallery[0].url}
                                alt={drawerAward.gallery[0].caption}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-[1.03]"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-95 group-hover/photo:opacity-100 transition-opacity flex flex-col justify-between p-3.5">
                                <div className="flex items-center justify-between">
                                  {drawerAward.gallery[0].tag && (
                                    <span className="text-[9px] font-mono uppercase tracking-widest bg-black/75 text-[#DDD8C4] border border-white/20 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                                      {drawerAward.gallery[0].tag}
                                    </span>
                                  )}
                                  <span className="text-[10px] font-mono uppercase text-white/90 bg-black/70 px-2 py-0.5 rounded-xs opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center gap-1">
                                    <ZoomIn className="w-3 h-3" /> {t.honors.enlarge}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-[#F2EBDD] font-mono leading-snug">
                                    {drawerAward.gallery[0].caption}
                                  </p>
                                  {drawerAward.gallery[0].description && (
                                    <p className="text-[10px] font-mono text-[#DDD8C4]/75 line-clamp-1 mt-0.5">
                                      {drawerAward.gallery[0].description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 2. Grid of Supporting Photos */}
                          {drawerAward.gallery.length > 1 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              {drawerAward.gallery.slice(1).map((photo) => (
                                <div
                                  key={photo.id}
                                  onClick={() =>
                                    setSelectedGalleryPhoto({
                                      url: photo.url,
                                      title: photo.caption,
                                      caption: photo.description,
                                      tag: photo.tag
                                    })
                                  }
                                  className="group/photo relative w-full aspect-[16/10] overflow-hidden rounded-xs bg-black/40 border border-white/15 hover:border-white/40 transition-all duration-300 cursor-pointer shadow-md"
                                >
                                  <img
                                    src={photo.url}
                                    alt={photo.caption}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-[1.03]"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-95 group-hover/photo:opacity-100 transition-opacity flex flex-col justify-between p-3">
                                    <div className="flex items-center justify-between">
                                      {photo.tag && (
                                        <span className="text-[9px] font-mono uppercase tracking-widest bg-black/75 text-[#DDD8C4] border border-white/20 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                                          {photo.tag}
                                        </span>
                                      )}
                                      <span className="text-[10px] font-mono uppercase text-white/90 bg-black/70 p-1 rounded-xs opacity-0 group-hover/photo:opacity-100 transition-opacity">
                                        <ZoomIn className="w-3 h-3" />
                                      </span>
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-[#F2EBDD] font-mono leading-snug">
                                        {photo.caption}
                                      </p>
                                      {photo.description && (
                                        <p className="text-[10px] font-mono text-[#DDD8C4]/70 line-clamp-1 mt-0.5">
                                          {photo.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#23261D] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDrawerAward(null)}
                className="text-xs font-mono text-[#DDD8C4] hover:text-white transition-colors cursor-pointer"
              >
                ← {t.honors.closePanel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal Lightbox */}
      {selectedAward && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
          onClick={() => setSelectedAward(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#181818] border border-white/20 shadow-2xl rounded-xs overflow-hidden flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#222222]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDD8C4]">
                    {selectedAward.year} · {selectedAward.categoryLabel}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#F2EBDD] leading-tight mt-0.5">
                  {selectedAward.award} — {selectedAward.competition}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAward(null)}
                  className="p-1.5 rounded-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Media View */}
            <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-black/60 min-h-[350px]">
              {selectedAward.imageUrl ? (
                <div className="relative max-h-[76vh] flex flex-col items-center justify-center rounded-xs overflow-hidden bg-black/40 p-2 border border-white/15 shadow-2xl">
                  <img
                    src={selectedAward.imageUrl}
                    alt={`${selectedAward.award} - ${selectedAward.competition}`}
                    referrerPolicy="no-referrer"
                    className="max-h-[72vh] max-w-full w-auto h-auto object-contain rounded-xs"
                  />
                </div>
              ) : (
                <p className="text-white/50 text-sm font-mono">{isVi ? 'Chưa có tài liệu đính kèm' : 'No certificate document attached'}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Gallery Photo Lightbox Modal */}
      {selectedGalleryPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
          onClick={() => setSelectedGalleryPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#181818] border border-white/20 shadow-2xl rounded-xs overflow-hidden flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#222222]">
              <div>
                <div className="flex items-center gap-2">
                  {selectedGalleryPhoto.tag && (
                    <span className="text-[9px] font-mono uppercase tracking-widest bg-white/10 text-[#DDD8C4] px-2 py-0.5 rounded-xs border border-white/15">
                      {selectedGalleryPhoto.tag}
                    </span>
                  )}
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDD8C4]/70">
                    {isVi ? 'Hình ảnh từ sự kiện' : 'Moments from Event'}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#F2EBDD] leading-tight mt-1">
                  {selectedGalleryPhoto.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedGalleryPhoto(null)}
                className="p-1.5 rounded-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Media View */}
            <div className="p-4 sm:p-6 overflow-y-auto flex flex-col items-center justify-center bg-black/70 min-h-[350px]">
              <div className="relative max-h-[72vh] flex flex-col items-center justify-center rounded-xs overflow-hidden bg-black/40 p-2 border border-white/15 shadow-2xl">
                <img
                  src={selectedGalleryPhoto.url}
                  alt={selectedGalleryPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[66vh] max-w-full w-auto h-auto object-contain rounded-xs"
                />
              </div>
              {selectedGalleryPhoto.caption && (
                <p className="mt-3 text-xs font-mono text-[#DDD8C4]/85 text-center max-w-xl">
                  {selectedGalleryPhoto.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
