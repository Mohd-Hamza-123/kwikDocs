"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import siteConfig from "@/conf/site";
import Branding from "@/components/Branding";
import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/use-current-user";
import { FiMenu, FiX, FiCode, FiBookOpen, FiZap } from "react-icons/fi";

export default function HomePage() {

    const [open, setOpen] = useState(false);
    const { data: user } = useCurrentUser()

    // console.log(user)

    const links = [
        {
            name: "signup",
            href: "/signup",
            isHidden: user ? true : false
        },
        {
            name: "login",
            href: "/login",
            isHidden: user ? true : false
        },

    ]

    const explore = [
        {

        }
    ]

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#07070c] text-gray-100 antialiased selection:bg-violet-500/30 selection:text-white">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-56 left-1/2 h-[34rem] w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600/40 via-purple-500/30 to-cyan-400/20 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,80,255,0.16),transparent_35%)]" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

                    <Branding />

                    <nav className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
                        {links.map((link) => (
                            <Link
                                href={link.href}
                                className={cn(link.isHidden ? "hidden" : "", "transition hover:text-white")}
                                >
                                {link.name}
                            </Link>
                        ))}
                        {user && <Button variant={"destructive"} >
                            Logout
                        </Button>}
                    </nav>

                    <Button
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-white hover:bg-white/10">
                        {open ? <FiX size={22} /> : <FiMenu size={22} />}
                    </Button>
                </div>

                {open && (
                    <div className="md:hidden from-indigo-600/40 via-purple-500/30 to-cyan-400/20">
                        <nav className="flex flex-col px-6 py-4 text-sm font-medium text-gray-300">
                            <Link href="/signup" onClick={() => setOpen(false)} className="py-3 hover:text-white">
                                Sign Up
                            </Link>
                            <Link href="/app/playground" onClick={() => setOpen(false)} className="py-3 hover:text-white">
                                Playground
                            </Link>
                        </nav>
                    </div>
                )}
            </header>

            <main className="relative z-10">
                {/* Hero */}
                <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-20 text-center sm:pt-28">
                    <div className="mb-6 inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
                        Fast · Interactive · Live Code Docs
                    </div>

                    <h1 className="max-w-4xl text-4xl font-extrabold tracking-wider text-white sm:text-6xl lg:text-6xl">
                        Learn by Running Code {" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                            Directly in the Browser
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                        {siteConfig.description}
                    </p>

                    <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/app/playground"
                            className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:opacity-95">
                            Open Playground
                        </Link>

                        <Link
                            href="/docs"
                            className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:opacity-95"
                        >
                            Explore Docs
                        </Link>


                    </div>

                    <p className="mt-5 text-sm text-gray-500">
                        Markdown Docs · Live Code Execution · Instant Preview
                    </p>
                </section>

                {/* Preview */}
                <section className="mx-auto mt-16 max-w-5xl px-6">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-purple-950/30 backdrop-blur">
                        <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-3 text-sm text-gray-400">
                            <span className="h-3 w-3 rounded-full bg-red-500" />
                            <span className="h-3 w-3 rounded-full bg-yellow-500" />
                            <span className="h-3 w-3 rounded-full bg-green-500" />
                            <span className="ml-3 font-medium text-gray-300">interactive-guide.jsx</span>
                        </div>

                        <div className="grid md:grid-cols-2">
                            <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-violet-300">
                                    Code
                                </p>

                                <pre className="overflow-x-auto rounded-xl bg-black/50 p-4 text-left text-sm leading-7 text-green-300">
                                    {`function Welcome() {
  return (
    <h1>Hello, KwikDocs 🚀</h1>
  );
}

render(<Welcome />);`}
                                </pre>
                            </div>

                            <div className="p-5 text-left">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                                    Live Output
                                </p>

                                <div className="rounded-xl border border-white/10 bg-black/40 p-5">
                                    <h2 className="text-2xl font-bold text-white">
                                        Hello, KwikDocs 🚀
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-400">
                                        This output updates when your code changes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="mx-auto mt-24 grid max-w-6xl gap-6 px-6 sm:grid-cols-3">
                    <FeatureCard
                        icon={<FiBookOpen />}
                        title="Interactive Docs"
                        desc="Create guides, tutorials, and API docs with runnable examples."
                    />
                    <FeatureCard
                        icon={<FiCode />}
                        title="Built-in Code Editor"
                        desc="Write, edit, and test code directly inside your documentation."
                    />
                    <FeatureCard
                        icon={<FiZap />}
                        title="Fast Preview"
                        desc="See code output instantly without switching tools or setting up locally."
                    />
                </section>
            </main>

            <footer className="relative z-10 mt-24 border-t border-white/10 py-6 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} KwikDocs. Build docs users can run.
            </footer>
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.07]">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-xl text-violet-300">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">{desc}</p>
        </div>
    );
}