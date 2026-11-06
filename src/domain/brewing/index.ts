export type { BrewingPhase, BrewingPhaseType } from './brewing-phase.js';
export {
  BREWING_PHASE_LABELS,
  BREWING_PHASE_COLORS,
  phaseDurationSeconds,
  isPhaseActive,
  isPhaseComplete,
} from './brewing-phase.js';

export type { BrewingRecipe, DripperId, CoffeeId } from './brewing-recipe.js';
export {
  totalWater,
  ratioString,
  phaseByType,
  totalPhaseWater,
} from './brewing-recipe.js';

export type { RatioCalculationInput, CumulativeWaterInput, PhaseSequenceInput } from './calculations.js';
export {
  calculateTotalWaterGrams,
  calculateCumulativeWaterGrams,
  validatePhaseSequence,
  totalPhaseWaterGrams,
} from './calculations.js';

export { computePhases } from './phase-calculator.js';