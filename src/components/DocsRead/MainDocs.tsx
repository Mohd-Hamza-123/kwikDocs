'use client'
import React, { useEffect } from "react";
import parse from "html-react-parser";
import Prism from "../Prism";
import { useRouter } from "next/navigation";
import { makeCodeBlock } from "@/utils/CodeBlock_CopyBtn";
import { useAppSelector } from "@/lib/hooks/hooks";
import { docsInterface } from "@/models/docs.model";
import ReactModel from "../ReactModel";
import { MdEdit } from "react-icons/md";

const MainDocs = () => {
  const router = useRouter();
  const doc: docsInterface | null = useAppSelector((state) => state.docs?.document);
  // console.log(doc);

  useEffect(() => {
    makeCodeBlock();
  }, [doc]);

  return (
    <section className="w-full sticky top-0">
      <div className="w-full bg-white z-10 shadow-md">
        <div className="text-4xl h-[75px] font-bold text-gray-800 px-3 flex items-center border border-solid border-gray-200 border-t-0 border-l-0 border-r-0 justify-between">
          <h2>{doc?.title}</h2>
          <div className="flex gap-6">
            <ReactModel _id={doc?._id || ''} />
            <MdEdit
              className="cursor-pointer"
              onClick={() => router.push(`/update-doc/${doc?._id}`)}
            />
          </div>
        </div>
        <article id="TinyMceArticle" className="mt-4 px-3 py-3">{parse(doc?.description || "")}</article>
        <Prism />
      </div>
    </section>
  );
};

export default MainDocs;
