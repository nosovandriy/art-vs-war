"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./about-section.module.scss";

const About = () => (
  <section className={styles.about}>
    <div className={styles.mobileWrapper}>
      <div className={styles.mobile}>
        <h1 className={styles.mobile__title}>Art vs War</h1>

        <div className={styles.mobile__content}>
          Our project is dedicated to supporting Ukraine by providing a platform
          for artists and creatives to showcase their work, connect with
          appreciative customers and offer a unique opportunity to acquire
          artwork while contributing to a noble cause.
          <br />
          <br />
          By purchasing a painting, you support freedom and democracy. Explore
          our collection to find a piece that speaks to you. Alternatively, you
          can choose to support our project with a donation. Your assistance is
          greatly appreciated.
        </div>
        <Link href={"/about"} className={styles.mobile__button}>
          About
        </Link>
      </div>
      <div className={styles.mobileOrnament}>
        <Image
          src="/assets/images/button&ornament.png"
          alt="Ukrainian gallery ornament"
          width={1000}
          height={1000}
          className={styles.imageMobile}
        />
      </div>
    </div>

    <div className={styles.tablet}>
      <h2 className={styles.title__white}>Arts</h2>

      <div className={styles.content}>
        <h2 className={styles.title__black}>vs War</h2>
        <p className={styles.text}>
          Our project is dedicated to supporting Ukraine by providing a platform
          for artists and creatives to showcase their work, connect with
          appreciative customers and offer a unique opportunity to acquire
          artwork while contributing to a noble cause.
          <br />
          <br />
          By purchasing a painting, you support freedom and democracy. Explore
          our collection to find a piece that speaks to you. Alternatively, you
          can choose to support our project with a donation. Your assistance is
          greatly appreciated.
        </p>
      </div>

      <div className={styles.ornament}>
        <Link href={"/about"} className={styles.button}>
          About
        </Link>
        <Image
          className={styles.image}
          src="/assets/images/button&ornament.png"
          alt="ornament"
          fill
          sizes="(max-width: 1600px) 50vw"
        />
      </div>
    </div>

    <div className={styles.laptop}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h2 className={styles.title__white}>Art</h2>
            <h2 className={styles.title__black}>vs War</h2>
          </div>

          <div className={styles.lines}>
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
          </div>

          <div className={styles.text}>
            Our project is dedicated to supporting Ukraine by providing a
            platform for artists and creatives to showcase their work, connect
            with appreciative customers and offer a unique opportunity to
            acquire artwork while contributing to a noble cause.
            <br />
            <br />
            By purchasing a painting, you support freedom and democracy. Explore
            our collection to find a piece that speaks to you. Alternatively,
            you can choose to support our project with a donation. Your
            assistance is greatly appreciated.
          </div>
        </div>

        <div className={styles.ornament}>
          <Link href={"/about"} className={styles.button}>
            About
          </Link>

          <Image
            className={styles.image}
            src="/assets/images/button&ornament.png"
            alt="ornament"
            sizes="(max-width: 1600px) 50vw"
            fill
          />
        </div>
      </div>
    </div>
  </section>
);

export default About;
