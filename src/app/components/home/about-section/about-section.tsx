"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { TitleAnimation } from "@/utils/animation";

import styles from "./about-section.module.scss";

const About = () => (
  <section className={styles.about}>
    <div className={styles.mobileWrapper}>
      <div className={styles.mobile}>
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={TitleAnimation("x")}
          className={styles.mobile__title}
        >
          Art vs War
        </motion.h1>

        <div className={styles.mobile__content}>
          Our project dedicated to supporting Ukrainian artists and creatives
          who have been displaced abroad due to the war in Ukraine. Browse our
          collection and find a painting that speaks to you. You also can donate
          our project without purchasing a painting. Thank you for your support.
        </div>
        <Link href={"/donation"} className={styles.mobile__button}>
          Donate
        </Link>

        {/* <Image
        className={styles.mobileImage}
        src="/assets/images/button&ornament.png"
        alt="ornament"
        fill
        sizes="(max-width: 1600px) 50vw"
      /> */}
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
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={TitleAnimation("x")}
        className={styles.title__white}
      >
        Arts
      </motion.h2>

      <div className={styles.content}>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={TitleAnimation("x")}
          className={styles.title__black}
        >
          vs War
        </motion.h2>
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
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={TitleAnimation("x")}
              className={styles.title__white}
            >
              Art
            </motion.h2>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={TitleAnimation("x")}
              className={styles.title__black}
            >
              vs War
            </motion.h2>
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
