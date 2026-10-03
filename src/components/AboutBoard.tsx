import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { seeded } from './ScrapbookBackdrop';

// Postage-stamp edge: teeth all the way round (percent units for clip-path).
const zigzag = (teethX: number, teethY: number, depth: number) => {
  const pts: string[] = [];
  const dy = depth * 0.8;
  for (let i = 0; i < teethX; i++) {
    pts.push(`${(i / teethX) * 100}% ${dy}%`, `${((i + 0.5) / teethX) * 100}% 0%`);
  }
  for (let i = 0; i < teethY; i++) {
    pts.push(`${100 - depth}% ${(i / teethY) * 100}%`, `100% ${((i + 0.5) / teethY) * 100}%`);
  }
  for (let i = teethX; i > 0; i--) {
    pts.push(`${(i / teethX) * 100}% ${100 - dy}%`, `${((i - 0.5) / teethX) * 100}% 100%`);
  }
  for (let i = teethY; i > 0; i--) {
    pts.push(`${depth}% ${(i / teethY) * 100}%`, `0% ${((i - 0.5) / teethY) * 100}%`);
  }
  return `polygon(${pts.join(',')})`;
};

// Note card with a hand-torn bottom edge that rises toward the right.
const tornNote = () => {
  const rand = seeded(19);
  const pts = ['0% 0%', '100% 0%', '100% 86%'];
  const steps = 60;
  for (let i = 1; i < steps; i++) {
    const t = 1 - i / steps;
    const base = 86 + (1 - t) * 10;
    const bite = rand() < 0.25 ? 2.6 : 1.1;
    pts.push(`${t * 100}% ${base + (rand() - 0.3) * bite}%`);
  }
  pts.push('0% 97%');
  return `polygon(${pts.join(',')})`;
};

const Stripes: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={`absolute w-[clamp(44px,4vw,76px)] h-[clamp(36px,3.4vw,58px)] ${className}`}
    style={{
      background:
        'repeating-linear-gradient(90deg, #D8B98C 0 4px, #C9A574 4px 6px, #E2C79E 6px 9px)'
    }}
    aria-hidden="true"
  />
);

/** About Me laid out as a scrapbook board: note card on the left, stamp-framed portrait on the right. */
export const AboutBoard: React.FC = () => {
  const { isVi } = useLanguage();
  const stampClip = useMemo(() => zigzag(22, 30, 2.6), []);
  const noteClip = useMemo(() => tornNote(), []);

  return (
    <section
      id="about"
      className="relative w-full min-h-[calc(100svh-3.5rem)] flex items-center justify-center bg-[#C9A97E] bg-[url('/landing/collage.jpg')] bg-cover bg-[position:4%_50%] lg:bg-center px-3 py-6 sm:px-6 sm:py-8 lg:px-[2.5%] lg:py-[2.5%] overflow-hidden select-none"
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="ab-blotch-fade-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.85" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id="ab-blotch-fade" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="url(#ab-blotch-fade-grad)" />
          </mask>
          <filter id="ab-speckle">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="4" />
            <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.35 -0.08" />
          </filter>
          <filter id="ab-board-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="12" />
            <feColorMatrix values="0 0 0 0 0.15  0 0 0 0 0.16  0 0 0 0 0.1  0 0 0 0.18 0" />
          </filter>
          <filter id="ab-board-blotch">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="4" seed="21" />
            <feColorMatrix values="0 0 0 0 0.52  0 0 0 0 0.54  0 0 0 0 0.4  0 0 0 2.4 -1.25" />
          </filter>
        </defs>
      </svg>


      {/* Olive board */}
      <div className="relative w-full max-w-[1600px] min-h-[min(calc(100svh-3.5rem-5vw),860px)] bg-[#E9E7E3] shadow-[0_6px_22px_rgba(40,25,10,0.45)]">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#ab-board-grain)" />
          <rect width="100%" height="100%" filter="url(#ab-board-blotch)" mask="url(#ab-blotch-fade)" opacity="0.18" />
        </svg>

        {/* Notebook margin rule */}
        <div className="absolute top-0 bottom-0 left-[5.5%] w-[3px] bg-[#A3A07A]/80" aria-hidden="true" />

        <Stripes className="-top-[3px] right-[2.5%]" />
        <Stripes className="-bottom-[3px] right-[2.5%]" />

        <div className="relative h-full min-h-[inherit] grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] items-center gap-10 lg:gap-[4%] pl-[11%] pr-[7%] py-12 lg:py-[3%]">
          {/* Note card: name on the first line, intro written on the ruled lines.
              Sized in cqw so the text keeps its line pitch at any card width. */}
          <div className="relative w-full max-w-[640px] lg:max-w-[min(640px,calc((100svh-3.5rem-5vw-8rem)*1.12))] justify-self-center lg:justify-self-end [container-type:inline-size]">
            <div
              className="relative w-full aspect-[1.12] bg-[#F4F0E6] shadow-[0_4px_14px_rgba(40,10,10,0.25)]"
              style={{ clipPath: noteClip }}
            >
              <h1 className="absolute left-[6%] right-[16%] top-[7%] m-0 font-serif italic font-semibold text-[#2E1A16] leading-none text-[clamp(1.9rem,4.2vw,4rem)] tracking-[-0.01em] whitespace-nowrap">
                {isVi ? 'Trần Ngọc Anh' : 'Tran Ngoc Anh'}
              </h1>

              <p className="absolute left-[6%] top-[22%] m-0 translate-y-[1.9cqw] leading-[8.333cqw] text-[clamp(9px,2.4cqw,13px)] uppercase tracking-[0.22em] font-semibold text-[#8E3A44]">
                {isVi ? 'Tài chính · Kinh doanh · Dữ liệu' : 'Finance · Business · Data'}
              </p>

              {/* Dashed ruled lines */}
              <div
                className="absolute left-[6%] right-[6%] top-[22%] bottom-[22%]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, rgba(120,95,80,0.35) 0 6px, transparent 6px 11px)',
                  WebkitMaskImage: 'repeating-linear-gradient(180deg, transparent 0 calc(16.66% - 1px), #000 calc(16.66% - 1px) 16.66%)',
                  maskImage: 'repeating-linear-gradient(180deg, transparent 0 calc(16.66% - 1px), #000 calc(16.66% - 1px) 16.66%)'
                }}
                aria-hidden="true"
              />

              {/* One ruled line = 8.333cqw (ruled band is half the card width, six lines) */}
              <p className="absolute left-[6%] right-[6%] top-[22%] m-0 translate-y-[10.233cqw] pr-[1%] line-clamp-4 tracking-[-0.005em] text-[clamp(9.5px,3.15cqw,18px)] leading-[8.333cqw] text-[#3D2A24]/85">
                {isVi
                  ? 'Tôi thích hiểu cách mọi thứ vận hành, nhất là khi câu trả lời không hiện ra ngay. Sự tò mò ấy đưa tôi đến với tài chính và công nghệ, nơi tôi thích nhìn vấn đề từ nhiều góc độ và tìm cách hiểu chúng rõ ràng hơn.'
                  : 'I like understanding how things work, especially when the answer is not obvious at first. That curiosity has drawn me toward finance and technology, where I enjoy looking at problems from different angles.'}
              </p>

              {/* Last ruled line: contact */}
              <p className="absolute left-[6%] right-[6%] top-[22%] m-0 translate-y-[43.565cqw] leading-[8.333cqw] text-[clamp(9.5px,3.15cqw,18px)] text-[#3D2A24]/85">
                Email:{' '}
                <a href="mailto:ngocanh.nine@gmail.com" className="text-[#2E1A16] font-medium hover:text-[#8E3A44] transition-colors">
                  ngocanh.nine@gmail.com
                </a>
              </p>
            </div>

            {/* Paper clip */}
            <svg
              viewBox="0 0 40 100"
              className="absolute -top-[7%] right-[5%] w-[9%] min-w-[30px]"
              aria-hidden="true"
            >
              <path
                d="M14 72 V20 a8 8 0 0 1 16 0 V80 a12 12 0 0 1 -24 0 V30"
                fill="none"
                stroke="#3A2620"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Stamp-framed portrait */}
          <div className="relative w-full max-w-[460px] lg:max-w-[min(460px,calc((100svh-3.5rem-5vw-6rem)*0.74))] justify-self-center lg:justify-self-start aspect-[0.74]">
            <div
              className="absolute inset-[3.5%] bg-[#F4F0E6] shadow-[0_4px_14px_rgba(40,10,10,0.3)]"
              style={{ clipPath: stampClip }}
            >
              <div className="absolute inset-[6%] overflow-hidden bg-[#D9D0BC]">
                <img
                  src="/profile/about-peach-opt.jpg"
                  alt={isVi ? 'Trần Ngọc Anh' : 'Tran Ngoc Anh'}
                  className="w-full h-full object-cover object-[center_22%] scale-[1.45] origin-[50%_22%] saturate-[0.9]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
