/**
 * Pure brewing calculation functions.
 * No React, no Three.js dependencies.
 * All units: grams, Celsius, seconds, grams per second.
 */

export interface RatioCalculationInput {
  readonly coffeeDoseGrams: number;
  readonly ratioDenominator: number;
}

export function calculateTotalWaterGrams(input: RatioCalculationInput): number {
  if (input.coffeeDoseGrams <= 0) {
    throw new Error('Coffee dose must be greater than 0');
  }
  if (input.ratioDenominator <= 0) {
    throw new Error('Ratio denominator must be greater than 0');
  }
  return input.coffeeDoseGrams * input.ratioDenominator;
}

export interface CumulativeWaterInput {
  readonly phaseAdditionsGrams: number[];
}

export function calculateCumulativeWaterGrams(input: CumulativeWaterInput): number[] {
  const cumulative: number[] = [];
  let running = 0;
  for (const addition of input.phaseAdditionsGrams) {
    if (addition < 0) {
      throw new Error('Phase addition cannot be negative');
    }
    running += addition;
    cumulative.push(running);
  }
  return cumulative;
}

export interface PhaseSequenceInput {
  readonly phases: Array<{
    readonly type: string;
    readonly startSeconds: number;
    readonly endSeconds: number;
    readonly waterAddedGrams: number;
  }>;
}

export function validatePhaseSequence(input: PhaseSequenceInput): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  let prevEnd = 0;

  for (const phase of input.phases) {
    if (phase.startSeconds < prevEnd) {
      errors.push(
        `Phase "${phase.type}" starts at ${phase.startSeconds}s but previous phase ended at ${prevEnd}s`
      );
    }
    if (phase.endSeconds <= phase.startSeconds) {
      errors.push(
        `Phase "${phase.type}" end time (${phase.endSeconds}s) must be after start time (${phase.startSeconds}s)`
      );
    }
    prevEnd = phase.endSeconds;
  }

  return { valid: errors.length === 0, errors };
}

export function totalPhaseWaterGrams(phaseAdditions: number[]): number {
  return phaseAdditions.reduce((sum, addition) => sum + addition, 0);
}