import { useCallback, useEffect, useState } from 'react';
import type { Coffee, Dripper } from '../../data/recipes/recipes';
import { DRIPPERS, COFFEES } from '../../data/recipes/recipes';

interface NavigationProps {
  coffee: string;
  dripper: string;
  onCoffeeChange: (id: string) => void;
  onDripperChange: (id: string) => void;
}

export function Navigation({ coffee, dripper, onCoffeeChange, onDripperChange }: NavigationProps) {
  const savedTheme = localStorage.getItem('po-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
  const [isDark, setIsDark] = useState(initialDark);

  const toggleTheme = useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    localStorage.setItem('po-theme', next ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }, [isDark]);


  const currentCoffee = COFFEES.find((c: Coffee) => c.id === coffee);
  const pickId = currentCoffee?.pick;

  return (
    <div className="sticky top-0 z-50 bg-paper/92 backdrop-blur-md border-b border-hair">
      <div className="flex flex-col gap-3 py-3">
        <div className="flex justify-between items-start gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-mut">Hạt</span>
          <button
            onClick={toggleTheme}
            aria-label="Đổi giao diện sáng/tối"
            className="w-8 h-8 rounded-full border border-hair flex items-center justify-center text-mut hover:text-ink transition-colors"
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" onScroll={handleScroll}>
          {COFFEES.map((c: Coffee, index: number) => (
            <button
              key={c.id}
              onClick={() => onCoffeeChange(c.id)}
              aria-pressed={c.id === coffee}
              className={`flex flex-col gap-1 px-3 py-2 min-w-[110px] rounded-lg border text-left transition-all ${c.id === coffee ? 'bg-ink border-ink text-paper' : 'bg-paper-2 border-hair text-ink hover:border-mut'}`}
            >
              <span className="text-[9px] font-mono font-bold text-acc tracking-wider">0{index + 1}</span>
              <span className="font-semibold text-ink leading-tight">{c.short}</span>
              <span className="text-[10px] text-mut leading-none">{c.roast}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between items-start gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-mut">
            Kiểu pha
            {currentCoffee && pickId === dripper && (
              <span className="ml-1 text-[10px] font-bold text-acc">★</span>
            )}
          </span>
          <span className="text-[10px] text-mut flex items-center gap-1">
            ★ ưu tiên thử
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" onScroll={handleScroll}>
          {DRIPPERS.map((d: Dripper) => {
            const isSelected = d.id === dripper;
            const isPick = pickId === d.id;
            return (
              <button
                key={d.id}
                onClick={() => onDripperChange(d.id)}
                aria-pressed={isSelected}
                className={`flex flex-row items-center gap-2 min-w-[90px] rounded-lg border text-left transition-all ${isSelected ? 'bg-ink border-ink text-paper' : 'bg-paper-2 border-hair text-ink-2 hover:border-mut'} ${isPick && isSelected ? 'ring-2 ring-acc' : ''}`}
              >
                {isPick && <span className="text-[10px] font-bold text-acc">★</span>}
                {d.ice && <span className="w-2 h-2 rounded-full bg-acc" />}
                <span className="font-semibold leading-tight">{d.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function handleScroll(e: React.UIEvent<HTMLDivElement>) {
  const box = e.currentTarget as HTMLElement;
  const sel = box.querySelector('[aria-pressed="true"]') as HTMLElement;
  if (sel && box.scrollWidth > box.clientWidth) {
    box.scrollLeft = sel.offsetLeft - box.clientWidth / 2 + sel.clientWidth / 2;
  }
}