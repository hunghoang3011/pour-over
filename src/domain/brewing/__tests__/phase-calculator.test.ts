import type { RecipeConfig } from '../../../data/recipes/recipes';
import { describe, it, expect } from 'vitest';
import { computePhases } from '../phase-calculator.js';

const recipe: RecipeConfig = {
  k7: 23,
  m40: 46,
  hotWater: 240,
  ice: 0,
  temp: 94,
  time: '2:45–3:15',
  flow: '~4,5–4,9 g/s',
  steps: [],
  notes: [],
};

describe('computePhases', () => {
  it('computes bloom as first phase', () => {
    const phases = computePhases({
      ...recipe,
      steps: [
        ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
        ['0:45', null, 'ĐÓNG VAN trước khi rót main pour.', 'closed'],
        ['0:45–1:25', 240, 'Rót đến 240 g; thêm 195 g; ~4,9 g/s.', null],
        ['2:00', null, 'MỞ VAN, xả hết tự nhiên.', 'open'],
      ],
    });

    expect(phases).toHaveLength(4);
    expect(phases[0].type).toBe('bloom');
    expect(phases[0].startSeconds).toBe(0);
    expect(phases[0].endSeconds).toBe(10);
    expect(phases[0].waterAddedGrams).toBe(45);
  });

  it('marks valve closed as immersion', () => {
    const phases = computePhases({
      ...recipe,
      steps: [
        ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
        ['0:45', null, 'ĐÓNG VAN trước khi rót main pour.', 'closed'],
        ['0:45–1:25', 240, 'Rót đến 240 g; thêm 195 g; ~4,9 g/s.', null],
        ['2:00', null, 'MỞ VAN, xả hết tự nhiên.', 'open'],
      ],
    });

    expect(phases[1].type).toBe('immersion');
  });

  it('marks valve open as release', () => {
    const phases = computePhases({
      ...recipe,
      steps: [
        ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
        ['0:45', null, 'ĐÓNG VAN trước khi rót main pour.', 'closed'],
        ['0:45–1:25', 240, 'Rót đến 240 g; thêm 195 g; ~4,9 g/s.', null],
        ['2:00', null, 'MỞ VAN, xả hết tự nhiên.', 'open'],
      ],
    });

    expect(phases[3].type).toBe('release');
  });

  it('calculates cumulative water correctly', () => {
    const phases = computePhases({
      ...recipe,
      steps: [
        ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
        ['0:45', null, 'ĐÓNG VAN trước khi rót main pour.', 'closed'],
        ['0:45–1:25', 240, 'Rót đến 240 g; thêm 195 g; ~4,9 g/s.', null],
        ['2:00', null, 'MỞ VAN, xả hết tự nhiên.', 'open'],
      ],
    });

    expect(phases[0].cumulativeWaterGrams).toBe(45);
    expect(phases[1].cumulativeWaterGrams).toBe(45);
    expect(phases[2].cumulativeWaterGrams).toBe(240);
    expect(phases[3].cumulativeWaterGrams).toBe(240);
  });

  it('returns empty array for empty steps', () => {
    const phases = computePhases({ ...recipe, steps: [] });
    expect(phases).toEqual([]);
  });
});