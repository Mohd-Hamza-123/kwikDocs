'use client'
import "@/styles/mdx.css";
import { posts } from '#site/content';
import { toast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { useAppDispatch } from '@/lib/hooks/hooks';
import type { FileNode } from "@/utils/getContentTree";
import React, { useEffect, useMemo, useState } from 'react';
import { useResponsiveContext } from "@/context/CSS-Context";
import { FilteredPostList, LoadingPage, ShowPost } from "@/index";
import { setAllDocs, setDoc } from "@/lib/store/features/docsSlice";

export default function DocPage() {

  console.log(posts)
  const { tech } = useParams()
  console.log(tech)
  const dispatch = useAppDispatch()
  const [nodes, setNodes] = useState<FileNode[] | null>(null)

  let allPost = useMemo(() => posts?.filter((post) => post?.slug.indexOf(tech as string) === 0 && post?.published)
    , [posts, tech]);

  console.log("All post ")
  console.log(allPost)

  const { isDocIndexOpen } = useResponsiveContext();

  useEffect(() => {
    dispatch(setAllDocs({ allDocuments: allPost }))
    dispatch(setDoc({ document: allPost[0] }))
    fetch(`/api/content-tree/?tech=${tech}`)
      .then(res => res.json())
      .then((res) => {
        // console.log(res)
        if (res?.tree) setNodes(res?.tree)
        else setNodes(null)
      })
      .catch(err => {
        console.error(err)
        toast({
          title: 'Something went wrong',
          variant: "destructive"
        })
        setNodes([])
      })

  }, [])

  if (nodes) {
    return (
      <>
        <section className={`w-[100%] lg:w-[20%] max-h-[91vh] overflow-y-scroll absolute lg:sticky top-0 bg-slate-50 dark:bg-bgDark z-20 py-2 lg:block ${isDocIndexOpen ? "block" : "hidden"} lg:block`}>
          <FilteredPostList nodes={nodes} />
        </section>
        <ShowPost />
      </>
    )
  } else {
    return <LoadingPage />
  }
}



