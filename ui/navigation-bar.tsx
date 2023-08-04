// import 'server-only';

import { TextLink } from '@/ui/text-link';

export const NavigationBar = (): JSX.Element => {
  return (
    <nav className="flex items-center justify-center space-x-4 font-semibold">
      <ul className="flex items-center gap-x-8">
        <li className="hover:text-sky-500 dark:hover:text-sky-400">
          <TextLink linkPath="/page1" string="Page 1" />
        </li>
        <li className="hover:text-sky-500 dark:hover:text-sky-400">
          <TextLink linkPath="/page2" string="Page 2" />
        </li>
        <li className="hover:text-sky-500 dark:hover:text-sky-400">
          <TextLink linkPath="/page3" string="Page 3" />
        </li>
      </ul>
    </nav>
  );
};
