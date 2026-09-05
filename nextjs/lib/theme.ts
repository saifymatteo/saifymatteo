/**
 * Theme choice state and resolution.
 *
 * The Theme choice is three-way: System, Light or Dark (see CONTEXT.md,
 * "Theme choice"). Only an explicit Light or Dark choice is stored; System
 * is the absence of a stored value, so picking System deletes the key.
 */

export type ThemeChoice = 'system' | 'light' | 'dark';
export type AppliedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

/**
 * The Theme choices, in cycle order (System → Light → Dark). The ordered set
 * IS the cycle: `nextChoice` wraps through this array, so adding a choice
 * here extends the cycle and every menu that maps this set at once.
 */
export const THEME_CHOICES = [
  'system',
  'light',
  'dark',
] as const satisfies readonly ThemeChoice[];

/** Human-facing label per choice (mobile menu text, toggle aria-label). */
export const THEME_CHOICE_LABEL: Record<ThemeChoice, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

/**
 * Resolves the palette to apply: an explicit stored choice wins over the
 * device preference; with no stored choice the device preference decides.
 */
export function resolveAppliedTheme(
  stored: 'light' | 'dark' | undefined,
  prefersDark: boolean
): AppliedTheme {
  if (stored === 'light' || stored === 'dark') return stored;
  return prefersDark ? 'dark' : 'light';
}

/** The next choice in the cycle, derived from the THEME_CHOICES order. */
export function nextChoice(choice: ThemeChoice): ThemeChoice {
  const index = THEME_CHOICES.indexOf(choice);
  return THEME_CHOICES[(index + 1) % THEME_CHOICES.length];
}

/**
 * Reads the stored choice. A missing, invalid or unreadable value (private
 * browsing) means System.
 */
export function readThemeChoice(): ThemeChoice {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  } catch {
    return 'system';
  }
}

/**
 * Applies a choice: stores or removes it, then paints the resolved palette
 * immediately. Storage failures still apply the palette for this visit.
 */
export function applyThemeChoice(choice: ThemeChoice): AppliedTheme {
  try {
    if (choice === 'system') {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_STORAGE_KEY, choice);
    }
  } catch {
    // Storage unavailable: the palette still applies for this visit.
  }
  const applied = resolveAppliedTheme(
    choice === 'system' ? undefined : choice,
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  document.documentElement.setAttribute('data-theme', applied);
  themeChoiceListeners.forEach((listener) => listener());
  return applied;
}

const themeChoiceListeners = new Set<() => void>();

/**
 * Subscribes to theme-choice changes: same-tab applies and cross-tab storage
 * edits both notify. Returns an unsubscribe function.
 */
export function subscribeToThemeChoice(listener: () => void): () => void {
  themeChoiceListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    themeChoiceListeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

/**
 * Pre-paint boot script: applies the stored choice or the device preference
 * and keeps following the device while no explicit choice is stored. Kept as
 * a string so it can run synchronously in the document head, before React.
 */
export const THEME_BOOT_SCRIPT = `(function () {
  var KEY = ${JSON.stringify(THEME_STORAGE_KEY)};
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  function stored() {
    try {
      var value = localStorage.getItem(KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (error) {
      return null;
    }
  }
  function apply() {
    var value = stored();
    root.setAttribute('data-theme', value !== null ? value : media.matches ? 'dark' : 'light');
  }
  apply();
  media.addEventListener('change', apply);
})();`;
