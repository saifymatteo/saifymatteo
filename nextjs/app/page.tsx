import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Menu, Moon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const linkHome = ({ children }) => {
    return (
      <Link href={'/'} replace>
        {children}
      </Link>
    );
  };

  return (
    <>
      <div className="h-16 bg-white shadow">
        <div id="content" className="flex flex-row justify-between">
          {linkHome(
            <Image
              src="/assets/logo/logo_main.png"
              loading="lazy"
              width={80}
              height={80}
              alt="Author trademark logo"
            />
          )}
          <Link href={'/'} replace>
            <Image
              src="/assets/logo/logo_main.png"
              loading="lazy"
              width={80}
              height={80}
              alt="Author trademark logo"
            />
          </Link>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <Menu></Menu>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Projects</MenubarItem>
                <MenubarItem>Contact</MenubarItem>
                <MenubarItem>
                  <Moon></Moon>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </>
  );
}
