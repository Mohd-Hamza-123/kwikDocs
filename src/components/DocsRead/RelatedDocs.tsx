'use client'
import { useAppSelector } from '@/lib/hooks/hooks';
import React, { useEffect, useState } from 'react'


const RelatedDocs = () => {
  const document = useAppSelector((state) => state.docs.document);
  const [selectedID, setSelectedID] = useState('')

  const handleScrollTo = (id: string) => {
    setSelectedID(id)
    const element = window.document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='text-center w-[18%] border border-l-0 lg:block hidden'>
      <p className="mt-4 text-center font-semibold">On this page</p>
      <ul className="flex flex-col gap-1 mt-5">
        {document?.bookmark?.map((bookmark) => (
          <li
            key={bookmark?.bookmarkID}
            className={`rounded-sm px-2 py-3 md:py-2 sm:py-4 list-none cursor-pointer border-b border-gray-200  text-gray-700 ${selectedID === bookmark?.bookmarkID ? 'text-indigo-600' : ''}`}
            onClick={() => { handleScrollTo(bookmark?.bookmarkID) }}
          >
            {bookmark?.bookmarkName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RelatedDocs