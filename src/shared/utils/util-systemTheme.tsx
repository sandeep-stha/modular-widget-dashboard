import { ESystemTheme } from '../enums';

export function getCurrentSystemThemeUtil() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return isDark ? ESystemTheme.DARK : ESystemTheme.LIGHT;
}
