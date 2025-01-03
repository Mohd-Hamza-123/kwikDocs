"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getSingleTechnology } from "@/lib/API/techAPI/getSingleTech";
import {
  DocsList,
  DocContent,
  LoadingPage,
  RelatedDocs,
} from "../../../index";

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
    staleTime: Infinity
  });


  if (isPending) return <LoadingPage loadingMsg="Document is loading" />

  return (
    <main className="flex flex-col-reverse lg:flex-row relative h-[88vh] overflow-x-hidden w-full border">
      <DocsList technology={technology} />
      <DocContent technology={technology} />
      <RelatedDocs />
    </main>
  );
};

export default ReadPage;
