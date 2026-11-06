/**
 * zustand store — trạng thái pha chế (brewing state).
 * Pure zustand, không phụ thuộc React/Three.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BrewState {
  coffeeId: string;
  dripperId: string;
  setCoffee: (id: string) => void;
  setDripper: (id: string) => void;
}

const defaultCoffee = 'karina';
const defaultDripper = 'switch-hot';

export const useBrewStore = create<BrewState>()(
  persist(
    (set) => ({
      coffeeId: defaultCoffee,
      dripperId: defaultDripper,
      setCoffee: (id: string) => set({ coffeeId: id }),
      setDripper: (id: string) => set({ dripperId: id }),
    }),
    { name: 'pourover-brew-store' }
  )
);