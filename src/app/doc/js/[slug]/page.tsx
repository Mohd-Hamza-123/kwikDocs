import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface pageProps {
    params: {
        slug: string
    }
}

const getAllMdxFiles = () => {
    const directoryPath = path.join(process.cwd(), 'src', 'content', 'JS');
    const fileNames = fs.readdirSync(directoryPath);

    // Filter only .mdx files and remove the extension
    return fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

const Introduction = async ({ params }: pageProps) => {
    const { slug } = params
    console.log(slug)
    const filePath = path.join(process.cwd(), 'src', 'content', 'JS', `${slug}.mdx`);

    // console.log("FilePath :", filePath)

    try {
        // Read the MDX file
        const source = fs.readFileSync(filePath, 'utf-8');
        const { content, data } = matter(source);

        const mdxFiles = getAllMdxFiles();
        console.log(mdxFiles)
        // console.log("data", data);
        // console.log(content)

        return (
            <main className='flex flex-col-reverse lg:flex-row relative h-[88vh] overflow-x-hidden w-full border'>

                <section className={`w-[100%] lg:w-[20%] border border-r-3 max-h-[88vh] overflow-y-scroll absolute lg:sticky top-0 bg-slate-50 dark:bg-bgDark z-20 py-2 dark:border-gray-700 lg:block`}>

                    <p className="mt-4 text-center font-semibold">{data?.title}</p>
                    <ul className="flex flex-col gap-1 mt-5">
                        {mdxFiles?.map((fileName: string) => (
                            <Link
                                key={fileName}
                                href={`/doc/js/${fileName}`}>
                                <li
                                    className={`capitalize text-sm font-bold rounded-sm px-2 py-3 md:py-2 sm:py-4 list-none cursor-pointer border-b border-gray-200 dark:text-gray-300 ${fileName === slug ? "bg-indigo-600 text-white" : "hover:bg-gray-300 dark:hover:bg-black"}`}
                                >
                                    {fileName}
                                </li>
                            </Link>
                        ))}
                    </ul>

                    {<span className="text-center text-sm mx-auto block my-2">No more Document</span>}
                </section>

                <section className='w-[63%]'>
                    <h2 className="text-md lg:text-3xl w-[70%]">{data?.title}</h2>
                    <MDXRemote source={content} />
                </section>
                <section className='w-[20%]'>

                </section>
            </main>
        );
    } catch (error) {
        // console.error('Error reading MDX file:', error);
        return <div>Error loading content.</div>;
    }
};

export default Introduction;