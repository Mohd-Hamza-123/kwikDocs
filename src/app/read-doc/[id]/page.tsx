"use client";
import React from "react";
import { getDoc } from "@/lib/API/getDoc";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { Navbar, RelatedDocs, MainDocs, DocsBookmarks, LoadingPage } from "../../../index";

const ReadPage = ({ params }: any) => {
  const { id } = params;
  const {
    error,
    isError,
    isPending,
    isSuccess,
    data: doc,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getDoc(id),
    staleTime: 1000 * 60
  })

  if (isPending) return <LoadingPage loadingMsg="Document is Loading" />

  return (
    <>
      <main className="flex">
        <section className="w-[20%] border border-r-0">
          <DocsBookmarks doc={doc} />
        </section>
        <section className="w-[62%] border">
          <MainDocs doc={doc} />
        </section>
        <section className="w-[18%] border border-l-0">
          <RelatedDocs />
        </section>
      </main>
      <ToastContainer />
    </>
  )
};

export default ReadPage;
