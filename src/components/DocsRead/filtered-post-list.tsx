'use client'
// import { useEffect, useState } from "react";

// import { PostItemsProps } from '@/lib/store/features/postSlice';
// import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
// import { setActiveSlug, setPosts } from '@/lib/store/features/postSlice';
import { memo, useEffect } from "react";

const FilteredPostList = ({ tech, allPost, isDocIndexOpen }: { tech: string, allPost: any, isDocIndexOpen: boolean }) => {

  useEffect(() => {
    async function getFolder() {
      const response = await fetch('/api/docs', {
        method: "POST"
      });
      console.log(response)
      const data = await response.json();
      console.log(data)
    }
    getFolder()
  }, [])

  // console.log(allPost)
  // const dispatch = useAppDispatch()

  // const activeSlug = useAppSelector((state) => state.post.activeSlug);


  // const [structure, setStructure] = useState<string[] | null>(null)

  // useEffect(() => {
  //   const group: string[] = allPost.map((post: any) => {
  //     let result;
  //     const slugAsParamsLength = post?.slugAsParams.split("/").length

  //     if (slugAsParamsLength > 1) {
  //       // console.log(slugAsParamsLength)
  //       const output = post.slugAsParams.split("/").slice(0, slugAsParamsLength - 1)
  //       output.push(post?.title)
  //       const indexOfDash = output[0].indexOf("-")
  //       output[0] = output[0].slice(indexOfDash).replaceAll("-"," ").trim()
  //       console.log(output)
  //     }

  //     if (post?.slugAsParams?.length > 1) {
  //       const list: string = (post?.slugAsParams.split("/")[0])
  //       const indexOfDash = list.indexOf("-")
  //       result = list.slice(indexOfDash).replaceAll("-", " ")
  //     } else {

  //     }
  //     // console.log(result)
  //     return result
  //   })
  //   const unique = [...new Set(group)] // set atleast "target" : "es2015" in compiler options in tsconfig.js
  //   // console.log(unique)
  //   setStructure(unique)
  // }, [])

  // const renderPost = (post: PostItemsProps) => {
  //   dispatch(setPosts({ post: post }))
  //   dispatch(setActiveSlug({ activeSlug: post?.slug }))
  // }

  return (
    <section className={`w-[100%] lg:w-[20%] border border-r-3 max-h-[91vh] overflow-y-scroll absolute lg:sticky top-0 bg-slate-50 dark:bg-bgDark z-20 py-2 dark:border-gray-700 lg:block ${isDocIndexOpen ? "block" : "hidden"} lg:block`}>
      <p className="mt-4 text-center font-semibold capitalize">{tech}</p>

      {/* <ul className="flex flex-col gap-1 mt-5">
        {allPost?.map((post) => (
          <PostItems
            post={post}
            key={post?.slug}
            renderPost={renderPost}
            activeSlug={activeSlug}
          />
        ))}
      </ul> */}
      {/* {
        structure && structure?.map((name) => {
          return <li key={name} className="list-none py-2 px-1 border capitalize">{name}</li>
        })
      } */}
      <li>01 intro</li>

      <span className="text-center text-sm mx-auto block my-2">
        End
      </span>

    </section>
  );
};

export default memo(FilteredPostList);

