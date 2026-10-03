import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, GraduationCap, Sigma } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getEducationData } from '../data/portfolioData';
import { TRANSLATIONS } from '../data/translations';
import { CertificateViewer, CertificateModalData } from './CertificateViewer';

type Row = { label: string; title: string; detail: string; onOpen?: () => void };

const LABELS = {
  en: {
    title: 'Academic Snapshot',
    education: 'Education',
    tests: 'Standardized Tests',
    performance: 'Academic Performance',
    gpa: 'GPA'
  },
  vi: {
    title: 'Tóm tắt Học thuật',
    education: 'Học vấn',
    tests: 'Chứng chỉ Chuẩn hóa',
    performance: 'Kết quả Học tập',
    gpa: 'GPA'
  }
};

const PERFORMANCE_ICONS = [BookOpen, GraduationCap, Sigma];

const Stripes: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={`absolute w-[clamp(44px,4vw,76px)] h-[clamp(36px,3.4vw,58px)] ${className}`}
    style={{ background: 'repeating-linear-gradient(90deg, #D8B98C 0 4px, #C9A574 4px 6px, #E2C79E 6px 9px)' }}
    aria-hidden="true"
  />
);

const scriptHeading = 'm-0 font-serif italic font-semibold leading-none tracking-[-0.01em] text-[#2E1A16]';

const Timeline: React.FC<{ heading: string; rows: Row[]; openLabel?: string }> = ({ heading, rows, openLabel }) => (
  <div className="min-w-0">
    <h3 className={`${scriptHeading} text-center text-[clamp(1.6rem,2.6vw,2.6rem)] mb-6 lg:mb-8`}>{heading}</h3>
    <ul className="m-0 p-0 list-none space-y-5 lg:space-y-7">
      {rows.map((row) => (
        <li key={row.title} className="grid grid-cols-[minmax(6rem,34%)_1fr] gap-x-5 lg:gap-x-7 items-baseline">
          <span className="font-serif italic font-semibold text-[clamp(1rem,1.35vw,1.4rem)] text-[#2E1A16] leading-tight">
            {row.label}
          </span>
          {row.onOpen ? (
            <button
              type="button"
              onClick={row.onOpen}
              title={openLabel}
              className="group min-w-0 text-left cursor-pointer rounded-xs -mx-1.5 px-1.5 -my-1 py-1 hover:bg-[#5E6047]/8 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#5E6047] transition-colors"
            >
              <span className="flex items-center gap-1.5 text-[clamp(0.9rem,1.05vw,1.08rem)] font-medium text-[#3D2A24] leading-snug">
                <span className="border-b border-[#3D2A24]/30 group-hover:border-[#3D2A24] transition-colors">{row.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#5E6047] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="block text-[clamp(0.82rem,0.95vw,0.98rem)] text-[#3D2A24]/70 leading-snug mt-0.5">{row.detail}</span>
            </button>
          ) : (
            <span className="min-w-0">
              <span className="block text-[clamp(0.9rem,1.05vw,1.08rem)] font-medium text-[#3D2A24] leading-snug">{row.title}</span>
              <span className="block text-[clamp(0.82rem,0.95vw,0.98rem)] text-[#3D2A24]/70 leading-snug mt-0.5">{row.detail}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

// Ten dots for a score out of 10; the last dot fills fractionally (9.6 → 0.6 of the tenth).
const ScoreDots: React.FC<{ score: number; scale: number }> = ({ score, scale }) => (
  <div className="flex items-center gap-[clamp(4px,0.6vw,10px)]" aria-hidden="true">
    {Array.from({ length: scale }).map((_, i) => {
      const fill = Math.max(0, Math.min(1, score - i));
      return (
        <span
          key={i}
          className="block w-[clamp(12px,1.35vw,22px)] aspect-square rounded-full"
          style={{
            background: `linear-gradient(90deg, #5E6047 ${fill * 100}%, #E6CFA6 ${fill * 100}%)`
          }}
        />
      );
    })}
  </div>
);

/** Academic Snapshot: the Education section's facts on one ruled notebook sheet. */
export const AcademicSnapshot: React.FC = () => {
  const { language, isVi } = useLanguage();
  const edu = getEducationData(language);
  const l = isVi ? LABELS.vi : LABELS.en;
  const [selectedCert, setSelectedCert] = useState<CertificateModalData | null>(null);

  const educationRows: Row[] = [
    {
      label: edu.period.replace(/\s*—\s*/, ' – '),
      title: edu.institution,
      detail: `${edu.specialization} · ${edu.location}`
    },
    ...edu.gpa
      .filter((g) => g !== edu.gpa[edu.gpa.length - 1])
      .map((g) => ({ label: g.grade, title: `${l.gpa} ${g.score} / ${g.scale}`, detail: TRANSLATIONS[language].education.scale }))
  ];

  const testRows: Row[] = edu.standardizedTests.map((t) => ({
    label: t.date,
    title: `${t.test} · ${t.score}`,
    detail: t.descriptor,
    onOpen: t.pdfUrl
      ? () =>
          setSelectedCert({
            title: t.test,
            test: t.test,
            score: t.score,
            date: t.date,
            descriptor: t.descriptor,
            pdfUrl: t.pdfUrl
          })
      : undefined
  }));

  return (
    <section
      id="snapshot"
      className="relative w-full min-h-[calc(100svh-3.5rem)] flex items-center justify-center bg-[#C9A97E] bg-[url('/landing/collage.jpg')] bg-cover bg-[position:4%_50%] lg:bg-center px-3 py-6 sm:px-6 sm:py-8 lg:px-[2.5%] lg:py-[2.5%] overflow-hidden select-none"
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="as-speckle">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="7" />
            <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.35 -0.08" />
          </filter>
          <filter id="as-board-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="14" />
            <feColorMatrix values="0 0 0 0 0.15  0 0 0 0 0.16  0 0 0 0 0.1  0 0 0 0.18 0" />
          </filter>
        </defs>
      </svg>


      {/* Maroon board */}
      <div className="relative w-full max-w-[1600px] min-h-[min(calc(100svh-3.5rem-5vw),860px)] bg-[#E9E7E3] shadow-[0_6px_22px_rgba(40,25,10,0.45)] p-[clamp(12px,2.2%,34px)] flex">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <rect width="100%" height="100%" filter="url(#as-board-grain)" />
        </svg>
        <div className="absolute top-0 bottom-0 left-[5.5%] w-[3px] bg-[#A3A07A]/80" aria-hidden="true" />
        <Stripes className="-top-[3px] right-[2.5%] z-10" />
        <Stripes className="-bottom-[3px] right-[2.5%] z-10" />

        {/* Ruled notebook sheet */}
        <div
          className="relative flex-1 bg-[#F4F0E6] shadow-[0_3px_10px_rgba(40,10,10,0.22)] pl-[clamp(48px,7.5%,120px)] pr-[clamp(18px,5%,90px)] py-[clamp(28px,4.5%,64px)] flex flex-col justify-center"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, transparent 0 calc(2.6rem - 1px), rgba(150,120,100,0.18) calc(2.6rem - 1px) 2.6rem)'
          }}
        >
          {/* Binder holes */}
          <div className="absolute left-[clamp(14px,2.2%,34px)] top-[4%] bottom-[4%] flex flex-col justify-between" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="block w-[clamp(9px,0.95vw,16px)] h-[clamp(18px,1.9vw,32px)] rounded-full bg-[#CFCBC2]" />
            ))}
          </div>

          <h2 className={`${scriptHeading} text-center text-[clamp(2.2rem,4.4vw,4.4rem)] mb-8 lg:mb-10`}>{l.title}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[6%]">
            <Timeline heading={l.education} rows={educationRows} />
            <Timeline heading={l.tests} rows={testRows} openLabel={TRANSLATIONS[language].education.viewReport} />
          </div>

          <h3 className={`${scriptHeading} text-center text-[clamp(1.6rem,2.6vw,2.6rem)] mt-10 lg:mt-12 mb-6`}>{l.performance}</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[4%]">
            {edu.gpa.map((g, i) => {
              const Icon = PERFORMANCE_ICONS[i % PERFORMANCE_ICONS.length];
              return (
                <div key={g.grade} className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <span className="font-serif italic font-semibold text-[clamp(1.1rem,1.5vw,1.55rem)] text-[#2E1A16] leading-none">
                      {g.grade}
                    </span>
                    <span className="font-serif italic font-semibold text-[clamp(1.1rem,1.5vw,1.55rem)] text-[#2E1A16] leading-none">
                      {g.score}/{g.scale}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon className="w-[clamp(22px,2vw,32px)] h-[clamp(22px,2vw,32px)] text-[#2E1A16] shrink-0" strokeWidth={1.3} />
                    <ScoreDots score={Number(g.score)} scale={Number(g.scale)} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CertificateViewer cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  );
};
