"use client";

import { Navbar, Cards } from "../";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { appendDocs } from "@/lib/features/docsSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const docsData = useAppSelector((state) => state.docsSlice.docsData);
  // console.log(docsData);

  const [data, setData] = useState([]);

  const getDocs = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/docs", {
        cache: "no-cache",
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch docs");
      }
      const docs = await res.json();

      dispatch(appendDocs({ docsData: docs.Docs }));
      setData((prev) => docs.Docs);
      return docs;
    } catch (error) {
      console.log("Error in fethcing meesage");
    }
  };

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <>
      <Navbar />

      <section className="flex justify-center flex-wrap gap-5 my-3">
        {data?.map((item: any, index) => (
          <div key={item?._id}>
            <Cards {...item} />
          </div>
        ))}
      </section>
    </>
  );
}
