/**
 * CoffeeCard — hồ sơ hạt cà phê với nguồn gốc, giống, xử lý, độ cao, hương vị.
 * Pure React, no Three.js.
 */

import type { Coffee } from '../../../data/recipes/recipes.js';

interface CoffeeCardProps {
  coffee: Coffee;
}

const FLAVOR_COLORS: Record<string, string> = {
  floral: 'bg-purple-200 text-purple-800 border-purple-300',
  citrus: 'bg-orange-200 text-orange-800 border-orange-300',
  fruit: 'bg-emerald-200 text-emerald-800 border-emerald-300',
  sweet: 'bg-amber-200 text-amber-800 border-amber-300',
  mint: 'bg-cyan-200 text-cyan-800 border-cyan-300',
};

function flavorClass(note: string): string {
  const key = Object.keys(FLAVOR_COLORS).find((k) => note.toLowerCase().includes(k));
  return key ? FLAVOR_COLORS[key] : 'bg-hair text-mut border-hair';
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const notes = coffee.tasting.split('•').map((n) => n.trim());

  return (
    <article className="bg-paper-2 border border-hair rounded-xl p-5 overflow-hidden">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[9px] font-bold uppercase tracking-wider text-mut">
          {coffee.roast}
        </span>
        {coffee.alt && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-mut flex items-center gap-1">
            ↗ {coffee.alt} masl
          </span>
        )}
      </div>

      <h2 className="font-serif text-[20px] font-semibold leading-tight text-ink mb-2">
        {coffee.name.replace(/^Colombia |^Kenya /, '')}
      </h2>

      {/* Origin info */}
      <div className="mb-3">
        <p className="text-[11px] font-mono text-mut mb-1">
          {coffee.roaster} · {coffee.variety} · {coffee.process}
        </p>
        {coffee.origin && (
          <p className="text-[11px] font-mono text-mut">
            {coffee.origin} · {coffee.alt || ''}
          </p>
        )}
      </div>

      {/* Flavor tags */}
      <div className="flex flex-wrap gap-2 mb-2.5">
        {notes.map((note) => (
          <span key={note} className={`px-2.5 py-1 rounded-full border text-[11px] font-medium ${flavorClass(note)}`}>
            {note}
          </span>
        ))}
      </div>

      <p className="text-[12.5px] text-mut leading-relaxed">{coffee.goal}</p>

      <div className="mt-3 border-t border-hair pt-3">
        <p className="text-[11px] text-mut leading-relaxed">
          <span className="font-semibold text-ink">Lưu ý hạt —</span> {coffee.beanNote}
        </p>
      </div>
    </article>
  );
}