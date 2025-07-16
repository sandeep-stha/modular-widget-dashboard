import { ESystemTheme } from '../enums';

export function getCurrentSystemTheme() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return isDark ? ESystemTheme.DARK : ESystemTheme.LIGHT;
}
