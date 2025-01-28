'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useQuery } from 'convex/react';
import { notFound } from 'next/navigation';

import Header from '@/components/custom/header';
import TokensCard from './(components)/tokens-card';
import PricingCard from './(components)/pricing-card';
import Footer from '@/components/custom/(landing-page)/footer';
import { PRICING_OPTIONS } from '@/lib/consts';
import { api } from '../../../../convex/_generated/api';

const TokensPage = () => {
  const user = useQuery(api.users.currentUser);
  if (user === null) return notFound();

  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string }}
    >
      <div className='flex flex-col w-full'>
        <Header />
        <div className='flex items-center px-5 md:px-10 py-12 md:py-20 w-full'>
          <div className='mx-auto max-w-[1300px] flex flex-col gap-8 w-full'>
            <div className='flex flex-col gap-3 py-4'>
              <h1 className='text-center text-5xl font-semibold'>Tokens</h1>
              <p className='text-center max-w-[600px] w-[90%] mx-auto text-muted-foreground'>
                Start with a free amount of tokens to try Sparkify. Explore
                it&apos; functionalities and features we offer. Then you can buy
                more below with one of our packages.
              </p>
            </div>
            <TokensCard user={user} />
            <ul className='grid md:max-[1360px]:grid-cols-2 items-stretch min-[1360px]:items-start min-[1360px]:grid-cols-4 gap-7'>
              {PRICING_OPTIONS.map(opt => (
                <PricingCard
                  key={opt.value}
                  {...opt}
                  userTokens={user?.tokens}
                />
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </PayPalScriptProvider>
  );
};

export default TokensPage;
