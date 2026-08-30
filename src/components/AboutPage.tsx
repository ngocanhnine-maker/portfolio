import React from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface AboutPageProps {
  onNavigate?: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <section
      id="about"
      className="w-full min-h-[calc(100vh-3.5rem)] lg:min-h-screen bg-[#F2EBDD] text-[#292929] border-b border-[#292929]/10 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 lg:py-16 xl:py-20 select-none relative overflow-hidden"
    >
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center relative z-10">
        {/* Left Side: Large, Prominent Portrait Image */}
        <div className="lg:col-span-5 xl:col-span-5 w-full flex justify-center lg:justify-start">
          <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/5] xl:aspect-[3/4] overflow-hidden bg-[#E2DBCB] border border-[#292929]/20 shadow-xs">
            <img
              src="/profile/dsc-4647-opt.jpg"
              alt={isVi ? 'Trần Ngọc Ánh' : 'Tran Ngoc Anh'}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top sm:object-center contrast-[1.02]"
            />
          </div>
        </div>

        {/* Right Side: Clean, Refined Editorial Space for About Content */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-8 py-2">
          {/* Header & Title */}
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-mono text-[#676749] uppercase tracking-widest block font-medium">
              {t.about.sectionNum}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] font-bold tracking-tight text-[#292929] leading-[1.06]">
              {isVi ? 'Trần Ngọc Ánh' : 'Tran Ngoc Anh'}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#292929]/75 font-normal leading-relaxed max-w-2xl pt-1 font-mono">
              {t.about.introSubtitle}
            </p>
          </div>

          {/* Clean Boundary Divider */}
          <div className="pt-4 border-t border-[#292929]/15 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#676749] font-semibold">
                {t.about.profileHeader}
              </span>
              <span className="text-xs font-mono text-[#676749]/70 hidden sm:block">
                {t.about.profileMeta}
              </span>
            </div>

            {/* Clean, minimalist placeholder container ready for personal bio text */}
            <div className="min-h-[140px] rounded-xs border border-dashed border-[#292929]/20 bg-[#ECE5D5]/40 p-6 flex flex-col justify-center items-center text-center space-y-1.5">
              <span className="text-xs font-mono text-[#676749] uppercase tracking-wider font-medium">
                {isVi ? 'KHÔNG GIAN NỘI DUNG GIỚI THIỆU' : 'ABOUT ME CONTENT AREA'}
              </span>
              <p className="text-xs font-mono text-[#292929]/50 max-w-md">
                {isVi
                  ? 'Khu vực sẵn sàng để cập nhật thông tin giới thiệu cá nhân và định hướng học thuật.'
                  : 'Clean canvas ready for your custom personal introduction and academic statement.'}
              </p>
            </div>
          </div>

          {/* Navigation to next section */}
          {onNavigate && (
            <div className="pt-4 border-t border-[#292929]/15 flex justify-end">
              <button
                onClick={() => onNavigate('honors')}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#292929] hover:text-[#676749] cursor-pointer transition-colors font-medium"
              >
                <span>{t.about.nextSection}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
