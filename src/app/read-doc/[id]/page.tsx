"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  DocContent,
  LoadingPage,
  RelatedDocs,
  DocsList,
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
    <main className="flex flex-col-reverse lg:flex-row relative h-[88vh] overflow-hidden">
      <section className={`w-[100%] lg:w-[20%] border border-r-3 max-h-[88vh] overflow-y-scroll absolute lg:sticky top-0 bg-slate-50 z-20 ${isDocIndexOpen ? 'block' : 'hidden'} lg:block`}>
        <DocsList technology={technology} />
      </section>
      {!isDocIndexOpen && <section className="lg:w-[62%] border relative w-full h-full overflow-x-hidden overflow-y-scroll">
        <DocContent technology={technology} />
      </section>}
      <RelatedDocs />
    </main>
  );
};

export default ReadPage;
