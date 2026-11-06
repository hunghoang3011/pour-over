/**
 * BrewingRecipe — domain entity cho công thức pha chế.
 * Pure domain logic — không phụ thuộc React/Three.
 */

import type { BrewingPhase, BrewingPhaseType } from './brewing-phase.js';

export type DripperId = 'switch-hot' | 'v60-hot' | 'flat-hot' | 'switch-iced' | 'v60-iced' | 'flat-iced';
export type CoffeeId = 'karina' | 'sidra' | 'kenya' | 'hachi';

export interface BrewingRecipe {
  readonly id: string;
  readonly coffeeId: CoffeeId;
  readonly dripperId: DripperId;
  readonly coffeeDoseGrams: number;
  readonly hotWaterGrams: number;
  readonly iceGrams: number;
  readonly totalWaterGrams: number;
  readonly ratioDenominator: number;
  readonly temperatureCelsius: number;
  readonly finishWindow: string;
  readonly flowRate?: string;
  readonly phases: BrewingPhase[];
  readonly notes: string[];
  readonly isPick: boolean;
}

export function totalWater(recipe: BrewingRecipe): number {
  return recipe.hotWaterGrams + recipe.iceGrams;
}

export function ratioString(recipe: BrewingRecipe): string {
  const ratio = (recipe.totalWaterGrams / recipe.coffeeDoseGrams).toFixed(1);
  return `1:${ratio.replace('.', ',')}`;
}

export function phaseByType(recipe: BrewingRecipe, type: BrewingPhaseType): BrewingPhase | undefined {
  return recipe.phases.find((p) => p.type === type);
}

export function totalPhaseWater(recipe: BrewingRecipe): number {
  return recipe.phases.reduce((sum, p) => sum + p.waterAddedGrams, 0);
}