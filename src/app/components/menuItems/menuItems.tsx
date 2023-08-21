"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";

import { setShowMobileMenu } from "@/app/redux/slices/showUpSlice";
import { useAppDispatch } from "@/types/ReduxHooks";

import style from "./menuItems.module.scss";

type Props = {
  className?: string;
};

export const MenuItems: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { user } = useAuthenticator((context) => [context.route]);

  const handleCloseMobileMenu = () => {
    dispatch(setShowMobileMenu(false));
  };

  return (
    <ul className={className}>
      {user && (
        <li className={style.profile} onClick={handleCloseMobileMenu}>
          <Link href={"/profile"}>Profile</Link>
        </li>
      )}
      <li onClick={handleCloseMobileMenu}>
        <Link href={"/gallery"}>Gallery</Link>
      </li>
      <li onClick={handleCloseMobileMenu}>
        <Link href={"/artists"}>Artists</Link>
      </li>
      <li onClick={handleCloseMobileMenu}>
        <Link href={"/donation"}>Donation</Link>
      </li>
      <li onClick={handleCloseMobileMenu}>
        <Link href={"/about"}>About</Link>
      </li>
      <li onClick={handleCloseMobileMenu}>
        <Link href={"/contacts"}>Contacts</Link>
      </li>
    </ul>
  );
};
