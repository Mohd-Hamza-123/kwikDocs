"use client";

import { useState } from "react";
import Branding from "@/components/Branding";
import Link from "next/link";
import { siteConfig } from "../../../config/site";
import { FiMenu, FiX } from "react-icons/fi";

export default function GetStarted() {
  
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-x-hidden relative bg-[#0b0b10] text-gray-100 antialiased selection:bg-indigo-500/30 selection:text-white">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[32rem] w-[72rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600/40 via-purple-500/30 to-cyan-400/30 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

          {/* Branding */}
          <div className="flex items-center gap-2">
            <Branding />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
            <Link href="/app" className="hover:text-white">
              Home
            </Link>
            <Link href="/app/playground" className="hover:text-white">
              Playground
            </Link>
            <Link
              href={siteConfig.links.github}
              className="hover:text-white"
              target="_blank"
            >
              GitHub
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden rounded-md p-2 text-gray-300 hover:bg-white/10"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur">
            <nav className="flex flex-col px-6 py-4 text-sm text-gray-300">
              <Link
                href="/app"
                onClick={() => setOpen(false)}
                className="py-2 hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/app/playground"
                onClick={() => setOpen(false)}
                className="py-2 hover:text-white"
              >
                Playground
              </Link>
              <Link
                href={siteConfig.links.github}
                onClick={() => setOpen(false)}
                className="py-2 hover:text-white"
                target="_blank"
              >
                GitHub
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <main className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-sm text-gray-200 backdrop-blur">
          <span className="text-purple-400 font-medium">
            Fast · Interactive · Live
          </span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          The All-in-One <br className="hidden sm:block" /> Docs & Code Editor
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          Kwikdocs lets you write {" "}
          <span className="font-semibold text-gray-200">
            live runnable code snippets
          </span>{" "}
          — perfect for tutorials, APIs, and interactive guides.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/home"
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-gray-200 backdrop-blur transition hover:bg-white/10"
          >
            Login
          </Link>
        </div>

        {/* Live code preview */}
        <section className="mt-16 w-full max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-black/50 shadow-xl backdrop-blur">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-2 text-sm text-gray-400">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-3 font-medium text-gray-300">Example.jsx</span>
          </div>
          <pre className="p-4 text-left text-sm text-green-300">
{`function Hello() {
  return <h1>Hello, Kwikdocs 🚀</h1>
}

render(<Hello />, root)`}
          </pre>
          <div className="border-t border-white/10 bg-black/30 p-4 text-left text-gray-300">
            <span className="font-semibold text-indigo-400">Output:</span>
            <div className="mt-2 rounded-md bg-gray-900/40 p-3 text-white">
              Hello, Kwikdocs 🚀
            </div>
          </div>
        </section>
      </main>

      {/* Features */}
      <section className="mx-auto mt-24 grid max-w-6xl gap-10 px-6 text-center sm:grid-cols-3">
        <FeatureCard
          title="Easy Documentation"
          desc="Read documentation alongside runnable code snippets for better understanding."
        />
        <FeatureCard
          title="Live Editor"
          desc="Write and run code right inside your docs. No setup required."
        />
        <FeatureCard
          title="Fast & Lightweight"
          desc="Powered by modern tooling for instant load and smooth editing."
        />
      </section>

      {/* Footer */}
      <footer className="mt-24 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Kwikdocs. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10">
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-300">{desc}</p>
    </div>
  );
}
