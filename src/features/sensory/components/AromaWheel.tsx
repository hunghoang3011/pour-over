/**
 * AromaWheel — vòng tròn phân cấp hương vị (aroma wheel).
 * Pure React + SVG, không phụ thuộc Three.
 * Khi chọn một note, highlight nhóm hương tương ứng.
 */

import type { Coffee } from '../../../data/recipes/recipes';

interface AromaWheelProps {
  coffee: Coffee;
}

const AROMA_GROUPS = {
  floral: { color: '#8a6d3b', notes: ['hoa cam', 'jasmine', 'rose', 'bergamot'] },
  citrus: { color: '#c44b2e', notes: ['citrus', 'pomelo', 'orange', 'lemon'] },
  fruit: { color: '#4c6b52', notes: ['peach', 'pineapple', 'grape', 'passion', 'melon'] },
  sweet: { color: '#a07c14', notes: ['honey', 'sweet', 'caramel', 'honeydew'] },
  mint: { color: '#3d6b4f', notes: ['mint', 'herbal', 'tea'] },
} as const;

type AromaGroupKey = keyof typeof AROMA_GROUPS;

function getNoteGroup(note: string): AromaGroupKey | null {
  const lower = note.toLowerCase();
  for (const [key, group] of Object.entries(AROMA_GROUPS) as [AromaGroupKey, (typeof AROMA_GROUPS)[keyof typeof AROMA_GROUPS]][]) {
    if (group.notes.some((n) => lower.includes(n))) return key;
  }
  return null;
}

export function AromaWheel({ coffee }: AromaWheelProps) {
  const notes = coffee.tasting.split('•').map((n) => n.trim());

  const groups = new Set<AromaGroupKey>(notes.map(getNoteGroup).filter((g): g is AromaGroupKey => g != null));

  return (
    <section className="bg-paper-2 border border-hair rounded-xl p-4">
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-mut mb-3">Aroma Wheel</h3>
      <div className="flex flex-col items-center gap-3">
        <svg
          viewBox="0 0 200 200"
          className="w-48 h-48"
          role="img"
          aria-label="Vòng tròn hương vị"
        >
          <circle cx="100" cy="100" r="70" fill="none" stroke="#d9ceb8" strokeWidth="1" />
          {Object.entries(AROMA_GROUPS).map(([key, group]) => {
            const active = groups.has(key as AromaGroupKey);
            const angle = (Object.keys(AROMA_GROUPS).indexOf(key) / Object.keys(AROMA_GROUPS).length) * 360 - 45;
            const x = 100 + 40 * Math.cos((angle * Math.PI) / 180);
            const y = 100 + 40 * Math.sin((angle * Math.PI) / 180);
            return (
              <g key={key}>
                <circle
                  cx={x}
                  cy={y}
                  r={14}
                  fill={active ? group.color : 'transparent'}
                  stroke={group.color}
                  strokeWidth={active ? 2 : 1}
                />
                <text
                  x={x}
                  cy={y}
                  fontSize="8"
                  fontFamily="var(--font-mono)"
                  textAnchor="middle"
                  dy="0.3em"
                  fill={active ? '#1a1610' : '#8c7f6c'}
                  fontWeight={active ? 600 : 400}
                >
                  {key[0].toUpperCase()}
                </text>
              </g>
            );
          })}
          <circle cx="100" cy="100" r="30" fill="none" stroke="#d9ceb8" strokeWidth="0.5" />
        </svg>
        <div className="flex flex-wrap gap-2 justify-center">
          {notes.map((note) => {
            const group = getNoteGroup(note);
            const active = group ? groups.has(group) : false;
            return (
              <span
                key={note}
                className={`px-2 py-1 rounded-full border text-[11px] font-medium ${
                  active
                    ? flavorClass(note)
                    : 'bg-hair text-mut border-hair'
                }`}
              >
                {note}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function flavorClass(note: string): string {
  const key = getNoteGroup(note);
  const colors: Record<AromaGroupKey, string> = {
    floral: 'bg-purple-200 text-purple-800 border-purple-300',
    citrus: 'bg-orange-200 text-orange-800 border-orange-300',
    fruit: 'bg-emerald-200 text-emerald-800 border-emerald-300',
    sweet: 'bg-amber-200 text-amber-800 border-amber-300',
    mint: 'bg-cyan-200 text-cyan-800 border-cyan-300',
  };
  return key ? colors[key] : 'bg-hair text-mut border-hair';
}