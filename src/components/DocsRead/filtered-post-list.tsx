"use client";

import { useState } from "react";
import { svgIcons } from "../icons";
import type { FileNode } from "@/utils/getContentTree";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { setDoc } from "@/lib/store/features/docsSlice";
import { useResponsiveContext } from "@/context/CSS-Context";
import removeStartingNumber from "@/utils/RemoveStartingNumber";

const FilteredPostList = ({ nodes }: { nodes: FileNode[] }) => {
  return (
    <ul className="list-none w-full space-y-1">
      {nodes?.map((node: FileNode) => (
        <TreeNode node={node} key={node.name} />
      ))}
    </ul>
  );
};

export default FilteredPostList;

function TreeNode({ node }: { node: FileNode }) {

  // console.log(node)
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const { setIsDocIndexOpen } = useResponsiveContext();
  const allPosts = useAppSelector((state) => state.docs.allDocuments);

  const handleDocument = (slug: string | undefined) => {
    console.log("slug : ", slug);
    console.log("allPosts : ", allPosts)
    setIsDocIndexOpen(false);
    if (!slug) return
    let document;
    if (process.env.NODE_ENV === "production") {
      document = allPosts.find((doc) => doc.slug === slug);
    } else {
      document = allPosts.find((doc) => slug.includes(doc.slug))
    }
    // console.log("kkk : ", document)
    dispatch(setDoc({ document }));

  };

  const expand = () => setIsExpanded((prev) => !prev);

  if (node.type === "directory") {
    let name = removeStartingNumber(node.name);
    name = name.replaceAll("-", " ");

    return (
      node.children && (
        <>
          <li
            onClick={expand}
            className="px-3 py-2 flex items-center justify-between cursor-pointer rounded-md text-sm font-medium capitalize
                       text-gray-800 dark:text-gray-100
                       hover:bg-zinc-100 dark:hover:bg-zinc-800/80
                       transition-colors group"
          >
            <span className="flex items-center gap-2">
              <span className="text-[18px]">📂</span>
              <span>{name}</span>
            </span>
            <span
              className={`transition-transform duration-200 ${isExpanded ? "rotate-90" : ""
                }`}
            >
              <svgIcons.arrowDropRight className="h-4 w-4" />
            </span>
          </li>
          {isExpanded && (
            <div className="ml-3 border-l border-zinc-700/30 dark:border-zinc-700/60 pl-2">
              <FilteredPostList nodes={node.children} />
            </div>
          )}
        </>
      )
    );
  }

  if (node.type === "file") {
    let name = node.name.replaceAll("-", " ");
    name = removeStartingNumber(name);
    if (name.endsWith(".mdx")) name = name.replace(".mdx", "");

    return (
      <li
        className="w-full px-3 py-1.5 flex items-center gap-2 cursor-pointer rounded-md
                   text-[14px] text-gray-700 dark:text-gray-300
                   hover:bg-zinc-100 dark:hover:bg-zinc-800/80
                   transition-colors"
        onClick={() => {
          
          handleDocument(node?.slug)
        }}>
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
        <span className="truncate">{name}</span>
      </li>
    );
  }

  return null;
}
