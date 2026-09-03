'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/shadcn/menubar';
import { Circle, Menu, Moon, Sun } from 'lucide-react';
import BrandLogo from '@/app/components/brand_logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppNavigationBar() {
  const pathHome = '/';
  const pathProjects = '/projects';
  const pathContact = '/contact';

  const themeToggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.theme = next;
  };

  const currentPath = usePathname();

  return (
    <>
      <div className="bg-primary-background sm:shadow-primary-foreground sticky top-0 z-49 flex h-16 items-center sm:shadow">
        <div className="content-max-width shadow-primary-foreground flex flex-row items-center justify-between shadow sm:shadow-none">
          <Link href={pathHome} replace className="ml-2 sm:ml-0">
            <BrandLogo eager alt="Author trademark logo" />
          </Link>
          <div className="hidden items-center gap-12 sm:flex sm:flex-row">
            <Link
              href={pathProjects}
              className={
                currentPath == pathProjects
                  ? 'relative text-lg font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-current'
                  : 'relative text-lg font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full'
              }
            >
              Projects
            </Link>
            <Link
              href={pathContact}
              className={
                currentPath == pathContact
                  ? 'relative text-lg font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-current'
                  : 'relative text-lg font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full'
              }
            >
              Contact
            </Link>
            <div
              onClick={themeToggle}
              className="cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 dark:rotate-180"
            >
              <Circle size={32} className="stroke-1">
                <Moon
                  size={18}
                  x={3}
                  y={3}
                  className="rotate-y-0 opacity-100 transition-all duration-300 dark:rotate-y-180 dark:opacity-0"
                />
                <Sun
                  size={14}
                  x={4.8}
                  y={4.8}
                  className="rotate-y-180 opacity-0 transition-all duration-300 dark:rotate-y-0 dark:opacity-100"
                />
              </Circle>
            </div>
          </div>
          <Menubar className="flex flex-row sm:hidden">
            <MenubarMenu>
              <MenubarTrigger className="">
                <Menu></Menu>
              </MenubarTrigger>
              <MenubarContent className="bg-primary-background shadow-primary-background">
                <Link href={pathProjects}>
                  <MenubarItem
                    className={
                      currentPath == pathProjects ? 'font-bold' : undefined
                    }
                  >
                    <p className="text-xl">Projects</p>
                  </MenubarItem>
                </Link>
                <Link href={pathContact}>
                  <MenubarItem
                    className={
                      currentPath == pathContact ? 'font-bold' : undefined
                    }
                  >
                    <p className="text-xl">Contact</p>
                  </MenubarItem>
                </Link>
                <MenubarItem onClick={themeToggle}>
                  <div className="flex w-full flex-row items-center justify-between space-x-2">
                    <p className="text-xl">Theme</p>
                    <div className="stroke-foreground">
                      <Moon className="flex size-6 dark:hidden" />
                      <Sun className="hidden size-6 dark:flex" />
                    </div>
                  </div>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </>
  );
}
