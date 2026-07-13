'use client'

import Link from 'next/link'
import { Button } from '../ui/button';
import { CiSearch } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { api, expressRoutes } from '@/lib/api/common';
import { useTypicalContext } from '@/context/Typical-Context';
import TechnologyComboBox from "@/components/Search/TechnologyComboBox";
import React, { useCallback, useEffect, useState, useRef } from 'react'


type SearchedDocs = {
    tech: string;
    title: string;
    slug: string;
}[]

const SearchDocs = () => {

    const { register, handleSubmit } = useForm()
    const [searchedDocs, setSearchedDocs] = useState<SearchedDocs>([])
    const [technology, setTechnology] = useState<string>("all")
    const { setIsDocSearchOpen, isDocSearchOpen } = useTypicalContext()

    console.log(searchedDocs)

    const submit = async (data: any) => {

        const value = data.value
        // console.log(value)
        // console.log(technology)

        const response = await api.get({
            url: expressRoutes.searchDocs,
            query: {
                tech: technology,
                searchValue: value,
            }
        })
        
        setSearchedDocs(response.data)

    }

    const changeTechnology = (value: string) => setTechnology(value)



    return (
        <div
            className={`${isDocSearchOpen ? "" : "hidden"} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[92dvw] lg:w-[40dvw] h-[70dvh] transition-non md:w-1/2 bg-white dark:bg-bgDark px-3 py-4 z-40 flex flex-col gap-2`}
        >
            <form
                onSubmit={handleSubmit(submit)}
                className="flex gap-2"
            >
                <Input
                    {...register("value")}
                    className="w-full outline-none"
                    placeholder='Search Documentation...'
                />
                <TechnologyComboBox value={technology} onChange={changeTechnology} />
                <Button type='submit'><CiSearch /></Button>
            </form>


            <ul className='overflow-y-scroll h-full mt-2'>
                {searchedDocs?.length > 0 ? searchedDocs?.map((post: any) => {
                    return <li className='list-none px-3 py-2 hover:bg-gray-100 dark:hover:bg-black' key={post?.slug}>
                        <Link href={`/docs/${post.slug}`} className='flex gap-2' onClick={() => setIsDocSearchOpen(false)}>
                            <h6 className='font-bold'>
                                {(post?.slug?.split('/')[0]).toUpperCase()}
                            </h6>
                            <span>-</span>
                            <h6>{post?.title}</h6>
                        </Link>
                    </li>
                }) :
                    <li className='text-center list-none px-3 py-2'>No Results Found</li>
                }
            </ul>
        </div>

    )
}

export default SearchDocs