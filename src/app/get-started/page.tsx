import Branding from "@/components/Branding";

export default function GetStarted() {
  return (
    <div className="relative min-h-screen bg-[#0b0b10] text-gray-100 antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[32rem] w-[72rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600/40 via-purple-500/30 to-cyan-400/30 blur-3xl" />
        <div className="absolute -bottom-64 left-1/2 h-[28rem] w-[72rem] -translate-x-1/2 rounded-full bg-gradient-to-t from-purple-700/20 via-indigo-700/10 to-transparent blur-3xl" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-0">
          <div className="flex items-center gap-2">
            <Branding/>
          </div>
          <nav className="hidden gap-6 md:flex text-sm text-gray-300">
            <a href="#" className="hover:text-white">Docs</a>
            <a href="#" className="hover:text-white">Playground</a>
            <a href="#" className="hover:text-white">Examples</a>
            <a href="#" className="hover:text-white">GitHub</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-20 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-sm text-gray-200 backdrop-blur">
          <span className="text-purple-400 font-medium">Fast · Interactive · Live</span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          The All-in-One <br className="hidden sm:block" /> Docs & Code Editor
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          Kwikdocs lets you write documentation **with live runnable code
          snippets** — perfect for tutorials, APIs, and interactive guides.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#get-started"
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:opacity-90"
          >
            Get Started
          </a>
          <a
            href="https://github.com"
            className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-gray-200 backdrop-blur transition hover:bg-white/10"
          >
            GitHub
          </a>
        </div>

        {/* Live code preview box */}
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
      <section className="mx-auto mt-24 max-w-6xl grid gap-10 px-6 text-center sm:grid-cols-3">
        <FeatureCard
          title="Live Editor"
          desc="Write and run code right inside your docs. No setup required."
        />
        <FeatureCard
          title="MDX + Code Blocks"
          desc="Mix markdown and live code for rich, interactive tutorials."
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

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10">
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-300">{desc}</p>
    </div>
  );
}
