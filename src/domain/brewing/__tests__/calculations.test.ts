import { describe, it, expect } from 'vitest';
import {
  calculateTotalWaterGrams,
  calculateCumulativeWaterGrams,
  validatePhaseSequence,
  totalPhaseWaterGrams,
} from '../calculations.js';

describe('calculateTotalWaterGrams', () => {
  it('calculates total water from coffee dose and ratio', () => {
    expect(calculateTotalWaterGrams({ coffeeDoseGrams: 18, ratioDenominator: 16 })).toBe(288);
    expect(calculateTotalWaterGrams({ coffeeDoseGrams: 20, ratioDenominator: 15 })).toBe(300);
    expect(calculateTotalWaterGrams({ coffeeDoseGrams: 15, ratioDenominator: 17 })).toBe(255);
  });

  it('rejects a zero coffee dose', () => {
    expect(() => calculateTotalWaterGrams({ coffeeDoseGrams: 0, ratioDenominator: 16 })).toThrow(
      'Coffee dose must be greater than 0'
    );
  });

  it('rejects a negative coffee dose', () => {
    expect(() => calculateTotalWaterGrams({ coffeeDoseGrams: -5, ratioDenominator: 16 })).toThrow(
      'Coffee dose must be greater than 0'
    );
  });

  it('rejects an invalid ratio', () => {
    expect(() => calculateTotalWaterGrams({ coffeeDoseGrams: 15, ratioDenominator: 0 })).toThrow(
      'Ratio denominator must be greater than 0'
    );
  });
});

describe('calculateCumulativeWaterGrams', () => {
  it('calculates cumulative water from phase additions', () => {
    expect(calculateCumulativeWaterGrams({ phaseAdditionsGrams: [45, 195, 0] })).toEqual([45, 240, 240]);
    expect(calculateCumulativeWaterGrams({ phaseAdditionsGrams: [45, 95, 100] })).toEqual([45, 140, 240]);
  });

  it('cumulative water is monotonically non-decreasing', () => {
    const result = calculateCumulativeWaterGrams({ phaseAdditionsGrams: [10, 20, 30] });
    for (let i = 1; i < result.length; i++) {
      expect(result[i]).toBeGreaterThanOrEqual(result[i - 1]);
    }
  });

  it('rejects negative additions', () => {
    expect(() =>
      calculateCumulativeWaterGrams({ phaseAdditionsGrams: [45, -10] })
    ).toThrow('Phase addition cannot be negative');
  });

  it('handles empty additions', () => {
    expect(calculateCumulativeWaterGrams({ phaseAdditionsGrams: [] })).toEqual([]);
  });
});

describe('validatePhaseSequence', () => {
  it('accepts a valid phase sequence', () => {
    const result = validatePhaseSequence({
      phases: [
        { type: 'bloom', startSeconds: 0, endSeconds: 10, waterAddedGrams: 45 },
        { type: 'pour', startSeconds: 10, endSeconds: 45, waterAddedGrams: 195 },
        { type: 'drawdown', startSeconds: 45, endSeconds: 195, waterAddedGrams: 0 },
      ],
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('rejects overlapping phases', () => {
    const result = validatePhaseSequence({
      phases: [
        { type: 'bloom', startSeconds: 0, endSeconds: 10, waterAddedGrams: 45 },
        { type: 'pour', startSeconds: 5, endSeconds: 45, waterAddedGrams: 195 },
      ],
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Phase "pour" starts at 5s but previous phase ended at 10s');
  });

  it('rejects end time not after start time', () => {
    const result = validatePhaseSequence({
      phases: [
        { type: 'bloom', startSeconds: 10, endSeconds: 5, waterAddedGrams: 45 },
      ],
    });
    expect(result.errors).toContain('Phase "bloom" end time (5s) must be after start time (10s)');
  });

  it('accepts empty sequence', () => {
    const result = validatePhaseSequence({ phases: [] });
    expect(result.valid).toBe(true);
  });
});

describe('totalPhaseWaterGrams', () => {
  it('sums all phase additions', () => {
    expect(totalPhaseWaterGrams([45, 195, 0])).toBe(240);
    expect(totalPhaseWaterGrams([45, 95, 100])).toEqual(240);
  });

  it('returns 0 for empty additions', () => {
    expect(totalPhaseWaterGrams([])).toBe(0);
  });
});