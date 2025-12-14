'use client'

import "@/styles/mdx.css"
import React from 'react'
import { posts } from "#site/content";
import { MDXContent } from '@/components/mdx-component';
import { useRouter, useParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { DocumentType as PostType } from "../../../types/docs.type";

// export async function generateStaticParams(): Promise<
//     PostPageProps["params"][]
// > {
//     return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
// }

function getPostFromParams(slugArray: string[]) {
    const slug = slugArray.join("/")
    // console.log("slug : ", slug)
    const post = posts.find((post) => post?.slug === slug)
    console.log(post?.slug)
    return post
}

export default function PostPage() {

    const router = useRouter()
    const { slug  } = useParams()
    // console.log("slug : ",slug)
    const post: PostType | undefined = getPostFromParams(slug as string[]);
    if (!post || !post.published) {
        toast({
            title: "Document not found",
        })
        router.push('/')
    }

    return <article className="container py-6 prose dark:prose-invert max-w-[100dvw] lg:max-w-[75dvw] mx-auto">
        <h1 className="text-xl">{post?.title}</h1>
        <hr className="my-3" />
        <MDXContent code={post?.body!} />
    </article>
}