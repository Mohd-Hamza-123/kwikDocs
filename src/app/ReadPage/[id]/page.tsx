"use client";
import { Navbar, RelatedDocs, MainDocs, DocsBookmarks } from "../../../index";
import React, { useEffect, useState } from "react";


import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const ReadPage = ({ params }: any) => {
  const { id } = params;
  const [doc, setdoc] = useState(null);
  const { control, watch } = useForm();

  const getDoc = async (id: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_END_POINT}api/docs/${id}`
      );
      const doc = await res.json();
      setdoc((prev) => doc.doc);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoc(id);
  }, []);
  return doc ? (
    <>
      <Navbar />
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
  ) : null;
};

export default ReadPage;
