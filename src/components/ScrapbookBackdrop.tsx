import React, { useMemo } from 'react';

// Deterministic PRNG so torn edges are identical on every render/reload.
export const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

// Ragged line between two points (objectBoundingBox units) with a slow
// wander plus fine fibre jitter perpendicular to the line.
export const tornLine = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
  steps: number,
  amp: number,
  seed: number
) => {
  const rand = seeded(seed);
  const len = Math.hypot(x2 - x1, y2 - y1);
  const nx = -(y2 - y1) / len;
  const ny = (x2 - x1) / len;
  let drift = 0;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    drift = Math.max(-1, Math.min(1, drift + (rand() - 0.5) * 0.5));
    const off = amp * (drift * 0.7 + (rand() - 0.5) * 0.6) * Math.sin(Math.PI * t) ** 0.3;
    pts.push(`${x1 + (x2 - x1) * t + nx * off} ${y1 + (y2 - y1) * t + ny * off}`);
  }
  return pts;
};

const CoffeeRing: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <circle
      cx="100"
      cy="100"
      r="82"
      fill="none"
      stroke="#B8915A"
      strokeWidth="7"
      strokeOpacity="0.32"
      filter="url(#scrap-ring)"
    />
    <circle cx="100" cy="100" r="76" fill="none" stroke="#B8915A" strokeWidth="1.5" strokeOpacity="0.18" />
  </svg>
);

/**
 * Vintage scrapbook backdrop: lavender graph paper, a cream panel through the
 * middle, torn kraft scraps on the left, coffee rings and two old books.
 * Sits behind the section content (parent must be `relative`, content `z-10`).
 */
export const ScrapbookBackdrop: React.FC = () => {
  const kraftTop = useMemo(
    () => ['0 0', '1 0', ...tornLine([1, 0], [0, 1], 90, 0.05, 11), '0 0'].join(','),
    []
  );
  const kraftTopFibre = useMemo(
    () => ['0 0', '1 0', ...tornLine([1, 0], [0, 1], 120, 0.07, 23), '0 0'].join(','),
    []
  );
  const kraftBottom = useMemo(
    () => ['0 1', ...tornLine([0, 0.15], [1, 1], 90, 0.08, 37), '0 1'].join(','),
    []
  );
  const kraftBottomFibre = useMemo(
    () => ['0 1', ...tornLine([0, 0.05], [1, 1], 120, 0.1, 51), '0 1'].join(','),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="scrap-kraft-top" clipPathUnits="objectBoundingBox">
            <polygon points={kraftTop} />
          </clipPath>
          <clipPath id="scrap-kraft-top-fibre" clipPathUnits="objectBoundingBox">
            <polygon points={kraftTopFibre} />
          </clipPath>
          <clipPath id="scrap-kraft-bottom" clipPathUnits="objectBoundingBox">
            <polygon points={kraftBottom} />
          </clipPath>
          <clipPath id="scrap-kraft-bottom-fibre" clipPathUnits="objectBoundingBox">
            <polygon points={kraftBottomFibre} />
          </clipPath>
          <filter id="scrap-kraft-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" />
            <feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.22 0" />
          </filter>
          <filter id="scrap-kraft-mottle">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="3" seed="9" />
            <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.24  0 0 0 0 0.15  0 0 0 0.35 0" />
          </filter>
          <filter id="scrap-ring">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="5" />
            <feDisplacementMap in="SourceGraphic" scale="9" />
          </filter>
        </defs>
      </svg>

      {/* Graph paper base */}
      <div className="absolute inset-0 scrap-graph-paper" />

      {/* Torn kraft scrap, top-left (white fibre edge underneath) */}
      <div className="absolute top-0 left-0 w-[44%] h-[22%] min-h-[110px]">
        <div className="absolute inset-0 bg-[#FBF9F5]" style={{ clipPath: 'url(#scrap-kraft-top-fibre)' }} />
        <div className="absolute inset-0 bg-[#A8956F]" style={{ clipPath: 'url(#scrap-kraft-top)' }}>
          <svg className="absolute inset-0 w-full h-full">
            <rect width="100%" height="100%" filter="url(#scrap-kraft-mottle)" />
            <rect width="100%" height="100%" filter="url(#scrap-kraft-grain)" />
          </svg>
        </div>
      </div>

      {/* Torn kraft scrap, bottom-left */}
      <div className="absolute bottom-0 left-0 w-[48%] h-[16%] min-h-[90px]">
        <div className="absolute inset-0 bg-[#FBF9F5]" style={{ clipPath: 'url(#scrap-kraft-bottom-fibre)' }} />
        <div className="absolute inset-0 bg-[#A8956F]" style={{ clipPath: 'url(#scrap-kraft-bottom)' }}>
          <svg className="absolute inset-0 w-full h-full">
            <rect width="100%" height="100%" filter="url(#scrap-kraft-mottle)" />
            <rect width="100%" height="100%" filter="url(#scrap-kraft-grain)" />
          </svg>
        </div>
      </div>

      {/* Coffee rings on the graph paper */}
      <CoffeeRing className="absolute -top-[6%] right-[9%] w-[clamp(120px,14vw,240px)]" />
      <CoffeeRing className="absolute -bottom-[9%] right-[3%] w-[clamp(140px,16vw,280px)] rotate-45" />

      {/* Cream panel through the middle */}
      <div className="absolute inset-x-0 top-[6%] bottom-[5%] bg-[#F2ECDC] shadow-[0_1px_0_rgba(80,60,30,0.06),0_-1px_0_rgba(80,60,30,0.06)]" />

      {/* Books */}
      <img
        src="/textures/book-open.png"
        alt=""
        draggable={false}
        className="absolute top-[1.5%] right-[1.5%] w-[clamp(96px,11vw,200px)] [filter:drop-shadow(0_4px_8px_rgba(60,40,20,0.25))]"
      />
      <img
        src="/textures/book-flat.png"
        alt=""
        draggable={false}
        className="absolute left-0 bottom-[1%] w-[clamp(110px,13vw,230px)] [filter:drop-shadow(0_4px_6px_rgba(60,40,20,0.22))]"
      />
    </div>
  );
};
