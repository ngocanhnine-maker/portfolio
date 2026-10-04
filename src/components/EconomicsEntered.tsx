import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { seeded } from './ScrapbookBackdrop';

// Swap this for a photo from the award ceremony when one is available.
const LEFT_IMAGE = '/certificates/veo-2026.jpg';

const CONTENT = {
  en: {
    title: 'Discovering Economics',
    imageAlt: 'Certificate: First Prize, Vietnam Economics Olympiad 2026',
    caption: 'Vietnam Economics Olympiad · 2026',
    shiftHeading: 'The Shift',
    shift:
      'I came to economics without any formal background. I started with the basics, supply and demand, costs, opportunity cost, and slowly learned to look at a problem through markets, incentives and the decisions businesses actually have to make.',
    milestoneHeading: 'The Milestone',
    milestoneTitle: 'Vietnam Economics Olympiad — First Prize',
    milestone:
      'The competition showed me that I enjoy questions without a single right answer: the ones where context matters and every choice comes with a trade-off.',
    outro: 'That was when numbers stopped feeling like answers and started becoming evidence.'
  },
  vi: {
    title: 'Khám phá Kinh tế',
    imageAlt: 'Giấy khen: Giải Nhất Olympic Kinh tế Việt Nam 2026',
    caption: 'Olympic Kinh tế Việt Nam · 2026',
    shiftHeading: 'Bước chuyển',
    shift:
      'Tôi đến với kinh tế khi chưa có nền tảng chính thức. Tôi bắt đầu từ những điều cơ bản như cung cầu, chi phí, chi phí cơ hội, rồi dần học cách nhìn một vấn đề qua thị trường, động cơ và những quyết định mà doanh nghiệp thực sự phải đưa ra.',
    milestoneHeading: 'Dấu mốc',
    milestoneTitle: 'Olympic Kinh tế Việt Nam — Giải Nhất',
    milestone:
      'Cuộc thi cho tôi thấy mình thích những câu hỏi không chỉ có một đáp án đúng: những câu hỏi mà bối cảnh quan trọng và mỗi lựa chọn đều đi kèm đánh đổi.',
    outro: 'Đó là lúc những con số thôi là đáp án, và bắt đầu trở thành bằng chứng.'
  }
};

// Torn bottom edge for the title banner.
const tornBottom = (seed: number) => {
  const rand = seeded(seed);
  const pts = ['0% 0%', '100% 0%'];
  const steps = 70;
  let drift = 0;
  for (let i = steps; i >= 0; i--) {
    drift = Math.max(-1, Math.min(1, drift + (rand() - 0.5) * 0.6));
    pts.push(`${(i / steps) * 100}% ${84 + drift * 6 + (rand() - 0.5) * 4}%`);
  }
  return `polygon(${pts.join(',')})`;
};

const Stripes: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={`absolute w-[clamp(44px,4vw,76px)] h-[clamp(36px,3.4vw,58px)] ${className}`}
    style={{ background: 'repeating-linear-gradient(90deg, #D8B98C 0 4px, #C9A574 4px 6px, #E2C79E 6px 9px)' }}
    aria-hidden="true"
  />
);

const Ribbon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3
    className="inline-block m-0 bg-[#8D6748] text-[#F4F0E6] font-serif italic font-semibold leading-none text-[clamp(1.3rem,1.9vw,1.9rem)] pl-5 pr-7 py-2"
    style={{ clipPath: 'polygon(0 0, 100% 0, 94% 50%, 100% 100%, 0 100%)' }}
  >
    {children}
  </h3>
);

/** When Economics Entered the Picture: award image on the left, The Shift / The Milestone on the right. */
export const EconomicsEntered: React.FC = () => {
  const { isVi } = useLanguage();
  const c = isVi ? CONTENT.vi : CONTENT.en;
  const bannerClip = useMemo(() => tornBottom(13), []);

  return (
    <section
      id="economics"
      className="relative w-full min-h-[calc(100svh-3.5rem)] flex items-center justify-center bg-[#C9A97E] bg-[url('/landing/collage.jpg')] bg-cover bg-[position:4%_50%] lg:bg-center px-3 py-6 sm:px-6 sm:py-8 lg:px-[2.5%] lg:py-[2.5%] overflow-hidden select-none"
    >
      {/* Board */}
      <div className="relative w-full max-w-[1600px] min-h-[min(calc(100svh-3.5rem-5vw),860px)] bg-[#E9E7E3] shadow-[0_6px_22px_rgba(40,25,10,0.45)] p-[clamp(12px,2.2%,34px)] pl-[clamp(20px,6%,96px)] flex">
        <div className="absolute top-0 bottom-0 left-[3.2%] w-[3px] bg-[#A3A07A]/80" aria-hidden="true" />
        <Stripes className="-top-[3px] right-[2.5%] z-10" />
        <Stripes className="-bottom-[3px] right-[2.5%] z-10" />

        {/* Ruled sheet */}
        <div
          className="relative flex-1 bg-[#F4F0E6] shadow-[0_3px_10px_rgba(40,10,10,0.18)] px-[clamp(20px,5%,90px)] pt-[clamp(20px,2%,30px)] pb-[clamp(24px,3%,44px)] flex flex-col"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, transparent 0 calc(2.6rem - 1px), rgba(150,120,100,0.14) calc(2.6rem - 1px) 2.6rem)'
          }}
        >
          {/* Paper clip on the sheet's top edge */}
          <svg viewBox="0 0 40 100" className="absolute -top-[4%] left-[12%] w-[clamp(22px,2.4vw,40px)] z-10" aria-hidden="true">
            <path
              d="M14 72 V20 a8 8 0 0 1 16 0 V80 a12 12 0 0 1 -24 0 V30"
              fill="none"
              stroke="#3A2620"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          {/* Torn title banner */}
          <div className="relative mx-auto w-full max-w-[880px] [filter:drop-shadow(0_3px_4px_rgba(60,40,20,0.2))]">
            <div className="bg-[#E8D4AE] px-6 pt-[clamp(18px,2.4vw,34px)] pb-[clamp(30px,3.6vw,52px)] text-center" style={{ clipPath: bannerClip }}>
              <h2 className="m-0 font-serif italic font-semibold text-[#2E1A16] leading-[1.05] tracking-[-0.01em] text-[clamp(2.1rem,3.8vw,3.8rem)]">
                {c.title}
              </h2>
            </div>
          </div>

          <div className="flex-1 mt-[clamp(20px,3vw,44px)] grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-[6%] items-center">
            {/* Left: award image in a framed print */}
            <figure className="m-0 justify-self-center w-full max-w-[640px]">
              <div className="relative bg-[#FFFDF8] p-[3%] shadow-[0_6px_16px_rgba(60,40,20,0.28)] -rotate-[1.2deg]">
                <img src={LEFT_IMAGE} alt={c.imageAlt} className="block w-full h-auto" />
                <div
                  className="absolute -top-[4%] left-1/2 -translate-x-1/2 rotate-[3deg] w-[26%] h-[clamp(20px,2.2vw,34px)] bg-[#DCCBA4]/80 shadow-[0_1px_2px_rgba(60,40,20,0.2)]"
                  aria-hidden="true"
                />
              </div>
              <figcaption className="mt-4 text-center font-serif italic text-[clamp(0.95rem,1.1vw,1.1rem)] text-[#3D2A24]/70">
                {c.caption}
              </figcaption>
            </figure>

            {/* Right: two short parts */}
            <div className="min-w-0 max-w-[36rem] space-y-[clamp(22px,3vw,40px)]">
              <div>
                <Ribbon>{c.shiftHeading}</Ribbon>
                <p className="mt-4 m-0 text-[clamp(0.92rem,1.05vw,1.05rem)] leading-[1.75] text-[#3D2A24]/90">{c.shift}</p>
              </div>
              <div>
                <Ribbon>{c.milestoneHeading}</Ribbon>
                <p className="mt-4 m-0 font-semibold text-[clamp(0.98rem,1.15vw,1.15rem)] text-[#2E1A16]">{c.milestoneTitle}</p>
                <p className="mt-2 m-0 text-[clamp(0.92rem,1.05vw,1.05rem)] leading-[1.75] text-[#3D2A24]/90">{c.milestone}</p>
              </div>
            </div>
          </div>

          <p className="mt-[clamp(24px,3vw,40px)] m-0 text-center font-serif italic text-[clamp(1.1rem,1.6vw,1.55rem)] text-[#2E1A16]/85">
            {c.outro}
          </p>
        </div>
      </div>
    </section>
  );
};
