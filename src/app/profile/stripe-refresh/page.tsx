'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { getActivateStripe } from '@/utils/api';
import createHeaders from '@/utils/getAccessToken';

const StripeRefresh = () => {
  const { user } = useAuthenticator((context) => [context.route]);

  const headers = createHeaders(user);
  const router = useRouter();

  const handleGetStripeUrl = async () => {
    try {
      const stripeActivatePage = await getActivateStripe(headers);
      router.push(stripeActivatePage);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetStripeUrl();
  }, []);
};

export default StripeRefresh;
