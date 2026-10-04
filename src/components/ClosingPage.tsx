import React, { useMemo } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import { seeded } from './ScrapbookBackdrop';

// Swap for a candid photo (school life, travel) when one is available.
const PHOTO = '/profile/closing-portrait.jpg';
const FINAD_URL = 'https://financial-statement-analysis-versio.vercel.app';
// PERSONAL_INFO.linkedin is still the generic placeholder; only show a real profile URL.
const LINKEDIN_URL = /linkedin\.com\/in\//.test(PERSONAL_INFO.linkedin) ? PERSONAL_INFO.linkedin : '';

const CONTENT = {
  en: {
    title: 'Closing Note',
    body:
      'This journal captures the questions, projects, and turns that have shaped how I think so far. I’m still exploring where finance, data, and technology can take me next — and what I might build along the way.',
    signature: 'Tran Ngoc Anh · 2026',
    back: 'Back to the beginning',
    photoAlt: 'Tran Ngoc Anh'
  },
  vi: {
    title: 'Lời kết',
    body:
      'Cuốn nhật ký này ghi lại những câu hỏi, dự án và bước rẽ đã định hình cách tôi suy nghĩ đến nay. Tôi vẫn đang tìm xem tài chính, dữ liệu và công nghệ có thể đưa mình đi đâu tiếp — và mình có thể xây dựng điều gì trên đường đi.',
    signature: 'Trần Ngọc Anh · 2026',
    back: 'Về trang đầu',
    photoAlt: 'Trần Ngọc Anh'
  }
};

// Spiral-notebook page torn off at the top: punched holes with ragged tabs between them.
const tornTop = (seed: number, holes: number) => {
  const rand = seeded(seed);
  const pts: string[] = [];
  for (let i = 0; i <= holes; i++) {
    const x = (i / holes) * 100;
    pts.push(`${x}% ${1.5 + rand() * 2.5}%`);
    if (i < holes) pts.push(`${x + 100 / holes / 2}% ${rand() * 1.2}%`);
  }
  return `polygon(${pts.join(',')}, 100% 100%, 0% 100%)`;
};

const Stripes: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={`absolute w-[clamp(44px,4vw,76px)] ${className}`}
    style={{ background: 'repeating-linear-gradient(90deg, #D8B98C 0 4px, #C9A574 4px 6px, #E2C79E 6px 9px)' }}
    aria-hidden="true"
  />
);

/** Closing page: a torn notebook sheet on the burgundy board, photo left, closing note right. */
export const ClosingPage: React.FC = () => {
  const { isVi } = useLanguage();
  const c = isVi ? CONTENT.vi : CONTENT.en;
  const sheetClip = useMemo(() => tornTop(97, 18), []);
  const hasCv = Boolean(PERSONAL_INFO.cvUrl.trim());

  const links = [
    { label: 'Email', href: `mailto:${PERSONAL_INFO.email}` },
    { label: 'FinAD', href: FINAD_URL, external: true },
    ...(hasCv ? [{ label: 'CV', href: PERSONAL_INFO.cvUrl }] : []),
    ...(LINKEDIN_URL ? [{ label: 'LinkedIn', href: LINKEDIN_URL, external: true }] : [])
  ];

  return (
    <section
      id="closing"
      className="relative w-full min-h-[calc(100svh-3.5rem)] flex items-center justify-center bg-[#C9A97E] bg-[url('/landing/collage.jpg')] bg-cover bg-[position:4%_50%] lg:bg-center px-3 py-6 sm:px-6 sm:py-8 lg:px-[2.5%] lg:py-[2.5%] overflow-hidden select-none"
    >
      {/* Burgundy board, as in the template's closing slide */}
      <div className="relative w-full max-w-[1600px] min-h-[min(calc(100svh-3.5rem-5vw),860px)] bg-[#8E3A44] shadow-[0_6px_22px_rgba(40,25,10,0.45)] flex items-center justify-center px-[clamp(14px,6%,110px)] py-[clamp(24px,4%,60px)]">
        <div className="absolute top-0 bottom-0 left-[5%] w-[3px] bg-[#5E2028]/70" aria-hidden="true" />
        <Stripes className="top-0 bottom-0 right-[3%]" />

        {/* Torn notebook sheet */}
        <div className="relative w-full max-w-[1180px] -rotate-[0.8deg] [filter:drop-shadow(0_6px_10px_rgba(30,8,10,0.35))]">
          <div className="relative bg-[#F4F0E6] rounded-b-[18px] pt-[clamp(48px,5vw,76px)] pb-[clamp(28px,3.4vw,52px)] px-[clamp(20px,5%,80px)]" style={{ clipPath: sheetClip }}>
            {/* Punched holes along the torn top edge */}
            <div className="absolute top-[clamp(14px,1.6vw,24px)] left-[3%] right-[3%] flex justify-between" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="block w-[clamp(10px,1.3vw,20px)] aspect-square rounded-full bg-[#8E3A44] shadow-[2px_2px_0_rgba(150,120,90,0.4)]" />
              ))}
            </div>
            {/* Double margin rule under the holes */}
            <div className="absolute top-[clamp(40px,4.2vw,64px)] left-0 right-0 h-[4px] border-y border-[#B5584F]/45" aria-hidden="true" />

            <div className="mt-[clamp(10px,1.4vw,20px)] grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-[7%] items-center">
              {/* Photo */}
              <figure className="m-0 justify-self-center w-full max-w-[300px]">
                <div className="relative bg-[#FFFDF8] p-[5%] pb-[14%] shadow-[0_4px_12px_rgba(60,40,20,0.22)] -rotate-[2deg]">
                  <span className="absolute -top-[10px] left-1/2 -translate-x-1/2 rotate-[3deg] w-[42%] h-[26px] bg-[#C9AF8B]/70 shadow-[0_1px_2px_rgba(60,40,20,0.15)]" aria-hidden="true" />
                  <div className="aspect-[4/5] overflow-hidden bg-[#E6DCC9]">
                    <img src={PHOTO} alt={c.photoAlt} className="w-full h-full object-cover object-[50%_25%]" />
                  </div>
                </div>
              </figure>

              {/* Closing note */}
              <div className="min-w-0 text-center md:text-left">
                <h2 className="m-0 font-serif italic font-semibold text-[#2E1A16] leading-[1.02] tracking-[-0.01em] text-[clamp(2.1rem,3.8vw,3.8rem)]">
                  {c.title}
                </h2>
                <p className="mt-[clamp(14px,1.8vw,24px)] m-0 mx-auto md:mx-0 max-w-[46ch] text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.8] text-[#3D2A24]/90">
                  {c.body}
                </p>
                <p className="mt-[clamp(16px,2vw,28px)] m-0 font-serif italic text-[clamp(1.05rem,1.35vw,1.35rem)] text-[#2E1A16]">— {c.signature}</p>

                <div className="mt-[clamp(22px,3vw,40px)] pt-4 border-t border-[#3D2A24]/15 flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-3">
                  <nav className="flex items-center gap-2.5 text-[13px] tracking-[0.04em]" aria-label="Contact">
                    {links.map((l, i) => (
                      <React.Fragment key={l.label}>
                        {i > 0 && <span className="text-[#8E3A44]/60" aria-hidden="true">·</span>}
                        <a
                          href={l.href}
                          {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                          className="text-[#2E1A16] border-b border-[#2E1A16]/30 hover:text-[#8E3A44] hover:border-[#8E3A44] transition-colors"
                        >
                          {l.label}
                        </a>
                      </React.Fragment>
                    ))}
                  </nav>
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="group inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.14em] text-[#3D2A24]/70 hover:text-[#8E3A44] transition-colors cursor-pointer"
                  >
                    {c.back}
                    <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
