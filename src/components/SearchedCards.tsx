import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
const SearchedCards = ({ docs }: any) => {
  console.log(docs);
  const router = useRouter();
  return docs?.map((doc: any) => (
    <div
      key={doc?._id}
      className="w-full max-w-md px-3 py-1 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 md:px-4 md:py-3"
    >
      <span className="py-1 px-2 bg-slate-200 rounded-md text-gray-700">
        {doc?.category}
      </span>
      <div className="mt-3 flex items-center justify-between mb-4">
        <Link href={`/ReadPage/${doc?._id}`}>
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {doc?.title}
          </h5>
        </Link>
      </div>
      {doc?.bookmark?.map((mark: any, index: number) => (
        <div key={mark?.bookmarkID} className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li
              onClick={() => {
                router.push(`/ReadPage/${doc?._id}`);
                setTimeout(() => {
                  const element = document.getElementById(mark.bookmarkID);
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth", // Optional: smooth scroll
                    });
                  } else {
                    console.warn(
                      `Element with ID ${mark.bookmarkID} not found.`
                    );
                  }
                }, 900);
              }}
              className="py-3 md:py-2 sm:py-4 list-disc list-inside cursor-pointer"
            >
              {mark?.bookmarkName}
            </li>
          </ul>
        </div>
      ))}
    </div>
  ));
};

export default SearchedCards;
