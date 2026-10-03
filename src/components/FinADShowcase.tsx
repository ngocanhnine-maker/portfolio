import React, { useMemo, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { seeded } from './ScrapbookBackdrop';

const SITE_URL = 'https://financial-statement-analysis-versio.vercel.app';
const VIDEO_URL = '/projects/finad-demo.mp4';
const THUMBNAIL = '/projects/finad-home.jpg';

const CONTENT = {
  en: {
    title: 'From Ledgers to Lines',
    subtitle: 'FinAD — Financial Analysis from PDF to Insight',
    intro:
      'FinAD started from a practical problem: reading and pulling figures out of financial-report PDFs takes hours, and typing them in by hand invites mistakes. I built it to turn Vietnamese financial statements into structured data, calculate the key ratios, and make trends easier to see.',
    visit: 'Visit FinAD',
    watch: 'Watch Demo',
    soon: 'Demo video coming soon',
    frameAlt: 'FinAD home page: financial analysis for Vietnamese company reports',
    features: [
      { name: 'Extract', body: 'Convert Vietnamese financial-report PDFs into structured financial statements.' },
      { name: 'Structure', body: 'Organise data into balance sheet, income statement and cash flow statement formats.' },
      { name: 'Analyse', body: 'Calculate key ratios such as ROA, ROE, D/E, current ratio, quick ratio, OCF and FCF.' },
      { name: 'Compare', body: 'Track trends across multiple years and highlight changes in performance.' },
      { name: 'Insight', body: 'Generate concise AI-assisted observations from the financial data.' }
    ],
    flow: ['PDF', 'Structured Data', 'Ratios', 'Trends', 'Insights'],
    outro:
      'What began as a workaround for messy financial reports became my first attempt at building a tool around a problem I kept encountering.'
  },
  vi: {
    title: 'Từ sổ cái đến từng dòng',
    subtitle: 'FinAD — Phân tích tài chính từ PDF đến nhận định',
    intro:
      'FinAD bắt đầu từ một vấn đề rất thực tế: việc đọc và trích xuất dữ liệu từ báo cáo tài chính PDF mất nhiều thời gian và dễ sai khi nhập thủ công. Tôi xây dựng FinAD để chuyển báo cáo tài chính Việt Nam thành dữ liệu có cấu trúc, tính toán các chỉ số chính và giúp người dùng nhìn thấy xu hướng rõ hơn.',
    visit: 'Truy cập FinAD',
    watch: 'Xem demo',
    soon: 'Video demo sắp ra mắt',
    frameAlt: 'Trang chủ FinAD: phân tích báo cáo tài chính doanh nghiệp Việt Nam',
    features: [
      { name: 'Trích xuất', body: 'Chuyển PDF báo cáo tài chính Việt Nam thành báo cáo có cấu trúc.' },
      { name: 'Cấu trúc', body: 'Sắp xếp dữ liệu theo bảng cân đối kế toán, báo cáo kết quả kinh doanh và lưu chuyển tiền tệ.' },
      { name: 'Phân tích', body: 'Tính các chỉ số chính như ROA, ROE, D/E, thanh toán hiện hành, thanh toán nhanh, OCF và FCF.' },
      { name: 'So sánh', body: 'Theo dõi xu hướng qua nhiều năm và làm nổi bật thay đổi trong kết quả hoạt động.' },
      { name: 'Nhận định', body: 'Tạo các nhận xét ngắn gọn có hỗ trợ AI từ dữ liệu tài chính.' }
    ],
    flow: ['PDF', 'Dữ liệu có cấu trúc', 'Chỉ số', 'Xu hướng', 'Nhận định'],
    outro:
      'Điều bắt đầu như một cách xoay xở với những báo cáo tài chính lộn xộn đã trở thành lần đầu tôi thử xây một công cụ quanh một vấn đề mình liên tục gặp.'
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

const isEmbed = (url: string) => /youtube\.com|youtu\.be|vimeo\.com/.test(url);

/** FinAD project showcase: demo video / screenshot, links, five features and the pipeline. */
export const FinADShowcase: React.FC = () => {
  const { isVi } = useLanguage();
  const c = isVi ? CONTENT.vi : CONTENT.en;
  const bannerClip = useMemo(() => tornBottom(31), []);
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(VIDEO_URL);

  const cta =
    'group inline-flex items-center gap-2 px-4 py-2 border border-[#2E1A16]/70 text-[13px] font-medium tracking-[0.02em] text-[#2E1A16] transition-colors';

  return (
    <section
      id="finad"
      className="relative w-full min-h-[calc(100svh-3.5rem)] flex items-center justify-center bg-[#C9A97E] bg-[url('/landing/collage.jpg')] bg-cover bg-[position:4%_50%] lg:bg-center px-3 py-6 sm:px-6 sm:py-8 lg:px-[2.5%] lg:py-[2.5%] overflow-hidden select-none"
    >
      {/* Board */}
      <div className="relative w-full max-w-[1600px] min-h-[min(calc(100svh-3.5rem-5vw),860px)] bg-[#E9E7E3] shadow-[0_6px_22px_rgba(40,25,10,0.45)] p-[clamp(12px,2.2%,34px)] flex">
        <div className="absolute top-0 bottom-0 left-[3.2%] w-[3px] bg-[#8E3A44]/45" aria-hidden="true" />
        <Stripes className="-top-[3px] right-[2.5%] z-10" />
        <Stripes className="-bottom-[3px] right-[2.5%] z-10" />

        {/* Sheet */}
        <div className="relative flex-1 bg-[#F4F0E6] shadow-[0_3px_10px_rgba(40,10,10,0.18)] px-[clamp(18px,4.5%,80px)] pt-[clamp(14px,1.6%,24px)] pb-[clamp(22px,2.6%,40px)] flex flex-col">
          {/* Paper clip on the left edge */}
          <svg viewBox="0 0 40 100" className="absolute top-[30%] -left-[1.2%] w-[clamp(20px,2.2vw,36px)] -rotate-[55deg] z-10" aria-hidden="true">
            <path d="M14 72 V20 a8 8 0 0 1 16 0 V80 a12 12 0 0 1 -24 0 V30" fill="none" stroke="#B08B62" strokeWidth="4" strokeLinecap="round" />
          </svg>

          {/* Torn title banner with tape */}
          <div className="relative mx-auto w-full max-w-[820px]">
            <div
              className="absolute -top-[clamp(10px,1.4vw,22px)] left-1/2 -translate-x-1/2 w-[26%] h-[clamp(26px,2.8vw,44px)] bg-[#8E3A44] z-10"
              style={{ clipPath: 'polygon(0 0,100% 0,97% 20%,100% 40%,97% 60%,100% 80%,97% 100%,0 100%,3% 80%,0 60%,3% 40%,0 20%)' }}
              aria-hidden="true"
            />
            <div className="[filter:drop-shadow(0_3px_4px_rgba(60,40,20,0.2))]">
              <div className="bg-[#E8D4AE] px-6 pt-[clamp(22px,2.6vw,38px)] pb-[clamp(26px,3vw,44px)] text-center" style={{ clipPath: bannerClip }}>
                <h2 className="m-0 font-serif italic font-semibold text-[#2E1A16] leading-[1.05] tracking-[-0.01em] text-[clamp(1.9rem,3.4vw,3.4rem)]">
                  {c.title}
                </h2>
                <p className="mt-2 m-0 text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium text-[#3D2A24]/80">{c.subtitle}</p>
              </div>
            </div>
          </div>

          <p className="mt-[clamp(14px,1.6vw,22px)] mx-auto max-w-[78ch] text-center text-[clamp(0.88rem,0.98vw,1rem)] leading-[1.7] text-[#3D2A24]/90">
            {c.intro}
          </p>

          <div className="flex-1 mt-[clamp(18px,2.2vw,32px)] grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-[5%] items-start">
            {/* Media */}
            <div className="min-w-0">
              <div className="relative bg-[#2E1A16] p-[1.2%] shadow-[0_6px_16px_rgba(60,40,20,0.28)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  {hasVideo && playing ? (
                    isEmbed(VIDEO_URL) ? (
                      <iframe src={VIDEO_URL} title="FinAD demo" allow="autoplay; fullscreen" allowFullScreen className="absolute inset-0 w-full h-full" />
                    ) : (
                      <video src={VIDEO_URL} poster={THUMBNAIL} aria-label={c.watch} controls autoPlay playsInline preload="metadata" className="absolute inset-0 w-full h-full object-contain" />
                    )
                  ) : (
                    <>
                      <img src={THUMBNAIL} alt={c.frameAlt} className="absolute inset-0 w-full h-full object-cover object-top" />
                      <button
                        type="button"
                        onClick={() => hasVideo && setPlaying(true)}
                        disabled={!hasVideo}
                        aria-label={hasVideo ? c.watch : c.soon}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 enabled:hover:bg-black/15 transition-colors enabled:cursor-pointer disabled:cursor-default"
                      >
                        <span className="flex items-center justify-center w-[clamp(52px,5vw,76px)] aspect-square rounded-full bg-[#F4F0E6]/95 shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                          <Play className="w-[42%] h-[42%] text-[#2E1A16] translate-x-[6%]" fill="currentColor" />
                        </span>
                        {!hasVideo && (
                          <span className="px-2.5 py-1 bg-[#F4F0E6]/90 text-[11px] uppercase tracking-[0.14em] text-[#2E1A16]">{c.soon}</span>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <a href={SITE_URL} target="_blank" rel="noreferrer" className={`${cta} bg-[#2E1A16] text-[#F4F0E6] hover:bg-[#8E3A44] hover:border-[#8E3A44]`}>
                  {c.visit}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  disabled={!hasVideo}
                  title={hasVideo ? undefined : c.soon}
                  className={`${cta} enabled:hover:bg-[#2E1A16] enabled:hover:text-[#F4F0E6] enabled:cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed`}
                >
                  {c.watch}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-enabled:group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Features */}
            <ol className="m-0 p-0 list-none min-w-0 divide-y divide-[#3D2A24]/12 border-y border-[#3D2A24]/12">
              {c.features.map((f, i) => (
                <li key={f.name} className="grid grid-cols-[2.2rem_1fr] gap-x-3 py-[clamp(8px,1vw,13px)]">
                  <span className="font-mono text-[12px] text-[#8E3A44] pt-1 tabular-nums">0{i + 1}</span>
                  <div className="min-w-0">
                    <h3 className="m-0 font-serif italic font-semibold text-[#2E1A16] leading-none text-[clamp(1.1rem,1.35vw,1.35rem)]">{f.name}</h3>
                    <p className="mt-1 m-0 text-[clamp(0.84rem,0.92vw,0.95rem)] leading-[1.55] text-[#3D2A24]/85">{f.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Pipeline */}
          <div className="mt-[clamp(16px,2vw,28px)] flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 font-mono text-[clamp(0.72rem,0.82vw,0.85rem)] text-[#2E1A16]">
            {c.flow.map((step, i) => (
              <React.Fragment key={step}>
                {i > 0 && <span className="text-[#8E3A44]" aria-hidden="true">→</span>}
                <span className="px-2.5 py-1 border border-[#2E1A16]/25 bg-[#EFE6D2]/60">{step}</span>
              </React.Fragment>
            ))}
          </div>

          <p className="mt-[clamp(14px,1.8vw,24px)] mx-auto max-w-[70ch] m-0 text-center font-serif italic text-[clamp(0.98rem,1.2vw,1.2rem)] text-[#2E1A16]/80">
            {c.outro}
          </p>
        </div>
      </div>
    </section>
  );
};
