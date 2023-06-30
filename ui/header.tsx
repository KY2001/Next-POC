import 'server-only';

import Link from 'next/link';
import { Logo } from '@/ui/logo';
import { NavigationBar } from '@/ui/navigation-bar';

export const Header = () => {
  return (
    <header>
      <div className="fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-900/10 bg-white/90 px-6">
        <div className="flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        {/* TODO: もうちょっとnavigation-barは左にあったほうが良い気がする */}
        <NavigationBar />
        {/* TODO: ボタンのクリック時の挙動に改善の余地あり */}
        <Link
          href="/register"
          className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2  focus:ring-gray-600 focus:ring-offset-2"
        >
          Register →
        </Link>
      </div>
    </header>
  );
};
