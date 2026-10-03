import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { seeded } from './ScrapbookBackdrop';

type Card = { image: string; position: string; alt: string; name: string; result: string; body: string };

const CONTENT: Record<'en' | 'vi', { title: string; cards: Card[] }> = {
  en: {
    title: 'Milestones Along the Way',
    cards: [
      {
        image: '/certificates/veo-2026.jpg',
        position: '50% 55%',
        alt: 'Vietnam Economics Olympiad 2026 First Prize certificate',
        name: 'Vietnam Economics Olympiad',
        result: 'First Prize',
        body: 'An important turning point that deepened my interest in economics and the kinds of questions shaped by markets, incentives, and decisions.'
      },
      {
        image: '/gallery/wico/wico-photo-stage-1.jpg',
        position: '50% 35%',
        alt: 'Holding the WICO 2026 Gold Medal in Seoul',
        name: 'WICO',
        result: 'Gold Medal',
        body: 'This experience brought financial analysis closer to real business decisions and showed me how numbers can support judgment, not just calculation.'
      },
      {
        image: '/gallery/national-chem/national-chem-team-2.jpg',
        position: '50% 60%',
        alt: 'National Chemistry Competition award ceremony at the Temple of Literature',
        name: 'National Chemistry Competition',
        result: 'Third Prize',
        body: 'One of my strongest early academic milestones, where I developed discipline, precision, and confidence in solving complex problems.'
      },
      {
        image: '/gallery/axgo/axgo-photo-6.jpg',
        position: '45% 40%',
        alt: 'At the AX Global Olympiad 2026 International Finals',
        name: 'AXGO',
        result: 'Corporate Analysis Project',
        body: 'Through analysing DOJI, I became more interested in how business performance can be understood through data, strategy, and financial thinking.'
      }
    ]
  },
  vi: {
    title: 'Những dấu mốc trên đường đi',
    cards: [
      {
        image: '/certificates/veo-2026.jpg',
        position: '50% 55%',
        alt: 'Giấy khen Giải Nhất Olympic Kinh tế Việt Nam 2026',
        name: 'Olympic Kinh tế Việt Nam',
        result: 'Giải Nhất',
        body: 'Một bước ngoặt quan trọng khiến tôi quan tâm sâu hơn đến kinh tế và những câu hỏi được định hình bởi thị trường, động cơ và quyết định.'
      },
      {
        image: '/gallery/wico/wico-photo-stage-1.jpg',
        position: '50% 35%',
        alt: 'Cầm Huy chương Vàng WICO 2026 tại Seoul',
        name: 'WICO',
        result: 'Huy chương Vàng',
        body: 'Trải nghiệm này đưa phân tích tài chính đến gần hơn với quyết định kinh doanh thực tế, và cho tôi thấy con số có thể hỗ trợ việc phán đoán chứ không chỉ để tính toán.'
      },
      {
        image: '/gallery/national-chem/national-chem-team-2.jpg',
        position: '50% 60%',
        alt: 'Lễ trao giải Học sinh giỏi Quốc gia môn Hóa học tại Văn Miếu',
        name: 'Kỳ thi HSG Quốc gia môn Hóa học',
        result: 'Giải Ba',
        body: 'Một trong những dấu mốc học thuật sớm và vững chắc nhất, nơi tôi rèn sự kỷ luật, chính xác và tự tin khi giải những bài toán phức tạp.'
      },
      {
        image: '/gallery/axgo/axgo-photo-6.jpg',
        position: '45% 40%',
        alt: 'Tại vòng chung kết quốc tế AX Global Olympiad 2026',
        name: 'AXGO',
        result: 'Dự án phân tích doanh nghiệp',
        body: 'Qua việc phân tích DOJI, tôi quan tâm hơn đến cách hiểu hiệu quả kinh doanh thông qua dữ liệu, chiến lược và tư duy tài chính.'
      }
    ]
  }
};

// Paper torn along the top and bottom edges.
const tornTopBottom = (seed: number) => {
  const rand = seeded(seed);
  const n = 34;
  const top = Array.from({ length: n + 1 }, (_, i) => `${(i / n) * 100}% ${rand() * 2.4}%`);
  const bottom = Array.from({ length: n + 1 }, (_, i) => `${100 - (i / n) * 100}% ${100 - rand() * 3}%`);
  return `polygon(${[...top, ...bottom].join(',')})`;
};

const Stripes: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={`absolute w-[clamp(44px,4vw,76px)] h-[clamp(36px,3.4vw,58px)] ${className}`}
    style={{ background: 'repeating-linear-gradient(90deg, #D8B98C 0 4px, #C9A574 4px 6px, #E2C79E 6px 9px)' }}
    aria-hidden="true"
  />
);

/** Milestones Along the Way: four torn-paper cards, each with a small photo, award and one line. */
export const Milestones: React.FC = () => {
  const { isVi } = useLanguage();
  const c = isVi ? CONTENT.vi : CONTENT.en;
  const clips = useMemo(() => [3, 17, 29, 41].map(tornTopBottom), []);

  return (
    <section
      id="milestones"
      className="relative w-full min-h-[calc(100svh-3.5rem)] flex items-center justify-center bg-[#C9A97E] bg-[url('/landing/collage.jpg')] bg-cover bg-[position:4%_50%] lg:bg-center px-3 py-6 sm:px-6 sm:py-8 lg:px-[2.5%] lg:py-[2.5%] overflow-hidden select-none"
    >
      {/* Board */}
      <div className="relative w-full max-w-[1600px] min-h-[min(calc(100svh-3.5rem-5vw),860px)] bg-[#E9E7E3] shadow-[0_6px_22px_rgba(40,25,10,0.45)] p-[clamp(12px,1.8%,28px)] flex">
        <div className="absolute top-0 bottom-0 left-[5.5%] w-[3px] bg-[#8E3A44]/45" aria-hidden="true" />
        <Stripes className="-top-[3px] right-[2.5%] z-10" />
        <Stripes className="-bottom-[3px] right-[2.5%] z-10" />

        {/* Grid-paper sheet with a column of binder holes */}
        <div
          className="relative flex-1 bg-[#F4F0E6] shadow-[0_3px_10px_rgba(40,10,10,0.18)] pl-[clamp(44px,7%,120px)] pr-[clamp(16px,4%,72px)] py-[clamp(26px,3.5%,52px)] flex flex-col"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(150,120,100,0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(150,120,100,0.13) 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        >
          <div className="absolute left-[clamp(12px,2.2%,34px)] top-[4%] bottom-[4%] flex flex-col justify-between" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="block w-[clamp(14px,1.6vw,26px)] aspect-square rounded-full bg-[#8E3A44]/75" />
            ))}
          </div>

          <h2 className="m-0 text-center font-serif italic font-semibold text-[#2E1A16] leading-none tracking-[-0.01em] text-[clamp(2.1rem,4vw,4rem)]">
            {c.title}
          </h2>

          <ol className="flex-1 m-0 p-0 list-none mt-[clamp(28px,3.6vw,56px)] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-[clamp(16px,2.2vw,36px)] gap-y-12 items-stretch content-center">
            {c.cards.map((card, i) => (
              <li key={card.name} className="relative flex">
                {/* Translucent tape */}
                <span
                  className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-[46%] h-[30px] bg-[#C9AF8B]/60 z-10 skew-x-[-8deg] shadow-[0_1px_2px_rgba(60,40,20,0.15)]"
                  aria-hidden="true"
                />
                <article className="flex-1 flex [filter:drop-shadow(0_4px_7px_rgba(60,40,20,0.2))]">
                  <div
                    className={`flex-1 px-[9%] pt-[clamp(26px,2.4vw,36px)] pb-[clamp(26px,2.6vw,38px)] text-center ${i % 2 ? 'bg-[#EAD5AE]' : 'bg-[#C9A981]'}`}
                    style={{ clipPath: clips[i] }}
                  >
                    <div className="mx-auto w-[74%] aspect-[4/3] overflow-hidden bg-[#FFFDF8] p-[4%] shadow-[0_2px_5px_rgba(60,40,20,0.2)]">
                      <img src={card.image} alt={card.alt} className="w-full h-full object-cover" style={{ objectPosition: card.position }} />
                    </div>
                    <h3 className="mt-[clamp(14px,1.4vw,20px)] m-0 font-serif italic font-semibold text-[#2E1A16] leading-[1.1] text-[clamp(1.2rem,1.5vw,1.55rem)]">
                      {card.name}
                    </h3>
                    <p className="mt-1.5 m-0 text-[11px] uppercase tracking-[0.16em] font-semibold text-[#6E2F37]">{card.result}</p>
                    <p className="mt-3 m-0 text-[clamp(0.84rem,0.92vw,0.95rem)] leading-[1.6] text-[#3D2A24]/90">{card.body}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
