'use client';

import React from 'react';
import { toast } from '@/hooks/use-toast';
import { api, routes } from '@/lib/api/common';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/hooks/hooks';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/store/features/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

const VerifyEmail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const mutation = useMutation({
    mutationFn: ({ token }: { token: string }) =>
      api.post({
        url: routes.verifyEmail,
        query: { token },
      }),

    onMutate: () => {
      toast({
        description: 'We are verifying you. Please wait',
      });
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error?.message || 'Verification failed',
      });

      router.replace('/');
    },

    onSuccess: (data) => {
      dispatch(login({ userData: data }));

      toast({
        title: data?.message || 'You are verified',
      });

      router.push('/');
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

    mutation.mutate({ token });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <section className="w-full max-w-md rounded-xl border bg-card p-8 text-card-foreground shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Verify Your Email
        </h1>

        <p className="mb-6 text-center text-sm leading-6 text-muted-foreground">
          Please verify your email to access your account. Click the button
          below to verify your account.
        </p>

        <Button
          className="w-full bg-purple-700 hover:bg-purple-800 text-white "
          onClick={handleVerifyEmail}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <Spinner/> : 'Verify Email'}
        </Button>
      </section>
    </main>
  );
};

export default VerifyEmail;