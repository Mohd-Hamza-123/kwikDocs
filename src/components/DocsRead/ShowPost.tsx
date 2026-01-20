'use client'
import Link from "next/link";
import { MDXContent } from "../mdx-component";
import { useAppSelector } from "@/lib/hooks/hooks";
import { MdOutlineZoomOutMap } from "react-icons/md";

const ShowPost = () => {

    const post = useAppSelector((state) => state.docs.document);
    
    return <section className="w-full lg:w-[80%] overflow-y-scroll" >

        {post && <article className="p-3 prose dark:prose-invert max-w-[100%] ">
            <div className="flex justify-between items-center">

                <h1 className="mb-2 text-xl">{post?.title}</h1>

                <Link
                    className="hidden lg:block"
                    href={`/document/${post?.slug.split('/')[0]}/${post?.slugAsParams}`}><MdOutlineZoomOutMap className="h-5 w-5" />
                </Link>
            </div>

            <hr className="my-4" />
            <MDXContent code={post?.body} />
        </article>
        }

    </section>
};

export default ShowPost;
