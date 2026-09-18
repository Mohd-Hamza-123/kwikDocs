import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        {/* 404 */}
        <div className="mb-8">
          <span className="font-mono text-8xl sm:text-9xl font-bold tracking-tighter text-muted-foreground/20">
            404
          </span>
        </div>

        {/* Terminal-style message */}
        <div className="mx-auto max-w-lg overflow-hidden rounded-xl border bg-card text-left shadow-sm">
          <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />

            <span className="ml-2 font-mono text-xs text-muted-foreground">
              kwikdocs
            </span>
          </div>

          <div className="p-5 font-mono text-sm">
            <p className="text-muted-foreground">
              <span className="text-foreground">$</span>{" "}
              kwikdocs find-page
            </p>

            <p className="mt-3 text-red-500">
              Error: Page not found
            </p>

            <p className="mt-2 text-muted-foreground">
              The documentation page you are looking for
              does not exist.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Looks like you took a wrong turn.
          </h1>

          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            The page you're looking for doesn't exist or may
            have been moved somewhere else.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to Home
            </Link>

            <Link
              href="/docs"
              className="inline-flex h-10 items-center justify-center rounded-md border px-5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Browse Documentation
            </Link>
          </div>
        </div>

        {/* Branding */}
        <p className="mt-12 font-mono text-xs text-muted-foreground">
          kwikdocs<span className="text-primary">.</span>
        </p>
      </div>
    </main>
  );
}