'use client'
import { LoadingPage } from '@/index'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { api, expressRoutes } from '@/lib/api/common'
import { MDXContent } from '@/components/mdx-component'
import { useAppSelector } from '@/lib/hooks/hooks'

export default function Page() {

  const params = useParams()
  const slug = params.slug as string[]

  const firstDoc = useAppSelector((state) => state.dataSlice.defaultDoc)
  // console.log(firstDoc)
  const fullSlug = slug.join('/')

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
  console.log(document)

  if (!document) return <LoadingPage />

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Error: {error.message}
      </div>
    )
  }

  if (!document) {
    return (
      <div className="p-6">
        Document not found
      </div>
    )
  }

  return (
    <article className="w-full px-6 py-8 overflow-y-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          {document.title}
        </h1>

        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            {document.metaData?.readingTime} min read
          </span>

          <span>
            {document.metaData?.wordCount} words
          </span>

          {document.difficulty && (
            <span className="rounded-md border px-2 py-1 text-xs">
              {document.difficulty}
            </span>
          )}
        </div>
      </header>

      {document?.body && <div className="prose prose-neutral max-w-none dark:prose-invert">
        {/* render mdx body */}
        <MDXContent code={document.body} />
      </div>}

    </article>
  )
}