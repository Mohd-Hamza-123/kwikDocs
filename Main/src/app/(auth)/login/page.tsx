"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import LoginUser from "@/lib/API/Auth/login";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { useMutation } from "@tanstack/react-query";
import { login, logout } from "@/lib/store/features/authSlice";
import { ButtonSpinner } from "@/components";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const mutation = useMutation({
    mutationFn: (payload: LoginFormValues) => LoginUser(payload),
    onError: (error: unknown) => {
      const environment = process.env.NODE_ENV
      toast({
        variant: "destructive",
        title: "Login failed",
        description: environment === "development" ? (error instanceof Error ? error.message : "internal server error") : "something went wrong , please try again later"
      })
    },
    onSuccess: (data) => {
      console.log(data)
      dispatch(login({ userData: data.data }))
      toast({ title: data.message });
      router.push("/");
    },
  });

  const onSubmit = (data: LoginFormValues) => mutation.mutate(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md w-full space-y-6"
      noValidate
    >
      <h2 className="text-3xl font-semibold text-white mb-2">Sign in</h2>

      {/* Email */}
      <div className="space-y-1.5">
        <Label className="text-sm text-neutral-300" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter email"
          className="bg-neutral-900 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
          {...register("email", { required: true })}
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label className="text-sm text-neutral-300" htmlFor="password">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          className="bg-neutral-900 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
          {...register("password", { required: true })}
        />
      </div>

      {/* Primary sign in */}
      <Button disabled={mutation.isPending} className="w-full bg-pink-600 hover:bg-pink-500 text-white">
        {mutation.isPending ? <ButtonSpinner /> : "Log In"}
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-neutral-800" />
        <span className="text-xs text-neutral-500">OR</span>
        <span className="h-px flex-1 bg-neutral-800" />
      </div>

      {/* Social logins */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full border-neutral-700 text-neutral-200 hover:bg-neutral-900/70 flex items-center justify-center gap-2"
        // onClick={handleGithubLogin}
        >
          {/* simple circle icon placeholder */}
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-xs">
            GH
          </span>
          <span>Sign in with GitHub</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full border-neutral-700 text-neutral-200 hover:bg-neutral-900/70 flex items-center justify-center gap-2"
        // onClick={handleGoogleLogin}
        >
          {/* Google-like "G" badge */}
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-neutral-900">
            G
          </span>
          <span>Sign in with Google</span>
        </Button>
      </div>
    </form>
  );
}
