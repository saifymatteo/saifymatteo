'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/shadcn/menubar';
import {
  Check,
  Circle,
  Menu,
  Moon,
  Sun,
  SunMoon,
  type LucideIcon,
} from 'lucide-react';
import BrandLogo from '@/app/components/brand_logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import {
  applyThemeChoice,
  nextChoice,
  readThemeChoice,
  subscribeToThemeChoice,
  THEME_CHOICE_LABEL,
  THEME_CHOICES,
  type ThemeChoice,
} from '@/lib/theme';

// Icons stay here (lib/theme.ts is UI-free): Record over ThemeChoice is
// exhaustive-checked, so a new choice forces this decision at compile time.
const THEME_CHOICE_ICON: Record<ThemeChoice, LucideIcon> = {
  system: SunMoon,
  light: Sun,
  dark: Moon,
};

const themeIconClass = (active: boolean) =>
  `transition-all origin-center duration-300 ${
    active
      ? 'rotate-y-0 scale-100 opacity-100'
      : 'rotate-y-180 scale-0 opacity-0'
  }`;

export default function AppNavigationBar() {
  const pathHome = '/';
  const pathProjects = '/projects';
  const pathContact = '/contact';

  const themeChoice = useSyncExternalStore<ThemeChoice>(
    subscribeToThemeChoice,
    readThemeChoice,
    () => 'system'
  );

  const cycleTheme = () => applyThemeChoice(nextChoice(themeChoice));

  const currentPath = usePathname();

  return (
    <>
      {/* Phase 2 (ADR-0009): nav chrome is flat — the hairline bottom is the
          only separation; the shadow ladder is gone. */}
      <div className="bg-canvas border-hairline z-nav sticky top-0 flex h-16 items-center border-b">
        <div className="content-max-width flex flex-row items-center justify-between">
          <Link href={pathHome} replace className="ml-2 xl:ml-0">
            <BrandLogo eager alt="Author trademark logo" />
          </Link>
          <div className="sm:flex-ro mr-6 hidden items-center gap-12 sm:flex xl:mr-0">
            <Link
              href={pathProjects}
              className={
                currentPath == pathProjects
                  ? 'underline-slide active relative text-lg font-bold'
                  : 'underline-slide relative text-lg font-semibold'
              }
            >
              Projects
            </Link>
            <Link
              href={pathContact}
              className={
                currentPath == pathContact
                  ? 'underline-slide active relative text-lg font-bold'
                  : 'underline-slide relative text-lg font-semibold'
              }
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={cycleTheme}
              aria-label={`Theme: ${
                THEME_CHOICE_LABEL[themeChoice]
              } — switch to ${THEME_CHOICE_LABEL[nextChoice(themeChoice)]}`}
              className="relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              {/* Icons are HTML-positioned siblings of the ring, not nested <svg>
                  children: CSS transforms on nested SVG elements pivot against
                  the parent viewBox and can rasterize wrong in Chrome. */}
              <Circle size={32} className="stroke-1" />
              {THEME_CHOICES.map((choice) => {
                const Icon = THEME_CHOICE_ICON[choice];
                return (
                  <Icon
                    key={choice}
                    size={16}
                    className={`absolute inset-0 m-auto ${themeIconClass(
                      themeChoice === choice
                    )}`}
                  />
                );
              })}
            </button>
          </div>
          <Menubar className="flex flex-row sm:hidden">
            <MenubarMenu>
              <MenubarTrigger aria-label="Menu">
                <Menu></Menu>
              </MenubarTrigger>
              <MenubarContent className="bg-canvas">
                <Link href={pathProjects}>
                  <MenubarItem>
                    <p
                      className={
                        currentPath == pathProjects
                          ? 'underline-slide active text-xl font-bold'
                          : 'text-xl'
                      }
                    >
                      Projects
                    </p>
                  </MenubarItem>
                </Link>
                <Link href={pathContact}>
                  <MenubarItem>
                    <p
                      className={
                        currentPath == pathContact
                          ? 'underline-slide active text-xl font-bold'
                          : 'text-xl'
                      }
                    >
                      Contact
                    </p>
                  </MenubarItem>
                </Link>
                <div className="border-hairline my-2 border-t" />
                {THEME_CHOICES.map((choice) => {
                  const Icon = THEME_CHOICE_ICON[choice];
                  return (
                    <MenubarItem
                      key={choice}
                      onClick={() => applyThemeChoice(choice)}
                    >
                      <div className="flex w-full flex-row items-center justify-between space-x-2">
                        <p className="text-xl">{THEME_CHOICE_LABEL[choice]}</p>
                        <div className="stroke-foreground flex flex-row items-center space-x-1">
                          <Icon className="size-6" />
                          {themeChoice === choice && (
                            <Check className="size-6" />
                          )}
                        </div>
                      </div>
                    </MenubarItem>
                  );
                })}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </>
  );
}
