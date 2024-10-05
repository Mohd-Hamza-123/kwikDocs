"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SearchBar from "../../components/SearchBar"; // Adjust the import path as needed
// Adjust the import path as needed
import SearchedCards from "@/components/SearchedCards";

const Page = () => {
  const { handleSubmit, register, control } = useForm({});
  const [docs, setDocs] = useState([]);

  const submit = async (data: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_END_POINT}api/docs/search/${data.SearchValue}`
      );
      console.log(res);
      if (res.ok) {
        const result = await res.json();
        const Docs = result?.docs;
        setDocs((prev) => Docs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="p-3">
        <form onSubmit={handleSubmit(submit)} className="mt-2">
          <SearchBar
            {...register("SearchValue", {
              required: true,
            })}
            name="SearchValue"
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
        </form>

        <div className="mt-4">
          <SearchedCards docs={docs} />
        </div>
      </main>
    </>
  );
};

export default Page;
