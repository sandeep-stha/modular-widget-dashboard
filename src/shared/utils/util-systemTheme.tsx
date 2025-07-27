import { ESystemTheme } from '../enums';

export function getCurrentSystemThemeUtil() {
  const isSystemDarkThemed = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return isSystemDarkThemed ? ESystemTheme.DARK : ESystemTheme.LIGHT;
}
