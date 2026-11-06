/**
 * Dripper domain entity.
 * Pure domain logic — no React, no Three.js.
 */

export type DripperType = 'switch' | 'v60' | 'flat-bottom';
export type IceType = 'hot' | 'iced';

export interface FilterPaper {
  readonly type: string;
  readonly notes?: string;
}

export interface Dripper {
  readonly id: string;
  readonly name: string;
  readonly type: DripperType;
  readonly ice: IceType;
  readonly paper: FilterPaper;
  readonly coneAngleDegrees?: number;
  readonly outletHoles?: number;
  readonly bedHeightMm?: number;
  readonly prepInstructions: string;
}

export function isIcedDripper(dripper: Dripper): boolean {
  return dripper.ice === 'iced';
}

export function isSwitchDripper(dripper: Dripper): boolean {
  return dripper.type === 'switch';
}