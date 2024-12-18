'use client'
import React, { useEffect } from "react";
import parse from "html-react-parser";
import Prism from "../Prism";
import ReactModel from "../ReactModel";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { makeCodeBlock } from "@/utils/CodeBlock_CopyBtn";

const MainDocs = ({ doc }: any) => {
  const router = useRouter();
  const { title, description, _id : id } = doc;

  useEffect(() => {
    makeCodeBlock();
  }, [description]);

  return (
    <section className="">
      <div className="text-4xl h-[75px] font-bold text-gray-800 px-3 flex items-center border border-solid border-gray-200 border-t-0 border-l-0 border-r-0 justify-between">
        <h2>{title}</h2>
        <div className="flex gap-6">
          <ReactModel _id={id} />
          <MdEdit
            className="cursor-pointer"
            onClick={() => router.push(`/EditPage/${id}`)}
          />
        </div>
      </div>
      <article id="TinyMceArticle" className="mt-4 px-3 py-3">{parse(description)}</article>
      <Prism />
    </section>
  );
};

export default MainDocs;
