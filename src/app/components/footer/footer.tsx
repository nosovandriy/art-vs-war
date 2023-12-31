'use client';

import Link from 'next/link';

import { MenuItems } from '../menuItems/menuItems';
import SocialNetworkIcons from '../social-network/social-network';

import style from './footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={style.lines}>
        <div className={`${style.line} ${style.line_0}`} />
        <div className={`${style.line} ${style.line_1}`} />
        <div className={`${style.line} ${style.line_2}`} />
      </div>
      <div className={style.content}>
        <div className={style.wrapper}>
          <Link href={'/contacts'} className={style.button}>
            Contact Us
          </Link>

          <MenuItems className={style.menuItems} />
          <div>
            <ul className={style.list}>
              <Link href={'/for-artists'}>
                <li>For Artists</li>
              </Link>
              <Link href={'/payment'}>
                <li>Payment</li>
              </Link>
              <Link href={'/under-development'}>
                <li>Delivery</li>
              </Link>
              <Link href={'/under-development'}>
                <li>FAQ</li>
              </Link>
              <Link href={'/terms-of-use'}>
                <li>Terms of Use</li>
              </Link>
              <Link href={'/privacy-policy'}>
                <li>Privacy Policy</li>
              </Link>
            </ul>
            <div className={style.icons}>
              <SocialNetworkIcons className={style.icon} />
            </div>
          </div>
        </div>
        <div className={style.license}>
          <p className={style.license__text}>
            © This work is licensed under the terms of the GNU General Public License 2.0
          </p>
          <p>Created by Art vs War Team in 2023</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
