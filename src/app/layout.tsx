import type { Metadata } from "next";

import "./globals.scss";

export const metadata: Metadata = {
  title: "Next.js Markdown Blog",
  description:
    "This is a blog/portfolio website built using Nextjs 13 in which all the content is stored as markdown files.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
