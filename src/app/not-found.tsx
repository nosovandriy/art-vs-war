import React from "react";
import Image from "next/image";
import Link from "next/link";

import style from "@styles/not-found.module.scss";

const NotFound = () => {
  return (
    <section className={style.notFound}>
      <div className={style.firstSection}>
        <h1 className={style.title}>Sorry...</h1>
        <p className={style.text}>
          The page you are looking for doesn&apos;t exist
        </p>
      </div>
      <div className={style.secondSection}>
        <div className={style.ornament}>
          <Image
            src="/assets/ornament-404.webp"
            alt="Ukrainian gallery ornament"
            priority
            width={1000}
            height={1000}
            className={style.imageMobile}
          />
          <Link href={"/"}>
            <button className={style.button}>Main page</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
