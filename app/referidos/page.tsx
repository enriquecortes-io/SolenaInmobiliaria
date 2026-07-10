'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ReferralHero from '@/components/Referrals/ReferralHero';
import HowItWorks from '@/components/Referrals/HowItWorks';
import EarningsCalculator from '@/components/Referrals/EarningsCalculator';
import Testimonials from '@/components/Referrals/Testimonials';
import CTABanner from '@/components/Referrals/CTABanner';

const FAQ = dynamic(() => import('@/components/Referrals/FAQ'), {
  loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse" />,
});

const ReferralForm = dynamic(() => import('@/components/Referrals/ReferralForm'), {
  loading: () => <div className="min-h-[300px] bg-white border border-gray-200 rounded-lg animate-pulse" />,
});

export default function ReferidosPage() {
  return (
    <main className="min-h-screen bg-white">
      <ReferralHero />
      <HowItWorks />
      <EarningsCalculator />
      <Testimonials />
      <CTABanner />
      
      <Suspense fallback={<div className="min-h-[400px] bg-gray-50 animate-pulse" />}>
        <section className="py-20 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4">
            <ReferralForm />
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px] bg-white animate-pulse" />}>
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <FAQ />
          </div>
        </section>
      </Suspense>
    </main>
  );
}
