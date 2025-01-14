'use client'
import { ImSpinner3 } from "react-icons/im";
import { getDocs } from "@/lib/API/docsAPI/getDocs";
import { docsInterface } from "@/models/docs.model";
import { setDoc } from "@/lib/store/features/docsSlice";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { useResponsiveContext } from "@/context/CSS-Context";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";

const Docs_LIMIT = 5;

const DocsList = ({ technology }: any) => {

  const dispatch = useAppDispatch();
  const { _id: techId, name } = technology || {};
  const spinnerRef = useRef<null | HTMLDivElement>(null);
  const document = useAppSelector((state) => state.docs.document);

  const { isDocIndexOpen, setIsDocIndexOpen } = useResponsiveContext();

  const {
    error,
    isFetching,
    data: docs,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['docs', techId],
    queryFn: ({ pageParam = 1 }) => {
      return getDocs({ techId, limit: Docs_LIMIT, pageParam })
    },
    staleTime: 1000 * 60 * 10,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.nextPage <= lastPage?.totalPage) return lastPage?.nextPage
      return undefined
    }
  })

  useEffect(() => {
    const ref = spinnerRef.current;
    if (ref) {
      const observer = new IntersectionObserver(
        async ([entry]) => {
          // console.log(entry.isIntersecting)
          if (!entry.isIntersecting) return
          fetchNextPage()
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0,
        }
      );
      observer.observe(ref);
      return () => {
        if (ref && observer) {
          observer.unobserve(ref);
        }
      }
    }
    // eslint-disable-next-line
  }, [spinnerRef.current, docs]);


  const allDocs: docsInterface[] = docs?.pages?.map((page) => page?.payload).flat() || [];



  return (
    <div className={`w-[100%] lg:w-[20%] border border-r-3 max-h-[88vh] overflow-y-scroll absolute lg:sticky top-0 bg-slate-50 dark:bg-bgDark z-20 py-2 dark:border-gray-700 ${isDocIndexOpen ? 'block' : 'hidden'} lg:block`}>

      <p className="mt-4 text-center font-semibold">{name}</p>
      <ul className="flex flex-col gap-1 mt-5">
        {allDocs?.map((doc: docsInterface) => (
          <li
            key={doc?._id}
            className={`text-sm font-bold rounded-sm px-2 py-3 md:py-2 sm:py-4 list-none cursor-pointer border-b border-gray-200 dark:text-gray-300 ${doc?._id === document?._id ? "bg-indigo-600 text-white" : "hover:bg-gray-300 dark:hover:bg-black"}`}
            onClick={() => {
              dispatch(setDoc({ document: doc }))
              setIsDocIndexOpen(false);
            }}
          >
            {doc?.title}
          </li>
        ))}
      </ul>

      {hasNextPage && <div ref={spinnerRef} className="flex justify-center items-center">
        {isFetchingNextPage && <ImSpinner3 className="animate-spin text-2xl mt-1" />}
      </div>}
      {!hasNextPage && <span className="text-center text-sm mx-auto block my-2">No more Document</span>}
    </div>
  );
};

export default DocsList;

