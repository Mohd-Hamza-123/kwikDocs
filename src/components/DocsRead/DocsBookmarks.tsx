'use client'
import { getDocs } from "@/lib/API/docsAPI/getDocs";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { setDoc } from "@/lib/store/features/docsSlice";
import { docsInterface } from "@/models/docs.model";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
const Docs_LIMIT = 3


const DocsBookmarks = ({ technology }: any) => {

  const dispatch = useAppDispatch();
  const { _id: techId, name } = technology || {};
  const spinnerRef = useRef<null | HTMLDivElement>(null);

  const {
    data: docs,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
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
  // console.log(allDocs);

  return (
    <div className="px-2 py-2">
      <p className="mt-4 text-center font-semibold">{name}</p>
      <ul className="flex flex-col gap-1 mt-5">
        {allDocs?.map((doc: docsInterface) => (
          <li
            key={doc?._id}
            className="py-3 md:py-2 sm:py-4 list-none cursor-pointer border-b border-gray-200 hover:bg-gray-100 text-gray-700"
            onClick={() => dispatch(setDoc({ document: doc }))}
          >
            {doc?.title}
          </li>
        ))}
      </ul>

      {hasNextPage && <div ref={spinnerRef} className="flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height="22px" width="22px"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset={0} stopColor="#000000" /><stop offset=".3" stopColor="#000000" stopOpacity=".9" /><stop offset=".6" stopColor="#000000" stopOpacity=".6" /><stop offset=".8" stopColor="#000000" stopOpacity=".3" /><stop offset={1} stopColor="#000000" stopOpacity={0} /></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" strokeWidth={15} strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset={0} cx={100} cy={100} r={70}><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur={2} values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite" /></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#000000" strokeWidth={15} strokeLinecap="round" cx={100} cy={100} r={70} /></svg>

      </div>}

    </div>
  );
};

export default DocsBookmarks;

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
