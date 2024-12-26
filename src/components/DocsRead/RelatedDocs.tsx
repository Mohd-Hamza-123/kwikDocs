'use client'
import { useResponsiveContext } from '@/context/CSS-Context';
import { useAppSelector } from '@/lib/hooks/hooks';
import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa";

const RelatedDocs = () => {
  const [selectedID, setSelectedID] = useState('')
  const [bookmarkName, setBookmarkName] = useState('')
  const document = useAppSelector((state) => state.docs.document);

  const {
    isDocBookmarkOpen,
    setIsDocBookmarkOpen
  } = useResponsiveContext()

  const handleScrollTo = (id: string) => {
    setSelectedID(id)
    setIsDocBookmarkOpen((prev) => !prev);
    const element = window.document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" })
  };

  return (
    <div className={`text-left lg:text-center w-full h-fit lg:w-[18%] border border-l-0 lg:block lg:static z-20 bg-slate-100 text-black top-0 ${document ? "block" : "hidden"}`}>
      <div className='flex items-center gap-2 max-w-full w-full my-3 mx-2'
        onClick={() => setIsDocBookmarkOpen((prev) => !prev)}
      >
        <div className='flex items-center gap-3 border border-black lg:border-none rounded-lg px-2 lg:justify-center lg:w-full'>
          <p className="text-left lg:text-center font-md inline-block text-nowrap"> On this page </p>
          <FaAngleRight className='lg:hidden'/>
        </div>
        <h5 className='truncate text-sm font-bold lg:hidden'>{bookmarkName}</h5>
      </div>
      <ul className={`lg:flex flex-col gap-1 mt-3 lg:mt-5  ${isDocBookmarkOpen ? "flex" : "hidden"}`}>
        {document?.bookmark?.map((bookmark) => (
          <li

            key={bookmark?.bookmarkID}
            className={`text-sm font-bold rounded-sm px-2 py-1 text-left lg:py-3 md:py-2 sm:py-4 list-none cursor-pointer border-b border-gray-200 text-gray-700 ${selectedID === bookmark?.bookmarkID ? 'text-indigo-600' : ''}`}
            onClick={() => {
              handleScrollTo(bookmark?.bookmarkID);
              setBookmarkName(bookmark?.bookmarkName)
            }}
          >
            {bookmark?.bookmarkName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RelatedDocs