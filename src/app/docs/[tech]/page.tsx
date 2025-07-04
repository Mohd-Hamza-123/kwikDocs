'use client'
import "@/styles/mdx.css"
import { posts } from '#site/content'
import { useAppDispatch } from '@/lib/hooks/hooks';
import React, { useEffect, useMemo, useState } from 'react'
import { setAllDocs, setDoc } from "@/lib/store/features/docsSlice";
import { useResponsiveContext } from "@/context/CSS-Context";
import type { FileNode } from "@/services/helpers/getContentTree"
import { FilteredPostList, LoadingPage, ShowPost } from "@/index"

export default function DocPage({ params }: { params: { tech: string } }) {

  const { tech } = params
  const dispatch = useAppDispatch()
  const [nodes, setNodes] = useState<FileNode[] | null>(null)

  const allPost = useMemo(() => posts?.filter((post) => post?.slug.indexOf(tech) === 0 && post?.published)
    , [posts, tech]);

  const { isDocIndexOpen } = useResponsiveContext();

  useEffect(() => {
    dispatch(setAllDocs({ allDocuments: allPost }))
    dispatch(setDoc({ document: allPost[0] }))
    fetch(`/api/content-tree/${tech}`)
      .then(res => res.json())
      .then((res) => {
        if (res?.tree) setNodes(res?.tree)
        else setNodes(null)
      })

  }, [])

  if (nodes) {
    return (
      <>
        <section className={`w-[100%] lg:w-[20%] border border-r-3 max-h-[91vh] overflow-y-scroll absolute lg:sticky top-0 bg-slate-50 dark:bg-bgDark z-20 py-2 dark:border-gray-700 lg:block ${isDocIndexOpen ? "block" : "hidden"} lg:block`}>
          <FilteredPostList nodes={nodes} />
        </section>
        <ShowPost />
        <section className="w-full lg:w-[20%] border">

        </section>
      </>
    )
  } else {
    return <LoadingPage />
  }
}



