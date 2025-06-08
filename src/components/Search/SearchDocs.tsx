'use client'

import Link from 'next/link'
import { posts } from '#site/content';
import { Input } from "@/components/ui/input";
import { useTypicalContext } from '@/context/Typical-Context';
import React, { useCallback, useEffect, useState, useRef } from 'react'

const SearchDocs = () => {

    const searchRef = useRef<HTMLInputElement>(null)
    const [searchPosts, setSearchPosts] = useState<any>([])
    const { setIsDocSearchOpen, isDocSearchOpen } = useTypicalContext()

    const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.currentTarget.value
        if (!searchTerm || searchTerm.length < 3) return []
        const filterPosts = posts?.filter((post) => {
            if (post?.title.includes(searchTerm) || post?.body.includes(searchTerm)) return post
        })
        filterPosts?.length > 0 ? filterPosts : []
        setSearchPosts(filterPosts)
    }, [])

    useEffect(() => {
        if (searchRef.current) searchRef.current.focus()
    }, [isDocSearchOpen])

    return (
        <form
            className={`${isDocSearchOpen ? "" : "hidden"} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[92dvw] lg:w-[40dvw] h-[70dvh] transition-non md:w-1/2 flex gap-2 bg-white dark:bg-black px-3 py-4 z-40`}>
            <div className='w-full lg:w-[40dvw] lg:h-[55dvh] transition-none z-50'>
                <Input
                    ref={searchRef}
                    onChange={onSearch}
                    className="w-full outline-none"
                    placeholder='Search Documentation...'
                />

                <ul className='overflow-y-scroll h-[85%] mt-2'>
                    {searchPosts?.length > 0 ? searchPosts?.map((post: any) => {
                        return <li className='list-none px-3 py-2 hover:bg-gray-100 dark:hover:bg-black' key={post?.slug}>
                            <Link href={`/document/${post?.slug.split('/')[0]}/${post?.slugAsParams}`} className='flex gap-2' onClick={() => setIsDocSearchOpen(false)}>
                                <h6 className='font-bold'>
                                    {(post?.slug?.split('/')[0]).toUpperCase()}
                                </h6>
                                <span>-</span>
                                <h6>{post?.title}</h6>
                            </Link>
                        </li>
                    }) : <li className='text-center list-none px-3 py-2'>No Results Found</li>}
                </ul>
            </div>

        </form>
    )
}

export default SearchDocs