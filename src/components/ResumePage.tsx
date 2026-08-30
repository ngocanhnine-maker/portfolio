import React, { useState } from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface ResumePageProps {
  onNavigate: (page: PageId) => void;
  onOpenCaseStudy?: (projectId: string) => void;
}

export const ResumePage: React.FC<ResumePageProps> = () => {
  const [copied, setCopied] = useState(false);
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="resume" className="w-full bg-[#F2EBDD] text-[#292929] border-b border-[#292929]/10">
      <div className="max-w-4xl mx-auto py-12 md:py-20 px-5 sm:px-8 md:px-12 space-y-10">
        {/* Title & Email CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#292929]/10 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#676749] uppercase tracking-wider">
              {t.resume.sectionNum}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#292929] tracking-tight">
              {t.resume.title}
            </h1>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-[#292929] text-[#F2EBDD] hover:bg-[#404040] text-xs font-mono rounded-xs transition-colors flex items-center gap-2 cursor-pointer w-fit font-medium"
            id="resume-copy-email-btn"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
            <span>{copied ? t.resume.copiedEmail : t.resume.copyEmail}</span>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education & Experience */}
          <div className="space-y-6">
            <div className="space-y-2.5">
              <h2 className="text-xs font-mono text-[#676749] uppercase tracking-wider font-medium">
                {t.resume.education}
              </h2>
              <div className="p-5 bg-[#F8F6F1] border border-[#292929]/10 rounded-xs space-y-2 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-bold text-[#292929] text-sm sm:text-base">
                    {isVi ? 'THPT Chuyên Hà Nội – Amsterdam' : 'Hanoi–Amsterdam High School for the Gifted'}
                  </h3>
                  <span className="text-xs font-mono text-[#676749] shrink-0">2024 – 2027</span>
                </div>
                <p className="text-xs text-[#292929]/80">
                  {isVi ? 'Chuyên ngành: Hóa học' : 'Major Specialization: Chemistry'}
                </p>
                <div className="text-[11px] font-mono text-[#676749] pt-1 border-t border-[#292929]/10 space-y-0.5">
                  <div>{isVi ? 'ĐTB: Lớp 10 (9.6) · Lớp 11 (9.8)' : 'GPA: Grade 10 (9.6) · Grade 11 (9.8)'}</div>
                  <div>SAT 1520 · IELTS 7.5 · A-Level Math (A)</div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <h2 className="text-xs font-mono text-[#676749] uppercase tracking-wider font-medium">
                {t.resume.experience}
              </h2>
              <div className="p-5 bg-[#F8F6F1] border border-[#292929]/10 rounded-xs space-y-1 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[#292929]">
                    {isVi ? 'Thực tập sinh & Cố vấn Chiến lược' : 'Lead Strategist / Builder'}
                  </h3>
                  <span className="text-xs font-mono text-[#676749]">2025 – 2026</span>
                </div>
                <p className="text-xs text-[#292929]/75">
                  {isVi ? 'Phân tích dữ liệu, nghiên cứu kinh tế & dự án' : 'Collaborative Engineering & Operations'}
                </p>
              </div>
            </div>
          </div>

          {/* Skills Matrix */}
          <div className="space-y-6">
            <div className="space-y-2.5">
              <h2 className="text-xs font-mono text-[#676749] uppercase tracking-wider font-medium">
                {t.resume.skillsMatrix}
              </h2>
              <div className="p-5 bg-[#F8F6F1] border border-[#292929]/10 rounded-xs space-y-4 text-xs shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                <div>
                  <span className="font-mono text-[#676749] block font-semibold uppercase">
                    {t.resume.techDev}
                  </span>
                  <p className="text-[#292929]/85 mt-1">TypeScript, React, Python, SQL, Git, Vite</p>
                </div>
                <div>
                  <span className="font-mono text-[#676749] block font-semibold uppercase">
                    {t.resume.methodsData}
                  </span>
                  <p className="text-[#292929]/85 mt-1">
                    {isVi ? 'Mô hình hóa định lượng, Phân tích dữ liệu, Chiến lược' : 'Quantitative Modeling, Prototyping, Telemetry, Strategy'}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[#676749] block font-semibold uppercase">
                    {t.resume.languages}
                  </span>
                  <p className="text-[#292929]/85 mt-1">
                    {isVi ? 'Tiếng Anh (Thành thạo), Tiếng Việt (Bản ngữ)' : 'English (Professional), Vietnamese (Native)'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
