'use client'

import "@/styles/mdx.css"
import Link from 'next/link'
import { posts } from '#site/content'
import React, { useState } from 'react'
import { notFound } from 'next/navigation'
import PostItems from '@/components/PostItems'
import { MdOutlineZoomOutMap } from "react-icons/md";
import { MDXContent } from '@/components/mdx-component';
import { PostItemsProps } from '@/components/PostItems';

const page = ({ params }: { params: { category: string } }) => {

  const { category } = params
  const [post, setPost] = useState<PostItemsProps | null>(null)
  const [activeSlug, setActiveSlug] = useState('')

  const displayPosts = posts?.filter((post) => post?.slug.indexOf(category) === 0 && post?.published);

  const renderPost = (post: PostItemsProps) => {
    setPost(post)
    setActiveSlug(post?.slug)
  }

  return (
    <main className="flex flex-col-reverse lg:flex-row relative h-[90vh] overflow-x-hidden w-full justify-between">
      {/* Sidebar */}
      <section className="w-[100%] lg:w-[20%] border border-r-3 max-h-[88vh] overflow-y-scroll absolute lg:sticky top-0 bg-slate-50 dark:bg-bgDark z-20 py-2 dark:border-gray-700 lg:block">
        <p className="mt-4 text-center font-semibold capitalize">{category}</p>

        <ul className="flex flex-col gap-1 mt-5">
          {displayPosts?.map((post) => (
            <PostItems
              post={post}
              key={post?.slug}
              category={category}
              renderPost={renderPost}
              activeSlug={activeSlug}
            />
          ))}
        </ul>

        <span className="text-center text-sm mx-auto block my-2">
          No documents found.
        </span>

      </section>

      {/* Main Content */}
      {post && <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
        <h1 className="mb-2">{post.title}</h1>

        {post.description ? (
          <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
        ) : null}
        <hr className="my-4" />
        <MDXContent code={post.body} />
      </article>}


      <section className="lg:w-[20%] border">


      </section>
    </main>
  )
}

export default page


