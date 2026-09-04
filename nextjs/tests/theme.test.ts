import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { nextChoice, resolveAppliedTheme } from '../lib/theme.ts';

describe('resolveAppliedTheme', () => {
  it('an explicit stored light choice wins over a dark device preference', () => {
    assert.equal(resolveAppliedTheme('light', true), 'light');
  });

  it('an explicit stored dark choice wins over a light device preference', () => {
    assert.equal(resolveAppliedTheme('dark', false), 'dark');
  });

  it('without a stored choice, a dark device preference applies dark', () => {
    assert.equal(resolveAppliedTheme(undefined, true), 'dark');
  });

  it('without a stored choice, a light device preference applies light', () => {
    assert.equal(resolveAppliedTheme(undefined, false), 'light');
  });
});

describe('nextChoice', () => {
  it('advances System to Light', () => {
    assert.equal(nextChoice('system'), 'light');
  });

  it('advances Light to Dark', () => {
    assert.equal(nextChoice('light'), 'dark');
  });

  it('advances Dark back to System', () => {
    assert.equal(nextChoice('dark'), 'system');
  });

  it('a full cycle from System returns to Light', () => {
    const once = nextChoice('system');
    const twice = nextChoice(once);
    const thrice = nextChoice(twice);
    assert.deepEqual([once, twice, thrice], ['light', 'dark', 'system']);
  });
});
