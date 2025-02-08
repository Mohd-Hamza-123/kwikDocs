import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const Introduction = async () => {
    // Correct file path for your structure
    const filePath = path.join(process.cwd(), 'src', 'content', 'JS', 'Introduction.mdx');

    console.log("FilePath :", filePath)

    try {
        // Read the MDX file
        const source = fs.readFileSync(filePath, 'utf-8');
        const { content, data } = matter(source);
        console.log(data);

        return (
            <div>
                <h1>{data.title || 'Introduction to JavaScript'}</h1>
                <MDXRemote source={content} />
            </div>
        );
    } catch (error) {
        // console.error('Error reading MDX file:', error);
        return <div>Error loading content.</div>;
    }
};

export default Introduction;