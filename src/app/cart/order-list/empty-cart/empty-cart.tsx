"use client";

import Image from "next/image";
import Link from "next/link";

import style from "./empty-cart.module.scss";

const EmptyCartPage = () => {
  return (
    <div className={style.emptyCart}>
      <Image
        className={`${style.imageTop} ${style.images}`}
        src="/assets/cartOrnament.webp"
        alt="author"
        width={450}
        height={216}
      />
      <p className={style.emptyCart__title}>Your Cart is Empty</p>
      <p className={style.emptyCart__subTitle}>Explore Our Artworks</p>
      <Link className={style.emptyCart__button} href="/gallery">
        Gallery
      </Link>
      <Image
        className={`${style.imageBottom} ${style.images}`}
        src="/assets/cartOrnament.webp"
        alt="author"
        width={450}
        height={216}
      />
    </div>
  );
};

export default EmptyCartPage;
