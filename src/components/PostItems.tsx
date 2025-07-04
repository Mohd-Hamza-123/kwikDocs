'use client'
import React from 'react'
import { useResponsiveContext } from '@/context/CSS-Context';
import { PostItemsProps } from '@/lib/store/features/postSlice';
import { memo } from 'react';
const PostItems = ({
    post,
    renderPost,
    activeSlug }: {
        post: PostItemsProps,
        renderPost: any,
        activeSlug: string
    }) => {
        
    const { setIsDocIndexOpen } = useResponsiveContext();

    const handleClick = () => {
        renderPost(post)
        setIsDocIndexOpen(false)
    }

    return (
        <li
            onClick={handleClick}
            className={`poppins text-sm font-bold px-2 py-3 md:py-2 sm:py-4 list-none cursor-pointer border-b border-gray-400 dark:text-gray-300 ${post?.slug === activeSlug
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-300 dark:hover:bg-black"
                }`}>
            {post?.title}
        </li>
    )
}

export default memo(PostItems)