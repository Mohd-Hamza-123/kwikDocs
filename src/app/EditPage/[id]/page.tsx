"use client";
import React, { useEffect } from "react";
import CreatePage from "../../CreatePage/page";
import { useAppSelector } from "@/lib/hooks/hooks";

const EditPage = ({ params }: { params: { id: string } }) => {
  const docsData = useAppSelector((state) => state.docsSlice.docsData);

  function findDocsByID(id: string) {
    const index = docsData?.findIndex((docs : any) => docs._id === id);
    // console.log(docsData[index]);
    return docsData[index];
  }

  return <CreatePage post={findDocsByID(params.id)} />;
};

export default EditPage;
