import React, { useRef, useState } from 'react';
import { PageId, LeadershipStory } from '../types';
import { getLeadershipStories } from '../data/portfolioData';
import { ArrowLeft, ArrowRight, Image as ImageIcon, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';
import { SideDrawer } from './SideDrawer';

interface LeadershipPageProps {
  onNavigate: (page: PageId) => void;
}

/* Drawer body — sized lorem until real per-story copy is added to the data. */
const DRAWER_LOREM = {
  challenge:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat, duis aute irure dolor.',
  contributions: [
    'Set the scope and the decision points before anyone committed to build work.',
    'Ran the weekly check-ins and kept one shared source of truth for status.',
    'Handled the hand-off to whoever carried the work forward after the deadline.',
  ],
  outcome:
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nec venenatis nisl condimentum.',
};

const drawerLabel =
  'block font-mono text-[11px] uppercase tracking-[0.18em] text-[#DDD8C4]';
const drawerBody = 'mt-2 max-w-[62ch] text-sm leading-relaxed text-[#E8E4D8]';

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ onNavigate }) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const stories = getLeadershipStories(language);

  const [openStory, setOpenStory] = useState<LeadershipStory | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const LBL = {
    seeMore: isVi ? 'Xem thêm' : 'See more',
    challenge: isVi ? 'Tình huống' : 'The Challenge',
    whatIDid: isVi ? 'Việc đã làm' : 'What I Did',
    outcome: isVi ? 'Kết quả' : 'Outcome',
    teamTimeline: isVi ? 'Đội & thời gian' : 'Team & Timeline',
    close: isVi ? 'Đóng' : 'Close',
    imageArea: isVi ? 'Khu vực ảnh' : 'Image area',
  };

  const openDrawer = (story: LeadershipStory, el: HTMLButtonElement) => {
    triggerRef.current = el;
    setActiveImg(0);
    setOpenStory(story);
  };

  const StatRow = ({ story }: { story: LeadershipStory }) =>
    story.stats && story.stats.length > 0 ? (
      <div className="flex flex-wrap gap-x-16 gap-y-4">
        {story.stats.map((s, i) => (
          <div key={i}>
            <div className="text-[2rem] font-bold leading-none tracking-tight text-[#F2EBDD]">
              {s.value}
            </div>
            <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#E4DFD1]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    ) : null;

  return (
    <section id="leadership" className="w-full border-b border-black/15 bg-[#5E6044] px-6 text-[#F2EBDD] sm:px-10 md:px-14 lg:px-16 xl:px-20">
      <div className="mx-auto w-full max-w-6xl space-y-10 py-16 sm:py-24 md:py-28 xl:max-w-7xl 2xl:max-w-[1500px]">
        {/* Title */}
        <div className="section-heading">
          <span className="text-xs font-mono text-[#E4DFD1] uppercase tracking-wider">
            {t.leadership.sectionNum}
          </span>
          <h1 className="section-h1 font-bold tracking-tight text-[#F2EBDD] lg:whitespace-nowrap">
            {t.leadership.title}
          </h1>
        </div>

        {/* Cards — ordered by importance; compact, detail opens in a side drawer.
            Right column is a placeholder image frame (no images yet). */}
        <div className="space-y-6">
          {stories.map((story, idx) => (
            <article
              key={story.id}
              className="flex flex-col gap-6 rounded-xs border border-white/18 bg-[#464831] p-8 shadow-[0_1px_6px_rgba(0,0,0,0.12)] transition-colors hover:border-white/35 sm:p-10 lg:flex-row lg:items-stretch lg:gap-10"
            >
              {/* left — content */}
              <div className="flex min-w-0 flex-1 flex-col">
                {/* meta row: index · year (mono) + tags (max 3, mono) */}
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <span className="font-mono text-xs text-[#E4DFD1]">
                    0{idx + 1} · {story.period}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {story.metrics.slice(0, 3).map((m, i) => (
                      <span
                        key={i}
                        className="rounded-[3px] bg-black/30 px-2.5 py-1 font-mono text-xs text-[#F2EBDD]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="mt-4 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {story.roleTitle}
                </h2>
                <p className="mt-1.5 text-[15px] font-medium text-[#F2EBDD]">{story.organization}</p>
                <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-[#ECE8DC]">
                  {story.summary}
                </p>

                {story.stats && story.stats.length > 0 && (
                  <div className="mt-6 border-t border-white/18 pt-4">
                    <StatRow story={story} />
                  </div>
                )}

                <button
                  type="button"
                  onClick={(e) => openDrawer(story, e.currentTarget)}
                  className="mt-5 inline-flex w-fit cursor-pointer items-center gap-1.5 border-b border-[#F2EBDD]/60 pb-0.5 font-mono text-xs text-[#F2EBDD] transition-colors hover:border-[#F2EBDD]"
                >
                  <span>{LBL.seeMore}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>

              {/* right — image frame placeholder (opens the drawer) */}
              <button
                type="button"
                onClick={(e) => openDrawer(story, e.currentTarget)}
                aria-label={`${LBL.seeMore} — ${story.roleTitle}`}
                className="group flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xs border border-white/15 bg-[#1B1E15] transition-colors hover:border-white/35 aspect-[16/10] w-full lg:aspect-auto lg:h-auto lg:w-[32%] lg:min-w-[240px] lg:self-stretch"
              >
                <ImageIcon
                  className="h-7 w-7 text-white/35 transition-colors group-hover:text-white/55"
                  aria-hidden="true"
                />
              </button>
            </article>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 flex justify-between items-center text-sm font-semibold border-t border-white/15">
          <button
            onClick={() => onNavigate('research')}
            className="inline-flex items-center gap-2 border-b border-transparent pb-0.5 text-[#F2EBDD]/90 hover:border-[#F2EBDD]/60 hover:text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.leadership.prevSection}</span>
          </button>
          <button
            onClick={() => onNavigate('activities')}
            className="inline-flex items-center gap-2 border-b border-transparent pb-0.5 text-[#F2EBDD] hover:border-[#F2EBDD] hover:text-white cursor-pointer transition-colors"
          >
            <span>{t.leadership.nextSection}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Detail drawer */}
      <SideDrawer
        open={openStory !== null}
        onClose={() => setOpenStory(null)}
        labelledBy="leadership-drawer-title"
        returnFocusRef={triggerRef}
      >
        {openStory && (
          <>
            {/* sticky meta header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#23261D]/95 px-6 py-4 backdrop-blur-sm">
              <span className="font-mono text-xs uppercase tracking-widest text-[#DDD8C4]">
                {openStory.period}
                {openStory.kind ? ` / ${openStory.kind}` : ''}
              </span>
              <button
                type="button"
                onClick={() => setOpenStory(null)}
                aria-label={LBL.close}
                className="rounded-xs p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-8 px-6 py-6 sm:px-8">
              {/* title + org */}
              <div className="space-y-1.5">
                <h2
                  id="leadership-drawer-title"
                  className="text-2xl font-bold leading-snug tracking-tight text-[#F2EBDD] sm:text-3xl"
                >
                  {openStory.roleTitle}
                </h2>
                <p className="text-sm text-[#E8E4D8]">{openStory.organization}</p>
              </div>

              {/* image area — 16:10, one step darker than the drawer */}
              <div>
                <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xs border border-white/10 bg-[#1B1E15]">
                  {openStory.images && openStory.images[activeImg] ? (
                    <img
                      src={openStory.images[activeImg]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-white/25" aria-label={LBL.imageArea} />
                  )}
                </div>
                {openStory.images && openStory.images.length > 1 && (
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                    {openStory.images.map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImg(i)}
                        aria-label={`${LBL.imageArea} ${i + 1}`}
                        aria-current={i === activeImg}
                        className={`h-14 w-20 shrink-0 overflow-hidden rounded-xs border transition-colors ${
                          i === activeImg
                            ? 'border-white/60'
                            : 'border-white/15 hover:border-white/35'
                        }`}
                      >
                        <img src={src} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* content blocks */}
              <div className="space-y-6 border-t border-white/10 pt-6">
                <div>
                  <span className={drawerLabel}>{LBL.challenge}</span>
                  <p className={drawerBody}>{openStory.challenge || DRAWER_LOREM.challenge}</p>
                </div>

                <div>
                  <span className={drawerLabel}>{LBL.whatIDid}</span>
                  <ul className="mt-2 max-w-[62ch] space-y-2">
                    {(openStory.contributions && openStory.contributions.length
                      ? openStory.contributions
                      : DRAWER_LOREM.contributions
                    ).map((c, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm leading-relaxed text-[#E8E4D8]"
                      >
                        <span className="text-[#DDD8C4]" aria-hidden="true">
                          —
                        </span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className={drawerLabel}>{LBL.outcome}</span>
                  <p className={drawerBody}>{openStory.outcome || DRAWER_LOREM.outcome}</p>
                </div>

                {openStory.stats && openStory.stats.length > 0 && (
                  <div>
                    <span className={drawerLabel}>{LBL.teamTimeline}</span>
                    <div className="mt-3">
                      <StatRow story={openStory} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* bottom close affordance */}
            <div className="border-t border-white/10 bg-[#23261D] px-6 py-4">
              <button
                type="button"
                onClick={() => setOpenStory(null)}
                className="font-mono text-xs text-[#DDD8C4] transition-colors hover:text-white cursor-pointer"
              >
                ← {LBL.close}
              </button>
            </div>
          </>
        )}
      </SideDrawer>
    </section>
  );
};
