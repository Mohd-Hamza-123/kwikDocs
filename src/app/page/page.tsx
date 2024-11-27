"use client";


import { useQuery } from "@tanstack/react-query";
import { getDocs } from "@/lib/API/getDoc";
import { Cards, LoadingPage, Navbar } from "@/index";

export default function Home() {

  const {
    isPending: DocsLoading,
    data: Docs,
    error,
  } = useQuery({
    queryKey: ['docs'],
    queryFn: getDocs,
    staleTime: Infinity
  })

  if (DocsLoading) return <LoadingPage />

  return (
    <>
      <Navbar />
      <section className="flex justify-center flex-wrap gap-5 my-3">
        {Docs?.map((item: any, index: number) => (
          <div key={item?._id}>
            <Cards {...item} />
          </div>
        ))}
      </section>

      
    </>
  );
}
