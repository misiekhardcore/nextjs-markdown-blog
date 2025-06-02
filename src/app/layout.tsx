import { ReactNode } from 'react';
import type { Metadata } from 'next';

import { Footer, Header } from '@/components';

import './globals.scss';
import './layout.scss';

export const metadata: Metadata = {
  title: 'Next.js Markdown Blog',
  description:
    'This is a blog/portfolio website built using Nextjs 13 in which all the content is stored as markdown files.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="RootLayout grid">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
