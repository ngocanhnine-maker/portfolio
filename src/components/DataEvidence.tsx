import React, { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { seeded } from './ScrapbookBackdrop';
import { CertificateViewer, CertificateModalData } from './CertificateViewer';

const PAPER_URL = '/papers/green-credit-banking-2026.pdf';
const PREVIEW = '/papers/green-credit-title.jpg';

const CONTENT = {
  en: {
    title: 'Research',
    paperName: 'Green Credit & Bank Performance',
    imageAlt: 'First page of the paper "Green Credit and Bank Financial Performance", Journal of Management Research, 2026',
    caption: 'Journal of Management Research · Vol. 18, No. 2 · 2026',
    questionHeading: 'The Question',
    question: 'Can green lending improve bank performance?',
    studyHeading: 'The Study',
    study: ['8 Vietnamese banks', '2022–2024', '24 observations', 'Pooled OLS'],
    findingHeading: 'The Finding',
    finding:
      'Green Credit Ratio showed a positive and statistically significant relationship with ROA, while the absolute volume of green credit was not statistically significant.',
    readPaper: 'Read the paper',
    viewerTitle: 'Green Credit and Bank Financial Performance'
  },
  vi: {
    title: 'Nghiên cứu',
    paperName: 'Tín dụng xanh & Hiệu quả ngân hàng',
    imageAlt: 'Trang đầu bài báo "Green Credit and Bank Financial Performance", Journal of Management Research, 2026',
    caption: 'Journal of Management Research · Tập 18, Số 2 · 2026',
    questionHeading: 'Câu hỏi',
    question: 'Tín dụng xanh có giúp cải thiện hiệu quả hoạt động của ngân hàng?',
    studyHeading: 'Nghiên cứu',
    study: ['8 ngân hàng Việt Nam', '2022–2024', '24 quan sát', 'Pooled OLS'],
    findingHeading: 'Kết quả',
    finding:
      'Tỷ lệ tín dụng xanh có quan hệ dương và có ý nghĩa thống kê với ROA, trong khi quy mô tuyệt đối của tín dụng xanh không có ý nghĩa thống kê.',
    readPaper: 'Đọc bài báo',
    viewerTitle: 'Green Credit and Bank Financial Performance'
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

// Three ribbon shapes, as in the template: square, arrow, notched.
const RIBBONS = [
  'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  'polygon(7% 0, 100% 0, 100% 100%, 7% 100%, 0 50%)',
  'polygon(0 0, 100% 0, 96% 25%, 100% 50%, 96% 75%, 100% 100%, 0 100%, 4% 75%, 0 50%, 4% 25%)'
];

const Ribbon: React.FC<{ shape: number; children: React.ReactNode }> = ({ shape, children }) => (
  <h3
    className="inline-block m-0 bg-[#8D6748] text-[#F4F0E6] font-serif italic font-semibold leading-none text-[clamp(1.2rem,1.7vw,1.7rem)] px-6 py-2"
    style={{ clipPath: RIBBONS[shape] }}
  >
    {children}
  </h3>
);

/** When Data Became Evidence: the green-credit paper on the left, question / study / finding on the right. */
export const DataEvidence: React.FC = () => {
  const { isVi } = useLanguage();
  const c = isVi ? CONTENT.vi : CONTENT.en;
  const bannerClip = useMemo(() => tornBottom(47), []);
  const [paper, setPaper] = useState<CertificateModalData | null>(null);

  const openPaper = () =>
    setPaper({ title: c.viewerTitle, test: 'Journal of Management Research', score: 'Vol. 18, No. 2', date: '2026', pdfUrl: PAPER_URL });

  const body = 'mt-3 m-0 text-[clamp(0.92rem,1.05vw,1.05rem)] leading-[1.7] text-[#3D2A24]/90';

  return (
    <section
      id="green-credit"
      className="relative w-full min-h-[calc(100svh-3.5rem)] flex items-center justify-center bg-[#C9A97E] bg-[url('/landing/collage.jpg')] bg-cover bg-[position:4%_50%] lg:bg-center px-3 py-6 sm:px-6 sm:py-8 lg:px-[2.5%] lg:py-[2.5%] overflow-hidden select-none"
    >
      {/* Board */}
      <div className="relative w-full max-w-[1600px] min-h-[min(calc(100svh-3.5rem-5vw),860px)] bg-[#E9E7E3] shadow-[0_6px_22px_rgba(40,25,10,0.45)] p-[clamp(12px,2.2%,34px)] pl-[clamp(20px,6%,96px)] flex">
        <div className="absolute top-0 bottom-0 left-[3.2%] w-[3px] bg-[#8E3A44]/45" aria-hidden="true" />
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
          {/* Binder slots either side of the banner, as in the template */}
          <div className="hidden md:flex absolute top-[clamp(18px,2.6%,34px)] left-[4%] right-[4%] justify-between pointer-events-none" aria-hidden="true">
            <span className="flex gap-[1.2vw]">
              <span className="block w-[clamp(48px,6vw,110px)] h-[clamp(10px,1.1vw,18px)] rounded-[3px] bg-[#8E3A44]/80" />
              <span className="block w-[clamp(48px,6vw,110px)] h-[clamp(10px,1.1vw,18px)] rounded-[3px] bg-[#8E3A44]/80" />
            </span>
            <span className="flex gap-[1.2vw]">
              <span className="block w-[clamp(48px,6vw,110px)] h-[clamp(10px,1.1vw,18px)] rounded-[3px] bg-[#8E3A44]/80" />
              <span className="block w-[clamp(48px,6vw,110px)] h-[clamp(10px,1.1vw,18px)] rounded-[3px] bg-[#8E3A44]/80" />
            </span>
          </div>

          {/* Paper clip */}
          <svg viewBox="0 0 40 100" className="absolute -top-[4%] left-[14%] w-[clamp(22px,2.4vw,40px)] z-10" aria-hidden="true">
            <path d="M14 72 V20 a8 8 0 0 1 16 0 V80 a12 12 0 0 1 -24 0 V30" fill="none" stroke="#3A2620" strokeWidth="4" strokeLinecap="round" />
          </svg>

          {/* Torn title banner */}
          <div className="relative mx-auto w-full max-w-[760px] [filter:drop-shadow(0_3px_4px_rgba(60,40,20,0.2))]">
            <div className="bg-[#E8D4AE] px-6 pt-[clamp(18px,2.4vw,34px)] pb-[clamp(30px,3.6vw,52px)] text-center" style={{ clipPath: bannerClip }}>
              <h2 className="m-0 font-serif italic font-semibold text-[#2E1A16] leading-[1.05] tracking-[-0.01em] text-[clamp(2.1rem,3.8vw,3.8rem)]">
                {c.title}
              </h2>
            </div>
          </div>

          <div className="flex-1 mt-[clamp(20px,3vw,44px)] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-[6%] items-center">
            {/* Left: the paper, as a document laid in the journal */}
            <figure className="m-0 justify-self-center w-full max-w-[640px]">
              <button
                type="button"
                onClick={openPaper}
                aria-label={c.readPaper}
                className="group relative block w-full text-left cursor-pointer bg-[#FFFDF8] p-[2.5%] shadow-[0_6px_16px_rgba(60,40,20,0.28)] -rotate-[1deg] transition-transform hover:rotate-0"
              >
                <img src={PREVIEW} alt={c.imageAlt} className="block w-full h-auto" />
                {/* Page fades out, as if it continues below */}
                <span className="absolute left-[2.5%] right-[2.5%] bottom-[2.5%] h-[18%] bg-gradient-to-b from-transparent to-[#FFFDF8]" aria-hidden="true" />
                <span
                  className="absolute -top-[4%] left-1/2 -translate-x-1/2 rotate-[2deg] w-[24%] h-[clamp(20px,2.2vw,34px)] bg-[#DCCBA4]/80 shadow-[0_1px_2px_rgba(60,40,20,0.2)]"
                  aria-hidden="true"
                />
              </button>
              <figcaption className="mt-4 text-center font-serif italic text-[clamp(0.9rem,1.05vw,1.05rem)] text-[#3D2A24]/70">
                {c.caption}
              </figcaption>
            </figure>

            {/* Right: three short parts */}
            <div className="min-w-0 max-w-[36rem]">
              <p className="m-0 text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-[#8E3A44]">{c.paperName}</p>

              <div className="mt-[clamp(14px,1.8vw,24px)] space-y-[clamp(18px,2.4vw,32px)]">
                <div>
                  <Ribbon shape={0}>{c.questionHeading}</Ribbon>
                  <p className="mt-3 m-0 font-serif italic text-[clamp(1.15rem,1.5vw,1.5rem)] leading-snug text-[#2E1A16]">{c.question}</p>
                </div>
                <div>
                  <Ribbon shape={1}>{c.studyHeading}</Ribbon>
                  <p className="mt-3 m-0 flex flex-wrap gap-x-2.5 gap-y-1 font-mono text-[clamp(0.82rem,0.95vw,0.95rem)] text-[#2E1A16]">
                    {c.study.map((s, i) => (
                      <React.Fragment key={s}>
                        {i > 0 && <span className="text-[#8E3A44]" aria-hidden="true">·</span>}
                        <span>{s}</span>
                      </React.Fragment>
                    ))}
                  </p>
                </div>
                <div>
                  <Ribbon shape={2}>{c.findingHeading}</Ribbon>
                  <p className={body}>{c.finding}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={openPaper}
                className="group mt-[clamp(18px,2.2vw,28px)] inline-flex items-center gap-1.5 text-[clamp(0.88rem,0.98vw,1rem)] font-medium text-[#2E1A16] cursor-pointer"
              >
                <span className="border-b border-[#2E1A16]/35 group-hover:border-[#8E3A44] group-hover:text-[#8E3A44] transition-colors">{c.readPaper}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8E3A44] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <CertificateViewer cert={paper} onClose={() => setPaper(null)} />
    </section>
  );
};
