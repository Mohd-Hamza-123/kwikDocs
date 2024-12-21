"use client";
import React from "react";
import CreatePage from "../../create-docs/page";
import { useAppSelector } from "@/lib/hooks/hooks";


const UpdateDoc = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const doc = useAppSelector((state) => state.docs?.document);
  if (doc)
    return <CreatePage post={doc} />;
};

export default UpdateDoc;
