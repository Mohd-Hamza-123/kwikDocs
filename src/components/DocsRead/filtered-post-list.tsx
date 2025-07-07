'use client'

import { useState } from "react";
import { svgIcons } from "../icons";
import type { FileNode } from "@/services/helpers/getContentTree";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { setDoc } from "@/lib/store/features/docsSlice";
import { useResponsiveContext } from "@/context/CSS-Context";

const FilteredPostList = ({ nodes }: { nodes: FileNode[] }) => {
  return (
    <ul className="list-none w-full">
      {nodes?.map((node: FileNode) => (
        <TreeNode node={node} key={node.name} />
      ))}
    </ul>
  );
};

export default FilteredPostList

function TreeNode({ node }: { node: FileNode }) {

  const dispatch = useAppDispatch()
  const [isExpanded, setIsExpanded] = useState(false)
  const allPosts = useAppSelector((state) => state.docs.allDocuments)
  const { setIsDocIndexOpen } = useResponsiveContext();
  
  const handleDocument = (slug: string | undefined) => {

    const document = allPosts.find((doc) => doc.slug === slug)
    dispatch(setDoc({ document }))
    setIsDocIndexOpen(false)
  }

  const expand = () => setIsExpanded((prev) => !prev)
  if (node.type === "directory") {
    const name = (node.name).replaceAll("-", " ")
    return node.children && <>
      <li
        onClick={expand}
        className="px-2 py-1 capitalize flex justify-between items-center cursor-pointer">
        <span className="text-[16px]">📂 {name}</span>
        <span><svgIcons.arrowDropRight /></span>
      </li>
      {isExpanded && <FilteredPostList nodes={node.children} />}
    </>
  }

  if (node.type === "file") {

    console.log(node)
    let name = (node.name).replaceAll("-", " ")
    if (name.endsWith(".mdx")) name = name.replaceAll(".mdx", "")
    return <li
      className="w-full px-1 py-1 capitalize"
      onClick={() => handleDocument(node?.slug)}
    ><span className="cursor-pointer text-[15px] text-gray-700 dark:text-gray-300">{name}</span></li>
  }
}

