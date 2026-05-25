"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api, routes } from "@/lib/api/common";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type Signup } from "@/lib/validation/authSchema";

const SignupPage = () => {

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>({
    resolver: zodResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: api.post,
    onError: (error: unknown) => {
      console.error(error)
      const message = error instanceof Error ? error.message : "something went wrong"
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: message
      });
    },
    onSuccess: (data) => {
      // console.log(data)
      if (data.isMailSent) {
        toast({
          variant: "default",
          description: "Verify Email has been sent "
        });
      }
      router.replace("/");
    }
  });

  const onSubmit = (data: Signup) => mutation.mutate({
    data,
    url: routes.register
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3">

      <h2 className="text-3xl font-semibold text-white">Create account</h2>

      {/* Username */}
      <div className="space-y-1.5">
        <Label
          htmlFor="username"
          className="text-sm text-neutral-300 font-medium"
        >
          Username
        </Label>
        <Input
          id="username"
          placeholder="your_username"
          className={`bg-neutral-900 border-neutral-700 text-neutral-200 placeholder:text-neutral-500
            ${errors?.username ? "border-red-500" : ""}`}
          {...register("username")}
        />
        {errors?.username && (
          <p className="text-xs text-red-500">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label
          htmlFor="email"
          className="text-sm text-neutral-300 font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className={`bg-neutral-900 border-neutral-700 text-neutral-200 placeholder:text-neutral-500
            ${errors?.email ? "border-red-500" : ""}`}
          {...register("email")}
        />
        {errors?.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label
          htmlFor="password"
          className="text-sm text-neutral-300 font-medium"
        >
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className={`bg-neutral-900 border-neutral-700 text-neutral-200 placeholder:text-neutral-500
            ${errors?.password ? "border-red-500" : ""}`}
          {...register("password")}
        />
        {errors?.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Main button */}
      <Button disabled={mutation.isPending} className="w-full bg-purple-700 hover:bg-purple-800 text-white">
        {mutation.isPending ? <Spinner /> : "Signup"}
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-neutral-800" />
        <span className="text-xs text-neutral-500">OR</span>
        <span className="h-px flex-1 bg-neutral-800" />
      </div>

      {/* Social auth buttons – same style as login */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full border-neutral-700 text-neutral-200 hover:bg-neutral-900/70 flex items-center justify-center gap-2"
        // onClick={handleGithubSignup}
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-xs">
            GH
          </span>
          <span>Sign up with GitHub</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full border-neutral-700 text-neutral-200 hover:bg-neutral-900/70 flex items-center justify-center gap-2"
        // onClick={handleGoogleSignup}
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-neutral-900">
            G
          </span>
          <span>Sign up with Google</span>
        </Button>
      </div>
    </form>
  );
};

export default SignupPage;
