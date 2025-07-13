import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useTheme } from '../hooks';

export function Layout() {
  const [theme, setTheme] = useTheme();

  return (
    <div className="w-full max-w-[100dvw] h-[100dvh] overflow-hidden flex flex-col bg-white dark:bg-slate-900 text-black dark:text-white">
      {/* Header */}
      <header className="flex justify-between items-center gap-4 bg-blue-300 dark:bg-blue-950 shadow-md p-4 sticky top-0 z-10 ">
        <h1 className="text-3xl text-blue-950 dark:text-white font-extrabold">
          Modular Widget Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <p>Select Theme</p>
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

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto flex">
        {/* Sidebar */}
        <aside className="w-[clamp(250px,_20%,_400px)] shadow-md bg-blue-200 dark:bg-gray-500 p-4 text-black dark:text-white">
          <h2 className="text-lg font-semibold mb-2">Sidebar</h2>
          <p className="text-sm">This area is sidebar.</p>
        </aside>

        {/* Main Content */}
        <section className="flex-1 bg-blue-100 dark:bg-gray-800 p-4 shadow-md">
          <h1 className="text-2xl font-bold mb-4">Main</h1>
          <p className="text-base leading-relaxed">
            This layout also supports <strong>light</strong>,{' '}
            <strong>dark</strong>, and <strong>system</strong> themes. Try
            switching themes to see it in action.
          </p>
        </section>
      </main>
    </div>
  );
}
