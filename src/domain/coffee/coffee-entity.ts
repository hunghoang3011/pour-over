/**
 * Coffee domain entity.
 * Pure domain logic — no React, no Three.js.
 */

export type RoastLevel = 'Light' | 'Extremely Light' | 'Natural' | 'Medium' | 'Dark';

export interface CoffeeOrigin {
  readonly country: string;
  readonly region?: string;
  readonly farm?: string;
  readonly altitudeMeters?: string;
}

export interface CoffeeVariety {
  readonly name: string;
  readonly description?: string;
}

export interface ProcessingMethod {
  readonly altitudeMeters?: string;
  readonly details?: string;
}

export interface RoastProfile {
  readonly level: RoastLevel;
  readonly date?: string;
  readonly details?: string;
}

export interface SensoryProfile {
  readonly acidity: number;      // 0-100
  readonly sweetness: number;    // 0-100
  readonly body: number;         // 0-100
  readonly clarity: number;      // 0-100
}

export interface Coffee {
  readonly id: string;
  readonly shortName: string;
  readonly fullName: string;
  readonly roaster: string;
  readonly roast: RoastProfile;
  readonly origin: CoffeeOrigin;
  readonly variety: CoffeeVariety;
  readonly process: ProcessingMethod;
  readonly tastingNotes: string[];
  readonly beanNote: string;
  readonly goal: string;
  readonly pickDripperId: string;
  readonly why: string;
  readonly adjustNotes: string[];
}

export function validateSensoryProfile(profile: SensoryProfile): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const fields = ['acidity', 'sweetness', 'body', 'clarity'] as const;
  for (const field of fields) {
    const value = profile[field];
    if (value < 0 || value > 100) {
      errors.push(`${field} must be between 0 and 100, got ${value}`);
    }
  }
  return { valid: errors.length === 0, errors };
}

export function formatTastingNotes(notes: string[]): string {
  return notes.join(' • ');
}