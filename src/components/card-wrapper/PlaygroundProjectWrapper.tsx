"use client"

import React from 'react'
import { ProjectCard } from '..';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPlaygroundProject } from '@/lib/API/playground';
import { PlaygroundInput } from '@/types/models.type';
export default function PlaygroundProjectWrapper({ userId }: { userId: string }) {

    // console.log("User ID from params:", userId);

    const { data, status, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['playground-projects'],
        queryFn: ({ pageParam }) => getPlaygroundProject(userId, "html-css", pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        staleTime: Infinity
    })

    const projects = data?.pages?.flatMap((page: any) => page.document)
    console.log(projects)


    if (status === "error") return <div>Error fetching projects.</div>

    return (
        <table className="space-y-4">
            {projects?.map((project: PlaygroundInput, index: number) => (
                <tbody
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-800 bg-gradient-to-b from-[#0b0b0b] to-[#0f1112] shadow-sm">
                    <ProjectCard project={project} />
                </tbody>
            ))}
        </table>
    )
}
