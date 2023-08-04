import 'server-only';

import Link from 'next/link';
import { Logo } from '@/ui/logo';
import { NavigationBar } from '@/ui/navigation-bar';
import { SigninButton } from '@/ui/signin-button';
import pagePath from '@/services/pagePath';

export const Header = (): JSX.Element => {
  return (
    <header>
      <div className="fixed top-0 z-10 grid h-16 w-full grid-cols-3 items-center justify-between border-b border-slate-900/10 bg-white/90 px-6">
        <div className="flex items-center justify-start">
          <Link href={pagePath.home}>
            <Logo />
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <NavigationBar />
          {/* TODO: ボタンのクリック時の挙動に改善の余地あり */}
        </div>
        <SigninButton />
      </div>
    </header>
  );
};
