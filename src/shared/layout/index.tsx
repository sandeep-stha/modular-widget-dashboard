import { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Layout() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = globalThis.document.documentElement;

    if (theme === 'system') {
      root.classList.remove('light', 'dark');
      if (globalThis.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <div className="w-full max-w-[100dvw] h-[100dvh] overflow-hidden flex flex-col bg-white dark:bg-slate-900 text-black dark:text-white">
      {/* Header */}
      <header className="p-4 flex justify-end items-center gap-4 bg-blue-300 dark:bg-blue-950 sticky top-0 z-10 shadow-md">
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
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-6 flex gap-6">
        {/* Sidebar */}
        <aside className="w-[clamp(250px,_20%,_400px)] bg-red-500 p-4 rounded-lg text-white shadow-md">
          <h2 className="text-lg font-semibold mb-2">Sidebar</h2>
          <p className="text-sm">
            This area can contain navigation or filters.
          </p>
        </aside>

        {/* Main Content */}
        <section className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
          <p className="text-base leading-relaxed">
            This layout supports <strong>light</strong>, <strong>dark</strong>,
            and <strong>system</strong> themes. Resize the window or switch
            themes to see it in action.
          </p>
        </section>
      </main>
    </div>
  );
}
