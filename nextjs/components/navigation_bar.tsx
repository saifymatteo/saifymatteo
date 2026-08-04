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
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
  };

  const currentPath = usePathname();

  return (
    <>
      <div className="background flex h-16 items-center shadow dark:shadow-white">
        <div
          id="content"
          className="flex flex-row items-center justify-between"
        >
          <Link href={pathHome} replace className="ml-2">
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
          <div className="hidden space-x-10 font-sans sm:flex sm:flex-row">
            <Link
              href={pathProjects}
              className={currentPath == pathProjects ? 'font-bold' : undefined}
            >
              Projects
            </Link>
            <Link
              href={pathContact}
              className={currentPath == pathContact ? 'font-bold' : undefined}
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
