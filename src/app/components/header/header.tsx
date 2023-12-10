'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { Cart } from '@/app/icons/icon-cart';
import { IconClose } from '@/app/icons/icon-close';
import { MobileMenu } from '@/app/icons/icon-menu';
import { ProfileIcon } from '@/app/icons/icon-profile';
import { ArrowDownIcon } from '@/app/icons/iconArrowUp/icon-arrow-down';
import { setCartDataFromServer, setDataToCartFromLocalStorage } from '@/app/redux/slices/cartSlice';
import { CartItem, DataFromLocalStorage } from '@/types/CartItem';
import { Painting } from '@/types/Painting';
import { useAppDispatch, useAppSelector } from '@/types/ReduxHooks';
import { getUserRole } from '@/utils/account';
import { getOrderDataFromServer, saveOrderPaintingsToServer } from '@/utils/api';
import { handleCloseDropdown } from '@/utils/checkClick';
import createHeaders from '@/utils/getAccessToken';
import { getDataFromLocalStorage, setDataToLocalStorage } from '@/utils/localStorageData';
import { Logo } from '../logo/logo';
import { MenuItems } from '../menuItems/menuItems';
import SocialNetworkIcons from '../social-network/social-network';
import LogOutButton from './navigation/logOut-button/logOut-button';
import LoginButton from './navigation/login-button/login-button';

import style from './header.module.scss';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileMobileMenu, setShowProfileMobileMenu] = useState(false);
  const { paintings, totalPrice } = useAppSelector((state) => state.cart);
  const { user, signOut } = useAuthenticator((context) => [context.route]);
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const menuRef = useRef<HTMLInputElement>(null);
  const headers = createHeaders(user);
  const dispatch = useAppDispatch();
  const hasAuthorRole = getUserRole(user, 'ROLE_AUTHOR');

  const isHeaders = Object.keys(headers).length !== 0;
  const authenticated = authStatus === 'authenticated';

  const handleShowMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleCloseMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const handleSelectProfile = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowProfileMobileMenu(!showProfileMobileMenu);
    setShowMobileMenu(false);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      showMobileMenu
        ? (document.body.style.overflow = 'hidden')
        : (document.body.style.overflow = 'auto');
    }
  }, [showMobileMenu]);

  useEffect(() => {
    const data: DataFromLocalStorage = getDataFromLocalStorage();

    if (data.paintingsFromLocalStorage.length > 0) {
      dispatch(setDataToCartFromLocalStorage(data));

      if (user && isHeaders) {
        const paintingsId = data.paintingsFromLocalStorage.map((painting) => painting.id).join(',');

        saveOrderPaintingsToServer(paintingsId, headers);
      }
    }

    const getDataFromCart = async () => {
      const dataFromServer = await getOrderDataFromServer(headers);

      if (dataFromServer.paintings.length > 0) {
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
        setDataToLocalStorage([]);
      }
    };

    if (user && isHeaders) {
      getDataFromCart();
    }
  }, [user, isHeaders]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      handleCloseDropdown(event, menuRef, setShowProfileMenu);
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  });

  return (
    <header>
      <div className={style.header}>
        {showMobileMenu ? (
          <div className={style.header__mobileElement} onClick={handleShowMobileMenu}>
            <IconClose />
          </div>
        ) : (
          <div className={style.header__mobileElement} onClick={handleShowMobileMenu}>
            <MobileMenu />
          </div>
        )}
        <Link href={'/'} onClick={handleCloseMobileMenu}>
          <Logo />
        </Link>

        <nav className={style.navigation}>
          <MenuItems className={style.menuItems} setShowMobileMenu={setShowMobileMenu} />
        </nav>
        <div className={style.cart__container}>
          <Link href={`/cart`} title="Cart">
            <div className={style.cart} onClick={handleCloseMobileMenu}>
              <Cart />

              {paintings.length > 0 && <div className={style.cart__circle}>{paintings.length}</div>}
              <div className={style.cart__background} />
            </div>
          </Link>
          <div className={style.price}>
            <Link href={`/cart`} title="Cart">
              <div className={style.price__title}>Total</div>
              <div className={style.price__amount}>{`€ ${totalPrice}`}</div>
            </Link>
          </div>
          {authenticated ? (
            <div className={style.profileWrapper} ref={menuRef}>
              <button
                title="Account"
                className={style.profile}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <ProfileIcon />
              </button>
              {showProfileMenu && (
                <div className={`${style.profileButton__laptop}`}>
                  <Link
                    href={`/account`}
                    className={style.profileButton}
                    onClick={handleSelectProfile}
                  >
                    View Account
                  </Link>
                  {hasAuthorRole && (
                    <>
                      <hr className={style.line}></hr>
                      <Link
                        href={`/profile`}
                        className={style.profileButton}
                        onClick={handleSelectProfile}
                      >
                        View Artist Profile
                      </Link>
                    </>
                  )}

                  <hr className={style.line}></hr>
                  <button className={style.profileButton} onClick={signOut}>
                    <LogOutButton />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href={`/account`}>
              <LoginButton className={style.loginDesktop} />
            </Link>
          )}
        </div>
      </div>
      <hr className={style.line}></hr>

      <nav
        className={`${style.mobileNavigation} ${
          showMobileMenu ? style.showMobileNavigation : style.hideMobileNavigation
        }`}
      >
        <div>
          {authenticated ? (
            <>
              <div
                className={style.profileButton}
                onClick={() => setShowProfileMobileMenu(!showProfileMobileMenu)}
              >
                <ProfileIcon />
                <span>Select Profile</span>
                <ArrowDownIcon isRotated={showProfileMobileMenu} />
              </div>
              {showProfileMobileMenu && (
                <div className={style.profileButton__menu}>
                  <Link
                    href={`/account`}
                    className={style.profileButton}
                    onClick={handleSelectProfile}
                  >
                    View Account
                  </Link>
                  <hr className={style.line}></hr>
                  <Link
                    href={`/profile`}
                    className={style.profileButton}
                    onClick={handleSelectProfile}
                  >
                    View Artist Profile
                  </Link>
                  <hr className={style.line}></hr>
                  <button className={style.profileButton} onClick={signOut}>
                    <LogOutButton />
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href={`/profile`} onClick={handleCloseMobileMenu}>
              <LoginButton className={style.loginMobile} />
            </Link>
          )}

          <MenuItems className={style.menuItems} setShowMobileMenu={setShowMobileMenu} />
        </div>
        <div className={style.contacts}>
          <Link
            href={`/contacts`}
            onClick={handleCloseMobileMenu}
            className={style.contacts__title}
          >
            Contacts
          </Link>
          <div className={style.contacts__icons}>
            <SocialNetworkIcons />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
