import React from 'react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutPageProps {
  onNavigate?: (page: PageId) => void;
  showSubtitle?: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, showSubtitle = true }) => {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const hasCv = Boolean(PERSONAL_INFO.cvUrl.trim());

  return (
    <section
      id="about"
      className="w-full min-h-[calc(100vh-3.5rem)] lg:min-h-screen bg-[#F2EBDD] text-[#292929] border-b border-[#292929]/10 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 lg:py-16 xl:py-20 select-none relative overflow-hidden"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-stretch relative z-10">
        {/* Left Side: Large, Prominent Portrait Image */}
        <div className="lg:col-span-5 xl:col-span-5 w-full flex justify-center lg:justify-start">
          <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[520px] overflow-hidden rounded bg-[#E2DBCB] border border-[#292929]/20 shadow-xs">
            <img
              src="/profile/dsc-4647-opt.jpg"
              alt={isVi ? 'Trần Ngọc Anh' : 'Tran Ngoc Anh'}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top sm:object-center contrast-[1.02]"
            />
          </div>
        </div>

        {/* Right Side: About content */}
        <div className="flex flex-col space-y-6 lg:col-span-7 lg:justify-center lg:space-y-8 xl:col-span-7">
          {/* Header, subtitle & primary credential */}
          <div className="section-heading">
            <span className="text-xs sm:text-sm font-mono text-[#676749] uppercase tracking-widest block font-medium">
              {t.about.sectionNum}
            </span>

            <h1 className="section-h1 font-bold tracking-tight text-[#292929] lg:whitespace-nowrap">
              {isVi ? 'Trần Ngọc Anh' : 'Tran Ngoc Anh'}
            </h1>

            {showSubtitle && (
              <p className="max-w-2xl text-lg font-normal leading-relaxed text-[#4E503B] sm:text-xl">
                {t.about.introSubtitle}
              </p>
            )}

            {/* Primary credential — left-aligned, strengthened from the old
                right-floated muted line */}
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#4F513B] sm:text-sm">
              {t.about.profileMeta}
            </p>
          </div>

          {/* Single divider between header and bio */}
          <div className="pt-6 border-t border-[#292929]/15">
            <div className="space-y-4 max-w-[65ch] text-[16px] sm:text-[17px] font-normal leading-[1.6] text-[#292929]/85">
              {isVi ? (
                <>
                  <p>
                    Tôi thích cảm giác bắt đầu một điều mà mình chưa biết
                    cách làm. Những năm học chuyên Hóa khiến việc thử nghiệm,
                    quan sát rồi điều chỉnh trở thành một phản xạ. Tôi mang cách
                    tiếp cận đó ra ngoài phòng thí nghiệm — rõ nhất là khi đăng
                    ký một cuộc thi kinh tế dù chưa từng học lĩnh vực này bài bản,
                    chỉ để xem mình có thể hiểu một vấn đề hoàn toàn mới đến đâu.
                  </p>
                  <p>
                    Từ trải nghiệm ấy, tôi dần bị cuốn hút bởi những bài toán
                    trong kinh doanh, nơi một vấn đề có thể được nhìn từ nhiều góc
                    độ và hiếm khi chỉ có một lời giải duy nhất. Càng tìm hiểu
                    sâu, tôi càng hứng thú với cách dữ liệu và công nghệ giúp chúng
                    ta nhìn vấn đề rõ hơn, kiểm chứng các giả định và đưa ra
                    quyết định tốt hơn.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    I enjoy the feeling of starting something before I know how
                    to do it. Years of studying Chemistry made experimenting,
                    observing, and adjusting almost instinctive. I carried that
                    approach beyond the laboratory most clearly when I entered
                    an economics competition without having formally studied
                    the field, simply to see how far I could understand a
                    completely new problem.
                  </p>
                  <p>
                    That experience drew me toward business problems, where a
                    question can be approached from many angles and rarely has
                    only one answer. The deeper I explore, the more interested I
                    become in how data and technology can clarify those problems,
                    test assumptions, and support better decisions.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-[#292929]/15 pt-5 sm:pt-6">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="border-b border-[#292929]/45 pb-0.5 text-base font-medium text-[#292929] transition-colors hover:border-[#5A6142] hover:text-[#5A6142] sm:text-[17px]"
              >
                Email: {PERSONAL_INFO.email}
              </a>

              {hasCv ? (
                <a
                  href={PERSONAL_INFO.cvUrl}
                  download
                  className="inline-flex items-center justify-center rounded-[4px] border border-[#292929]/35 px-5 py-2.5 text-xs font-mono font-medium uppercase tracking-wide text-[#292929] transition-colors hover:border-[#5A6142] hover:bg-[#5A6142] hover:text-[#F5F1E8]"
                >
                  {isVi ? 'Tải CV ↓' : 'Download CV ↓'}
                </a>
              ) : (
                <span title="Coming soon">
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed rounded-[4px] border border-[#292929]/35 px-5 py-2.5 text-xs font-mono font-medium uppercase tracking-wide text-[#292929] opacity-40"
                  >
                    {isVi ? 'Tải CV ↓' : 'Download CV ↓'}
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Navigation to next section — left-aligned, underlined so it reads
              as a link rather than a footer note */}
          {onNavigate && (
            <div className="flex justify-start">
              <button
                onClick={() => onNavigate('honors')}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#292929] hover:text-[#676749] cursor-pointer transition-colors font-medium border-b border-[#292929]/40 hover:border-[#676749] pb-0.5"
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
