/**
 * WaterTimelineChart — đồ thị 2 trục: X thời gian, Y nước tích lũy.
 * Pure React + SVG, không Three.js.
 */

import type { RecipeConfig } from '../../../data/recipes/recipes';
import { computePhases } from '../../../domain/brewing/phase-calculator.js';

interface WaterTimelineChartProps {
  recipe: RecipeConfig;
}

export function WaterTimelineChart({ recipe }: WaterTimelineChartProps) {
  const phases = computePhases(recipe);
  const totalSeconds = getTotalSeconds(recipe);
  const totalWater = recipe.hotWater + recipe.ice;

  const W = 320;
  const H = 140;
  const PAD = 30;

  return (
    <section className="bg-paper-2 border border-hair rounded-lg p-4">
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-mut mb-3">Đồ thị nước tích lũy</h3>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-[140px]"
        role="img"
        aria-label="Đồ thị nước tích lũy"
      >
        {/* Grid */}
        <g stroke="#d9ceb8" strokeWidth="0.5" opacity="0.5">
          {[0, 25, 50, 75, 100].map((p) => (
            <line
              key={p}
              x1={PAD}
              x2={W - PAD}
              y1={H - PAD - (p / 100) * (H - 2 * PAD)}
              y2={H - PAD - (p / 100) * (H - 2 * PAD)}
            />
          ))}
          {[0, 30, 60, 90, 120, 150, 180].map((s) => (
            <line
              key={s}
              x1={PAD + (s / totalSeconds) * (W - 2 * PAD)}
              x2={PAD + (s / totalSeconds) * (W - 2 * PAD)}
              y1={PAD}
              y2={H - PAD}
            />
          ))}
        </g>

        {/* Water line */}
        <polyline
          points={phases
            .map((p) => {
              const x = PAD + (p.startSeconds / totalSeconds) * (W - 2 * PAD);
              const y = H - PAD - (p.cumulativeWaterGrams / totalWater) * (H - 2 * PAD);
              return `${x},${y}`;
            })
            .join(' ')}
          fill="none"
          stroke="#4c6b52"
          strokeWidth="2"
        />

        {/* Points */}
        {phases.map((p, i) => {
          const x = PAD + (p.startSeconds / totalSeconds) * (W - 2 * PAD);
          const y = H - PAD - (p.cumulativeWaterGrams / totalWater) * (H - 2 * PAD);
          return (
            <circle key={i} cx={x} cy={y} r={3} fill="#4c6b52" stroke="#fff" strokeWidth="1" />
          );
        })}
      </svg>

      <div className="flex justify-between mt-2 text-[9px] font-mono text-mut">
        <span>0:00</span>
        <span>{formatTime(totalSeconds)}</span>
      </div>
      <div className="flex justify-between mt-1 text-[9px] font-mono text-mut">
        <span>0 g</span>
        <span>{totalWater} g</span>
      </div>
    </section>
  );
}

function getTotalSeconds(recipe: RecipeConfig): number {
  const match = recipe.time.match(/(\d+):(\d+)\s*$/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : 180;
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}