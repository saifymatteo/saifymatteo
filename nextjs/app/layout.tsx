import type { Metadata } from 'next';
import { Inter, Fira_Code, Cookie } from 'next/font/google';
import './globals.css';

const interSans = Inter({
  variable: '--font-inter-sans',
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
});

const cookie = Cookie({
  weight: '400',
  variable: '--font-cookie',
});

export const metadata: Metadata = {
  title: 'Saiful Mashuri',
  description: `
    Software Engineer specializing in Flutter and Dart cross-platform development,
    and GraphQL-based front-end architecture. Proven track record of measurable impact:
    7x GraphQL payload reduction, 30%+ efficiency gains, 50%+ less repetitive code
    through shared code initiatives, consistently delivering software with an estimated
    98% quality and accuracy, maintaining core libraries, and mentoring frontend teams.
    Harvard CS50x graduate (2021), led a 6-person front-end team.
    `,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${firaCode.variable} ${cookie.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
