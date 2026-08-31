import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface LandingIntroProps {
  onEnterPortfolio: (targetPage?: PageId) => void;
}

export const LandingIntro: React.FC<LandingIntroProps> = ({ onEnterPortfolio }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isEnterHovered, setIsEnterHovered] = useState(false);
  const { language, setLanguage, isVi } = useLanguage();
  const t = TRANSLATIONS[language];

  const handleEnter = (targetPage: PageId = 'about') => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onEnterPortfolio(targetPage);
    }, 550);
  };

  // Keyboard shortcut to enter on Enter or Space key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleEnter('about');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen bg-[#F2EBDD] text-[#292929] flex flex-col p-6 sm:p-12 md:p-16 lg:p-20 pb-12 relative overflow-hidden select-none"
      >
        {/* Top Minimal Header: Name + Language Switcher + Year */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{
            opacity: isExiting ? 0 : 1,
            y: isExiting ? -20 : 0
          }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between z-10 w-full"
        >
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#292929]">
            {isVi ? 'TRẦN NGỌC ÁNH' : 'TRAN NGOC ANH'}
          </span>

          <div className="flex items-center gap-3">
            {/* Language Switcher Button */}
            <div className="flex items-center bg-[#292929]/5 border border-[#292929]/15 rounded-xs p-0.5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-xs font-mono rounded-xs transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#292929] text-[#F2EBDD] font-bold shadow-xs'
                    : 'text-[#292929]/60 hover:text-[#292929]'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('vi')}
                className={`px-2 py-0.5 text-xs font-mono rounded-xs transition-colors cursor-pointer ${
                  language === 'vi'
                    ? 'bg-[#292929] text-[#F2EBDD] font-bold shadow-xs'
                    : 'text-[#292929]/60 hover:text-[#292929]'
                }`}
                title="Tiếng Việt"
              >
                VI
              </button>
            </div>

            <span className="font-mono text-xs sm:text-sm text-[#292929]/70 hidden sm:inline">
              2026
            </span>
          </div>
        </motion.header>

        {/* Centerpiece Section: PORTFOLIO + Connected ENTER — fills the space
            between header and footer so the wordmark sits truly centred. */}
        <main className="flex-1 py-8 relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center">
          {/* Main Title & Action Container */}
          <motion.div
            animate={
              isExiting
                ? {
                    x: -90,
                    scale: 0.94,
                    opacity: 0,
                    filter: 'blur(3px)'
                  }
                : {
                    x: 0,
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)'
                  }
            }
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Wordmark + hairline share one shrink-wrapped width so the rule
                ends with the final "O" instead of running past it. */}
            <div className="w-fit">
              {/* Staggered word reveal. -ml pulls the "P" side-bearing out so its
                  ink aligns optically with the rule and "Enter Portfolio" below;
                  pr keeps the FOLIO hover nudge from being clipped. */}
              <div className="overflow-hidden flex items-baseline justify-start whitespace-nowrap pr-2 -ml-2.5">
              <h1 className="font-display font-extrabold text-[13vw] sm:text-[12vw] md:text-[11vw] lg:text-[10.5vw] leading-[0.88] tracking-[-0.015em] uppercase flex items-baseline">
                {/* PORT (Charcoal) */}
                <motion.span
                  initial={{ y: '105%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="text-[#292929] inline-block"
                >
                  PORT
                </motion.span>

                {/* FOLIO (Muted Olive with hover-response link to ENTER) */}
                <motion.span
                  initial={{ y: '105%', opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    color: isEnterHovered ? '#7E8354' : '#4A5238',
                    x: isEnterHovered ? 4 : 0
                  }}
                  transition={{
                    duration: isEnterHovered ? 0.3 : 0.9,
                    delay: isEnterHovered ? 0 : 0.28,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{
                    x: 6,
                    color: '#7E8354',
                    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                  }}
                  className="inline-block cursor-default transition-colors"
                >
                  FOLIO
                </motion.span>
              </h1>
              </div>

              {/* Clean Hairline Connecting Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.95,
                  delay: 0.42,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="origin-left h-[1px] bg-black/[0.18] mt-6 sm:mt-8 md:mt-10 w-[calc(100%_-_0.5rem)]"
              />
            </div>

            {/* ENTER button directly below the divider. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <button
                onClick={() => handleEnter('about')}
                onMouseEnter={() => setIsEnterHovered(true)}
                onMouseLeave={() => setIsEnterHovered(false)}
                id="landing-enter-cta"
                className="group inline-flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#292929] hover:text-[#676749] cursor-pointer transition-colors w-fit relative py-1"
              >
                <span className="relative">
                  {t.landing.enter}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#676749] group-hover:w-full transition-all duration-300 ease-out" />
                </span>

                <motion.span
                  animate={{
                    x: isEnterHovered ? 8 : 0
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-flex items-center"
                >
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#676749] transition-colors" />
                </motion.span>
              </button>

            </motion.div>
          </motion.div>
        </main>

        {/* Footer: three pillars — closes the composition and echoes the tagline */}
        <motion.footer
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: isExiting ? 0 : 1,
            y: isExiting ? 16 : 0
          }}
          transition={{ duration: 0.7, delay: 0.66, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#6B665C]"
        >
          {(isVi
            ? ['Tài chính Định lượng', 'Nghiên cứu Hóa học', 'Tác động Xã hội']
            : ['Quantitative Finance', 'Chemical Research', 'Social Impact']
          ).map((pillar, i) => (
            <React.Fragment key={pillar}>
              {i > 0 && (
                <span className="text-[#6B665C]/60" aria-hidden="true">
                  /
                </span>
              )}
              <span>{pillar}</span>
            </React.Fragment>
          ))}
        </motion.footer>
      </motion.div>
    </AnimatePresence>
  );
};
