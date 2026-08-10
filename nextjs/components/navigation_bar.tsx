'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/shadcn/menubar';
import { Menu, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
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
      <div className="bg-primary-background sticky top-0 z-100 flex h-16 items-center sm:shadow sm:dark:shadow-white">
        <div className="mx-auto flex w-full max-w-281.5 flex-row items-center justify-between shadow sm:shadow-none dark:shadow-white">
          <Link href={pathHome} replace className="ml-4">
            <Image
              src="/assets/logo/logo_main.png"
              loading="eager"
              width={64}
              height={16}
              alt="Author trademark logo"
              className="flex dark:hidden"
            />
            <Image
              src="/assets/logo/logo_white.png"
              loading="eager"
              width={54}
              height={16}
              alt="Author trademark logo"
              className="ml-1 hidden dark:flex"
            />
          </Link>
          <div className="mr-8 hidden items-center gap-12 sm:flex sm:flex-row">
            <Link
              href={pathProjects}
              className={
                currentPath == pathProjects
                  ? 'relative text-xl font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-current'
                  : 'relative text-xl font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full'
              }
            >
              Projects
            </Link>
            <Link
              href={pathContact}
              className={
                currentPath == pathContact
                  ? 'relative text-xl font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-current'
                  : 'relative text-xl font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full'
              }
            >
              Contact
            </Link>
            <div onClick={themeToggle} className="stroke-foreground">
              <Moon className="flex dark:hidden"></Moon>
              <Sun className="hidden dark:flex"></Sun>
            </div>
          </div>
          <Menubar className="flex flex-row sm:hidden">
            <MenubarMenu>
              <MenubarTrigger className="stroke-foreground">
                <Menu></Menu>
              </MenubarTrigger>
              <MenubarContent className="shadow dark:shadow-white">
                <Link href={pathProjects}>
                  <MenubarItem
                    className={
                      currentPath == pathProjects ? 'font-bold' : undefined
                    }
                  >
                    Projects
                  </MenubarItem>
                </Link>
                <Link href={pathContact}>
                  <MenubarItem
                    className={
                      currentPath == pathContact ? 'font-bold' : undefined
                    }
                  >
                    Contact
                  </MenubarItem>
                </Link>
                <MenubarItem onClick={themeToggle}>
                  <Moon className="flex dark:hidden"></Moon>
                  <Sun className="hidden dark:flex"></Sun>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </>
  );
}
