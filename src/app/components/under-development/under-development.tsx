"use client";

import Image from "next/image";
import Link from "next/link";

import style from "./under-development.module.scss";
import "@styles/globals.scss";

const UnderDevelopment = () => {
  return (
    <section className={style.notFound}>
      <div className={style.firstSection}>
        <h1 className={style.title}>This Page is Under Development</h1>
        <p className={style.text}>
          Hello! Thank you for visiting our website.
          <br />
          <br />
          Our team is hard at work developing a fresh and dynamic website that
          will showcase our brand and offerings in the best possible way. During
          this phase, you might encounter some areas that are not fully
          functional or content that&apos;s still being finalized.
          <br />
          <br />
          We apologize for any inconvenience this may cause and appreciate your
          patience. We&apos;re committed to delivering a website that exceeds
          your expectations.
        </p>
      </div>
      <div className={style.secondSection}>
        <div className={style.ornament}>
          <Image
            src="/assets/ornament-404.webp"
            alt="Ukrainian gallery ornament"
            width={1000}
            height={1000}
            className={`${style.imageMobile} imageOpacityEffect`}
            onLoadingComplete={(img) => (img.style.opacity = "1")}
          />
          <Link href={"/gallery"}>
            <button className={style.button}>Gallery</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UnderDevelopment;
