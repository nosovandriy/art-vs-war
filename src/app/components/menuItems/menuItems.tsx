"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";

import style from "./menuItems.module.scss";

type Props = {
  className?: string;
  setShowMobileMenu?: (isShow: boolean) => void;
};

export const MenuItems: React.FC<Props> = ({
  className,
  setShowMobileMenu,
}) => {
  const { user } = useAuthenticator((context) => [context.route]);

  const handleCloseMobileMenu = () => {
    if (setShowMobileMenu) {
      setShowMobileMenu(false);
    }
  };

  const menuItems = [
    // { label: "Profile", href: "/account", shouldRender: !!user },
    { label: "Gallery", href: "/gallery", shouldRender: true },
    { label: "Artists", href: "/artists", shouldRender: true },
    { label: "Donation", href: "/donation", shouldRender: true },
    { label: "About", href: "/about", shouldRender: true },
    { label: "Contacts", href: "/contacts", shouldRender: true },
  ];

  return (
    <ul className={className}>
      {menuItems.map(
        (item, index) =>
          item.shouldRender && (
            <li
              key={index}
              onClick={handleCloseMobileMenu}
              className={item.label === "Profile" ? style.profile : ""}
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          )
      )}
    </ul>
  );
};
