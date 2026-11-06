/**
 * Brewing phase discriminated union.
 * Pure domain logic — no React, no Three.js.
 *
 * Each phase has clearly defined timing and water semantics.
 * We distinguish:
 *   - water added during the phase
 *   - cumulative water added
 *   - target cumulative water
 *   - actual measured water
 */

export type BrewingPhaseType = 'bloom' | 'pour' | 'drawdown' | 'immersion' | 'release';

export interface BrewingPhase {
  readonly type: BrewingPhaseType;
  readonly startSeconds: number;      // absolute time when phase starts
  readonly endSeconds: number;        // absolute time when phase ends
  readonly waterAddedGrams: number;   // water added during this phase
  readonly cumulativeWaterGrams: number; // cumulative water at end of phase
  readonly temperatureCelsius: number; // water temperature at start of phase
  readonly agitationLevel: 'low' | 'medium' | 'high';
  readonly note?: string;
}

export type BrewingPhaseTypeLabel = Record<BrewingPhaseType, string>;

export const BREWING_PHASE_LABELS: BrewingPhaseTypeLabel = {
  bloom: 'Bloom',
  pour: 'Rót chính',
  drawdown: 'Xả hạt',
  immersion: 'Ngâm',
  release: 'Mở van',
};

export const BREWING_PHASE_COLORS: BrewingPhaseTypeLabel = {
  bloom: '#8a6d3b',
  pour: '#4c6b52',
  drawdown: '#1a1610',
  immersion: '#a14228',
  release: '#7fb98a',
};

export function phaseDurationSeconds(phase: BrewingPhase): number {
  return phase.endSeconds - phase.startSeconds;
}

export function isPhaseActive(phase: BrewingPhase, elapsedSeconds: number): boolean {
  return elapsedSeconds >= phase.startSeconds && elapsedSeconds < phase.endSeconds;
}

export function isPhaseComplete(phase: BrewingPhase, elapsedSeconds: number): boolean {
  return elapsedSeconds >= phase.endSeconds;
}