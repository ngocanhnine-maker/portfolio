import React, { useState } from 'react';
import { PageId } from '../types';
import { getEducationData } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import { CertificateViewer, CertificateModalData } from './CertificateViewer';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface EducationPageProps {
  onNavigate?: (page: PageId) => void;
}

export const EducationPage: React.FC<EducationPageProps> = ({ onNavigate }) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const educationData = getEducationData(language);

  const [selectedCert, setSelectedCert] = useState<CertificateModalData | null>(null);

  return (
    <section
      id="education"
      className="w-full min-h-[calc(100vh-3.5rem)] lg:min-h-screen bg-[#F2EBDD] text-[#292929] border-b border-[#292929]/10 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 sm:py-16 md:py-20 select-none relative"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto w-full">
        {/* Split Editorial Layout (Desktop 2-column spread, Mobile stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          
          {/* LEFT COLUMN: sticky rail — school identity + headline results */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20 xl:top-24 lg:self-start">
            <div className="bg-[#F8F6F1] border border-[#292929]/12 rounded-xs p-6 sm:p-8 space-y-6 shadow-[0_2px_12px_rgba(0,0,0,0.025)]">
              <div className="space-y-3">
                <span className="text-xs font-mono text-[#676749] uppercase tracking-widest block font-medium">
                  {t.education.sectionNum}
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-[2.1rem] font-bold text-[#292929] tracking-tight leading-[1.2]">
                  {educationData.institution}
                </h1>
              </div>

              {/* Academic Context Metadata */}
              <div className="pt-4 border-t border-[#292929]/10 space-y-2 text-sm sm:text-[14.5px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#676749]">{t.education.focus}</span>
                  <span className="font-semibold text-[#292929]">{educationData.specialization}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#676749]">{t.education.location}</span>
                  <span className="text-[#292929]">{educationData.location}</span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#292929]/8">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#676749]">{t.education.period}</span>
                  <span className="font-mono text-xs text-[#292929] font-medium">{educationData.period}</span>
                </div>
              </div>
            </div>

            {/* Academic GPA — moved here from the right column so each figure
                lives in exactly one place. Stacked vertically to give the rail
                real height; keeps the deeper ground + olive accent. */}
            <div className="bg-[#ECE5D5] border border-[#292929]/12 border-l-[3px] border-l-[#5E6044] rounded-xs p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.025)]">
              <div className="pb-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#676749] font-medium">
                    {t.education.academicPerformance}
                  </span>
                  <span className="text-[11px] font-mono text-[#676749]/80">
                    {t.education.scale}
                  </span>
                </div>
                <div className="mt-2 h-0.5 w-8 rounded-full bg-[#5E6044]" />
              </div>

              <dl className="mt-1 divide-y divide-[#292929]/10">
                {educationData.gpa.map((item, idx) => (
                  <div key={idx} className="flex items-baseline justify-between gap-3 py-4">
                    <dt className="text-[11px] font-mono uppercase tracking-wider text-[#676749]">
                      {item.grade}
                    </dt>
                    <dd className="flex shrink-0 items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight leading-none text-[#5E6044]">
                        {item.score}
                      </span>
                      <span className="text-[11px] font-mono text-[#676749]">/{item.scale}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* RIGHT COLUMN: verified & external records only (test records +
              credential previews). GPA now lives in the left rail. */}
          <div className="lg:col-span-7 space-y-6">

            {/* Standardized Tests & Credentials */}
            <div className="bg-[#F8F6F1] border border-[#292929]/12 rounded-xs p-5 sm:p-7 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.025)]">
              <div className="border-b border-[#292929]/10 pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#676749] font-medium block">
                  {t.education.standardizedTests}
                </span>
                <div className="mt-2 h-0.5 w-8 rounded-full bg-[#5E6044]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4 lg:gap-5 pt-1">
                {educationData.standardizedTests.map((test) => {
                  // Single-character scores ("A") read far lighter than "1520";
                  // bump them ~1.3x so the three columns carry equal weight.
                  const isCompactScore = test.score.replace(/\s/g, '').length <= 1;
                  return (
                  <div
                    key={test.id}
                    className="space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5 sm:min-h-[8.5rem]">
                      <h2
                        className="text-sm font-semibold text-[#292929] tracking-tight"
                        style={{ textWrap: 'balance' }}
                      >
                        {test.test}
                      </h2>
                      <div
                        className={`font-bold font-mono text-[#292929] tracking-tight leading-none ${
                          isCompactScore ? 'text-[1.95rem] sm:text-[2.4rem]' : 'text-2xl sm:text-3xl'
                        }`}
                      >
                        {test.score}
                      </div>
                      <p
                        className="text-[11.5px] text-[#292929]/70 leading-relaxed font-normal"
                        style={{ textWrap: 'balance' }}
                      >
                        {test.descriptor}
                      </p>
                    </div>

                    <div className="pt-2 space-y-1 border-t border-[#292929]/10 mt-auto">
                      <div className="font-mono text-[11px] text-[#676749]">
                        {test.date}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCert({
                            title: `${test.test} ${isVi ? 'Báo cáo điểm số' : 'Score Report'}`,
                            test: test.test,
                            score: test.score,
                            date: test.date,
                            descriptor: test.descriptor,
                            pdfUrl: test.pdfUrl,
                          })
                        }
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[#676749] hover:text-[#292929] cursor-pointer transition-colors pt-0.5"
                        id={`view-cert-${test.id}`}
                      >
                        <span>{t.education.viewCert}</span>
                        <ArrowUpRight className="w-3 h-3 text-[#5E6044]" />
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Card 3: Verified Credentials Preview */}
            <div className="bg-[#F8F6F1] border border-[#292929]/12 rounded-xs p-5 sm:p-7 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.025)]">
              <div className="border-b border-[#292929]/10 pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#676749] font-medium block">
                  {t.education.credentialsPreview}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-1">
                {educationData.standardizedTests.map((test) => (
                  <button
                    key={`preview-${test.id}`}
                    type="button"
                    onClick={() =>
                      setSelectedCert({
                        title: `${test.test} ${isVi ? 'Báo cáo điểm số' : 'Score Report'}`,
                        test: test.test,
                        score: test.score,
                        date: test.date,
                        descriptor: test.descriptor,
                        pdfUrl: test.pdfUrl,
                      })
                    }
                    className="group relative text-left bg-[#FCFBF9] border border-[#292929]/12 hover:border-[#676749]/50 hover:shadow-xs transition-all duration-200 rounded-xs overflow-hidden cursor-pointer flex flex-col"
                    title={`Click to view ${test.test} Certificate`}
                  >
                    {/* Thumbnail Image Frame */}
                    <div className="w-full aspect-[1/1.34] bg-[#ECE5D5] overflow-hidden relative">
                      {test.previewImage ? (
                        <img
                          src={test.previewImage}
                          alt={`${test.test} Document Preview`}
                          className="w-full h-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-2 text-center text-[#676749] text-[10px] font-mono">
                          Document Ready
                        </div>
                      )}
                      
                      {/* Subtle hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-200 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#292929]/90 text-[#F2EBDD] text-[9px] font-mono px-1.5 py-0.5 rounded-xs flex items-center gap-0.5 shadow-xs">
                          <span>{isVi ? 'Xem' : 'View'}</span>
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>

                    {/* Compact Caption Bar */}
                    <div className="px-2 py-1.5 bg-[#F8F6F1] border-t border-[#292929]/10 flex items-center justify-between text-[10px] font-mono text-[#676749]">
                      <span className="truncate font-medium text-[#292929]">{test.test}</span>
                      <span className="shrink-0 text-[#676749]">({test.score})</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Section Navigation */}
        {onNavigate && (
          <div className="mt-10 sm:mt-12 pt-6 border-t border-[#292929]/12 flex justify-between items-center text-xs sm:text-sm font-mono">
            <button
              onClick={() => onNavigate('honors')}
              className="group inline-flex items-center gap-2 text-[#676749] hover:text-[#292929] cursor-pointer transition-colors"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
              <span>{t.education.prevSection}</span>
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className="group inline-flex items-center gap-2 text-[#292929] hover:text-[#676749] cursor-pointer transition-colors font-medium"
            >
              <span>{t.education.nextSection}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        )}
      </div>

      <CertificateViewer cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  );
};
