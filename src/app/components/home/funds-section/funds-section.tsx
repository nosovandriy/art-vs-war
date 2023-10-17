import Image from "next/image";
import Link from "next/link";

import style from "./funds-section.module.scss";

const Funds = () => {
  return (
    <section className={style.funds}>
      <div className={style.head}>
        <h2 className={style.head__title}>Funds</h2>

        <p className={style.head__description}>
          Our platform raises funds to assist Ukraine. This support is delivered
          directly to those in need, aiding in the protection, preservation, and
          rebuilding of the country. Contributions can be made with one-click
          ease from anywhere, ensuring that assistance reaches its goal
        </p>
      </div>

      <div className={style.container}>
        <div className={style.imageWrapper}>
          <Image
            src="/assets/mark_Hamill.webp"
            alt="Mark Hamill United24 Ambassador"
            fill
            sizes="(max-width: 1600px) 50vw"
            className={style.imageWrapper__image}
          />
        </div>

        <Link
          href={"/donation"}
          className={`${style.button} ${style.button__desktop}`}
        >
          Donation
        </Link>

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
              <p className={style.text}>
                You are winning. Don&apos;t doubt it for a second. Everyone said
                that Ukraine would fall in four days. Do you remember? But you
                proved to the whole world that Ukraine should not be touched
              </p>
              <hr className={style.line}></hr>
              <div className={`${style.actor}`}>
                <h6 className={style.actor__title}>Mark Hamill</h6>
                <p className={style.actor__description}>
                  Actor, United24 Ambassador
                </p>
              </div>
            </div>
          </div>
          <Link
            href={"/donation"}
            className={`${style.button} ${style.button__mobile}`}
          >
            Donation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Funds;
