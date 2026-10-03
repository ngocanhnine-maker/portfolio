import React, { useMemo } from 'react';
import { tornLine } from './ScrapbookBackdrop';

type Pt = [number, number];

// Closed torn outline through four corners (objectBoundingBox units).
const tornQuad = (corners: Pt[], steps: number, amp: number, seed: number) =>
  corners.flatMap((c, i) => tornLine(c, corners[(i + 1) % 4], steps, amp, seed + i * 7).slice(0, -1));

const toPath = (pts: string[]) => `M${pts.join(' L')} Z`;

// Slightly asymmetric window, as if the paper was torn open by hand.
const WINDOW: Pt[] = [
  [0.095, 0.075],
  [0.905, 0.06],
  [0.92, 0.925],
  [0.085, 0.94]
];
const insetBy = (pts: Pt[], d: number): Pt[] =>
  pts.map(([x, y]) => [x + (x < 0.5 ? d : -d), y + (y < 0.5 ? d * 0.8 : -d * 0.8)]);

interface PortraitFrameProps {
  src: string;
  alt: string;
  imgClassName?: string;
}

/**
 * Portrait seen through a window torn into a sheet of paper, with two loose
 * sheets layered behind it and a strip of tape. Fills its parent box.
 */
export const PortraitFrame: React.FC<PortraitFrameProps> = ({ src, alt, imgClassName = '' }) => {
  const { matClip, fibreClip, backA, backB } = useMemo(() => {
    const outer = toPath(tornQuad([[0, 0], [1, 0], [1, 1], [0, 1]], 50, 0.006, 3));
    return {
      // evenodd: outer sheet minus the torn window
      matClip: `${outer} ${toPath(tornQuad(WINDOW, 60, 0.018, 41))}`,
      // white paper fibres: same sheet with a slightly smaller, rougher hole
      fibreClip: `${outer} ${toPath(tornQuad(insetBy(WINDOW, -0.012), 80, 0.022, 59))}`,
      backA: toPath(tornQuad([[0, 0], [1, 0], [1, 1], [0, 1]], 50, 0.012, 77)),
      backB: toPath(tornQuad([[0, 0], [1, 0], [1, 1], [0, 1]], 50, 0.01, 93))
    };
  }, []);

  return (
    <div className="portrait-frame relative w-full h-full">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="pf-mat" clipPathUnits="objectBoundingBox">
            <path d={matClip} clipRule="evenodd" />
          </clipPath>
          <clipPath id="pf-fibre" clipPathUnits="objectBoundingBox">
            <path d={fibreClip} clipRule="evenodd" />
          </clipPath>
          <clipPath id="pf-back-a" clipPathUnits="objectBoundingBox">
            <path d={backA} />
          </clipPath>
          <clipPath id="pf-back-b" clipPathUnits="objectBoundingBox">
            <path d={backB} />
          </clipPath>
          <filter id="pf-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="8" />
            <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.22  0 0 0 0.12 0" />
          </filter>
          <filter id="pf-mottle">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="3" seed="2" />
            <feColorMatrix values="0 0 0 0 0.4  0 0 0 0 0.33  0 0 0 0 0.22  0 0 0 0.14 0" />
          </filter>
        </defs>
      </svg>

      {/* Loose sheets behind */}
      <div className="absolute -inset-[3%] rotate-[-3deg] [filter:drop-shadow(0_3px_6px_rgba(60,40,20,0.18))]">
        <div className="absolute inset-0 bg-[#C9B994]" style={{ clipPath: 'url(#pf-back-a)' }}>
          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            <rect width="100%" height="100%" filter="url(#pf-mottle)" />
            <rect width="100%" height="100%" filter="url(#pf-grain)" />
          </svg>
        </div>
      </div>
      <div className="absolute -inset-[1.5%] rotate-[2deg] [filter:drop-shadow(0_2px_4px_rgba(60,40,20,0.16))]">
        <div className="absolute inset-0 bg-[#E6DCC5]" style={{ clipPath: 'url(#pf-back-b)' }}>
          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            <rect width="100%" height="100%" filter="url(#pf-grain)" />
          </svg>
        </div>
      </div>

      {/* Portrait, seen through the window */}
      <div className="absolute inset-[4%] overflow-hidden bg-[#D9D0BC]">
        <img src={src} alt={alt} referrerPolicy="no-referrer" className={`w-full h-full object-cover ${imgClassName}`} />
        {/* soft vignette so the photo sits under the paper */}
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(60,40,20,0.28)]" />
      </div>

      {/* Mat sheet with the torn window: white fibre rim, then the paper face */}
      <div className="absolute inset-0 [filter:drop-shadow(0_2px_3px_rgba(50,35,15,0.35))]">
        <div className="absolute inset-0 bg-[#FBF8F1]" style={{ clipPath: 'url(#pf-fibre)' }} />
        <div className="absolute inset-0 bg-[#F1E9D8]" style={{ clipPath: 'url(#pf-mat)' }}>
          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            <rect width="100%" height="100%" filter="url(#pf-mottle)" />
            <rect width="100%" height="100%" filter="url(#pf-grain)" />
          </svg>
        </div>
      </div>

      {/* Strip of translucent tape across the top edge */}
      <div className="absolute -top-[2.2%] left-1/2 -translate-x-1/2 rotate-[-4deg] w-[30%] h-[5.5%] min-h-[22px] bg-[#DCCBA4]/75 shadow-[0_1px_3px_rgba(60,40,20,0.22)] [clip-path:polygon(2%_0,98%_6%,100%_50%,97%_100%,1%_94%,0_45%)]" />
    </div>
  );
};
