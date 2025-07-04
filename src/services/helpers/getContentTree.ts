'use server'

import fs from "fs/promises";
import path from "path";

export type FileNode = {
    name: string;
    type: "file" | "directory";
    slug?: string;
    children?: FileNode[];
}

const getContentTree = async (source: string): Promise<FileNode[] | null> => {
    try {
        const dirents = await fs.readdir(source, { withFileTypes: true })

        const structure = dirents?.map(async (dirent) => {
            const subPath = path.join(source, dirent?.name)

            if (dirent.isDirectory()) {
                const children = await getContentTree(subPath)
                return {
                    name: dirent?.name,
                    type: "directory" as const,
                    children: children || []
                }
            } else {

                const filePath = path.join(dirent.parentPath, dirent?.name).replaceAll(/\\/g, "/")
                const splittedPath = filePath.split('/')
                const index = splittedPath.indexOf("content")
                const slug = splittedPath.slice(index + 1, splittedPath.length).join("/")

                return {
                    name: dirent?.name,
                    type: "file" as const,
                    slug: slug.replaceAll(".mdx", "")
                }
            }
        })
        const contentStructure = await Promise.all(structure)
        return contentStructure.length ? contentStructure : null
    } catch (error) {
        console.error(error)
        return null
    }
}


export default getContentTree