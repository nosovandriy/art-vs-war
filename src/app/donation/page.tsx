import Image from "next/image";
import Link from "next/link";

import style from "./page.module.scss";

const Donation = () => {
  return (
    <section className={style.donation}>
      <h1 className={style.title}>Buy Art - Help Ukraine</h1>
      {/* <div className={style.textBlockWrapper}>
        <div className={style.testBlock}>
          <p className={style.testBlock__title}>
            Nice to see you here, inspired stranger!
          </p>
          <span className={style.testBlock__text}>
            Currently, web-site is in test mode and it is very important for us
            to hear your feedback.This can be done by sending an imaginary
            donation :<br></br>
            use test card <strong>4242 4242 4242 4242</strong>, any date (
            <strong>MM/YY</strong>) in the future for validity of the card and
            any three numbers for <strong>CVC</strong>.
            <br></br>
            <br></br>1 euro donation stands for poor experience - 10 euro for
            perfect. We encourage you to be critical.
            <br></br>
            <br></br>
            Also, in the field &lsquo;Short feedback&lsquo; you can describe
            your proposals and suggestions.
          </span>
        </div>
        <div className={style.ornament}>
          <Image
            src="/assets/dataInfoDesk.webp"
            alt="Ukrainian gallery ornament"
            width={600}
            height={600}
            priority
            loading="eager"
            className={style.imageDesktop}
          />
          <Link
            href={"https://donate.stripe.com/test_eVa3f4gkzbDi87KdQQ?locale=en"}
            className={style.button}
            target="_blank"
            rel="noreferrer noopener"
          >
            Donate
          </Link>
        </div>
      </div> */}

      <article className={style.article}>
        <div className={style.articleWrapper}>
          <p className={style.articleTitle}>Introduction</p>
          <span className={style.articleText}>
            Join us in supporting Ukraine&lsquo;s enduring cultural heritage.
            Art has always been a source of hope in challenging times, and
            today, Ukraine needs your help to preserve its rich artistic legacy
            amid conflict.
          </span>
        </div>
        <div className={style.articleWrapper}>
          <p className={style.articleTitle}>The Power of Art</p>
          <span className={style.articleText}>
            Art transcends boundaries and offers solace during adversity.
            Ukraine&lsquo;s cultural institutions have been affected by war, and
            your contribution can aid in their reconstruction.
          </span>
        </div>
      </article>

      <div className={style.quote}>
        <div className={style.quoteWrapper}>
          <div className={style.imageQuoteWrapper}>
            <Image
              src="/assets/quote.webp"
              alt="quote"
              fill
              sizes="(max-width: 1600px) 20vw"
              className={style.quote__image}
            />
          </div>

          <div className={style.quoteContainer}>
            <p className={style.quoteText}>
              Together, through Art, we can overcome the ravages of War
            </p>
          </div>
        </div>

        <div className={style.qrCodeImage}>
          <Image
            src="/assets/donate-code.png"
            alt="quote"
            fill
            sizes="(max-width: 1600px) 20vw"
          />
        </div>
      </div>

      <article className={style.article}>
        <div className={style.articleWrapper}>
          <p className={style.articleTitle}>How You Can Help</p>
          <span className={style.articleText}>
            Buy artwork from our platform, where 40% of the price goes to
            charity for Ukraine. You can also make a direct donation to support
            the resilience of Ukrainian artists and heritage.
          </span>
        </div>
        <div className={style.articleWrapper}>
          <p className={style.articleTitle}>Join the Art for Aid Movement</p>
          <span className={style.articleText}>
            Choose empathy, choose art, and make a difference in Ukraine&lsquo;s
            cultural revival. Donate now and stand with us in this heartfelt
            initiative.
          </span>
        </div>
      </article>
      <div className={style.footer}>
        <Image
          src="/assets/donation_l.webp"
          alt="ornament"
          width={190}
          height={450}
          className={`${style.footer__imageL} ${style.footer__image}`}
        />
        <Image
          src="/assets/donation_r.webp"
          alt="ornament"
          width={190}
          height={450}
          className={`${style.footer__imageR} ${style.footer__image}`}
        />

        <p className={style.footer__title}>
          The Art vs War team sincerely appreciate your cooperation!
        </p>
      </div>
    </section>
  );
};

export default Donation;
