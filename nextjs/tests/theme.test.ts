import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import {
  nextChoice,
  resolveAppliedTheme,
  THEME_BOOT_SCRIPT,
  THEME_CHOICE_LABEL,
  THEME_CHOICES,
  THEME_STORAGE_KEY,
  type ThemeChoice,
} from '../lib/theme.ts';

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

describe('choice set coherence', () => {
  it('covers every ThemeChoice exactly, in cycle order', () => {
    const expected: ThemeChoice[] = ['system', 'light', 'dark'];
    assert.deepEqual([...THEME_CHOICES], expected);
  });

  it('labels every choice', () => {
    for (const choice of THEME_CHOICES) {
      assert.equal(typeof THEME_CHOICE_LABEL[choice], 'string');
      assert.ok(THEME_CHOICE_LABEL[choice].length > 0);
    }
    assert.equal(Object.keys(THEME_CHOICE_LABEL).length, THEME_CHOICES.length);
  });

  it('cycles exactly along THEME_CHOICES order, wrapping at both ends', () => {
    let choice: ThemeChoice = THEME_CHOICES[0];
    for (let i = 0; i < THEME_CHOICES.length * 2; i++) {
      choice = nextChoice(choice);
      assert.equal(choice, THEME_CHOICES[(i + 1) % THEME_CHOICES.length]);
    }
  });

  it('the boot script targets the same storage key the module uses', () => {
    assert.ok(THEME_BOOT_SCRIPT.includes(THEME_STORAGE_KEY));
  });
});
