import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh w-full grid grid-cols-1 lg:grid-cols-2 bg-neutral-950 text-neutral-100">
      {/* LEFT HERO */}
      <div className="hidden lg:block relative overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero.jpg"
          alt="Hero"
          width={1600}
          height={1600}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-black/10" />

        {/* Content on top */}
        <div className="relative z-10 flex h-full flex-col justify-between px-12 py-10">
          {/* Brand row */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-black/60 border border-pink-400/40 flex items-center justify-center shadow-[0_0_18px_rgba(244,114,182,0.5)]">
              <Image
                src="/logo.png"
                alt="Kwik Docs"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide text-pink-300">
                Kwik Docs
              </span>
              <span className="text-xs text-pink-100/80">
                Read docs like stories.
              </span>
            </div>
          </div>

          {/* Main hero text */}
          <div className="pb-10 max-w-xl">
            <h1 className="text-4xl font-semibold leading-tight text-white">
              Read the docs like <br /> stories.
            </h1>
            <p className="mt-3 text-sm text-pink-100/80 max-w-md">
              Turn dry documentation into clean narrative pages your team
              actually enjoys reading.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT – SIGNUP FORM (unchanged) */}
      <div className="flex items-center justify-center px-6 sm:px-12 lg:px-20 py-3">
        <div className="w-full max-w-md">
          {children}

          <div className="mt-6 flex justify-between text-sm text-neutral-400">
            <p>Already a user?</p>
            <Link href="/login" className="hover:text-neutral-200">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
