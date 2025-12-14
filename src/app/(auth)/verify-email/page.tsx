'use client';

import dynamic from 'next/dynamic';
import LoadingPage from '@/components/Spinner/LoadingPage';
import { Suspense } from 'react';

const VerifyEmailContent = dynamic(() => import('@/components/VerifyEmailContent'), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const VerifyEmail = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmail;