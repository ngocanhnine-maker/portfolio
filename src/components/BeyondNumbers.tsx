import React, { useMemo, useState } from 'react';
import { ImageIcon, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { seeded } from './ScrapbookBackdrop';
import { CertificateViewer, CertificateModalData } from './CertificateViewer';

const LEADERSHIP_VIDEO_URL = '/projects/leadership.mp4';
const LEADERSHIP_THUMB = '/gallery/wico/wico-photo-award-2.jpg';
// Mentoring photo: the WITH Project Season V cohort.
const STEM_PHOTO = '/gallery/with/with-project-season-v.jpg';
// Date of birth is masked in this preview; the viewer opens the original PDF.
const INTERNSHIP_PREVIEW = '/certificates/gtel-internship-preview.jpg';
const INTERNSHIP_PDF = '/certificates/gtel-internship-certificate.pdf';

const CONTENT = {
  en: {
    title: 'Leadership & Experience',
    leadership: 'Leadership',
    leadershipBody:
      'Most of my leadership has been about the work in between: splitting a project into parts people could own, listening when the team disagreed, and pulling different views into one direction we could all commit to.',
    videoSoon: 'Video coming soon',
    teaching: 'Mentoring',
    teachingBody:
      'Through WITH Project and the Ams Advisor club, I helped Grade 9 students prepare for the high-school entrance exam. Explaining a problem to someone meeting it for the first time showed me which parts I only half understood, and taught me to start from what they already knew.',
    photoSoon: 'Photo coming soon',
    internship: 'Internship',
    internshipMeta: 'GTEL · Financial Planning · 2026',
    internshipBody:
      'At GTEL’s financial planning department, I watched how financial decisions are coordinated with other parts of the business rather than made by finance alone.',
    certAlt: 'GTEL internship confirmation letter',
    viewerTitle: 'GTEL Internship Confirmation'
  },
  vi: {
    title: 'Lãnh đạo & Trải nghiệm',
    leadership: 'Lãnh đạo',
    leadershipBody:
      'Phần lớn việc lãnh đạo của tôi nằm ở những việc ở giữa: chia dự án thành các phần mà mỗi người có thể đảm nhận, lắng nghe khi nhóm bất đồng, và gom những góc nhìn khác nhau về một hướng mà cả nhóm cùng theo.',
    videoSoon: 'Video sắp ra mắt',
    teaching: 'Hướng dẫn học tập',
    teachingBody:
      'Qua WITH Project và CLB Ams Advisor, tôi đồng hành cùng các em lớp 9 ôn thi vào lớp 10. Giảng một bài cho người lần đầu gặp nó cho tôi thấy phần nào mình mới hiểu một nửa, và dạy tôi bắt đầu từ điều các em đã biết.',
    photoSoon: 'Ảnh sắp được cập nhật',
    internship: 'Thực tập',
    internshipMeta: 'GTEL · Kế hoạch Tài chính · 2026',
    internshipBody:
      'Tại phòng Kế hoạch Tài chính của GTEL, tôi quan sát cách các quyết định tài chính được phối hợp với những bộ phận khác trong doanh nghiệp, chứ không chỉ do bộ phận tài chính đưa ra.',
    certAlt: 'Giấy xác nhận thực tập tại GTEL',
    viewerTitle: 'Giấy xác nhận thực tập GTEL'
  }
};

// Torn left/right edges, like the template's Education band.
const tornSides = (seed: number) => {
  const rand = seeded(seed);
  const n = 18;
  const right = Array.from({ length: n + 1 }, (_, i) => `${100 - rand() * 2.2}% ${(i / n) * 100}%`);
  const left = Array.from({ length: n + 1 }, (_, i) => `${rand() * 2.2}% ${100 - (i / n) * 100}%`);
  return `polygon(${[...right, ...left].join(',')})`;
};

// Torn right edge only, for the Experience-style panel.
const tornRight = (seed: number) => {
  const rand = seeded(seed);
  const n = 22;
  const right = Array.from({ length: n + 1 }, (_, i) => `${100 - rand() * 4}% ${(i / n) * 100}%`);
  return `polygon(0 0, ${right.join(',')}, 0 100%)`;
};

const Stripes: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={`absolute w-[clamp(44px,4vw,76px)] h-[clamp(36px,3.4vw,58px)] ${className}`}
    style={{ background: 'repeating-linear-gradient(90deg, #D8B98C 0 4px, #C9A574 4px 6px, #E2C79E 6px 9px)' }}
    aria-hidden="true"
  />
);

const Tape: React.FC<{ className: string }> = ({ className }) => (
  <span className={`absolute h-[clamp(22px,2.4vw,36px)] bg-[#A88A66]/55 z-10 ${className}`} aria-hidden="true" />
);

const isEmbed = (url: string) => /youtube\.com|youtu\.be|vimeo\.com/.test(url);

/** Beyond the Numbers: leadership video (focal), STEM teaching photo, internship certificate. */
export const BeyondNumbers: React.FC = () => {
  const { isVi } = useLanguage();
  const c = isVi ? CONTENT.vi : CONTENT.en;
  const bandClip = useMemo(() => tornSides(23), []);
  const panelClip = useMemo(() => tornRight(37), []);
  const [playing, setPlaying] = useState(false);
  const [cert, setCert] = useState<CertificateModalData | null>(null);
  const hasVideo = Boolean(LEADERSHIP_VIDEO_URL);

  const h3 = 'm-0 font-serif italic font-semibold text-[#2E1A16] leading-none';
  const body = 'm-0 text-[clamp(0.86rem,0.95vw,0.98rem)] leading-[1.65] text-[#3D2A24]/90';

  return (
    <section
      id="beyond"
      className="relative w-full min-h-[calc(100svh-3.5rem)] flex items-center justify-center bg-[#C9A97E] bg-[url('/landing/collage.jpg')] bg-cover bg-[position:4%_50%] lg:bg-center px-3 py-6 sm:px-6 sm:py-8 lg:px-[2.5%] lg:py-[2.5%] overflow-hidden select-none"
    >
      {/* Board */}
      <div className="relative w-full max-w-[1600px] min-h-[min(calc(100svh-3.5rem-5vw),860px)] bg-[#E9E7E3] shadow-[0_6px_22px_rgba(40,25,10,0.45)] p-[clamp(12px,1.8%,28px)] pr-[clamp(20px,4%,64px)] flex">
        <div className="absolute top-0 bottom-0 right-[2%] w-[3px] bg-[#8E3A44]/45" aria-hidden="true" />
        <Stripes className="-top-[3px] left-[3%] z-10" />
        <Stripes className="-bottom-[3px] left-[3%] z-10" />

        {/* Sheet with a spiral binding down the right edge */}
        <div className="relative flex-1 bg-[#F4F0E6] shadow-[0_3px_10px_rgba(40,10,10,0.18)] pl-[clamp(16px,4%,72px)] pr-[clamp(36px,5%,88px)] pt-[clamp(18px,2.4%,36px)] pb-[clamp(20px,3%,44px)] flex flex-col">
          <div className="absolute right-[clamp(8px,1.2%,20px)] top-[3%] bottom-[3%] flex flex-col justify-between" aria-hidden="true">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="block w-[clamp(18px,2vw,32px)] h-[clamp(5px,0.5vw,8px)] rounded-full bg-[#6E2F37]/80" />
            ))}
          </div>
          {/* Paper clip */}
          <svg viewBox="0 0 40 100" className="absolute -top-[5%] left-[3%] w-[clamp(22px,2.4vw,40px)] z-10" aria-hidden="true">
            <path d="M14 72 V20 a8 8 0 0 1 16 0 V80 a12 12 0 0 1 -24 0 V30" fill="none" stroke="#3A2620" strokeWidth="4" strokeLinecap="round" />
          </svg>

          <h2 className="m-0 text-center font-serif italic font-semibold text-[#2E1A16] leading-none tracking-[-0.01em] text-[clamp(2.1rem,3.8vw,3.8rem)]">
            {c.title}
          </h2>

          {/* 1 · Leadership: the focal band */}
          <div className="relative mt-[clamp(16px,2vw,28px)]">
            <Tape className="-top-[10px] left-[8%] w-[13%] -rotate-[3deg]" />
            <Tape className="-top-[10px] right-[8%] w-[13%] rotate-[4deg]" />
            <div className="[filter:drop-shadow(0_3px_5px_rgba(60,40,20,0.2))]">
              <div className="bg-[#C9A981] px-[clamp(20px,4%,64px)] py-[clamp(14px,1.6vw,22px)]" style={{ clipPath: bandClip }}>
                <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-6 md:gap-[5%] items-center">
                  <div className="relative bg-[#2E1A16] p-[1.2%] shadow-[0_4px_12px_rgba(40,20,10,0.3)]">
                    <div className="relative aspect-video overflow-hidden bg-black">
                      {hasVideo && playing ? (
                        isEmbed(LEADERSHIP_VIDEO_URL) ? (
                          <iframe src={LEADERSHIP_VIDEO_URL} title={c.leadership} allow="autoplay; fullscreen" allowFullScreen className="absolute inset-0 w-full h-full" />
                        ) : (
                          <video src={LEADERSHIP_VIDEO_URL} poster={LEADERSHIP_THUMB} aria-label={c.leadership} controls autoPlay playsInline preload="metadata" className="absolute inset-0 w-full h-full object-contain" />
                        )
                      ) : (
                        <>
                          <img src={LEADERSHIP_THUMB} alt="" className="absolute inset-0 w-full h-full object-cover object-[40%_40%] sepia-[0.15]" />
                          <button
                            type="button"
                            onClick={() => hasVideo && setPlaying(true)}
                            disabled={!hasVideo}
                            aria-label={hasVideo ? c.leadership : c.videoSoon}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 enabled:hover:bg-black/15 transition-colors enabled:cursor-pointer disabled:cursor-default"
                          >
                            <span className="flex items-center justify-center w-[clamp(50px,4.6vw,72px)] aspect-square rounded-full bg-[#F4F0E6]/95 shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                              <Play className="w-[42%] h-[42%] text-[#2E1A16] translate-x-[6%]" fill="currentColor" />
                            </span>
                            {!hasVideo && (
                              <span className="px-2.5 py-1 bg-[#F4F0E6]/90 text-[11px] uppercase tracking-[0.14em] text-[#2E1A16]">{c.videoSoon}</span>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className={`${h3} text-[clamp(1.6rem,2.4vw,2.4rem)]`}>{c.leadership}</h3>
                    <p className={`${body} mt-3`}>{c.leadershipBody}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 · STEM teaching  ·  3 · Internship */}
          <div className="mt-[clamp(16px,2vw,26px)] grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-[4%] items-stretch">
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-[clamp(14px,1.8vw,26px)] items-center">
              <div className="relative w-full max-w-[320px] justify-self-center bg-[#FFFDF8] p-[5%] shadow-[0_3px_8px_rgba(60,40,20,0.2)] -rotate-[1.5deg]">
                <Tape className="-top-[9px] left-1/2 -translate-x-1/2 w-[40%] rotate-[2deg]" />
                <div className="aspect-[4/3] overflow-hidden bg-[#E6DCC9] flex items-center justify-center">
                  {STEM_PHOTO ? (
                    <img src={STEM_PHOTO} alt={c.teaching} className="w-full h-full object-cover object-[50%_70%]" />
                  ) : (
                    <span className="flex flex-col items-center gap-1.5 text-[#3D2A24]/50 text-[10px] uppercase tracking-[0.14em] text-center px-2">
                      <ImageIcon className="w-5 h-5" strokeWidth={1.4} />
                      {c.photoSoon}
                    </span>
                  )}
                </div>
              </div>
              <div className="min-w-0">
                <h3 className={`${h3} text-[clamp(1.25rem,1.7vw,1.7rem)]`}>{c.teaching}</h3>
                <p className={`${body} mt-2.5`}>{c.teachingBody}</p>
              </div>
            </div>

            <div className="[filter:drop-shadow(0_3px_5px_rgba(60,40,20,0.18))]">
              <div className="h-full bg-[#EAD5AE] pl-[clamp(16px,3%,36px)] pr-[clamp(24px,5%,56px)] py-[clamp(14px,1.8vw,24px)]" style={{ clipPath: panelClip }}>
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-[clamp(14px,1.8vw,26px)] items-center h-full">
                  <button
                    type="button"
                    onClick={() => setCert({ title: c.viewerTitle, test: 'GTEL', score: isVi ? 'Kế hoạch Tài chính' : 'Financial Planning', date: '06–08/2026', pdfUrl: INTERNSHIP_PDF })}
                    aria-label={c.viewerTitle}
                    className="block bg-[#FFFDF8] p-[3%] shadow-[0_3px_8px_rgba(60,40,20,0.22)] rotate-[1.5deg] hover:rotate-0 transition-transform cursor-pointer"
                  >
                    <img src={INTERNSHIP_PREVIEW} alt={c.certAlt} className="block w-full h-auto" />
                  </button>
                  <div className="min-w-0">
                    <h3 className={`${h3} text-[clamp(1.25rem,1.7vw,1.7rem)]`}>{c.internship}</h3>
                    <p className="mt-1.5 m-0 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#6E2F37]">{c.internshipMeta}</p>
                    <p className={`${body} mt-2.5`}>{c.internshipBody}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CertificateViewer cert={cert} onClose={() => setCert(null)} />
    </section>
  );
};
