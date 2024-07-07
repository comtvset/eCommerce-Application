import { getCurrencySymbol } from 'src/utils/CurrencyUtils.ts';
import { describe, it, expect } from 'vitest';

describe('getCurrencySymbol function', () => {
  it('returns correct symbol for valid currency codes', () => {
    expect(getCurrencySymbol('USD')).toBe('$');
    expect(getCurrencySymbol('EUR')).toBe('€');
    expect(getCurrencySymbol('GBP')).toBe('£');
  });

  it('returns undefined for invalid or undefined currency codes', () => {
    expect(getCurrencySymbol(undefined)).toBe(undefined);
    expect(getCurrencySymbol('')).toBe(undefined);
    expect(getCurrencySymbol('TEST')).toBe(undefined);
  });
});
