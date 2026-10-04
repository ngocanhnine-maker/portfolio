import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { seeded } from './ScrapbookBackdrop';

type Card = { image: string; position: string; alt: string; name: string; role: string; body: string };

const CONTENT: Record<'en' | 'vi', { title: string; cards: Card[] }> = {
  en: {
    title: 'Community',
    cards: [
      {
        image: '/gallery/peace-village/peace-village-2.jpg',
        position: '40% 40%',
        alt: 'Tet gift-giving with children and teachers at Peace Village – Thanh Xuan',
        name: 'Peace Village – Thanh Xuan',
        role: 'Chairperson',
        body: 'Led a team organizing a charity initiative at Peace Village – Thanh Xuan, coordinating fundraising and a Tet gift-giving event for children with mobility impairments.'
      },
      {
        image: '/gallery/bach-mai/bach-mai-community-support-1.jpg',
        position: '50% 60%',
        alt: 'Volunteer group at Bach Mai Hospital',
        name: 'Bach Mai Hospital',
        role: 'Volunteer',
        body: 'Supported a fundraising initiative for families facing financial difficulties related to medical treatment.'
      },
      {
        image: '/gallery/sos-hai-phong/sos-hai-phong-visit.jpg',
        position: '50% 65%',
        alt: 'Visiting children at SOS Children’s Village Hai Phong',
        name: 'SOS Children’s Village Hai Phong',
        role: 'Volunteer',
        body: 'Participated in a community fundraising initiative supporting children at SOS Children’s Village Hai Phong.'
      }
    ]
  },
  vi: {
    title: 'Cộng đồng',
    cards: [
      {
        image: '/gallery/peace-village/peace-village-2.jpg',
        position: '40% 40%',
        alt: 'Trao quà Tết cùng các em và thầy cô tại Làng Hòa Bình Thanh Xuân',
        name: 'Làng Hòa Bình Thanh Xuân',
        role: 'Trưởng ban tổ chức',
        body: 'Dẫn dắt nhóm tổ chức hoạt động thiện nguyện tại Làng Hòa Bình Thanh Xuân, điều phối gây quỹ và buổi trao quà Tết cho các em bị suy giảm khả năng vận động.'
      },
      {
        image: '/gallery/bach-mai/bach-mai-community-support-1.jpg',
        position: '50% 60%',
        alt: 'Nhóm tình nguyện tại Bệnh viện Bạch Mai',
        name: 'Bệnh viện Bạch Mai',
        role: 'Tình nguyện viên',
        body: 'Hỗ trợ hoạt động gây quỹ cho các gia đình gặp khó khăn tài chính trong quá trình điều trị bệnh.'
      },
      {
        image: '/gallery/sos-hai-phong/sos-hai-phong-visit.jpg',
        position: '50% 65%',
        alt: 'Thăm các em tại Làng trẻ em SOS Hải Phòng',
        name: 'Làng trẻ em SOS Hải Phòng',
        role: 'Tình nguyện viên',
        body: 'Tham gia hoạt động gây quỹ cộng đồng hỗ trợ các em tại Làng trẻ em SOS Hải Phòng.'
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

/** Beyond Myself: three community cards; the first (a leadership role) is slightly larger. */
export const BeyondMyself: React.FC = () => {
  const { isVi } = useLanguage();
  const c = isVi ? CONTENT.vi : CONTENT.en;
  const clips = useMemo(() => [11, 23, 53].map(tornTopBottom), []);

  return (
    <section
      id="community"
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

          <h2 className="m-0 text-center font-serif italic font-semibold text-[#2E1A16] leading-none tracking-[-0.01em] text-[clamp(2.1rem,3.8vw,3.8rem)]">
            {c.title}
          </h2>

          <ol className="flex-1 m-0 p-0 list-none mt-[clamp(28px,3.6vw,56px)] grid grid-cols-1 md:grid-cols-[1.22fr_1fr_1fr] gap-x-[clamp(16px,2.4vw,40px)] gap-y-12 items-stretch content-center">
            {c.cards.map((card, i) => {
              const featured = i === 0;
              return (
                <li key={card.name} className={`relative flex ${featured ? 'md:-mt-3' : ''}`}>
                  <span
                    className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-[42%] h-[30px] bg-[#C9AF8B]/60 z-10 skew-x-[-8deg] shadow-[0_1px_2px_rgba(60,40,20,0.15)]"
                    aria-hidden="true"
                  />
                  <article className="flex-1 flex [filter:drop-shadow(0_4px_7px_rgba(60,40,20,0.2))]">
                    <div
                      className={`flex-1 px-[8%] pt-[clamp(26px,2.4vw,36px)] pb-[clamp(26px,2.6vw,38px)] text-center ${
                        featured ? 'bg-[#E6CFA3]' : i % 2 ? 'bg-[#C9A981]' : 'bg-[#D8BE96]'
                      }`}
                      style={{ clipPath: clips[i] }}
                    >
                      <div
                        className={`mx-auto overflow-hidden bg-[#FFFDF8] p-[3.5%] shadow-[0_2px_5px_rgba(60,40,20,0.2)] ${
                          featured ? 'w-[90%] aspect-[4/3]' : 'w-[78%] aspect-[4/3]'
                        }`}
                      >
                        <img src={card.image} alt={card.alt} className="w-full h-full object-cover" style={{ objectPosition: card.position }} />
                      </div>
                      <h3
                        className={`mt-[clamp(14px,1.4vw,20px)] m-0 font-serif italic font-semibold text-[#2E1A16] leading-[1.1] ${
                          featured ? 'text-[clamp(1.35rem,1.75vw,1.8rem)]' : 'text-[clamp(1.2rem,1.5vw,1.55rem)]'
                        }`}
                      >
                        {card.name}
                      </h3>
                      <p className="mt-1.5 m-0 text-[11px] uppercase tracking-[0.16em] font-semibold text-[#6E2F37]">{card.role}</p>
                      <p className="mt-3 m-0 mx-auto max-w-[36ch] text-[clamp(0.84rem,0.92vw,0.95rem)] leading-[1.6] text-[#3D2A24]/90">{card.body}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
