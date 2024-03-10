import type { Metadata } from 'next';

import { Footer, Header } from '@/components';

import './globals.scss';

export const metadata: Metadata = {
  title: 'Next.js Markdown Blog',
  description:
    'This is a blog/portfolio website built using Nextjs 13 in which all the content is stored as markdown files.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
