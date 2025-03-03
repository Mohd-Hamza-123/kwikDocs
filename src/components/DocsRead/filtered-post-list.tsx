'use client'
import { posts } from '#site/content'
import { useEffect, useMemo, useState } from "react";
import PostItems from "../PostItems";
import { PostItemsProps } from '@/lib/store/features/postSlice';
import { useResponsiveContext } from "@/context/CSS-Context";
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { setActiveSlug, setPosts } from '@/lib/store/features/postSlice';

const FilteredPostList = ({ category }: { category: string }) => {

  const dispatch = useAppDispatch()

  const post = useAppSelector((state) => state.post.post);
  const activeSlug = useAppSelector((state) => state.post.activeSlug);

  const { isDocIndexOpen } = useResponsiveContext();

  const displayPosts = useMemo(() => posts?.filter((post) => post?.slug.indexOf(category) === 0 && post?.published)
    , [posts]);

  useEffect(() => {
    dispatch(setPosts({ post: displayPosts[0] }))
    dispatch(setActiveSlug({ activeSlug: displayPosts[0].slug }))
  }, [])

  const renderPost = (post: PostItemsProps) => {
    dispatch(setPosts({ post: post }))
    dispatch(setActiveSlug({ activeSlug: post?.slug }))
  }

  return (
    <section className={`w-[100%] lg:w-[20%] border border-r-3 max-h-[91vh] overflow-y-scroll absolute lg:sticky top-0 bg-slate-50 dark:bg-bgDark z-20 py-2 dark:border-gray-700 lg:block ${isDocIndexOpen ? "block" : "hidden"} lg:block`}>
      <p className="mt-4 text-center font-semibold capitalize">{category}</p>

      <ul className="flex flex-col gap-1 mt-5">
        {displayPosts?.map((post) => (
          <PostItems
            post={post}
            key={post?.slug}
            category={category}
            renderPost={renderPost}
            activeSlug={activeSlug}
          />
        ))}
      </ul>

      <span className="text-center text-sm mx-auto block my-2">
        No documents found.
      </span>

    </section>
  );
};

export default FilteredPostList;

