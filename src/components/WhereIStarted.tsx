import React, { useMemo } from 'react';
import { Atom, FlaskConical } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { seeded } from './ScrapbookBackdrop';

const CONTENT = {
  en: {
    title: 'Where I Started',
    intro:
      'Before finance and technology, I spent much of my time learning through Chemistry and Mathematics. These subjects taught me to work carefully, test assumptions, and stay with difficult problems until they became clearer.',
    cards: [
      {
        title: 'National Chemistry Competition',
        result: 'Third Prize',
        grade: 'Grade 11',
        body: 'Preparing for it taught me precision: checking every step, questioning every result, and staying with a problem until the reasoning held.'
      },
      {
        title: 'Natural Science Olympiad',
        result: 'Bronze Medal',
        grade: 'Grade 10',
        body: 'Unfamiliar problems taught me to adapt, try another angle, and treat a hard question as something to learn from rather than avoid.'
      }
    ],
    outro: 'Over time, I became more interested in questions that did not end with one correct answer.'
  },
  vi: {
    title: 'Nơi tôi bắt đầu',
    intro:
      'Trước tài chính và công nghệ, phần lớn thời gian của tôi dành cho Hóa học và Toán học. Hai môn ấy dạy tôi làm việc cẩn thận, kiểm chứng giả định, và kiên nhẫn với những bài toán khó cho đến khi chúng sáng rõ hơn.',
    cards: [
      {
        title: 'Kỳ thi Học sinh giỏi Quốc gia môn Hóa học',
        result: 'Giải Ba',
        grade: 'Lớp 11',
        body: 'Quá trình ôn luyện dạy tôi sự chính xác: kiểm tra từng bước, đặt câu hỏi với từng kết quả, và theo đến cùng cho đến khi lập luận vững vàng.'
      },
      {
        title: 'Olympic Khoa học Tự nhiên',
        result: 'Huy chương Đồng',
        grade: 'Lớp 10',
        body: 'Những bài toán lạ dạy tôi cách thích nghi, thử một góc nhìn khác, và xem câu hỏi khó là điều để học hỏi thay vì né tránh.'
      }
    ],
    outro: 'Dần dần, tôi quan tâm nhiều hơn đến những câu hỏi không kết thúc bằng một đáp án đúng duy nhất.'
  }
};

// Left edge of a page torn off a spiral notebook: small bites between holes.
const spiralTear = (seed: number) => {
  const rand = seeded(seed);
  const pts = ['100% 0%', '100% 100%'];
  const teeth = 22;
  for (let i = teeth; i >= 0; i--) {
    const y = (i / teeth) * 100;
    pts.push(`${2.5 + rand() * 1.5}% ${y}%`);
    if (i > 0) pts.push(`${rand() * 1.2}% ${y - 100 / teeth / 2}%`);
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

interface CardProps {
  tone: 'light' | 'dark';
  icon: React.ElementType;
  clip: string;
  title: string;
  result: string;
  grade: string;
  body: string;
  accessory: React.ReactNode;
  tilt: string;
}

const MilestoneCard: React.FC<CardProps> = ({ tone, icon: Icon, clip, title, result, grade, body, accessory, tilt }) => (
  <article className={`relative w-full max-w-[520px] justify-self-center ${tilt}`}>
    <div className="[filter:drop-shadow(0_4px_8px_rgba(60,40,20,0.22))]">
      <div
        className={`relative pl-[18%] pr-[8%] py-[clamp(24px,2.8vw,40px)] rounded-r-[10px] ${tone === 'light' ? 'bg-[#E8D4AE]' : 'bg-[#C4A47E]'}`}
        style={{ clipPath: clip }}
      >
        {/* Spiral holes */}
        <div className="absolute left-[5%] top-[3%] bottom-[3%] flex flex-col justify-between" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="block w-[clamp(9px,1vw,14px)] h-[clamp(6px,0.65vw,9px)] rounded-full bg-[#F4F0E6] shadow-[inset_1px_1px_1px_rgba(60,40,20,0.25)]" />
          ))}
        </div>
        {/* Double margin rule */}
        <div className="absolute top-0 bottom-0 left-[13%] w-[4px] border-x border-[#B5584F]/45" aria-hidden="true" />

        <div className="text-center">
          <Icon className="mx-auto w-[clamp(40px,3.8vw,58px)] h-[clamp(40px,3.8vw,58px)] text-[#2E1A16]" strokeWidth={1.25} />
          <h3 className="mt-4 m-0 font-serif italic font-semibold text-[#2E1A16] leading-[1.1] text-[clamp(1.35rem,2vw,2rem)]">
            {title}
          </h3>
          <p className="mt-2.5 m-0 text-[11px] sm:text-xs uppercase tracking-[0.16em] font-medium text-[#3D2A24]/80">
            {result} · {grade}
          </p>
          <p className="mt-4 m-0 mx-auto max-w-[30ch] text-[clamp(0.9rem,1.05vw,1.05rem)] leading-[1.65] text-[#3D2A24]/90">
            {body}
          </p>
        </div>
      </div>
    </div>
    {accessory}
  </article>
);

/** Where I Started: two early milestones (chemistry, natural science) as notebook pages on the board. */
export const WhereIStarted: React.FC = () => {
  const { isVi } = useLanguage();
  const c = isVi ? CONTENT.vi : CONTENT.en;
  const clipA = useMemo(() => spiralTear(5), []);
  const clipB = useMemo(() => spiralTear(29), []);

  return (
    <section
      id="started"
      className="relative w-full min-h-[calc(100svh-3.5rem)] flex items-center justify-center bg-[#C9A97E] bg-[url('/landing/collage.jpg')] bg-cover bg-[position:4%_50%] lg:bg-center px-3 py-6 sm:px-6 sm:py-8 lg:px-[2.5%] lg:py-[2.5%] overflow-hidden select-none"
    >
      {/* Board */}
      <div className="relative w-full max-w-[1600px] min-h-[min(calc(100svh-3.5rem-5vw),860px)] bg-[#E9E7E3] shadow-[0_6px_22px_rgba(40,25,10,0.45)] p-[clamp(12px,2.2%,34px)] flex">
        <div className="absolute top-0 bottom-0 left-[5.5%] w-[3px] bg-[#A3A07A]/80" aria-hidden="true" />
        <Stripes className="-top-[3px] right-[2.5%] z-10" />
        <Stripes className="-bottom-[3px] right-[2.5%] z-10" />

        {/* Ruled sheet */}
        <div
          className="relative flex-1 bg-[#F4F0E6] shadow-[0_3px_10px_rgba(40,10,10,0.18)] px-[clamp(20px,6%,110px)] pt-[clamp(48px,5%,72px)] pb-[clamp(24px,3%,44px)] flex flex-col justify-center overflow-hidden"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, transparent 0 calc(2.6rem - 1px), rgba(150,120,100,0.14) calc(2.6rem - 1px) 2.6rem)'
          }}
        >
          {/* Binder slots along the top */}
          <div className="absolute top-[clamp(14px,2.2%,30px)] left-[4%] right-[4%] flex justify-between" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="block w-[8%] h-[clamp(10px,1.1vw,18px)] rounded-[3px] bg-[#CFCBC2]" />
            ))}
          </div>

          {/* Very faint formulas, purely decorative */}
          <div className="pointer-events-none absolute inset-0 font-serif italic text-[#3D2A24]/[0.06] text-[clamp(1.2rem,2.2vw,2.4rem)] leading-none" aria-hidden="true">
            <span className="absolute left-[5%] top-[30%] -rotate-6">2H₂ + O₂ → 2H₂O</span>
            <span className="absolute right-[6%] top-[22%] rotate-3">PV = nRT</span>
            <span className="absolute left-[8%] bottom-[12%] rotate-2">∫ f(x) dx</span>
            <span className="absolute right-[9%] bottom-[16%] -rotate-3">ΔG = ΔH − TΔS</span>
          </div>

          <header className="relative text-center max-w-[72ch] mx-auto">
            <h2 className="m-0 font-serif italic font-semibold text-[#2E1A16] leading-none tracking-[-0.01em] text-[clamp(2.2rem,4vw,4rem)]">
              {c.title}
            </h2>
            <p className="mt-4 m-0 text-[clamp(0.92rem,1.05vw,1.05rem)] leading-[1.7] text-[#3D2A24]/85">{c.intro}</p>
          </header>

          <div className="relative mt-[clamp(24px,3vw,44px)] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[8%] items-start">
            <MilestoneCard
              {...c.cards[0]}
              tone="light"
              icon={FlaskConical}
              clip={clipA}
              tilt="md:-rotate-[1.2deg]"
              accessory={
                <div
                  className="absolute -top-[4%] -right-[6%] w-[22%] h-[clamp(26px,3vw,44px)] rotate-[38deg] shadow-[0_1px_2px_rgba(60,30,20,0.25)]"
                  style={{ background: 'repeating-linear-gradient(135deg, #8E3A44 0 6px, #EFE3CF 6px 10px)' }}
                  aria-hidden="true"
                />
              }
            />
            <MilestoneCard
              {...c.cards[1]}
              tone="dark"
              icon={Atom}
              clip={clipB}
              tilt="md:rotate-[1deg]"
              accessory={
                <svg viewBox="0 0 40 100" className="absolute -top-[9%] right-[10%] w-[7%] min-w-[24px]" aria-hidden="true">
                  <path
                    d="M14 72 V20 a8 8 0 0 1 16 0 V80 a12 12 0 0 1 -24 0 V30"
                    fill="none"
                    stroke="#3A2620"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              }
            />
          </div>

          <p className="relative mt-[clamp(24px,3vw,40px)] m-0 text-center font-serif italic text-[clamp(1.1rem,1.6vw,1.55rem)] text-[#2E1A16]/85">
            {c.outro}
          </p>
        </div>
      </div>
    </section>
  );
};
