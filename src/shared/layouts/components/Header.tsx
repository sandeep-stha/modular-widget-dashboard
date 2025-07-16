import { Moon, Sun } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ESystemTheme } from '@/shared/enums';
import { useTheme } from '@/shared/hooks';
import { getCurrentSystemThemeUtil } from '@/shared/utils/util-systemTheme';

export function Header() {
  const [theme, setTheme] = useTheme();

  return (
    <header className="flex justify-between items-center gap-4 bg-blue-300 dark:bg-slate-900 shadow-md p-4 sticky top-0 z-10">
      <h1 className="text-3xl text-blue-950 dark:text-white font-extrabold">
        💻 &nbsp; Modular Widget Dashboard &nbsp;🛠️
      </h1>

      <div className="flex items-center gap-4">
        <p className="inline-flex gap-2 content-center">
          Theme {themeIconSwitcher(theme)}
        </p>

        <Select onValueChange={setTheme} value={theme}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );

  function themeIconSwitcher(theme: string) {
    switch (theme) {
      case 'light': {
        return <Sun />;
      }

      case 'dark': {
        return <Moon />;
      }
      case 'system': {
        const currentTheme = getCurrentSystemThemeUtil();

        return currentTheme === ESystemTheme.DARK ? <Moon /> : <Sun />;
      }

      default: {
        return <Sun />;
      }
    }
  }
}
