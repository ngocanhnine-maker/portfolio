import React, { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface EditorialFinanceBackgroundProps {
  className?: string;
}

export const EditorialFinanceBackground: React.FC<EditorialFinanceBackgroundProps> = ({
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const maskId = useId();
  const gradTopRight = useId();

  // Very slow, sophisticated independent drifting (14–22s cycles, 5–10px displacement)
  const driftTopRight = prefersReducedMotion
    ? {}
    : {
        x: [0, 8, -4, 0],
        y: [0, -6, 4, 0],
        transition: {
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  const driftBottomLeft = prefersReducedMotion
    ? {}
    : {
        x: [0, -7, 5, 0],
        y: [0, 7, -3, 0],
        transition: {
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  const breatheGrid = prefersReducedMotion
    ? {}
    : {
        opacity: [0.7, 1, 0.7],
        transition: {
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Atmospheric Ambient Olive Gradients (Very faint, restricted strictly to far corners) */}
      <div
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none opacity-[0.06] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #7E8354 0%, #676749 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute -bottom-36 -left-36 w-[440px] h-[440px] rounded-full pointer-events-none opacity-[0.05] blur-[110px]"
        style={{
          background: 'radial-gradient(circle, #676749 0%, #7E8354 45%, transparent 75%)',
        }}
      />

      {/* 2. Structured Vector SVG Background with Restrained Peripheral Motifs */}
      <svg
        className="w-full h-full absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radial Center Clearout Mask: Ensures central area around typography has 0% opacity */}
          <radialGradient id={maskId} cx="50%" cy="50%" r="52%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="40%" stopColor="#000000" stopOpacity="0" />
            <stop offset="68%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="90%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </radialGradient>

          <mask id={`center-clear-${maskId}`}>
            <rect width="1440" height="900" fill={`url(#${maskId})`} />
          </mask>

          {/* Area Fill Gradient for Top-Right Partial Graph */}
          <linearGradient id={gradTopRight} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#676749" stopOpacity="0.06" />
            <stop offset="60%" stopColor="#676749" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#676749" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Group with Center Radial Fade Mask */}
        <g mask={`url(#center-clear-${maskId})`}>
          {/* ============================================================
              MOTIF 1 & 3: UPPER-RIGHT EDGE (Partial Graph & Grid Structure)
             ============================================================ */}
          <motion.g animate={driftTopRight} transform="translate(980, 40)">
            {/* Grid Fragment (softly fading into beige canvas) */}
            <motion.g animate={breatheGrid}>
              {/* Horizontal hairline rules */}
              {[0, 24, 48, 72, 96, 120].map((y, i) => (
                <line
                  key={`h-${i}`}
                  x1={i * 18}
                  y1={y}
                  x2="420"
                  y2={y}
                  stroke="#676749"
                  strokeWidth="0.6"
                  strokeOpacity={0.045 - i * 0.005}
                />
              ))}

              {/* Vertical hairline rules */}
              {[120, 180, 240, 300, 360, 420].map((x, i) => (
                <line
                  key={`v-${i}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2={120 - i * 15}
                  stroke="#676749"
                  strokeWidth="0.6"
                  strokeOpacity={0.045 - i * 0.005}
                />
              ))}

              {/* Micro Column Indices */}
              {['γ', 'δ', 'θ', 'λ'].map((symbol, i) => (
                <text
                  key={symbol}
                  x={210 + i * 60}
                  y="-8"
                  fill="#676749"
                  fillOpacity="0.055"
                  fontSize="7.5"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  textAnchor="middle"
                >
                  {symbol}
                </text>
              ))}
            </motion.g>

            {/* Motif 1: Partial Regression / Spline Line Graph Fragment */}
            <g transform="translate(60, 30)">
              {/* Coordinate axis tick fragment */}
              <line
                x1="60"
                y1="120"
                x2="340"
                y2="120"
                stroke="#676749"
                strokeWidth="0.7"
                strokeOpacity="0.05"
              />
              <line
                x1="60"
                y1="20"
                x2="60"
                y2="120"
                stroke="#676749"
                strokeWidth="0.7"
                strokeOpacity="0.05"
              />
              {[30, 60, 90].map((tickY) => (
                <line
                  key={tickY}
                  x1="56"
                  y1={tickY}
                  x2="60"
                  y2={tickY}
                  stroke="#676749"
                  strokeWidth="0.6"
                  strokeOpacity="0.04"
                />
              ))}

              {/* Subtle Area Fill */}
              <path
                d="M 60,110 C 120,105 170,82 220,68 C 270,54 310,32 340,24 L 340,120 L 60,120 Z"
                fill={`url(#${gradTopRight})`}
              />

              {/* Primary Curve with gentle initial reveal */}
              <motion.path
                d="M 60,110 C 120,105 170,82 220,68 C 270,54 310,32 340,24"
                fill="none"
                stroke="#676749"
                strokeWidth="0.8"
                strokeOpacity="0.07"
                strokeDasharray="4 2"
                initial={prefersReducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.8, ease: 'easeOut' }}
              />

              {/* Secondary smooth spline */}
              <path
                d="M 80,118 C 140,112 190,95 240,82 C 280,72 310,50 340,40"
                fill="none"
                stroke="#7E8354"
                strokeWidth="0.6"
                strokeOpacity="0.045"
              />

              {/* Micro Quantitative Annotation */}
              <text
                x="330"
                y="18"
                fill="#676749"
                fillOpacity="0.06"
                fontSize="8"
                fontFamily="ui-monospace, monospace"
                textAnchor="end"
              >
                R² = 0.884 · σ_t
              </text>
            </g>
          </motion.g>

          {/* ============================================================
              MOTIF 2: LOWER-LEFT CORNER (Faint Scatter Plot & Econometric Fragment)
             ============================================================ */}
          <motion.g animate={driftBottomLeft} transform="translate(60, 680)">
            {/* Axis fragment */}
            <line
              x1="20"
              y1="160"
              x2="280"
              y2="160"
              stroke="#676749"
              strokeWidth="0.6"
              strokeOpacity="0.045"
            />
            <line
              x1="20"
              y1="40"
              x2="20"
              y2="160"
              stroke="#676749"
              strokeWidth="0.6"
              strokeOpacity="0.045"
            />

            {/* Regression trend line fragment */}
            <line
              x1="30"
              y1="148"
              x2="240"
              y2="58"
              stroke="#676749"
              strokeWidth="0.7"
              strokeOpacity="0.05"
              strokeDasharray="2 3"
            />

            {/* Scatter Points (Faint, tiny 1.5 - 2.0px dots drifting minutely) */}
            {[
              { cx: 45, cy: 140, r: 1.6 },
              { cx: 68, cy: 132, r: 1.8 },
              { cx: 90, cy: 125, r: 1.5 },
              { cx: 112, cy: 110, r: 2.0 },
              { cx: 135, cy: 104, r: 1.6 },
              { cx: 158, cy: 90, r: 1.8 },
              { cx: 180, cy: 84, r: 1.5 },
              { cx: 205, cy: 72, r: 2.0 },
              { cx: 228, cy: 62, r: 1.7 },
            ].map((pt, i) => (
              <motion.circle
                key={i}
                cx={pt.cx}
                cy={pt.cy}
                r={pt.r}
                fill="#676749"
                fillOpacity="0.065"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        cx: [pt.cx, pt.cx + (i % 2 === 0 ? 1.5 : -1.5), pt.cx],
                        cy: [pt.cy, pt.cy + (i % 3 === 0 ? -1.5 : 1.5), pt.cy],
                      }
                }
                transition={{
                  duration: 12 + (i % 4) * 2,
                  repeat: Infinity,
                  ease: 'easeInOut' as const,
                }}
              />
            ))}

            {/* Micro Statistical Labels */}
            <text
              x="25"
              y="32"
              fill="#676749"
              fillOpacity="0.055"
              fontSize="7.5"
              fontFamily="ui-monospace, monospace"
            >
              cov(x,y) / var(x)
            </text>

            <text
              x="260"
              y="174"
              fill="#676749"
              fillOpacity="0.05"
              fontSize="7"
              fontFamily="ui-monospace, monospace"
              textAnchor="end"
            >
              n = 128 · p &lt; 0.01
            </text>
          </motion.g>

          {/* ============================================================
              MOTIF 4: LOWER-RIGHT PERIPHERY (Tiny Texture & Hairlines)
             ============================================================ */}
          <motion.g animate={driftTopRight} transform="translate(1220, 740)">
            <line
              x1="0"
              y1="0"
              x2="160"
              y2="0"
              stroke="#676749"
              strokeWidth="0.6"
              strokeOpacity="0.04"
            />
            <line
              x1="0"
              y1="20"
              x2="140"
              y2="20"
              stroke="#676749"
              strokeWidth="0.6"
              strokeOpacity="0.035"
            />
            <line
              x1="0"
              y1="40"
              x2="110"
              y2="40"
              stroke="#676749"
              strokeWidth="0.6"
              strokeOpacity="0.03"
            />
            <text
              x="130"
              y="-6"
              fill="#676749"
              fillOpacity="0.045"
              fontSize="7.5"
              fontFamily="ui-monospace, monospace"
              textAnchor="end"
            >
              λ_t · Δy/Δx
            </text>
          </motion.g>
        </g>
      </svg>
    </div>
  );
};
