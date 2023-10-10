import Image from "next/image";

import style from "./page.module.scss";

const About = () => {
  return (
    <div className={style.about}>
      <h1 className={style.title}>About</h1>
      <Image
        src="/assets/about-ornament.png"
        alt="Ukrainian ornament"
        width={1300}
        height={200}
        className={style.image}
      />
      <div className={style.articleBlock}>
        <article className={style.article}>
          <h2 className={style.titleH2}>Aims</h2>
          <p className={style.text}>
            Our project aims to create a platform where artists, regardless of
            their origin, can showcase their work and find appreciative
            customers. It may sound ambitious, but it&apos;s a straightforward
            win-win situation for all, artists, customers and ourselves,
            allowing us to contribute meaningfully to Ukraine, as a significant
            portion of each payment is allocated to charity.
          </p>
        </article>
        <article className={style.article}>
          <h2 className={style.titleH2}>Mission</h2>
          <p className={style.text}>
            The ongoing war in Ukraine has created a difficult environment for
            many and we are delighted to offer a platform that allows artists to
            share their work with the world while making a positive impact. The
            paintings available on our site are not only beautiful works of art
            but they also tell a story. Each piece reflects the unique
            experiences and perspectives of the artist and purchasing one of
            these paintings is a way to own a piece of history while
            contributing to a good cause.
          </p>
        </article>
      </div>

      <div className={style.ornament}>
        <div className={style.imageQuoteWrapper}>
          <Image
            src="/assets/quote.webp"
            alt="quote"
            fill
            sizes="(max-width: 1600px) 20vw"
            className={style.quoteImage}
          />
        </div>
        <p className={style.ornament__text}>
          We would like to express our heartfelt gratitude to all the artists
          who have shown incredible resilience and creativity in their
          dedication to helping Ukraine. Their work is a testament to the power
          of art and the human spirit and we are honored to be able to showcase
          their talents.
        </p>
        <Image
          src="/assets/logo_icon.svg"
          alt="logo"
          width={235}
          height={235}
          sizes="(max-width: 1600px) 40vw"
          className={style.logoImage}
        />
      </div>
      <div className={style.articleBlock}>
        <article className={style.article}>
          <h2 className={style.titleH2}>Accountability</h2>
          <p className={style.text}>
            At Art vs War, we are committed to transparency and accountability.
            We provide regular updates on the funds generated from painting
            sales and donations, as well as information on the organizations
            that we support. We believe that it is important for our supporters
            to know exactly how funds are put to use and the impact that it is
            having.
          </p>
        </article>
        <article className={style.article}>
          <h2 className={style.titleH2}>Gratitude</h2>
          <p className={style.text}>
            We would like to express our heartfelt gratitude to all the artists
            who have shown incredible resilience and creativity in their
            dedication to helping Ukraine. Their work is a testament to the
            power of art and the human spirit and we are honored to be able to
            showcase their talents.
          </p>
        </article>
      </div>

      <Image
        src="/assets/about-ornament.png"
        alt="Ukrainian ornament"
        width={1300}
        height={200}
        className={style.image}
      />
    </div>
  );
};

export default About;
