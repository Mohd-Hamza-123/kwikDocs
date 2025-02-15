'use client'
import { useResponsiveContext } from '@/context/CSS-Context';
import { useTypicalContext } from '@/context/Typical-Context';
import React, { useState } from 'react'

export interface PostItemsProps {
    slug: string;
    title: string;
    description?: string | undefined;
    slugAsParams: string;
    body: string;
    published: boolean
}

const PostItems = ({
    post,
    category,
    renderPost,
    activeSlug }: {
        post: PostItemsProps,
        category: string,
        renderPost: any,
        activeSlug: string
    }) => {
    const {
        isDocIndexOpen,
        setIsDocIndexOpen
    } = useResponsiveContext();
    return (
        <li
            onClick={() => {
                renderPost(post)
                setIsDocIndexOpen(false)
            }}
            className={`text-sm font-bold rounded-sm px-2 py-3 md:py-2 sm:py-4 list-none cursor-pointer border-b border-gray-200 dark:text-gray-300 ${post?.slug === activeSlug
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-300 dark:hover:bg-black"
                }`}
        >
            {post?.title}
        </li>
    )
}

export default PostItems