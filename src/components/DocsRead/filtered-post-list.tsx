'use client'

import { useState } from "react";
import { svgIcons } from "../icons";
import type { FileNode } from "@/services/helpers/getContentTree";

const FilteredPostList = ({ nodes }: { nodes: FileNode[] }) => {
  console.log(nodes)

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

  const [isExpanded, setIsExpanded] = useState(false)
  const expand = () => setIsExpanded((prev) => !prev)
  if (node.type === "directory") {
    const name = (node.name).replaceAll("-", " ")
    return node.children && <>
      <li
        onClick={expand}
        className="px-2 py-2 capitalize font-semibold poppins flex justify-between items-center cursor-pointer">
        <span>{name}</span>
        <span><svgIcons.arrowDropRight/></span>
        </li>
      {isExpanded && <FilteredPostList nodes={node.children} />}
    </>
  }

  if (node.type === "file") {
    let name = (node.name).replaceAll("-", " ")
    if(name.endsWith(".mdx")) name = name.replaceAll(".mdx","")
    return <li className="w-full px-1 py-1 capitalize"><span className="ml-5">{name}</span></li>
  }
}

