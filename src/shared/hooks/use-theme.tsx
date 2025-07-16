import { useEffect, useState } from 'react';

import { getCurrentSystemTheme } from '../utils/util-systemTheme';

export function useTheme(initial = 'system') {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return initial;
    return localStorage.getItem('theme') || initial;
  });

  useEffect(() => {
    const root = document.documentElement;

    function applyTheme(theme: string) {
      root.classList.remove('light', 'dark');

      if (theme === 'system') {
        const currentTheme = getCurrentSystemTheme();
        root.classList.add(currentTheme);
      } else {
        root.classList.add(theme);
      }
    }

    applyTheme(theme);

    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme('system');
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  return [theme, setTheme] as const;
}
