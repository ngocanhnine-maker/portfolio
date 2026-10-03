import React, { useState, useEffect, useMemo } from 'react';
import { PageId } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface LandingIntroProps {
  onEnterPortfolio: (targetPage?: PageId) => void;
}

// Deterministic PRNG so the torn edge is identical on every render/reload.
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

// Builds a ragged polygon (objectBoundingBox units, 0–1) that reads as
// hand-torn paper: a slow wander along each edge plus fine fibre jitter.
const tornPolygon = (seed: number, depth: number) => {
  const rand = seeded(seed);
  const pts: string[] = [];
  const edge = (n: number, scale: number) => {
    let drift = rand();
    return Array.from({ length: n + 1 }, () => {
      drift = Math.min(1, Math.max(0, drift + (rand() - 0.5) * 0.35));
      return depth * scale * (0.25 + drift * 0.55 + rand() * 0.2);
    });
  };
  const h = 180;
  const v = 100;
  const top = edge(h, 1);
  const right = edge(v, 1.6);
  const bottom = edge(h, 1);
  const left = edge(v, 1.6);
  top.forEach((d, i) => pts.push(`${i / h} ${d}`));
  right.forEach((d, i) => pts.push(`${1 - d} ${i / v}`));
  bottom.forEach((d, i) => pts.push(`${1 - i / h} ${1 - d}`));
  left.forEach((d, i) => pts.push(`${d} ${1 - i / v}`));
  return pts.join(',');
};

const Sparkle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path
      d="M42 8 C45 34 52 44 78 48 C52 52 45 62 42 90 C39 62 32 52 6 48 C32 44 39 34 42 8 Z"
      fill="#141210"
    />
    <path
      d="M80 4 C81 14 84 17 94 18 C84 19 81 22 80 32 C79 22 76 19 66 18 C76 17 79 14 80 4 Z"
      fill="#141210"
    />
  </svg>
);

export const LandingIntro: React.FC<LandingIntroProps> = ({ onEnterPortfolio }) => {
  const [isExiting, setIsExiting] = useState(false);
  const { language, setLanguage, isVi } = useLanguage();
  const t = TRANSLATIONS[language];

  const paperClip = useMemo(() => tornPolygon(7, 0.03), []);
  const kraftClip = useMemo(() => tornPolygon(42, 0.045), []);

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
        className="min-h-screen h-[100svh] relative overflow-hidden select-none bg-[#C9A97E] bg-[url('/landing/collage.jpg')] bg-cover bg-center text-[#1A1714]"
      >
        {/* Clip paths for the torn paper layers */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <clipPath id="landing-torn-paper" clipPathUnits="objectBoundingBox">
              <polygon points={paperClip} />
            </clipPath>
            <clipPath id="landing-torn-kraft" clipPathUnits="objectBoundingBox">
              <polygon points={kraftClip} />
            </clipPath>
            <filter id="landing-paper-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.32  0 0 0 0 0.28  0 0 0 0.09 0" />
            </filter>
            <filter id="landing-paper-crumple">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="3" seed="4" />
              <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.28  0 0 0 0 0.25  0 0 0 0.16 0" />
            </filter>
          </defs>
        </svg>

        {/* Language switcher */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -20 : 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center bg-[#F4F1EA]/90 backdrop-blur-sm border border-[#1A1714]/15 rounded-xs p-0.5 shadow-sm"
        >
          {(['en', 'vi'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2 py-0.5 text-xs font-mono rounded-xs transition-colors cursor-pointer ${
                language === lang
                  ? 'bg-[#1A1714] text-[#F4F1EA] font-bold'
                  : 'text-[#1A1714]/60 hover:text-[#1A1714]'
              }`}
              title={lang === 'en' ? 'English' : 'Tiếng Việt'}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Centrepiece: torn white paper on a kraft scrap, 1.5x the reference size */}
        <div className="absolute inset-0 flex items-center justify-center sm:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: -1.2 }}
            animate={
              isExiting
                ? { opacity: 0, scale: 0.94, rotate: 0, filter: 'blur(3px)' }
                : { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }
            }
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[80svh] sm:w-[min(92vw,1500px)] sm:h-[min(86svh,62vw)] sm:min-h-[420px] max-h-[900px]"
          >
            {/* Kraft scrap behind */}
            <div className="absolute -inset-x-[2%] -inset-y-[5%] [filter:drop-shadow(0_6px_14px_rgba(40,25,10,0.35))]">
              <div
                className="absolute inset-0 bg-[#B8946A]"
                style={{ clipPath: 'url(#landing-torn-kraft)' }}
              >
                <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <rect width="100%" height="100%" filter="url(#landing-paper-crumple)" />
                </svg>
              </div>
            </div>

            {/* White crumpled paper */}
            <div className="absolute inset-0 [filter:drop-shadow(0_4px_10px_rgba(40,25,10,0.3))]">
              <div
                className="absolute inset-0 bg-[#F1EFEA]"
                style={{
                  clipPath: 'url(#landing-torn-paper)',
                  backgroundImage:
                    'radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.9), transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(220,214,203,0.6), transparent 60%)'
                }}
              >
                <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <rect width="100%" height="100%" filter="url(#landing-paper-crumple)" />
                  <rect width="100%" height="100%" filter="url(#landing-paper-grain)" />
                </svg>
              </div>
            </div>

            {/* Finance newspaper sticker pinned over the bottom-left corner */}
            <motion.img
              src="/landing/finance-sticker.png"
              alt=""
              aria-hidden="true"
              draggable={false}
              initial={{ opacity: 0, scale: 1.06, rotate: 8 }}
              animate={{ opacity: 1, scale: 1, rotate: 4 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-10 left-[-5%] bottom-[-12%] w-[clamp(96px,13.5vw,225px)] pointer-events-none [filter:drop-shadow(0_6px_10px_rgba(40,25,10,0.35))]"
            />

            {/* Retro computer sticker pinned over the top-right corner */}
            <motion.img
              src="/landing/computer-sticker.png"
              alt=""
              aria-hidden="true"
              draggable={false}
              initial={{ opacity: 0, scale: 1.06, rotate: -14 }}
              animate={{ opacity: 1, scale: 1, rotate: -9 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-10 right-[-2.5%] top-[0%] sm:top-[-3.5%] w-[clamp(110px,16vw,265px)] pointer-events-none [filter:drop-shadow(0_6px_10px_rgba(40,25,10,0.35))]"
            />

            <Sparkle className="absolute left-[3.5%] top-[7%] w-[clamp(56px,10vw,150px)]" />
            <Sparkle className="absolute right-[4%] bottom-[6%] w-[clamp(56px,10vw,150px)] rotate-6" />

            {/* Text */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6"
              style={{ fontFamily: "'Spectral', Georgia, serif" }}
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mr-[2.8em] sm:mr-[5em] text-[9vw] sm:text-[min(7vw,10.5svh)] leading-none font-normal italic tracking-[0.01em] whitespace-nowrap"
              >
                The Journal of
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="mt-[0.1em] ml-[0.6em] sm:ml-[1.4em] text-[10.5vw] sm:text-[min(8.5vw,13svh)] leading-[1.05] font-bold italic tracking-[0.005em] whitespace-nowrap"
                style={{ fontFamily: "'Spectral', Georgia, serif" }}
              >
                Ledgers &amp; Lines
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                className="mt-[min(3.5vw,5svh)] text-[4.5vw] sm:text-[min(2.8vw,4svh)] leading-tight font-medium"
              >
                — A Portfolio by {isVi ? 'Trần Ngọc Anh' : 'Tran Ngoc Anh'} —
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleEnter('about')}
                id="landing-enter-cta"
                className="group mt-6 sm:mt-[min(3vw,4svh)] inline-flex items-center gap-2 font-sans text-sm sm:text-base md:text-lg font-semibold tracking-wide text-[#1A1714] hover:text-[#6B4E2E] transition-colors cursor-pointer py-1"
              >
                <span className="relative">
                  {t.landing.enter}
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
