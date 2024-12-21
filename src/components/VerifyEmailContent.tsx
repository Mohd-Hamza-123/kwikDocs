'use client';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/hooks/hooks';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/store/features/authSlice';
import { verifyEmail } from '@/lib/API/authAPI/verifyEmail';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  overlayLoadingIsTrueReducer,
  overlayLoadingIsFalseReducer,
} from '@/lib/store/features/overlayLoaderSlice';

const VerifyEmailContent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromParams = searchParams.get('token');
    console.log(tokenFromParams);
    if (tokenFromParams) {
      setToken(tokenFromParams);
    }
  }, [searchParams]);

  const mutationVerify = useMutation({
    mutationFn: async (token: string) => verifyEmail(token),
    onMutate: () => {
      dispatch(
        overlayLoadingIsTrueReducer({
          overlayLoadingMsg: 'We are verifying you. Please wait',
        })
      );
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'You are not registered',
        description: error?.message,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      dispatch(login({ userData: data }));
      toast({
        title: data?.message || 'You are verified',
      });
      router.push('/');
    },
    onSettled: () => {
      dispatch(overlayLoadingIsFalseReducer());
    },
  });

  const handleVerifyEmail = () => {
    if (!token) {
      toast({
        variant: 'destructive',
        title: 'Invalid token',
      });
      return;
    }
    mutationVerify.mutate(token);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 shadow-xl rounded-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please verify your email to access your account. Click the button
          below to receive a verification email.
        </p>
        <Button className="w-full" onClick={handleVerifyEmail}>
          Verify Email
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmailContent;