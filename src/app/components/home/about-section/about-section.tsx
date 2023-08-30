import Image from "next/image";
import Link from "next/link";

import styles from "./about-section.module.scss";

const About = () => (
  <section className={styles.about}>
    <div className={styles.mobile}>
      <h1 className={styles.mobile__title}>Art vs War</h1>

      <div className={styles.mobile__content}>
        Our project dedicated to supporting Ukrainian artists and creatives who
        have been displaced abroad due to the war in Ukraine. Browse our
        collection and find a painting that speaks to you. You also can donate
        our project without purchasing a painting. Thank you for your support.
      </div>
      <Link href={"/donation"} className={styles.mobile__button}>
        Donate
      </Link>
    </div>

    <div className={styles.tablet}>
      <h2 className={styles.title__white}>Art</h2>

      <div className={styles.content}>
        <h2 className={styles.title__black}>vs War</h2>
        <p className={styles.text}>
          Our project dedicated to supporting Ukrainian artists and creatives
          who have been displaced abroad due to the war in Ukraine. We offer a
          unique opportunity to purchase their artwork while contributing to a
          good cause.
          <br />
          <br />
          Each painting tells a story of Ukraine&apos;s struggle for freedom and
          independence. By purchasing a painting, you support the artist and
          contribute to the victory of Ukraine and democracy. Browse our
          collection and find a painting that speaks to you. You also can donate
          our project without purchasing a painting. Thank you for your support.
        </p>
      </div>

      <div className={styles.ornament}>
        <Link href={"/donation"} className={styles.button}>
          Donate
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
            Our project dedicated to supporting Ukrainian artists and creatives
            who have been displaced abroad due to the war in Ukraine. We offer a
            unique opportunity to purchase their artwork while contributing to a
            good cause.
            <br />
            <br />
            Each painting tells a story of Ukraine&apos;s struggle for freedom
            and independence. By purchasing a painting, you support the artist
            and contribute to the victory of Ukraine and democracy. Browse our
            collection and find a painting that speaks to you. You also can
            donate our project without purchasing a painting. Thank you for your
            support.
          </div>
        </div>

        <div className={styles.ornament}>
          <Link href={"/donation"} className={styles.button}>
            Donate
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
