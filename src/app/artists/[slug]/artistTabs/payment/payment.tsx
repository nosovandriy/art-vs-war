import { useAuthenticator } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ButtonLoader from '@/app/components/button-loader/button-loader';
import MasonryGallery from '@/app/components/masonry/masonry';
import { InfoIcon } from '@/app/icons/icon-info';
import { Painting } from '@/types/Painting';
import { PaymentType } from '@/types/Payment';
import {
  balanceStripeAccount,
  checkStripeAccount,
  getActivateStripe,
  getRecentlySoldPaintings,
  getStripeDashboard,
} from '@/utils/api';
import createHeaders from '@/utils/getAccessToken';

import style from './payment.module.scss';

const Payment = () => {
  const { user } = useAuthenticator((context) => [context.route]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccountLoading, setIsAccountLoading] = useState(true);
  const [isAccountActivated, setIsAccountActivated] = useState(false);
  const [artistPaintings, setArtistPaintings] = useState<Painting[]>([]);
  const [stripeBalance, setStripeBalance] = useState<PaymentType | null>(null);
  const headers = createHeaders(user);
  const router = useRouter();

  const stripeAccount = async () => {
    try {
      const { isAccountFullyCreated } = await checkStripeAccount(headers);
      setIsAccountActivated(isAccountFullyCreated);
    } catch (error) {
      console.error('Error checking Stripe account:', error);
    }
  };

  const getBalanceStripeAccount = async () => {
    try {
      const data = await balanceStripeAccount(headers);
      setStripeBalance(data);
    } catch (error) {
      console.error('Error checking Stripe account:', error);
    } finally {
      setIsAccountLoading(false);
    }
  };

  const handleGetStripeUrl = async () => {
    try {
      setIsLoading(true);

      const stripeActivatePage = await getActivateStripe(headers);
      router.push(stripeActivatePage);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStripeDashboard = async () => {
    try {
      setIsLoading(true);
      const stripeDashboardURL = await getStripeDashboard(headers);
      window.open(stripeDashboardURL, '_blank');
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecentlySoldPaintings = async () => {
    try {
      const paintings = await getRecentlySoldPaintings(headers);
      setArtistPaintings(paintings.content);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    stripeAccount();
    getBalanceStripeAccount();
    handleRecentlySoldPaintings();
  }, []);

  return (
    <>
      {isAccountLoading ? (
        <div className={style.loadingWrapper}>
          <ButtonLoader />
        </div>
      ) : (
        <>
          <div>
            {isAccountActivated ? (
              <div className={style.balance}>
                <div className={style.balance__wrapper}>
                  <div>
                    <p className={style.balance__total}>{`€ ${stripeBalance?.totalEarnings}`}</p>
                    <p className={style.balance__text}>Total Earnings</p>
                  </div>
                  <div>
                    <p className={style.balance__total}>{`€ ${stripeBalance?.balance}`}</p>
                    <p className={style.balance__text}>Your Balance</p>
                  </div>
                </div>

                <button
                  className={`${style.button} ${style.balance__button}`}
                  onClick={handleStripeDashboard}
                >
                  {isLoading ? 'Loading...' : 'Stripe Account'}
                </button>
              </div>
            ) : (
              <div className={style.payment}>
                <div className={style.textWrapper}>
                  <p className={style.title}>
                    Art vs War partners with Stripe for secure payments and financial services
                  </p>
                  <p className={style.subtitle}>
                    To be able to sell your artworks, you should first activate your Stripe account.
                  </p>
                  <div className={style.guide}>
                    <InfoIcon />

                    <p className={style.guide__title}>
                      Registration on Stripe in test mode:
                      <Link
                        href="/assets/stripe_guide_desktop.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.guide__stepDesktop}
                      >
                        &nbsp;A Step-by-Step Guide
                      </Link>
                      <Link
                        href="/assets/stripe_guide_mobile.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.guide__stepMobile}
                      >
                        &nbsp;A Step-by-Step Guide
                      </Link>
                    </p>
                  </div>
                </div>

                <button className={style.button} onClick={handleGetStripeUrl}>
                  {isLoading ? 'Loading...' : 'Activate Stripe'}
                </button>
              </div>
            )}
          </div>
          {artistPaintings.length > 0 && (
            <>
              <hr className={style.line} />
              <p className={style.recentSelling}>Recent Selling</p>
              <MasonryGallery paintingsList={artistPaintings} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Payment;
