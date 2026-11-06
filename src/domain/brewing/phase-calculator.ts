/**
 * Pure domain: tính toán BrewingPhase[] từ RecipeConfig (steps).
 * Không phụ thuộc React/Three.
 */

import type { BrewingPhase, BrewingPhaseType } from './brewing-phase.js';
import type { RecipeConfig } from '../../data/recipes/recipes';

/**
 * Chuyển đổi step raw từ recipe thành BrewingPhase.
 * steps: [timeRange, waterG or null, note, valve]
 * timeRange: "0:00–0:10" hoặc "0:45" (điểm mốc)
 * waterG: nước cộng dồn tại thời điểm đó (không phải delta)
 */
export function computePhases(recipe: RecipeConfig): BrewingPhase[] {
  const phases: BrewingPhase[] = [];
  let prevEnd = 0;
  let running = 0;

  for (let i = 0; i < recipe.steps.length; i++) {
    const step = recipe.steps[i];
    const [timeRange, waterG, note, valve] = step;
    const [startSec, endSec] = parseTimeRange(timeRange, prevEnd);

    const type: BrewingPhaseType = classifyPhase(
      i === 0 ? 'bloom' : note ?? '',
      valve
    );

    // Khi waterG là null (van đóng), cumulative giữ nguyên giá trị trước đó
    if (waterG !== null && waterG > running) {
      running = waterG;
    }

    phases.push({
      type,
      startSeconds: startSec,
      endSeconds: endSec,
      waterAddedGrams: waterG ?? running,
      cumulativeWaterGrams: running,
      temperatureCelsius: recipe.temp,
      agitationLevel: i === 0 ? 'low' : 'medium',
      note: note ?? undefined,
    });

    prevEnd = endSec;
  }

  return phases;
}

function parseTimeRange(timeRange: string, prevEnd: number): [number, number] {
  const parts = timeRange.split('–').map((s) => s.trim());
  const start = parseTime(parts[0]);
  const end = parts[1] ? parseTime(parts[1]) : prevEnd + 60; // default 60s for single timestamp
  return [start, end];
}

function parseTime(t: string): number {
  const m = t.match(/^(\d+):(\d{2})$/);
  if (!m) return 0;
  return Number(m[1]) * 60 + Number(m[2]);
}

function classifyPhase(note: string, valve: string | null): BrewingPhaseType {
  const lower = (note ?? '').toLowerCase();
  if (lower.includes('bloom')) return 'bloom';
  if (valve === 'closed') return 'immersion';
  if (valve === 'open') return 'release';
  if (lower.includes('xả') || lower.includes('draw')) return 'drawdown';
  return 'pour';
}