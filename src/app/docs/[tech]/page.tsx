'use client'

import "@/styles/mdx.css"
import React, { useEffect } from 'react'
import { FilteredPostList, ShowPost } from "@/index"
import { posts } from '#site/content'
import { useMemo } from "react"
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { setActiveSlug, setPosts } from '@/lib/store/features/postSlice';
import { useResponsiveContext } from "@/context/CSS-Context";

export default function DocPage({ params }: { params: { tech: string } }) {

  const { tech } = params
  const dispatch = useAppDispatch()
  // console.log("category", tech)
  const allPost = useMemo(() => posts?.filter((post) => post?.slug.indexOf(tech) === 0 && post?.published)
    , [posts, tech]);
  console.log(allPost)
 const { isDocIndexOpen } = useResponsiveContext();
  useEffect(() => {
    dispatch(setPosts({ post: allPost[0] }))
    dispatch(setActiveSlug({ activeSlug: allPost[0]?.slug }))
  }, [])

  return (
    <>
      <FilteredPostList
        tech={tech}
        allPost={allPost}
        isDocIndexOpen={isDocIndexOpen}
      />
      <ShowPost
        tech={tech}
        allPost={allPost}
      />
      <section className="w-full lg:w-[20%] border">

      </section>
    </>
  )
}



