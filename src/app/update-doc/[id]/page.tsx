"use client";
import React, { useEffect } from "react";
import CreatePage from "../../create-docs/page";
import { useQuery } from "@tanstack/react-query";
import { getDoc } from "@/lib/API/getDoc";

const EditPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
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

  return <CreatePage post={doc} />;
};

export default EditPage;
