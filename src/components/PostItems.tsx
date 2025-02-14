import Link from 'next/link';
import React from 'react'
interface PostItemsProps {
    slug: string;
    title: string;
    description?: string;
    slugAsParams: string;
    category: String
}

const PostItems = ({ slug, title, description, slugAsParams, category }: PostItemsProps) => {
    return (
        <Link key={slug} href={`/document/${slugAsParams}`}>
            <li
                className={`capitalize text-sm font-bold rounded-sm px-2 py-3 md:py-2 sm:py-4 list-none cursor-pointer border-b border-gray-200 dark:text-gray-300 ${slug === category
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-300 dark:hover:bg-black"
                    }`}
            >
                {title}
            </li>
        </Link>
    )
}

export default PostItems