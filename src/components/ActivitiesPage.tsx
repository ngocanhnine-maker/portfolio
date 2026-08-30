import React, { useState } from 'react';
import { PageId, GalleryPhoto, ActivityItem } from '../types';
import { getActivities, getSecondaryActivities } from '../data/portfolioData';
import { ArrowUpRight, ChevronUp, Download, FileText, Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface ActivitiesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ onNavigate }) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const activities = getActivities(language);
  const secondaryActivities = getSecondaryActivities(language);

  // State for tracking which activity's extended archive is expanded
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // State for high-res photo lightbox modal
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Group secondary activities into 2 thematic pairs (Mentoring vs Volunteering)
  const mentoringActivities = secondaryActivities.filter((a) => a.categoryGroup === 'mentoring');
  const volunteeringActivities = secondaryActivities.filter((a) => a.categoryGroup === 'volunteering');

  return (
    <section id="activities" className="w-full bg-[#F2EBDD] text-[#292929] border-b border-[#292929]/10 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 sm:py-16 md:py-20 select-none relative">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto w-full space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#676749] uppercase tracking-wider block font-medium">
            {t.activities.sectionNum}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#292929] tracking-tight">
            {t.activities.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#575643] font-serif italic max-w-xl">
            {t.activities.subtitle}
          </p>
        </div>

        {/* 1. PRIMARY FEATURED ACTIVITIES */}
        <div className="space-y-12 sm:space-y-16">
          {activities.map((activity, idx) => {
            const isExpanded = expandedId === activity.id;
            const isEven = idx % 2 === 0; // Alternating layout rhythm
            const activityNumber = `0${idx + 1}`;
            const hasHeroImage = Boolean(activity.heroImage && activity.heroImage.trim() !== '');
            const hasSupportingImage = Boolean(activity.supportingImage && activity.supportingImage.trim() !== '');

            return (
              <article
                key={activity.id}
                className="space-y-6 border-b border-[#292929]/10 pb-12 sm:pb-16 last:border-b-0 last:pb-0"
              >
                {/* 2-Photo Asymmetric Composition */}
                <div
                  className={`flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Primary Hero Photo (~65-68% visual area) */}
                  <div className="w-full md:w-[66%] lg:w-[68%] group">
                    {hasHeroImage ? (
                      <div
                        onClick={() =>
                          setLightboxPhoto({
                            id: `${activity.id}-hero`,
                            url: activity.heroImage!,
                            caption: activity.heroCaption || activity.title,
                            tag: isVi ? 'Hình ảnh chính' : 'Hero Visual',
                            description: activity.description
                          })
                        }
                        className="relative w-full aspect-[16/10] bg-[#ECE5D5] border border-[#292929]/15 rounded-xs overflow-hidden cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.035)] transition-all duration-300 hover:shadow-md hover:border-[#292929]/30"
                      >
                        <img
                          src={activity.heroImage}
                          alt={activity.heroCaption || activity.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-end justify-between p-3">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#292929]/85 text-[#F2EBDD] text-[10px] font-mono px-2 py-0.5 rounded-xs flex items-center gap-1 backdrop-blur-xs">
                            <ZoomIn className="w-3 h-3" />
                            <span>{t.activities.viewFull}</span>
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Placeholder Frame for Hero Photo */
                      <div className="relative w-full aspect-[16/10] bg-[#ECE5D5]/70 border border-dashed border-[#292929]/25 rounded-xs flex flex-col items-center justify-center p-6 text-center transition-colors duration-300 hover:border-[#292929]/40 hover:bg-[#ECE5D5]">
                        <div className="w-10 h-10 rounded-xs bg-[#292929]/5 border border-[#292929]/10 flex items-center justify-center text-[#676749] mb-2.5">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-medium text-[#292929] tracking-tight">
                          [ Primary Photo Frame · 16:10 ]
                        </span>
                        <span className="text-[11px] font-mono text-[#676749] mt-1">
                          {activity.heroCaption || 'Hero photo placeholder'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Supporting Photo Frame (~32-35% visual area) */}
                  <div className="w-full md:w-[34%] lg:w-[32%] group">
                    {hasSupportingImage ? (
                      <div
                        onClick={() =>
                          setLightboxPhoto({
                            id: `${activity.id}-supporting`,
                            url: activity.supportingImage!,
                            caption: activity.supportingCaption || `${activity.title} (Supporting Photo)`,
                            tag: isVi ? 'Ảnh tài liệu' : 'Documentary Photo',
                            description: activity.supportingCaption
                          })
                        }
                        className="relative w-full aspect-[4/3] md:h-full bg-[#ECE5D5] border border-[#292929]/15 rounded-xs overflow-hidden cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.035)] transition-all duration-300 hover:shadow-md hover:border-[#292929]/30"
                      >
                        <img
                          src={activity.supportingImage}
                          alt={activity.supportingCaption || activity.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-end justify-between p-3">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#292929]/85 text-[#F2EBDD] text-[10px] font-mono px-2 py-0.5 rounded-xs flex items-center gap-1 backdrop-blur-xs">
                            <ZoomIn className="w-3 h-3" />
                            <span>{t.activities.viewFull}</span>
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Placeholder Frame for Supporting Photo */
                      <div className="relative w-full aspect-[4/3] md:h-full bg-[#ECE5D5]/70 border border-dashed border-[#292929]/25 rounded-xs flex flex-col items-center justify-center p-6 text-center transition-colors duration-300 hover:border-[#292929]/40 hover:bg-[#ECE5D5]">
                        <div className="w-9 h-9 rounded-xs bg-[#292929]/5 border border-[#292929]/10 flex items-center justify-center text-[#676749] mb-2">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-medium text-[#292929] tracking-tight">
                          [ Supporting Photo · 4:3 ]
                        </span>
                        <span className="text-[10.5px] font-mono text-[#676749] mt-1">
                          {activity.supportingCaption || 'Supporting context frame'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Editorial Content & Hierarchy Below Photos */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#292929]/10 pb-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#676749]">
                      <span className="font-bold text-[#292929] tracking-wider">
                        {isVi ? 'HOẠT ĐỘNG' : 'ACTIVITY'} {activityNumber}
                      </span>
                      <span>/</span>
                      <span className="text-[#575643]">{activity.period}</span>
                      {activity.category && (
                        <>
                          <span className="text-[#292929]/20 hidden sm:inline">·</span>
                          <span className="text-[10.5px] uppercase tracking-wider text-[#676749] font-medium hidden sm:inline">
                            {activity.category}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="text-xs font-mono text-[#676749]">{activity.location}</div>
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-1.5">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#292929] tracking-tight leading-tight">
                      {activity.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-mono text-[#575643]">
                      <span className="font-semibold text-[#292929]">{activity.role}</span>
                      <span>·</span>
                      <span className="text-[#676749]">{activity.organization}</span>
                    </div>
                  </div>

                  {/* Narrative Description & Impacts */}
                  <p className="text-sm sm:text-[14.5px] text-[#292929]/85 leading-relaxed max-w-4xl pt-1">
                    {activity.description}
                  </p>

                  {/* Interactive Details Expansion Anchor (SEE MORE) */}
                  <div className="pt-2 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => toggleExpand(activity.id)}
                      id={`toggle-activity-${activity.id}`}
                      className="group/btn inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F8F6F1] hover:bg-[#ECE5D5] border border-[#292929]/15 text-[#292929] text-xs font-mono font-medium rounded-xs transition-all duration-200 cursor-pointer shadow-2xs"
                    >
                      <span>{isExpanded ? t.activities.collapse : t.activities.seeMore}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#676749]" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#676749] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      )}
                    </button>

                    {activity.gallery && activity.gallery.length > 0 && !isExpanded && (
                      <span className="text-[11px] font-mono text-[#676749]">
                        +{activity.gallery.length} {t.activities.archivePhotos}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expandable Archive Container */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pb-2 space-y-6 border-t border-[#292929]/10 bg-[#F8F6F1]/60 p-5 sm:p-6 rounded-xs mt-4">
                        {/* Key Impacts / Deliverables */}
                        {activity.impacts && activity.impacts.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-xs font-mono uppercase tracking-wider text-[#676749] font-medium block">
                              {t.activities.keyImpacts}
                            </span>
                            <ul className="space-y-1.5 text-xs sm:text-[13px] font-mono text-[#292929]/80 pl-4 list-disc marker:text-[#676749]">
                              {activity.impacts.map((imp, iIdx) => (
                                <li key={iIdx} className="leading-relaxed">
                                  {imp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* PDF / Document Attachment */}
                        {activity.documentUrl && (
                          <div className="p-4 bg-[#ECE5D5]/80 border border-[#292929]/15 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xs bg-[#292929]/10 flex items-center justify-center text-[#292929] shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-[#292929] font-mono">
                                  {activity.documentTitle || (isVi ? 'Giấy xác nhận / Báo cáo hoạt động (PDF)' : 'Official Certificate / Activity Report (PDF)')}
                                </div>
                                <div className="text-[11px] font-mono text-[#676749]">
                                  {isVi ? 'Tài liệu & giấy xác nhận chính thức đính kèm' : 'Official verification document & attachments'}
                                </div>
                              </div>
                            </div>
                            <a
                              href={activity.documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#292929] text-[#F2EBDD] text-xs font-mono rounded-xs hover:bg-[#3f4035] transition-colors shrink-0 shadow-2xs"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>{t.activities.viewDownloadPdf}</span>
                            </a>
                          </div>
                        )}

                        {activity.gallery && activity.gallery.length > 0 && (
                          <div className="space-y-3 pt-1">
                            <div className="flex items-center justify-between text-xs font-mono text-[#676749]">
                              <span className="uppercase tracking-wider font-medium">
                                {isVi ? `BỘ SƯU TẬP HÌNH ẢNH · ${activity.gallery.length} ẢNH` : `ARCHIVE GALLERY · ${activity.gallery.length} PHOTOS`}
                              </span>
                              <span className="text-[11px]">{isVi ? 'Nhấp vào ảnh để phóng to' : 'Click image to expand view'}</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                              {activity.gallery.map((photo) => (
                                <div
                                  key={photo.id}
                                  onClick={() => setLightboxPhoto(photo)}
                                  className="group/item relative bg-[#ECE5D5] border border-[#292929]/15 rounded-xs overflow-hidden cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
                                >
                                  <div className="aspect-[4/3] w-full overflow-hidden">
                                    <img
                                      src={photo.url}
                                      alt={photo.caption}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="p-2 bg-[#F8F6F1] border-t border-[#292929]/10 text-[10px] font-mono text-[#292929]">
                                    <div className="truncate font-medium">{photo.caption}</div>
                                    {photo.tag && (
                                      <span className="text-[#676749] text-[9px] block">
                                        {photo.tag}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>

        {/* 2. SECONDARY ACTIVITIES (2 × 2 Editorial Grid) */}
        <div className="pt-6 sm:pt-8 border-t border-[#292929]/12 space-y-8 sm:space-y-10">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#676749] uppercase tracking-wider block font-medium">
              {t.activities.secondarySubtitle}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#292929] tracking-tight">
              {t.activities.secondaryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#575643] font-serif italic max-w-xl">
              {isVi ? 'Các chương trình cố vấn học thuật và hoạt động cộng đồng.' : 'Academic mentorship initiatives and community welfare engagements.'}
            </p>
          </div>

          {/* Row 1 — Mentoring / Education */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#676749] pb-1 border-b border-[#292929]/10">
              <span className="font-semibold text-[#292929]">{t.activities.row1}</span>
              <span>·</span>
              <span className="uppercase tracking-wider">{t.activities.row1Title}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
              {mentoringActivities.map((secAct, mIdx) => (
                <SecondaryActivityCard
                  key={secAct.id}
                  activity={secAct}
                  indexLabel={`0${mIdx + 1}`}
                  isExpanded={expandedId === secAct.id}
                  onToggleExpand={() => toggleExpand(secAct.id)}
                  onOpenLightbox={(photo) => setLightboxPhoto(photo)}
                />
              ))}
            </div>
          </div>

          {/* Row 2 — Community / Volunteering */}
          <div className="space-y-3 pt-4 sm:pt-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#676749] pb-1 border-b border-[#292929]/10">
              <span className="font-semibold text-[#292929]">{t.activities.row2}</span>
              <span>·</span>
              <span className="uppercase tracking-wider">{t.activities.row2Title}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
              {volunteeringActivities.map((secAct, vIdx) => (
                <SecondaryActivityCard
                  key={secAct.id}
                  activity={secAct}
                  indexLabel={`0${vIdx + 3}`}
                  isExpanded={expandedId === secAct.id}
                  onToggleExpand={() => toggleExpand(secAct.id)}
                  onOpenLightbox={(photo) => setLightboxPhoto(photo)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-[#292929]/12 flex justify-between items-center text-xs sm:text-sm font-mono">
          <button
            onClick={() => onNavigate('leadership')}
            className="group inline-flex items-center gap-2 text-[#676749] hover:text-[#292929] cursor-pointer transition-colors"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            <span>{t.activities.prevSection}</span>
          </button>
          <button
            onClick={() => onNavigate('interests')}
            className="group inline-flex items-center gap-2 text-[#292929] hover:text-[#676749] cursor-pointer transition-colors font-medium"
          >
            <span>{t.activities.nextSection}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>

      {/* Clean High-Resolution Lightbox Viewer */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full bg-[#1C1D18] border border-white/20 rounded-xs overflow-hidden shadow-2xl space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#242620] border-b border-white/10 text-[#F2EBDD]">
              <div className="flex items-center gap-2 text-xs font-mono">
                {lightboxPhoto.tag && (
                  <span className="px-2 py-0.5 bg-white/10 rounded-xs text-[#DDD8C4]">
                    {lightboxPhoto.tag}
                  </span>
                )}
                <span className="font-medium truncate max-w-[280px] sm:max-w-md">
                  {lightboxPhoto.caption}
                </span>
              </div>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="p-1 rounded-xs hover:bg-white/10 text-[#F2EBDD] cursor-pointer transition-colors"
                title="Close viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Display */}
            <div className="relative w-full max-h-[72vh] bg-black flex items-center justify-center p-2">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.caption}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-xs"
              />
            </div>

            {/* Micro description footer */}
            {lightboxPhoto.description && (
              <div className="px-4 py-2.5 bg-[#242620] border-t border-white/10 text-xs text-[#DDD8C4] font-serif italic">
                {lightboxPhoto.description}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

interface SecondaryActivityCardProps {
  activity: ActivityItem;
  indexLabel: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenLightbox: (photo: GalleryPhoto) => void;
}

const SecondaryActivityCard: React.FC<SecondaryActivityCardProps> = ({
  activity,
  indexLabel,
  isExpanded,
  onToggleExpand,
  onOpenLightbox
}) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const hasImage = Boolean(activity.heroImage && activity.heroImage.trim() !== '');

  return (
    <div className="space-y-3 bg-[#F8F6F1]/50 border border-[#292929]/10 rounded-xs p-4 sm:p-5 transition-all duration-300 hover:border-[#292929]/25 hover:bg-[#F8F6F1]/80">
      {/* 1 Strong Photo (Aspect 16:10 / 3:2 compact) */}
      <div className="group">
        {hasImage ? (
          <div
            onClick={() =>
              onOpenLightbox({
                id: `${activity.id}-hero`,
                url: activity.heroImage!,
                caption: activity.heroCaption || activity.title,
                tag: activity.category || (isVi ? 'Ảnh hoạt động' : 'Activity Photo'),
                description: activity.description
              })
            }
            className="relative w-full aspect-[16/10] bg-[#ECE5D5] border border-[#292929]/15 rounded-xs overflow-hidden cursor-pointer shadow-2xs transition-all duration-300 hover:shadow-md hover:border-[#292929]/30"
          >
            <img
              src={activity.heroImage}
              alt={activity.heroCaption || activity.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-end justify-between p-2.5">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#292929]/85 text-[#F2EBDD] text-[9.5px] font-mono px-2 py-0.5 rounded-xs flex items-center gap-1 backdrop-blur-xs">
                <ZoomIn className="w-2.5 h-2.5" />
                <span>{t.activities.viewFull}</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-[16/10] bg-[#ECE5D5]/65 border border-dashed border-[#292929]/20 rounded-xs flex flex-col items-center justify-center p-4 text-center transition-colors duration-200 hover:border-[#292929]/35 hover:bg-[#ECE5D5]/90">
            <div className="w-7 h-7 rounded-xs bg-[#292929]/5 border border-[#292929]/10 flex items-center justify-center text-[#676749] mb-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-mono font-medium text-[#292929] tracking-tight">
              [ Photo Frame · 16:10 ]
            </span>
            <span className="text-[10px] font-mono text-[#676749] mt-0.5 truncate max-w-[200px]">
              {activity.heroCaption || `${activity.title} Archive`}
            </span>
          </div>
        )}
      </div>

      {/* Compact Editorial Metadata & Content */}
      <div className="space-y-1.5 pt-0.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#676749]">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-[#292929]">{indexLabel}</span>
            <span>·</span>
            <span className="text-[#575643] truncate">{activity.period}</span>
          </div>
          {activity.category && (
            <span className="text-[10px] text-[#676749] bg-[#EAE3D2] px-1.5 py-0.2 rounded-xs shrink-0 font-mono">
              {activity.category}
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#292929] tracking-tight leading-snug">
          {activity.title}
        </h3>

        <div className="text-xs font-mono text-[#575643] flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
          <span className="font-semibold text-[#292929]">{activity.role}</span>
          <span>·</span>
          <span className="text-[#676749] truncate">{activity.organization}</span>
        </div>

        <p className="text-xs text-[#292929]/80 leading-relaxed pt-1">
          {activity.description}
        </p>
      </div>

      {/* Subtle SEE MORE interaction */}
      {activity.gallery && activity.gallery.length > 0 ? (
        <div className="pt-1.5 border-t border-[#292929]/10 flex items-center justify-between">
          <button
            onClick={onToggleExpand}
            className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[#292929] hover:text-[#676749] transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>{t.activities.collapse}</span>
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>{t.activities.seeMore}</span>
                <ArrowUpRight className="w-3 h-3" />
              </>
            )}
          </button>
          <span className="text-[10px] font-mono text-[#676749]">
            {activity.gallery.length} {t.activities.archivePhotos}
          </span>
        </div>
      ) : (
        <div className="pt-1 border-t border-[#292929]/8 flex items-center justify-between">
          <button
            onClick={onToggleExpand}
            className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[#676749] hover:text-[#292929] transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>{t.activities.collapse}</span>
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>{t.activities.seeMore}</span>
                <ArrowUpRight className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Expandable details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-3 mt-2 border-t border-[#292929]/10 space-y-2 text-xs font-mono text-[#575643]">
              {activity.tags && activity.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {activity.tags.map((item) => (
                    <span key={item} className="px-1.5 py-0.5 bg-[#EAE3D2] text-[#4E5038] text-[9.5px] rounded-xs">
                      #{item}
                    </span>
                  ))}
                </div>
              )}
              {activity.gallery && activity.gallery.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {activity.gallery.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => onOpenLightbox(g)}
                      className="aspect-[4/3] rounded-xs overflow-hidden border border-[#292929]/15 cursor-pointer hover:border-[#292929]"
                    >
                      <img src={g.url} alt={g.caption} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
