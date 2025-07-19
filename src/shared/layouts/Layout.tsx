import { Header } from './components';
import { MainUI } from './components/Main';

export function Layout() {
  return (
    <div className="w-full max-w-[100dvw] h-[100dvh] overflow-hidden flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
      <Header />

      <MainUI />
    </div>
  );
}
