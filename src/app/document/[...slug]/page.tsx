'use client'

import "@/styles/mdx.css"
import React from 'react'
import { posts } from "#site/content";
import { MDXContent } from '@/components/mdx-component';
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

// export async function generateStaticParams(): Promise<
//     PostPageProps["params"][]
// > {
//     return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
// }

function getPostFromParams(params: any) {
    const slug = params.slug.join("/")
    console.log("slug : ", slug)
    const post = posts.find((post) => post?.slug === slug)
    console.log(post?.slug)
    return post
}

export default function PostPage({ params }: any) {
    const router = useRouter()
    const post = getPostFromParams(params);
    if (!post || !post.published) {
        toast({
            title: "Document not found",
        })
        router.push('/')
    }

    return <article className="container py-6 prose dark:prose-invert max-w-[100dvw] lg:max-w-[75dvw] mx-auto">
        <h1 className="text-xl">{post?.title}</h1>
        {post?.description ? (
            <p className="text-md mt-0 text-muted-foreground">{post?.description}</p>
        ) : null}
        <hr className="my-3" />
        <MDXContent code={post?.body!} />
    </article>
}