/**
 * BrewSimulator — mô phỏng pha rót theo thời gian.
 * Pure React + CSS animation, no Three.js dependency for the simulation logic.
 * Displays pouring timeline, cumulative water progress, and valve status.
 */

import { useEffect, useState, useCallback } from 'react';
import type { Dripper, RecipeConfig } from '@/data/recipes/recipes.js';
import { computePhases } from '../../../domain/brewing/phase-calculator.js';

interface BrewSimulatorProps {
  dripper: Dripper;
  recipe: RecipeConfig;
}

export function BrewSimulator({ dripper, recipe }: BrewSimulatorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentWater, setCurrentWater] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('Sẵn sàng');
  const [currentValve, setCurrentValve] = useState<'open' | 'closed' | null>(null);

  const phases = computePhases(recipe);
  const totalSeconds = getTotalSeconds(recipe);

  useEffect(() => {
    if (!isPlaying) return;
    let raf: number;
    let start = performance.now();
    let elapsed = 0;

    function loop(now: number) {
      if (!start) start = now;
      elapsed = (now - start) / 1000;
      if (elapsed >= totalSeconds) {
        setProgress(1);
        setCurrentWater(recipe.hotWater + recipe.ice);
        setCurrentPhase('Hoàn tất');
        setCurrentValve(null);
        setIsPlaying(false);
        return;
      }
      const p = elapsed / totalSeconds;
      setProgress(p);
      setCurrentWater(Math.round((recipe.hotWater + recipe.ice) * p));
      setCurrentPhase(phaseAt(elapsed, phases));
      setCurrentValve(valveAt(elapsed, phases));
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, recipe, totalSeconds, phases]);

  const replay = useCallback(() => {
    setProgress(0);
    setCurrentWater(0);
    setCurrentPhase('Sẵn sàng');
    setCurrentValve(null);
    setIsPlaying(false);
  }, []);

  return (
    <section className="bg-paper border border-hair rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-mut">Mô phỏng pha rót</h3>
        <span className="text-[10px] text-mut">minh hoá theo lịch</span>
      </div>

      {/* Water progress bar */}
      <div className="w-full bg-hair rounded-full h-2 overflow-hidden mb-2">
        <div
          className={`h-full bg-acc transition-all duration-100 ${isPlaying ? 'animate-pulse' : ''}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Phase info */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center gap-2 px-2 py-0.5 rounded text-[9px] font-bold text-paper ${phaseColor(currentPhase)}`}
        >
          {currentPhase}
        </span>
        <span className="text-[10px] font-mono text-ink">
          {currentWater} g / {recipe.hotWater + recipe.ice} g
        </span>
      </div>

      {/* Valve status */}
      {dripper.id.startsWith('switch') && (
        <div className="mb-3">
          <span className={`text-[9px] font-bold uppercase tracking-wider text-mut block mb-1`}>Van</span>
          <span
            className={`px-2 py-0.5 rounded text-[9px] font-bold ${
              currentValve === 'closed'
                ? 'text-terracotta border border-terracotta/30 bg-terracotta/10'
                : 'text-acc-ink border border-acc/30 bg-acc/10'
            }`}
          >
            {currentValve === 'closed' ? '▼ van đóng' : '▲ mở van'}
          </span>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex-1 py-2 bg-ink text-paper text-xs font-bold rounded hover:bg-ink-2 transition-colors"
          aria-label={isPlaying ? 'Tạm dừng' : 'Bắt đầu mô phỏng'}
        >
          {isPlaying ? '⏸ Tạm dừng' : '▶ Chạy mô phỏng'}
        </button>
        <button
          onClick={replay}
          className="px-3 py-2 bg-paper-2 border border-hair text-mut text-xs font-bold rounded hover:border-mut transition-colors"
          aria-label="Chơi lại"
        >
          ↺ Chơi lại
        </button>
      </div>

      <p className="text-[11px] text-mut mt-2">
        {isPlaying ? 'Đang mô phỏng…' : 'Bấm “Chạy mô phỏng” để xem diễn biến nước trong phễu.'}
      </p>
    </section>
  );
}

function phaseColor(phase: string): string {
  if (phase === 'Bloom') return '#8a6d3b';
  if (phase === 'Đang rót') return '#4c6b52';
  if (phase === 'Xả') return '#1a1610';
  if (phase === 'Hoàn tất') return '#8c7f6c';
  return '#8c7f6c';
}

function phaseAt(t: number, phases: { startSeconds: number; endSeconds: number; type: string }[]): string {
  for (const phase of phases) {
    if (t >= phase.startSeconds && t < phase.endSeconds) {
      if (phase.type === 'bloom') return 'Bloom';
      if (phase.type === 'drawdown') return 'Xả';
      if (phase.type === 'release') return 'Mở van';
      return 'Đang rót';
    }
  }
  return 'Hoàn tất';
}

function valveAt(t: number, phases: { startSeconds: number; endSeconds: number; valve?: string }[]): 'open' | 'closed' | null {
  for (const phase of phases) {
    if (t >= phase.startSeconds && t < phase.endSeconds) {
      return (phase.valve as 'open' | 'closed' | null) ?? null;
    }
  }
  return null;
}

function getTotalSeconds(recipe: RecipeConfig): number {
  const match = recipe.time.match(/(\d+):(\d+)\s*$/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : 180;
}