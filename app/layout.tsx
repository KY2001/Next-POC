import 'server-only';

import '@/styles/globals.css';
import { Header } from '@/ui/header';

// ↓うまくやるとSEO対策になるらしい：https://commte.net/nextjs-metadata
export const metadata = {
  title: 'Webページのタイトル',
  description: 'Webページの説明',
};

const RootLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <html lang="en">
      <body className="overflow-auto bg-white">
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
