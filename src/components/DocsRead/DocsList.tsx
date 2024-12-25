'use client'
import { ImSpinner3 } from "react-icons/im";
import { getDocs } from "@/lib/API/docsAPI/getDocs";
import { docsInterface } from "@/models/docs.model";
import { setDoc } from "@/lib/store/features/docsSlice";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useResponsiveContext } from "@/context/CSS-Context";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";

const Docs_LIMIT = 3;

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
    <div className="py-2 w-full dark:bg-gray-900 dark:border-gray-700">
      <p className="mt-4 text-center font-semibold">{name}</p>
      <ul className="flex flex-col gap-1 mt-5">
        {allDocs?.map((doc: docsInterface) => (
          <li
            key={doc?._id}
            className={`rounded-sm px-2 py-3 md:py-2 sm:py-4 list-none cursor-pointer border-b border-gray-200  text-gray-700 ${doc?._id === document?._id ? "bg-indigo-600 text-white" : "hover:bg-gray-300"}`}
            onClick={() => {
              dispatch(setDoc({ document: doc }))
              setIsDocIndexOpen(false)
            }}
          >
            {doc?.title}
          </li>
        ))}
      </ul>

      {hasNextPage && <div ref={spinnerRef} className="flex justify-center items-center">
        {isFetchingNextPage && <ImSpinner3 className="animate-spin text-2xl mt-1" />}
      </div>}
      {!hasNextPage && <span className="text-center text-md mx-auto block my-2 text-gray-600">No more Document</span>}
    </div>
  );
};

export default DocsList;

// import React, { useEffect, useState } from "react";

// interface BookmarkListProps {
//   content: string;
// }

// const DocsBookmarks: React.FC<BookmarkListProps> = ({ content }) => {
//   const [headings, setHeadings] = useState<string[]>([]);
//   console.log(headings);
//   useEffect(() => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(content, "text/html");
//     const headingsArray = Array.from(
//       doc.querySelectorAll("h1, h2, h3, h4, h5, h6")
//     );
//     const headingIds = headingsArray.map((heading, index) => {
//       if (!heading.id) {
//         heading.id = `heading-${index}`;
//       }
//       return heading.id;
//     });
//     setHeadings(headingIds);
//   }, [content]);

//   const handleScrollTo = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div>
//       <h2>Bookmarks</h2>
//       <ul>
//         {headings.map((id, index) => (
//           <li key={id}>
//             <button onClick={() => handleScrollTo(id)}>
//               Heading {index + 1}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DocsBookmarks;
