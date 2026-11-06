import type { Dripper } from '../../../data/recipes/recipes';

interface DripperDiagramProps {
  dripper: Dripper;
}

export function DripperDiagram({ dripper }: DripperDiagramProps) {
  const config = getDripperConfig(dripper.id);

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

        {/* Server glass (iced shows ice cubes) */}
        <path
          d={`M64,${config.srvTop} L136,${config.srvTop} L128,220 L72,220 Z`}
          fill="#faf7f0"
        />
        {dripper.ice && (
          <>
            <rect x="74" y="196" width="13" height="10" rx="2" fill="#8c7f6c" opacity="0.5" />
            <rect x="94" y="200" width="12" height="9" rx="2" fill="#8c7f6c" opacity="0.42" />
            <rect x="112" y="195" width="12" height="10" rx="2" fill="#8c7f6c" opacity="0.46" />
          </>
        )}
        <g clipPath={`url(#srvClip-${dripper.id})`}>
          <rect x="64" y="216" width="72" height="0" fill="#8c7f6c" opacity="0.38" />
        </g>

        {/* Dripper body */}
        <path d={`M64,${config.srvTop} L136,${config.srvTop} L128,220 L72,220 Z`} fill="none" stroke="#1a1610" strokeWidth="1.4" strokeLinejoin="round" />
        <path d={config.outer} fill="#faf7f0" />
        <g clipPath={`url(#coneClip-${dripper.id})`}>
          <rect x="30" y={config.bedY} width="140" height="30" fill="#1a1610" opacity="0.13" />
          <rect x="30" y="124" width="140" height="0" fill="#8c7f6c" opacity="0.34" />
        </g>
        {config.ribs}
        <path d={config.outer} fill="none" stroke="#1a1610" strokeWidth="1.4" strokeLinejoin="round" />
        <path d={config.inner} fill="none" stroke="#8c7f6c" strokeWidth="1" opacity="0.45" />

        {/* Switch valve */}
        {dripper.id.startsWith('switch') && (
          <>
            <line x1="56" y1={config.valveY} x2="76" y2={config.valveY} stroke="#1a1610" strokeWidth="1.6" fill="none" />
            <path d="M66,118 L66,140" fill="none" stroke="#4c6b52" strokeWidth="1.4" />
          </>
        )}
      </svg>
      <figcaption className="text-[9px] font-mono text-mut text-center leading-tight">
        {dripper.name} · giấy {dripper.paper}
      </figcaption>
    </figure>
  );
}

function getDripperConfig(id: string) {
  const isSwitch = id.startsWith('switch');
  const isCone = id.startsWith('v60');
  const isFlat = id.startsWith('flat');

  return {
    outer: isFlat
      ? 'M30,46 L102,46 L94,130 L74,142 L66,156 Z'
      : 'M26,46 L106,46 L64,130 L68,144 Z',
    inner: isFlat
      ? 'M36,53 L96,53 L89,124 L72,134 Z'
      : 'M32,54 L100,54 L63,126 L61,132 Z',
    bedY: isFlat ? 124 : 122,
    valveY: isSwitch ? 150 : 0,
    srvTop: isSwitch ? 146 : 128,
    ribs: isCone
      ? `
        <path d="M52,62 C70,92 84,114 99,136" fill="none" stroke="#d9ceb8" strokeWidth="1"/>
        <path d="M148,62 C130,92 116,96 101,136" fill="none" stroke="#d9ceb8" strokeWidth="1"/>
      `
      : '',
  };
}