'use server'

import fs from "fs/promises";
import path from "path";

export type FileNode = {
    name: string;
    type: "file" | "directory";
    children?: FileNode[];
}

const getContentTree = async (source: string): Promise<FileNode[] | null> => {
    try {

        const dirents = await fs.readdir(source, { withFileTypes: true })

        const structure = dirents?.map(async (dirent) => {
            if (dirent.isDirectory()) {
                const subPath = path.join(source, dirent?.name)
                const children = await getContentTree(subPath)
                return {
                    name: dirent?.name,
                    type: "directory" as const,
                    children: children || []
                }
            } else {
                return {
                    name: dirent?.name,
                    type: "file" as const
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