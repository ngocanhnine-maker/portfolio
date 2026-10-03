import React, { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { seeded } from './ScrapbookBackdrop';
import { CertificateViewer, CertificateModalData } from './CertificateViewer';

const PAPER_URL = '/papers/wico-research-paper.pdf';

// Figures come from the WICO paper's SME table (Section II): two different firms.
const CONTENT = {
  en: {
    title: 'When Numbers Became Decisions',
    badge: 'WICO 2026 · Gold Medal',
    imageAlt: 'The WICO 2026 team on stage with their Gold Medals in Seoul',
    problemHeading: 'The Problem',
    problem:
      'The SMEs in our case study showed sharp drops in revenue and heavy reliance on debt. No single ratio could explain how risky they were, so we had to look at the wider picture: profitability, debt, revenue and the ability to repay.',
    approachHeading: 'The Approach',
    approach:
      'With my team, I built a credit assessment framework that combined financial analysis with the 5Cs of credit, a scorecard, and machine learning models such as Random Forest and XGBoost. The aim was to judge risk from many factors instead of one number.',
    stats: [
      { value: '228.7%', label: 'Debt / Equity', source: 'Central Pharma JSC 3' },
      { value: '−75%', label: 'Revenue, 2020 → 2021', source: 'Vinaceglass JSC' }
    ],
    readPaper: 'Read the WICO research paper',
    paperTitle: 'AI-Powered Credit Risk Assessment for Vietnamese SMEs',
    outro: 'The next question was not how to analyse the numbers, but how to make them easier to work with.'
  },
  vi: {
    title: 'Khi những con số thành quyết định',
    badge: 'WICO 2026 · Huy chương Vàng',
    imageAlt: 'Đội WICO 2026 trên sân khấu với Huy chương Vàng tại Seoul',
    problemHeading: 'Vấn đề',
    problem:
      'Các doanh nghiệp trong case study đối mặt với mức giảm doanh thu đáng kể và đòn bẩy tài chính cao. Một tỷ lệ riêng lẻ không đủ để giải thích mức độ rủi ro, nên cần xem xét bức tranh rộng hơn về khả năng sinh lời, nợ, doanh thu và khả năng trả nợ.',
    approachHeading: 'Cách tiếp cận',
    approach:
      'Tôi cùng team xây dựng một khung đánh giá tín dụng kết hợp phân tích tài chính với 5C, scorecard và các mô hình machine learning như Random Forest và XGBoost. Mục tiêu là đánh giá rủi ro dựa trên nhiều yếu tố thay vì chỉ dựa vào một chỉ số.',
    stats: [
      { value: '228.7%', label: 'Nợ / Vốn chủ sở hữu', source: 'Dược Trung ương 3' },
      { value: '−75%', label: 'Doanh thu, 2020 → 2021', source: 'Vinaceglass' }
    ],
    readPaper: 'Đọc bài nghiên cứu WICO',
    paperTitle: 'Ứng dụng AI đánh giá rủi ro tín dụng cho SME Việt Nam',
    outro: 'Câu hỏi tiếp theo không còn là phân tích những con số thế nào, mà là làm sao để chúng dễ làm việc hơn.'
  }
};

// Paper torn on all four sides: small irregular bites along each edge.
const tornCard = (seed: number) => {
  const rand = seeded(seed);
  const edge = (n: number, at: (t: number, d: number) => string) =>
    Array.from({ length: n }, (_, i) => {
      const bite = rand() < 0.12 ? 2.2 + rand() * 1.8 : rand() * 1.1;
      return at(i / n, bite);
    });
  return `polygon(${[
    ...edge(40, (t, d) => `${t * 100}% ${d}%`),
    ...edge(26, (t, d) => `${100 - d * 0.6}% ${t * 100}%`),
    ...edge(40, (t, d) => `${100 - t * 100}% ${100 - d}%`),
    ...edge(26, (t, d) => `${d * 0.6}% ${100 - t * 100}%`)
  ].join(',')})`;
};

const Stripes: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={`absolute w-[clamp(44px,4vw,76px)] h-[clamp(36px,3.4vw,58px)] ${className}`}
    style={{ background: 'repeating-linear-gradient(90deg, #D8B98C 0 4px, #C9A574 4px 6px, #E2C79E 6px 9px)' }}
    aria-hidden="true"
  />
);

/** When Numbers Became Decisions: WICO team photo on the left, the case on a torn card on the right. */
export const NumbersDecisions: React.FC = () => {
  const { isVi } = useLanguage();
  const c = isVi ? CONTENT.vi : CONTENT.en;
  const cardClip = useMemo(() => tornCard(61), []);
  const [paper, setPaper] = useState<CertificateModalData | null>(null);

  const openPaper = () =>
    setPaper({ title: c.paperTitle, test: 'WICO 2026', score: isVi ? 'Huy chương Vàng' : 'Gold Medal', date: 'Seoul · 2026', pdfUrl: PAPER_URL });

  const h3 = 'm-0 font-serif italic font-semibold text-[#2E1A16] leading-none text-[clamp(1.25rem,1.7vw,1.7rem)]';
  const body = 'mt-2 m-0 text-[clamp(0.88rem,0.98vw,1rem)] leading-[1.6] text-[#3D2A24]/90';

  return (
    <section
      id="wico"
      className="relative w-full min-h-[calc(100svh-3.5rem)] flex items-center justify-center bg-[#C9A97E] bg-[url('/landing/collage.jpg')] bg-cover bg-[position:4%_50%] lg:bg-center px-3 py-6 sm:px-6 sm:py-8 lg:px-[2.5%] lg:py-[2.5%] overflow-hidden select-none"
    >
      {/* Board */}
      <div className="relative w-full max-w-[1600px] min-h-[min(calc(100svh-3.5rem-5vw),860px)] bg-[#E9E7E3] shadow-[0_6px_22px_rgba(40,25,10,0.45)]">
        <div className="absolute top-0 bottom-0 right-[6%] w-[3px] bg-[#8E3A44]/45" aria-hidden="true" />
        <Stripes className="-top-[3px] left-[3%] z-10" />
        <Stripes className="-bottom-[3px] left-[3%] z-10" />

        <div className="relative h-full min-h-[inherit] grid grid-cols-1 lg:grid-cols-[0.66fr_1.34fr] items-center gap-10 lg:gap-[4%] px-[5%] lg:pl-[7%] lg:pr-[9%] py-12 lg:py-[3.5%]">
          {/* Left: photo in a cream paper frame with patterned tape */}
          <figure className="relative m-0 justify-self-center w-full max-w-[460px] lg:max-w-[min(420px,calc((100svh-3.5rem-5vw-7rem)*0.78))]">
            <div className="relative bg-[#EBD3A9] p-[7%] shadow-[0_6px_16px_rgba(60,40,20,0.25)]">
              <div className="aspect-[0.8] overflow-hidden bg-[#D9D0BC]">
                <img
                  src="/gallery/wico/wico-photo-ceremony.jpg"
                  alt={c.imageAlt}
                  className="w-full h-full object-cover object-[63%_60%] scale-[1.35] origin-[63%_60%]"
                />
              </div>
            </div>
            <div
              className="absolute -top-[3.5%] left-[22%] w-[52%] h-[clamp(34px,4.2vw,62px)] rotate-[-1.5deg] shadow-[0_1px_2px_rgba(60,30,20,0.2)]"
              style={{
                backgroundColor: '#D9B48A',
                backgroundImage:
                  'radial-gradient(ellipse 22% 38% at 18% 30%, #8E3A44 60%, transparent 62%), radial-gradient(ellipse 18% 34% at 52% 72%, #8E3A44 60%, transparent 62%), radial-gradient(ellipse 20% 36% at 86% 28%, #8E3A44 60%, transparent 62%)'
              }}
              aria-hidden="true"
            />
          </figure>

          {/* Right: torn card */}
          <div className="relative w-full max-w-[900px] justify-self-center lg:justify-self-start">
            {/* Kraft tape on the left edge */}
            <div className="absolute -left-[2.5%] top-[30%] w-[7%] h-[24%] bg-[#BF9C74] rotate-[2deg] z-10 shadow-[0_1px_2px_rgba(60,30,20,0.2)]" aria-hidden="true" />
            {/* Paper clip on the top-right edge */}
            <svg viewBox="0 0 40 100" className="absolute -top-[5%] right-[3%] w-[clamp(22px,2.4vw,40px)] z-10" aria-hidden="true">
              <path d="M14 72 V20 a8 8 0 0 1 16 0 V80 a12 12 0 0 1 -24 0 V30" fill="none" stroke="#B08B62" strokeWidth="4" strokeLinecap="round" />
            </svg>

            <div className="[filter:drop-shadow(0_4px_8px_rgba(60,40,20,0.22))]">
              <div className="bg-[#F4F0E6] px-[7%] py-[clamp(26px,3vw,44px)]" style={{ clipPath: cardClip }}>
                <h2 className="m-0 font-serif italic font-semibold text-[#2E1A16] leading-[1.05] tracking-[-0.01em] text-[clamp(1.9rem,2.8vw,2.9rem)]">
                  {c.title}
                </h2>
                <p className="mt-3 m-0 text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium text-[#8E3A44]">{c.badge}</p>

                <div className="mt-[clamp(18px,2.2vw,30px)] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-[6%]">
                  <div className="space-y-[clamp(14px,1.6vw,22px)] min-w-0">
                    <div>
                      <h3 className={h3}>{c.problemHeading}</h3>
                      <p className={body}>{c.problem}</p>
                    </div>
                    <div>
                      <h3 className={h3}>{c.approachHeading}</h3>
                      <p className={body}>{c.approach}</p>
                    </div>
                  </div>

                  {/* Data callouts */}
                  <dl className="m-0 flex md:flex-col gap-6 md:gap-5 md:border-l md:border-[#3D2A24]/15 md:pl-[clamp(16px,2vw,28px)] md:self-center">
                    {c.stats.map((s) => (
                      <div key={s.value} className="min-w-0">
                        <dd className="m-0 font-serif font-semibold text-[#8E3A44] leading-none text-[clamp(1.9rem,2.8vw,2.8rem)] tabular-nums">
                          {s.value}
                        </dd>
                        <dt className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-[#3D2A24]/80">{s.label}</dt>
                        <dt className="text-[11px] italic font-serif text-[#3D2A24]/55">{s.source}</dt>
                      </div>
                    ))}
                  </dl>
                </div>

                <button
                  type="button"
                  onClick={openPaper}
                  className="group mt-[clamp(14px,1.6vw,22px)] inline-flex items-center gap-1.5 text-[clamp(0.88rem,0.98vw,1rem)] font-medium text-[#2E1A16] cursor-pointer"
                >
                  <span className="border-b border-[#2E1A16]/35 group-hover:border-[#8E3A44] group-hover:text-[#8E3A44] transition-colors">
                    {c.readPaper}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#8E3A44] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <p className="mt-[clamp(14px,1.8vw,24px)] pt-3 border-t border-dashed border-[#3D2A24]/20 m-0 font-serif italic text-[clamp(0.95rem,1.15vw,1.15rem)] text-[#2E1A16]/75">
                  {c.outro}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CertificateViewer cert={paper} onClose={() => setPaper(null)} />
    </section>
  );
};
