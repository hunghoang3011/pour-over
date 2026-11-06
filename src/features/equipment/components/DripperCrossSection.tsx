/**
 * DripperCrossSection — SVG cross-section diagram of each dripper type.
 * Pure React + SVG, no Three.js, no business logic.
 * Visual layer only — all geometry data comes from props.
 */

import type { Dripper } from '../../../data/recipes/recipes';

interface DripperCrossSectionProps {
  dripper: Dripper;
  waterLevelPercent?: number; // 0-100, optional water level visualization
  valveOpen?: boolean;        // for Switch dripper
}

const COLORS = {
  paper: '#faf7f0',
  ink: '#1a1610',
  hair: '#d9ceb8',
  acc: '#4c6b52',
  water: '#8c7f6c',
  coffeeBed: '#3d3228',
};

function getDripperConfig(id: string) {
  const isSwitch = id.startsWith('switch');
  const isCone = id.startsWith('v60');
  const isFlat = id.startsWith('flat');

  return {
    isSwitch,
    isCone,
    isFlat,
    outer: isFlat
      ? 'M30,46 L102,46 L94,130 L74,142 L66,156 Z'
      : 'M26,46 L106,46 L64,130 L68,144 Z',
    inner: isFlat
      ? 'M36,53 L96,53 L89,124 L72,134 Z'
      : 'M32,54 L100,54 L63,126 L61,132 Z',
    bedY: isFlat ? 124 : 122,
    valveY: isSwitch ? 150 : 0,
    srvTop: isSwitch ? 146 : 128,
  };
}

export function DripperCrossSection({
  dripper,
  waterLevelPercent = 0,
  valveOpen = false,
}: DripperCrossSectionProps) {
  const config = getDripperConfig(dripper.id);
  const waterHeight = (waterLevelPercent / 100) * 30; // 30px max water height
  const waterY = config.bedY - waterHeight;

  return (
    <figure className="aspect-[4/5] w-full max-w-[200px] mx-auto flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 200 232"
        className="w-full h-auto"
        role="img"
        aria-label={`Sơ đồ phễu ${dripper.name}`}
      >
        <defs>
          <clipPath id={`coneClip-${dripper.id}`}>
            <path d={config.inner} />
          </clipPath>
          <clipPath id={`srvClip-${dripper.id}`}>
            <path d={`M68,${config.srvTop + 5} L132,${config.srvTop + 5} L124,215 L76,215 Z`} />
          </clipPath>
        </defs>

        {/* Server glass */}
        <path
          d={`M64,${config.srvTop} L136,${config.srvTop} L128,220 L72,220 Z`}
          fill={COLORS.paper}
        />
        {dripper.ice && (
          <>
            <rect x="74" y="196" width="13" height="10" rx="2" fill={COLORS.hair} opacity="0.5" />
            <rect x="94" y="200" width="12" height="9" rx="2" fill={COLORS.hair} opacity="0.42" />
            <rect x="112" y="195" width="12" height="10" rx="2" fill={COLORS.hair} opacity="0.46" />
          </>
        )}
        <g clipPath={`url(#srvClip-${dripper.id})`}>
          <rect
            x="64"
            y="216"
            width="72"
            height={0}
            fill={COLORS.water}
            opacity="0.38"
          />
        </g>

        {/* Dripper body */}
        <path
          d={`M64,${config.srvTop} L136,${config.srvTop} L128,220 L72,220 Z`}
          fill="none"
          stroke={COLORS.ink}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d={config.outer} fill={COLORS.paper} />
        <g clipPath={`url(#coneClip-${dripper.id})`}>
          {/* Coffee bed */}
          <rect x="30" y={config.bedY} width="140" height="30" fill={COLORS.coffeeBed} opacity="0.13" />
          {/* Water level */}
          {waterLevelPercent > 0 && (
            <rect
              x="30"
              y={waterY}
              width="140"
              height={waterHeight}
              fill={COLORS.water}
              opacity="0.34"
            />
          )}
        </g>
        <path d={config.outer} fill="none" stroke={COLORS.ink} strokeWidth="1.4" strokeLinejoin="round" />
        <path d={config.inner} fill="none" stroke={COLORS.hair} strokeWidth="1" opacity="0.45" />

        {/* Switch valve */}
        {dripper.id.startsWith('switch') && (
          <>
            <line
              x1="56"
              y1={config.valveY}
              x2="76"
              y2={config.valveY}
              stroke={COLORS.ink}
              strokeWidth="1.6"
              fill="none"
            />
            <path
              d="M66,118 L66,140"
              fill="none"
              stroke={valveOpen ? COLORS.acc : COLORS.ink}
              strokeWidth="1.4"
            />
          </>
        )}
      </svg>
      <figcaption className="text-[9px] font-mono text-mut text-center leading-tight">
        {dripper.name} · giấy {dripper.paper}
      </figcaption>
    </figure>
  );
}