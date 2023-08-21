"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";
import { useEffect } from "react";

import { Cart } from "@/app/icons/icon-cart";
import { CloseIcon } from "@/app/icons/icon-close";
import { MobileMenu } from "@/app/icons/icon-menu";
import { ProfileIcon } from "@/app/icons/icon-profile";
import {
  setCartDataFromServer,
  setDataToCartFromLocalStorage,
} from "@/app/redux/slices/cartSlice";
import { setShowMobileMenu } from "@/app/redux/slices/showUpSlice";
import { CartItem, DataFromLocalStorage } from "@/types/CartItem";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import {
  getOrderDataFromServer,
  saveOrderPaintingsToServer,
} from "@/utils/api";
import createHeaders from "@/utils/getAccessToken";
import { getDataFromLocalStorage } from "@/utils/localStorageData";
import { Logo } from "../logo/logo";
import { MenuItems } from "../menuItems/menuItems";
import SocialNetworkIcons from "../social-network/social-network";
import LoginButton from "./navigation/login-button/login-button";

import style from "./header.module.scss";
import { Painting } from "@/types/Painting";

const Header = () => {
  const dispatch = useAppDispatch();
  const showMobileMenu = useAppSelector((state) => state.showUp.showMobileMenu);
  const { paintings, totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAuthenticator((context) => [context.route]);
  const headers = createHeaders(user);

  const handleShowMobileMenu = () => {
    dispatch(setShowMobileMenu(!showMobileMenu));
  };

  const handleCloseMobileMenu = () => {
    dispatch(setShowMobileMenu(false));
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      showMobileMenu
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "auto");
    }
  }, [showMobileMenu]);

  useEffect(() => {
    const data: DataFromLocalStorage = getDataFromLocalStorage();
    dispatch(setDataToCartFromLocalStorage(data));

    if (user) {
      const paintingsId = data.paintingsFromLocalStorage
        .map((painting) => painting.id)
        .join(",");

      saveOrderPaintingsToServer(paintingsId, headers);
    }

    const getDataFromCart = async () => {
      const dataFromServer = await getOrderDataFromServer(headers);
      const orderData = dataFromServer.paintings.map((item: Painting) => {
        const orderData: CartItem = {
          id: item.id,
          prettyId: item.prettyId,
          title: item.title,
          price: item.price,
          author: item.authorFullName,
          authorId: item.authorPrettyId,
          country: item.authorCountry,
          image: item.imageUrl,
          width: item.width,
          height: item.height,
          depth: item.depth,
        };

        return orderData;
      });

      dispatch(setCartDataFromServer(orderData));
    };

    if (user) {
      getDataFromCart();
    }
  }, [user]);

  return (
    <header>
      <div className={style.header}>
        {showMobileMenu ? (
          <div
            className={style.header__mobileElement}
            onClick={handleShowMobileMenu}
          >
            <CloseIcon />
          </div>
        ) : (
          <div
            className={style.header__mobileElement}
            onClick={handleShowMobileMenu}
          >
            <MobileMenu />
          </div>
        )}
        <Link href={"/"} onClick={handleCloseMobileMenu}>
          <Logo />
        </Link>

        <nav className={style.navigation}>
          <MenuItems className={style.menuItems} />
        </nav>
        <div className={style.cart__container}>
          <Link href={`/cart`}>
            <div className={style.cart} onClick={handleCloseMobileMenu}>
              <Cart />

              {paintings.length > 0 && (
                <div className={style.cart__circle}>{paintings.length}</div>
              )}
              <div className={style.cart__background} />
            </div>
          </Link>
          <div className={style.price}>
            <Link href={`/cart`}>
              <div className={style.price__title}>Total</div>
              <div className={style.price__amount}>{`€ ${totalPrice}`}</div>
            </Link>
          </div>
          {user && (
            <Link href={`/profile`}>
              <div className={style.profile}>
                <ProfileIcon />
              </div>
            </Link>
          )}
          {!user && (
            <Link href={`/profile`}>
              <LoginButton className={style.loginDesktop} />
            </Link>
          )}
        </div>
      </div>
      <hr className={style.line}></hr>

      <nav
        className={`${style.mobileNavigation} ${
          showMobileMenu
            ? style.showMobileNavigation
            : style.hideMobileNavigation
        }`}
      >
        <div>
          {!user && (
            <Link href={`/profile`} onClick={handleCloseMobileMenu}>
              <LoginButton className={style.loginMobile} />
            </Link>
          )}

          <MenuItems className={style.menuItems} />
        </div>
        <div className={style.contacts}>
          <p className={style.contacts__title}>Contacts</p>
          <div className={style.contacts__icons}>
            <SocialNetworkIcons />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
