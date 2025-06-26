'use client'
import Link from "next/link";
import { Button } from "../ui/button";
import { posts } from '#site/content'
import { MDXContent } from "../mdx-component";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { PostItemsProps, setActiveSlug, setPosts } from "@/lib/store/features/postSlice";


const ShowPost = ({ category }: { category: string }) => {

    const dispatch = useAppDispatch()
    const post = useAppSelector((state) => state.post.post);
    // console.log(post)
    const displayPosts = useMemo(() => posts?.filter((post) => post?.slug.indexOf(category) === 0 && post?.published)
        , [posts, category])

    const [nextPost, setNextPost] = useState(displayPosts[1] || null);
    const [previousPost, setPreviousPost] = useState(displayPosts[displayPosts?.length - 1] || null)

    const renderPost = (post: PostItemsProps) => {
        dispatch(setPosts({ post: post }))
        dispatch(setActiveSlug({ activeSlug: post?.slug }))
    }

    useEffect(() => {
        const index = post && displayPosts?.indexOf(post)
        // console.log(index)
        // if (!index) return
        setNextPost(displayPosts[index + 1] || null)
        setPreviousPost(displayPosts[index - 1] || null)
    }, [post])

    return <section className="w-full lg:w-[60%] overflow-y-scroll" >

        {post && <article className="py-3 prose dark:prose-invert max-w-[100%] px-3">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="mb-2 text-xl">{post?.title}</h1>
                    {post?.description ? (
                        <p className="text-md mt-0 text-muted-foreground">{post?.description}</p>
                    ) : null}
                </div>

                <Link
                    className="hidden lg:block"
                    href={`/document/${post?.slug.split('/')[0]}/${post?.slugAsParams}`}><MdOutlineZoomOutMap className="h-5 w-5" /></Link>

            </div>

            <hr className="my-4" />
            <MDXContent code={post?.body} />
        </article>
        }


        <div className="lg:mx-8 mx-4 lg:px-2 py-2 flex justify-between gap-2 flex-col lg:flex-row">
            <Button
                variant={'outline'}
                className={`flex flex-col py-10 w-full lg:w-1/3 text-sm lg:text-base ${previousPost ? '' : 'invisible'}`}
                onClick={() => renderPost(previousPost)}
            >
                <span className="font-extralight">Previous</span>
                <p className="font-bold lg:text-md text-sm text-wrap text underline">{previousPost?.title}</p>
            </Button>
            <Button
                variant={'outline'}
                className={`flex flex-col py-10 w-full lg:w-1/3 lg:text-base ${nextPost ? '' : 'invisible'}`}
                onClick={() => renderPost(nextPost)}
            >
                <span className="font-extralight">Next</span>
                <p className="font-bold lg:text-md text-sm text-wrap underline">{nextPost?.title}</p>
            </Button>
        </div>
    </section>
};

export default ShowPost;
