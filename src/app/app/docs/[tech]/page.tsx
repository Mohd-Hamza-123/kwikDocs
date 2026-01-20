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

  let filteredPost = [];
  const { tech } = useParams()
  const dispatch = useAppDispatch()
  const [nodes, setNodes] = useState<FileNode[] | null>(null);

  if (process.env.NODE_ENV === "production") {
    filteredPost = useMemo(() => posts?.filter((post) => post?.slug.indexOf(tech as string) === 0 && post?.published)
      , [posts, tech]);
  } else {
    filteredPost = posts
  }

  const { isDocIndexOpen } = useResponsiveContext();

  // console.log(filteredPost)

  useEffect(() => {
    dispatch(setAllDocs({ allDocuments: filteredPost }))
    dispatch(setDoc({ document: filteredPost[0] }))
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
      <div className="w-full flex flex-col lg:flex-row">
        <section className={`w-full lg:w-[20%] overflow-y-scroll bg-slate-50 dark:bg-bgDark z-20 py-2 sticky top-0 ${isDocIndexOpen ? "block" : "hidden"} lg:block`}>
          <FilteredPostList nodes={nodes} />
        </section>
        <ShowPost />
      </div>
    )
  } else {
    return <LoadingPage />
  }
}



