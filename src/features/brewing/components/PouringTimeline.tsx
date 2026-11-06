import type { RecipeConfig, RecipeStep } from '../../../data/recipes/recipes';

interface PouringTimelineProps {
  recipe: RecipeConfig;
}

export function PouringTimeline({ recipe }: PouringTimelineProps) {
  const total = parseWindow(recipe.time)[1];
  const steps: RecipeStep[] = recipe.steps;

  const segments = buildSegments(steps, total);
  const valves = steps.filter((s) => s[3] !== null);

  return (
    <section className="mt-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-bold uppercase tracking-wider text-mut">Lịch rót</span>
        <span className="text-[11px] text-mut font-mono">· {formatTime(0)} → {formatTime(total)}</span>
      </div>
      <div className="relative h-8 border border-ink rounded-lg overflow-hidden mb-2">
        {segments.map((seg, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 flex items-center justify-center text-[8px] font-mono font-bold text-paper whitespace-nowrap"
            style={{
              left: `${seg.start}%`,
              width: `${seg.width}%`,
              backgroundColor: segColor(seg),
            }}
          >
            {seg.label}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[9px] font-mono text-mut mb-3">
        <span>{formatTime(0)}</span>
        <span>{formatTime(Math.round(total / 2))}</span>
        <span>{formatTime(total)}</span>
      </div>
      {valves.length > 0 && (
        <div className="flex gap-3 mb-1">
          {valves.map((v, i) => (
            <span key={i} className={valveChip(v[3] as 'open' | 'closed')}>
              {v[3] === 'closed' ? '▼ van đóng' : '▲ mở van'} · {v[0]}
            </span>
          ))}
        </div>
      )}
      <ol className="space-y-1">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3 py-1.5 border-b border-hair/50 last:border-0">
            <span className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-bold text-ink border-ink step-number" style={{ zIndex: 1 }}>
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="font-mono font-bold text-[13px] text-ink">{step[0]}</span>
                {step[1] != null && (
                  <>
                    <span className="font-serif font-bold text-acc">+{step[1]} g</span>
                    <span className="text-[11px] text-mut">→ {step[1]} g</span>
                  </>
                )}
              </div>
              {step[2] && (
                <p className="text-[12px] text-mut leading-relaxed">{step[2]}</p>
              )}
            </div>
            {step[3] && (
              <span className={step[3] === 'closed' ? 'chip-closed' : 'chip-open'}>
                {step[3] === 'closed' ? 'văn đóng' : 'văn mở'}
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function parseWindow(time: string): [number, number] {
  const match = time.match(/(\d+):(\d+)\s*–\s*(\d+):(\d+)/);
  if (!match) return [0, 0];
  return [+match[1] * 60 + +match[2], +match[3] * 60 + +match[4]];
}

function buildSegments(steps: RecipeStep[], total: number) {
  const segments: Array<{ start: number; width: number; label: string }> = [];
  for (let i = 0; i < steps.length; i++) {
    const t0 = parseTime(steps[i][0]);
    const t1 = i + 1 < steps.length ? parseTime(steps[i + 1][0]) : total;
    const width = Math.max(5, ((t1 - t0) / total) * 100);
    const isBloom = i === 0;
    const isDraw = /xả hết/i.test(steps[i][2] || '');
    const isPour = /rót|Thêm/i.test(steps[i][2] || '');
    segments.push({
      start: (t0 / total) * 100,
      width,
      label: isBloom ? 'BLOOM' : isDraw ? 'XẢ' : isPour ? 'RÓT' : 'NGẪM',
    });
  }
  return segments;
}

function parseTime(t: string): number {
  const m = t.match(/(\d+):(\d+)/);
  if (!m) return 0;
  return +m[1] * 60 + +m[2];
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function segColor(seg: { label: string }): string {
  switch (seg.label) {
    case 'BLOOM': return '#8a6d3b';
    case 'XẢ': return '#1a1610';
    case 'RÓT': return '#4c6b52';
    default: return '#8c7f6c';
  }
}

function valveChip(valve: 'open' | 'closed'): string {
  return valve === 'closed'
    ? 'px-2 py-0.5 rounded text-[9px] font-bold text-terracotta border border-terracotta/30 bg-terracotta/10'
    : 'px-2 py-0.5 rounded text-[9px] font-bold text-acc-ink border border-acc/30 bg-acc/10';
}