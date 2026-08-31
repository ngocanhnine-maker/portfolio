import React, { useState } from 'react';
import { PageId, GalleryPhoto, ActivityItem } from '../types';
import { getActivities, getSecondaryActivities } from '../data/portfolioData';
import { ArrowUpRight, ChevronUp, Download, FileText, Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

const SHOW_ACTIVITY_IMAGE_PLACEHOLDERS = import.meta.env.DEV;

interface ActivitiesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ onNavigate }) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const activities = getActivities(language);
  const secondaryActivities = getSecondaryActivities(language);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const mentoringActivities = secondaryActivities.filter((activity) => activity.categoryGroup === 'mentoring');
  const volunteeringActivities = secondaryActivities.filter((activity) => activity.categoryGroup === 'volunteering');
  const toggleExpand = (id: string) => setExpandedId((current) => (current === id ? null : id));

  return (
    <section
      id="activities"
      className="relative w-full scroll-mt-14 border-b border-[#292929]/10 bg-[#F2EBDD] px-6 pb-12 pt-16 text-[#292929] select-none sm:px-10 sm:pb-16 sm:pt-20 md:px-14 md:pb-20 md:pt-24 lg:scroll-mt-0 lg:px-16 xl:px-20"
    >
      <div className="mx-auto w-full max-w-6xl space-y-12 sm:space-y-16 xl:max-w-7xl 2xl:max-w-[1500px]">
        <div className="section-heading">
          <span className="block text-xs font-mono font-medium uppercase tracking-wider text-[#676749]">
            {t.activities.sectionNum}
          </span>
          <h1 className="section-h1 font-bold tracking-tight text-[#292929] lg:whitespace-nowrap">
            {t.activities.title}
          </h1>
          <p className="max-w-[68ch] text-base leading-relaxed text-[#575643] sm:text-[17px]">
            {t.activities.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {activities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              indexLabel={`${isVi ? 'HOẠT ĐỘNG' : 'ACTIVITY'} 0${index + 1}`}
              isExpanded={expandedId === activity.id}
              onToggleExpand={() => toggleExpand(activity.id)}
              onOpenLightbox={setLightboxPhoto}
            />
          ))}
        </div>

        <div className="space-y-8 sm:space-y-10">
          <div className="space-y-1">
            <span className="block text-[11px] font-mono font-medium uppercase tracking-wider text-[#676749]">
              {t.activities.secondarySubtitle}
            </span>
            <h2 className="text-xl font-bold tracking-tight text-[#292929] sm:text-2xl">
              {t.activities.secondaryTitle}
            </h2>
            <p className="max-w-[68ch] text-base leading-relaxed text-[#575643] sm:text-[17px]">
              {isVi
                ? 'Các chương trình cố vấn học thuật và hoạt động cộng đồng.'
                : 'Academic mentorship initiatives and community welfare engagements.'}
            </p>
          </div>

          <ActivityGroup
            label={t.activities.row1}
            title={t.activities.row1Title}
            activities={mentoringActivities}
            startIndex={1}
            expandedId={expandedId}
            onToggleExpand={toggleExpand}
            onOpenLightbox={setLightboxPhoto}
          />

          <ActivityGroup
            label={t.activities.row2}
            title={t.activities.row2Title}
            activities={volunteeringActivities}
            startIndex={3}
            expandedId={expandedId}
            onToggleExpand={toggleExpand}
            onOpenLightbox={setLightboxPhoto}
          />
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-[#292929]/12 pt-6 text-xs font-mono sm:mt-12 sm:text-sm">
          <button
            onClick={() => onNavigate('leadership')}
            className="group inline-flex cursor-pointer items-center gap-2 text-[#676749] transition-colors hover:text-[#292929]"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            <span>{t.activities.prevSection}</span>
          </button>
          <button
            onClick={() => onNavigate('interests')}
            className="group inline-flex cursor-pointer items-center gap-2 font-medium text-[#292929] transition-colors hover:text-[#676749]"
          >
            <span>{t.activities.nextSection}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>

      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.caption}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[4px] border border-white/20 bg-[#1C1D18] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-[#242620] px-4 py-3 text-[#F2EBDD]">
              <div className="flex min-w-0 items-center gap-2">
                {lightboxPhoto.tag && (
                  <span className="shrink-0 rounded-[4px] bg-white/10 px-2 py-0.5 text-xs font-mono text-[#DDD8C4]">
                    {lightboxPhoto.tag}
                  </span>
                )}
                <span className="max-w-[280px] truncate text-base font-medium sm:max-w-md sm:text-[17px]">
                  {lightboxPhoto.caption}
                </span>
              </div>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="cursor-pointer rounded-[4px] p-1 text-[#F2EBDD] transition-colors hover:bg-white/10"
                title={isVi ? 'Đóng' : 'Close viewer'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex max-h-[72vh] w-full items-center justify-center bg-black p-2">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.caption}
                className="max-h-[68vh] w-auto max-w-full rounded-[4px] object-contain"
              />
            </div>
            {lightboxPhoto.description && (
              <div className="border-t border-white/10 bg-[#242620] px-4 py-3 text-base leading-relaxed text-[#DDD8C4] sm:text-[17px]">
                <p className="max-w-[68ch]">{lightboxPhoto.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

interface ActivityGroupProps {
  label: string;
  title: string;
  activities: ActivityItem[];
  startIndex: number;
  expandedId: string | null;
  onToggleExpand: (id: string) => void;
  onOpenLightbox: (photo: GalleryPhoto) => void;
}

const ActivityGroup: React.FC<ActivityGroupProps> = ({
  label,
  title,
  activities,
  startIndex,
  expandedId,
  onToggleExpand,
  onOpenLightbox
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 text-xs font-mono text-[#676749]">
      <span className="font-semibold text-[#292929]">{label}</span>
      <span>·</span>
      <span className="uppercase tracking-wider">{title}</span>
    </div>
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
      {activities.map((activity, index) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          indexLabel={`0${startIndex + index}`}
          isExpanded={expandedId === activity.id}
          onToggleExpand={() => onToggleExpand(activity.id)}
          onOpenLightbox={onOpenLightbox}
        />
      ))}
    </div>
  </div>
);

interface ActivityCardProps {
  activity: ActivityItem;
  indexLabel: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenLightbox: (photo: GalleryPhoto) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  indexLabel,
  isExpanded,
  onToggleExpand,
  onOpenLightbox
}) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const hasHeroImage = Boolean(activity.heroImage?.trim());
  const hasSupportingImage = Boolean(activity.supportingImage?.trim());
  const isFeaturedActivity = activity.categoryGroup === 'featured';
  const showHeroFrame = hasHeroImage || SHOW_ACTIVITY_IMAGE_PLACEHOLDERS;
  const showSupportingFrame =
    hasSupportingImage || (SHOW_ACTIVITY_IMAGE_PLACEHOLDERS && isFeaturedActivity);
  const imageFrameCount = Number(showHeroFrame) + Number(showSupportingFrame);
  const hasExpandableDetails = Boolean(
    activity.impacts?.length ||
      activity.tags?.length ||
      activity.documentUrl ||
      activity.gallery?.length
  );

  const openHeroImage = () => {
    if (!activity.heroImage) return;
    onOpenLightbox({
      id: `${activity.id}-hero`,
      url: activity.heroImage,
      caption: activity.heroCaption || activity.title,
      tag: activity.category || (isVi ? 'Ảnh hoạt động' : 'Activity Photo'),
      description: activity.description
    });
  };

  const openSupportingImage = () => {
    if (!activity.supportingImage) return;
    onOpenLightbox({
      id: `${activity.id}-supporting`,
      url: activity.supportingImage,
      caption: activity.supportingCaption || activity.title,
      tag: isVi ? 'Ảnh tài liệu' : 'Documentary Photo',
      description: activity.supportingCaption
    });
  };

  return (
    <article className="rounded-[4px] border border-black/[0.12] bg-[#F5F1E8] p-6 sm:p-8 lg:p-10">
      <div className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2 text-[#5A6142]">
            <span className="font-bold tracking-wider text-[#292929]">{indexLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{activity.period}</span>
          </div>
          {activity.category && (
            <span className="max-w-full rounded-full bg-black/[0.06] px-2.5 py-1 text-right text-[10px] font-medium uppercase tracking-wider text-[#5A6142]">
              {activity.category}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-[#292929] sm:text-2xl">
            {activity.title}
          </h2>
          <p className="max-w-[68ch] text-base font-semibold leading-relaxed text-[#292929] sm:text-[17px]">
            {activity.role}
          </p>
          <p className="max-w-[68ch] text-base leading-relaxed text-[#5A6142] sm:text-[17px]">
            {activity.organization}
          </p>
        </div>

        <p className="max-w-[68ch] text-base leading-relaxed text-[#292929]/85 sm:text-[17px]">
          {activity.description}
        </p>

        {imageFrameCount > 0 && (
          <div
            className={`grid grid-cols-1 gap-4 ${
              imageFrameCount > 1 ? 'sm:grid-cols-[2fr_1fr]' : ''
            }`}
          >
            {showHeroFrame && (
              hasHeroImage ? (
                <ActivityImage
                  src={activity.heroImage!}
                  alt={activity.heroCaption || activity.title}
                  onOpen={openHeroImage}
                  viewLabel={t.activities.viewFull}
                />
              ) : SHOW_ACTIVITY_IMAGE_PLACEHOLDERS ? (
                <ActivityPlaceholder
                  label={isVi ? 'Ảnh chính · 16:10' : 'Primary Photo · 16:10'}
                  caption={activity.heroCaption || (isVi ? 'Đang cập nhật ảnh' : 'Photo pending')}
                />
              ) : null
            )}

            {showSupportingFrame && (
              hasSupportingImage ? (
                <ActivityImage
                  src={activity.supportingImage!}
                  alt={activity.supportingCaption || activity.title}
                  onOpen={openSupportingImage}
                  viewLabel={t.activities.viewFull}
                />
              ) : SHOW_ACTIVITY_IMAGE_PLACEHOLDERS ? (
                <ActivityPlaceholder
                  label={isVi ? 'Ảnh bổ sung · 4:3' : 'Supporting Photo · 4:3'}
                  caption={activity.supportingCaption || (isVi ? 'Đang cập nhật ảnh' : 'Photo pending')}
                />
              ) : null
            )}
          </div>
        )}

        {hasExpandableDetails && (
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={onToggleExpand}
              aria-expanded={isExpanded}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-mono font-medium uppercase tracking-wide text-[#292929] transition-colors hover:text-[#5A6142]"
            >
              <span>{isExpanded ? t.activities.collapse : t.activities.seeMore}</span>
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ArrowUpRight className="h-3.5 w-3.5" />
              )}
            </button>
            {activity.gallery && activity.gallery.length > 0 && !isExpanded && (
              <span className="text-[10px] font-mono text-[#5A6142]">
                {activity.gallery.length} {t.activities.archivePhotos}
              </span>
            )}
          </div>
        )}

        <AnimatePresence>
          {isExpanded && hasExpandableDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ActivityDetails activity={activity} onOpenLightbox={onOpenLightbox} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};

interface ActivityImageProps {
  src: string;
  alt: string;
  onOpen: () => void;
  viewLabel: string;
}

const ActivityImage: React.FC<ActivityImageProps> = ({ src, alt, onOpen, viewLabel }) => (
  <button
    type="button"
    onClick={onOpen}
    className="group relative h-[240px] w-full cursor-pointer overflow-hidden rounded-[4px] bg-black/[0.05] text-left sm:h-[300px] lg:h-[340px]"
  >
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
      loading="lazy"
    />
    <span className="absolute inset-0 flex items-end bg-black/0 p-3 transition-colors group-hover:bg-black/10">
      <span className="inline-flex items-center gap-1 rounded-[4px] bg-[#292929]/85 px-2 py-1 text-[10px] font-mono text-[#F2EBDD] opacity-0 transition-opacity group-hover:opacity-100">
        <ZoomIn className="h-3 w-3" />
        {viewLabel}
      </span>
    </span>
  </button>
);

interface ActivityPlaceholderProps {
  label: string;
  caption: string;
}

const ActivityPlaceholder: React.FC<ActivityPlaceholderProps> = ({ label, caption }) => (
  <div className="flex h-[240px] w-full flex-col items-center justify-center rounded-[4px] bg-black/[0.05] p-6 text-center sm:h-[300px] lg:h-[340px]">
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[4px] bg-black/[0.06] text-[#5A6142]">
      <ImageIcon className="h-5 w-5" />
    </div>
    <span className="text-xs font-mono font-medium text-[#292929]">{label}</span>
    <span className="mt-1 max-w-[42ch] text-sm leading-relaxed text-[#5A6142]">{caption}</span>
  </div>
);

interface ActivityDetailsProps {
  activity: ActivityItem;
  onOpenLightbox: (photo: GalleryPhoto) => void;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activity, onOpenLightbox }) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <div className="mt-2 space-y-5 border-t border-black/10 pt-5">
      {activity.impacts && activity.impacts.length > 0 && (
        <div className="space-y-2">
          <span className="block text-xs font-mono font-medium uppercase tracking-wider text-[#5A6142]">
            {t.activities.keyImpacts}
          </span>
          <ul className="max-w-[68ch] list-disc space-y-1.5 pl-4 text-base leading-relaxed text-[#292929]/80 marker:text-[#5A6142] sm:text-[17px]">
            {activity.impacts.map((impact) => (
              <li key={impact}>{impact}</li>
            ))}
          </ul>
        </div>
      )}

      {activity.tags && activity.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {activity.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/[0.06] px-2 py-1 text-[10px] font-mono text-[#5A6142]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {activity.documentUrl && (
        <div className="flex flex-col gap-3 rounded-[4px] bg-black/[0.05] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-black/[0.07] text-[#292929]">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="max-w-[68ch] text-sm font-semibold leading-snug text-[#292929] sm:text-base">
                {activity.documentTitle ||
                  (isVi ? 'Giấy xác nhận hoạt động (PDF)' : 'Official Activity Certificate (PDF)')}
              </p>
              <p className="mt-0.5 text-sm text-[#5A6142]">
                {isVi
                  ? 'Tài liệu & giấy xác nhận chính thức đính kèm'
                  : 'Official verification document & attachments'}
              </p>
            </div>
          </div>
          <a
            href={activity.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[4px] bg-[#292929] px-3 py-2 text-xs font-mono text-[#F2EBDD] transition-colors hover:bg-[#3f4035]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{t.activities.viewDownloadPdf}</span>
          </a>
        </div>
      )}

      {activity.gallery && activity.gallery.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#5A6142]">
            <span className="font-medium uppercase tracking-wider">
              {isVi
                ? `BỘ SƯU TẬP · ${activity.gallery.length} ẢNH`
                : `GALLERY · ${activity.gallery.length} PHOTOS`}
            </span>
            <span className="text-[11px]">
              {isVi ? 'Nhấp vào ảnh để phóng to' : 'Click image to expand'}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {activity.gallery.map((photo) => (
              <button
                type="button"
                key={photo.id}
                onClick={() => onOpenLightbox(photo)}
                className="group overflow-hidden rounded-[4px] bg-black/[0.05] text-left"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1 p-3">
                  <p className="text-sm font-medium leading-snug text-[#292929]">{photo.caption}</p>
                  {photo.tag && (
                    <span className="block text-[9px] font-mono uppercase tracking-wide text-[#5A6142]">
                      {photo.tag}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
