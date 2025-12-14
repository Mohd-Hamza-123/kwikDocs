"use client";
import React from "react";
import { svgIcons } from "..";
import { PlaygroundInput } from "@/types/models.type";

export default function ProjectCard({ project }: {project : PlaygroundInput}) {

    return (
        <tr className="w-full flex justify-between items-center border-b border-gray-800">
            <td className="px-4 py-3">
                <input
                    type="checkbox"
                    // onChange={() => onToggle(project.id)}
                    className="h-4 w-4 rounded border-gray-600 bg-transparent text-blue-400 focus:ring-0"
                />
            </td>

            <td className="px-4 py-3 min-w-[260px]">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-800 border border-gray-700">
                        {/* small stack icon depending on type */}
                        {/* {project.type === "react" ? (<svgIcons.react />)
                            : project.type === "node" ? (<svgIcons.node />)
                                : project.type === "python" ? (<svgIcons.python />)
                                    : (<svgIcons.code />)
                        } */}
                    </div>

                    <div>
                        <div className="text-sm font-medium text-gray-200">{project.title}</div>
                        <div className="text-xs text-gray-400 truncate max-w-[420px]">{project.description}</div>
                    </div>
                </div>
            </td>

            <td className="px-4 py-3 text-sm text-gray-400">{project.description ? "" : "-"}</td>

            <td className="px-4 py-3 text-sm text-gray-400 flex items-center gap-2">
                <svgIcons.eye className="h-4 w-4 text-gray-400" />
                <span>{project.views}</span>
            </td>

            <td className="px-4 py-3 text-sm text-gray-400">2m ago</td>

            <td className="px-4 py-3 text-right">
                <button className="p-1 rounded hover:bg-gray-800">
                    <svgIcons.trash className="h-5 w-5 text-gray-400" />
                </button>
            </td>
        </tr>
    );
}
