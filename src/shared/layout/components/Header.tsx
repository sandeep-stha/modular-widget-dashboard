import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/shared/hooks';

export function Header() {
  const [theme, setTheme] = useTheme();

  return (
    <header className="flex justify-between items-center gap-4 bg-blue-300 dark:bg-slate-900 shadow-md p-4 sticky top-0 z-10">
      <h1 className="text-3xl text-blue-950 dark:text-white font-extrabold">
        Modular Widget Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <p>Theme</p>
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
}
