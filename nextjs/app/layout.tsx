import AppNavigationBar from '@/app/components/navigation_bar';
import Footer from '@/app/components/footer';
import MotionProvider from '@/app/components/motion_provider';
import { THEME_BOOT_SCRIPT } from '@/lib/theme';
import type { Metadata, Viewport } from 'next';
import { Fira_Sans, Fira_Code, Cookie } from 'next/font/google';
import './globals.css';

const firaSans = Fira_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-fira-sans',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
});

const cookie = Cookie({
  weight: '400',
  subsets: ['latin'],
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${firaSans.variable} ${firaCode.variable} ${cookie.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_BOOT_SCRIPT,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <AppNavigationBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
