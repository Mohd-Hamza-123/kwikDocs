import React from 'react'
import { posts } from "#site/content";
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/mdx-component';
import "@/styles/mdx.css"
interface PostPageProps {
    params: {
        slug: string[];
    };
}

async function getPostFromParams(params: PostPageProps["params"]) {
    const slug = params?.slug?.join("/");
    const post = posts.find((post) => post.slugAsParams === slug);
    return post;
}

export async function generateStaticParams(): Promise<
    PostPageProps["params"][]
> {
    return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
    const post = await getPostFromParams(params);
    console.log("post", post)
    if (!post || !post.published) {
        notFound();
    }

    return <article className="container py-6 prose dark:prose-invert max-w-[100dvw] lg:max-w-[75dvw] mx-auto">
        <h1 className="text-xl">{post.title}</h1>
        {post.description ? (
            <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
        ) : null}
        <hr className="my-4" />
        <MDXContent code={post.body} />
    </article>
}