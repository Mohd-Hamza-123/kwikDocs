'use client'
import { CiCircleList } from "react-icons/ci";
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'
import { useAppSelector } from '@/lib/hooks/hooks'
import { api, expressRoutes } from '@/lib/api/common'
import { MDXContent } from '@/components/mdx-component'
import { Button } from '@/components/ui/button'
import { useResponsiveContext } from '@/context/CSS-Context'

export default function Page() {

  const params = useParams()
  const slug = params.slug as string[]

  const firstDoc = useAppSelector((state) => state.dataSlice.defaultDoc)
  // console.log(firstDoc)
  const fullSlug = slug.join('/')

  const {
    isDocIndexOpen,
    setIsDocIndexOpen
  } = useResponsiveContext();
  const docIndexToggle = () => setIsDocIndexOpen((prev) => !prev)

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['document', fullSlug],
    queryFn: () =>
      api.get({
        url: expressRoutes.getSingleDoc,
        route: {
          slug: fullSlug,
        },
      }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: slug.length > 1
  })

  const document = data?.data ? data?.data : firstDoc

  if (!document) return <div className="w-full h-full flex justify-center items-center">
    <Spinner />
  </div>

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Error: {error.message}
      </div>
    )
  }

  return (
    <main className="w-full px-4 py-4 overflow-y-auto">
      <header className="mb-8">

        <div className="flex items-start justify-between gap-3">
          <h1 className="text-3xl font-bold tracking-tight"> {document.title}</h1>

          <Button
            size="sm"
            variant="ghost"
            onClick={docIndexToggle}
            className={`lg:hidden shrink-0 gap-2 rounded-lg border border-white/10 px-3 hover:bg-indigo-500/10 hover:text-indigo-400 ${isDocIndexOpen ? "text-indigo-400 bg-indigo-500/10" : "text-muted-foreground"
              }`}
          >
            <CiCircleList size={18} />

          </Button>
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{document.metaData?.readingTime} min read</span>
          <span>{document.metaData?.wordCount} words</span>
          {document.difficulty && (
            <span className="rounded-md border px-2 py-1 text-xs">
              {document.difficulty}
            </span>
          )}
        </div>

      </header>
      {document?.body && <article className="prose prose-neutral max-w-none dark:prose-invert">
        {/* render mdx body */}
        <MDXContent code={document.body} />
      </article>}

    </main>
  )
}