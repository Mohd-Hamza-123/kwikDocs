'use client'
import Prism from "../Prism";
import Image from "next/image";
import parse from "html-react-parser";
import ReactModel from "../ReactModel";
import { MdEdit } from "react-icons/md";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks/hooks";
import { docsInterface } from "@/models/docs.model";
import { makeCodeBlock } from "@/utils/CodeBlock_CopyBtn";

const MainDocs = ({ technology }: any) => {

  const router = useRouter();
  const doc: docsInterface | null = useAppSelector((state) => state.docs?.document);
  const userData = useAppSelector((state) => state.auth.userData);


  useEffect(() => {
    makeCodeBlock();
  }, [doc]);

  if (!doc) {
    return <div className="dark:bg-gray-900 dark:border-gray-700">
      <h1 className="text-2xl text-center font-bold text-gray-800 mt-5">{technology?.name}</h1>
      <figure className="w-[220px] h-[220px] mx-auto my-4 rounded-sm overflow-hidden">
        <Image
          src={technology?.image?.secure_url}
          height={200}
          width={200}
          alt={technology?.name}
          quality={100}
          className="rounded-sm w-full h-full object-contain"
        />
      </figure>
      <p className="text-center text-gray-600">{technology?.description}</p>
    </div>
  }

  return (
    <Prism>
      <section className="w-full sticky top-0">
        <div className="w-full bg-white z-10 shadow-md dark:bg-gray-900 dark:border-gray-700">
          <div className="dark:bg-gray-900 dark:border-gray-700 h-[75px] font-bold text-gray-800 dark:text-gray-300 px-3 flex items-center border border-solid border-gray-200 border-t-0 border-l-0 border-r-0 justify-between">
            <h2 className="text-md lg:text-3xl w-[70%] ">{doc?.title}</h2>
            {userData?.isAdmin && <div className="flex gap-6 w-[30%] justify-end">
              <ReactModel _id={doc?._id || ''} />
              <MdEdit
                className="cursor-pointer text-lg"
                onClick={() => router.push(`/update-doc/${doc?._id}`)}
              />
            </div>}
          </div>
          <article id="TinyMceArticle" className="mt-4 px-3 py-3">{parse(doc?.description || "")}</article>
        </div>
      </section>
    </Prism>
  );
};

export default MainDocs;
