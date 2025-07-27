import { Computer, Moon, Sun } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ESystemTheme } from '@/shared/enums';
import { useTheme } from '@/shared/hooks';

export function Header() {
  const [theme, setTheme] = useTheme();

  return (
    <header className="flex justify-between items-center gap-4 bg-blue-300 dark:bg-slate-900 shadow-md p-4 sticky top-0 z-10">
      <h1 className="text-3xl text-blue-950 dark:text-white font-extrabold">
        💻 &nbsp; Modular Widget Dashboard &nbsp;🛠️
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex w-fit">
          <p className="inline-flex gap-x-2 content-center">
            Theme
            <Tooltip>
              <TooltipTrigger asChild>
                {themeIconSwitcher(theme)}
              </TooltipTrigger>
              <TooltipContent>
                <span className="inline-block">
                  Please select an option to change the theme
                </span>
              </TooltipContent>
            </Tooltip>
          </p>
        </div>

        <Select onValueChange={setTheme} value={theme}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">
              Light {themeIconSwitcher(ESystemTheme.LIGHT)}
            </SelectItem>
            <SelectItem value="dark">
              Dark {themeIconSwitcher(ESystemTheme.DARK)}
            </SelectItem>
            <SelectItem value="system">
              System {themeIconSwitcher(ESystemTheme.SYSTEM)}
            </SelectItem>
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
        return <Computer />;
      }

      default: {
        return <Sun />;
      }
    }
  }
}
