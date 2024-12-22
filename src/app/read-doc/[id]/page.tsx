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
import { useResponsiveContext } from "@/context/CSS-Context";

const ReadPage = ({ params }: any) => {
  const { id } = params;

  const { isDocIndexOpen, setIsDocIndexOpen } = useResponsiveContext();
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
      <main className="flex relative">
        <section className={`w-[100%] lg:w-[20%] border border-r-3 max-h-[90vh] overflow-y-scroll absolute lg:sticky top-0 bg-slate-50 z-20 ${isDocIndexOpen ? 'block' : 'hidden'} lg:block`}>
          <DocsBookmarks technology={technology}
          />
        </section>
        <section className="w-[100%] lg:w-[62%] border relative">
          <MainDocs technology={technology} />
        </section>
        <section className="w-[18%] border border-l-0 hidden">
          <RelatedDocs />
        </section>
      </main>
    </>
  )
};

export default ReadPage;
