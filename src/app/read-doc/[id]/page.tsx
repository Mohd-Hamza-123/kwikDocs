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
import { Button } from "@/components/ui/button";

interface ReadPageParams {
  params: {
    id: string;
  }
}

const ReadPage = ({ params }: ReadPageParams) => {

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

  if (isSuccess) {

    return (
      <main className="flex flex-col-reverse lg:flex-row relative h-[90vh] overflow-x-hidden w-full border">
        <DocsList technology={technology} />
        <DocContent technology={technology} />
        <RelatedDocs />
      </main>
    );
  }


  if (isError)
    return <main className="flex flex-col gap-4 justify-center items-center h-[full] overflow-hidden w-full">
      <h3>Sorry Document is not loaded.</h3>
      <h6>{error?.message}</h6>
      <p>Reload The page</p>
      <Button variant={'destructive'} onClick={() => window.location.reload()}>Reload</Button>
    </main>
};

export default ReadPage;
