"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MainDocs,
  LoadingPage,
  RelatedDocs,
  DocsBookmarks,
} from "../../../index";
import { getSingleTechnology } from "@/lib/API/techAPI/getSingleTech";

const ReadPage = ({ params }: any) => {
  const { id } = params;

  const {
    error,
    isError,
    isPending,
    isSuccess,
    data: technology,
  } = useQuery({
    queryKey: ['singleDoc', id],
    queryFn: () => getSingleTechnology(id),
    staleTime: 1000 * 60
  });



  if (isPending) return <LoadingPage loadingMsg="Document is Loading" />

  return (
    <>
      <main className="flex">
        <section className="w-[20%] border border-r-0">
          <DocsBookmarks technology={technology}
          />
        </section>
        <section className="w-[62%] border relative">
          <MainDocs />
        </section>
        <section className="w-[18%] border border-l-0">
          <RelatedDocs />
        </section>
      </main>
    </>
  )
};

export default ReadPage;
