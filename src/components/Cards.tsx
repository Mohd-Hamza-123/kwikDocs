import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DateFormatter } from "@/lib/ConvertDate";

interface cardProps {
  title: string;
  description: string;
  image: string | null;
  _id: number;
  createdAt: string;
}
const Cards = ({ title, description, image, _id, createdAt }: cardProps) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg h-[220px] w-full"
        src={image ? image : ""}
        onError={(e) =>
          (e.currentTarget.src =
            "https://cdn.sanity.io/images/tlr8oxjg/production/9692617945204c3c666b30dd755554d7bbb6c746-1200x900.jpg?w=3840&q=100&fit=clip&auto=format")
        }
      />

      <div className="p-5">
        <Link href={`/ReadPage/${_id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {DateFormatter(createdAt)}
        </p>
        <Link
          href={`/ReadPage/${_id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
