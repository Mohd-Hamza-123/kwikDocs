import "@/styles/mdx.css"
import React from 'react'
import { FilteredPostList, ShowPost } from "@/index"

export default function DocPage({ params }: { params: { category: string } }) {

  const { category } = params

  return (
    <div className="flex flex-col-reverse lg:flex-row relative h-[90vh] overflow-x-hidden w-full justify-between">

      <FilteredPostList category={category} />

      <ShowPost category={category} />

      <section className="w-full lg:w-[20%] border">

      </section>
    </div>
  )
}



