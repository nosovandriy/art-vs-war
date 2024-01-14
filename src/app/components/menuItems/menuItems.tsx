'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getPageName } from '@/utils/getPageName';

import style from './menuItems.module.scss';

type Props = {
  className?: string;
  setShowMobileMenu?: (isShow: boolean) => void;
  isHeaderList: boolean;
};

export const MenuItems: React.FC<Props> = ({
  className,
  isHeaderList = true,
  setShowMobileMenu,
}) => {
  const path = usePathname();
  const activePage = isHeaderList && getPageName(path);

  const handleCloseMobileMenu = () => {
    if (setShowMobileMenu) {
      setShowMobileMenu(false);
    }
  };

  const menuItems = [
    // { label: "Profile", href: "/account", shouldRender: !!user },
    { label: 'Gallery', href: '/gallery', shouldRender: true },
    { label: 'Artists', href: '/artists', shouldRender: true },
    { label: 'Donation', href: '/donation', shouldRender: true },
    { label: 'About', href: '/about', shouldRender: true },
    { label: 'Contacts', href: '/contacts', shouldRender: true },
  ];

  return (
    <ul className={className}>
      {menuItems.map(
        (item, index) =>
          item.shouldRender && (
            <li
              key={index}
              onClick={handleCloseMobileMenu}
              className={item.label === 'Profile' ? style.profile : ''}
            >
              <Link
                href={item.href}
                className={`${activePage === item.label.toLowerCase() ? style.activePage : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ),
      )}
    </ul>
  );
};
