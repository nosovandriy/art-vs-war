import Link from 'next/link';
import style from './transfers.module.scss';

const Transfers = () => {
  return (
    <div className={style.transfers}>
      <p className={style.text}>
        Art vs War has partnered with Stripe to offer you fast, convenient and reliable payments
        using{' '}
        <Link
          className={style.link}
          href="https://stripe.com/en-be/connect"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stripe Connect
        </Link>
        . It facilitates the automation of payouts to your account on a regular basis.
        <br />
        <br />
        Art vs War collects all payment for artworks upfront to be disbursed to artists once an
        artwork has been safely delivered. For all artworks, Art vs War will begin processing your
        payment 14 days from the date of delivery your order.
        <br />
        <br />
        As soon as your payment has been processed Art vs War will immediately email you to confirm
        transfer of funds to your Stripe account.
        <br />
        <br />
        To start showcasing your artworks, you&apos;ll be prompted to activate your Stripe Express
        Account. To do so, please follow the{' '}
        <span className={style.link}>
          {' '}
          <Link
            href="/assets/stripe_guide_desktop.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={style.guide__stepDesktop}
          >
            Step-by-Step Guide
          </Link>
          <Link
            href="/assets/stripe_guide_mobile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={style.guide__stepMobile}
          >
            Step-by-Step Guide
          </Link>
        </span>
        .
        <br />
        <br />
        After activation, you can check your latest balance on the Artist
        <span className={style.link}>
          {' '}
          <Link href="/profile?tab=Payment"> profile page</Link>
        </span>{' '}
        and access the Stripe dashboard by clicking &ldquo;Stripe Account&ldquo;. You can then
        configure your preferences in the dashboard.
        <br />
        <br />
      </p>
      <div className={style.activationWrapper}>
        <p className={style.activation}>
          For activation, you will need to have a valid bank account in one of these countries:
          <br />
          <br />
          Austria, Belgium, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland,
          France, Germany, Gibraltar, Greece, Hungary, Ireland, Italy, Latvia, Liechtenstein,
          Lithuania, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Romania, Slovakia,
          Slovenia, Spain, Sweden, Switzerland, United Kingdom.
          <br />
          <br />
        </p>

        <p className={style.activation}>
          <span className={style.note}>NOTE: </span>You will only be required to activate your
          Stripe Account one time.
        </p>
      </div>
    </div>
  );
};

export default Transfers;
