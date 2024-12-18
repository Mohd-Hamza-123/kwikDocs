"use client";
import React from "react";
import { getDoc } from "@/lib/API/getDoc";
import { useQuery } from "@tanstack/react-query";
import {
  MainDocs,
  LoadingPage,
  RelatedDocs,
  DocsBookmarks,
} from "../../../index";
import { getAllTechnology } from "@/lib/API/techAPI/getAllTech";

const ReadPage = ({ params }: any) => {
  const { id } = params;

  const {
    data: technology = [],
    error: technologyError,
    isPending: technologyPending,
    isSuccess: technologySuccess,
    isFetching: technologyFetching,
    refetch
  } = useQuery({
    queryKey: ['technologies'],
    queryFn: getAllTechnology,
    staleTime: Infinity,
  });

  console.log(technology)

  const {
    error,
    isError,
    isPending,
    isSuccess,
    data: doc,
  } = useQuery({
    queryKey: ['docs', id],
    queryFn: () => getDoc(id),
    staleTime: 1000 * 60
  });


  if (isPending) return <LoadingPage loadingMsg="Document is Loading" />

  return (
    <>
      <main className="flex">
        <section className="w-[20%] border border-r-0">
          <DocsBookmarks doc={doc} />
        </section>
        <section className="w-[62%] border">
          {/* <MainDocs doc={doc} /> */}
        </section>
        <section className="w-[18%] border border-l-0">
          <RelatedDocs />
        </section>
      </main>
    </>
  )
};

export default ReadPage;
