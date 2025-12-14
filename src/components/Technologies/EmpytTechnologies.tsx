import React from 'react';
export default function EmptyTechnologies() {

    return (
        <section className="w-full h-[88dvh] flex items-center">
            <div className="mx-auto max-w-2xl">
                <div className="flex items-center gap-3 text-sm uppercase tracking-wide text-zinc-400">
                    <span>⚠️</span>
                    <span>No Documents to show</span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold bg-clip-text text-transparent 
                     bg-gradient-to-r from-white to-zinc-400">
                    Nothing to show
                </h2>

                <p className="mt-3 text-zinc-400/90 leading-relaxed">
                    We couldn’t find any documents for this page. This could be a network hiccup, or a temporary server issue.
                </p>

                <ul className="mt-6 space-y-2 text-zinc-400">
                    <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Check your connection, then retry.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Try refreshing the page.</span>
                    </li>
                </ul>

                <div className="mt-8 flex items-center gap-3">
                    <button
                        className="rounded-lg border border-white/15 px-4 py-2 text-sm 
                       hover:border-white/25 transition">
                        Retry
                    </button>

                </div>
            </div>
        </section>
    );
}
