import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import conf from '@/conf/conf';

const DocContentList = async ({ params }: { params: { category: string } }) => {
  const { category } = params;

  // Fetch posts for the selected category
  const cwd = process.env.NODE_ENV === 'development' ? process.cwd() : conf.api_end_point
  const postsDir = path.join(cwd, 'src/content', category);
  let posts: any = [];

  try {
    posts = fs
      .readdirSync(postsDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent); // Parse frontmatter
        return {
          title: data.title || file.replace('.mdx', ''), // Use frontmatter title or fallback to file name
          path: `/doc/${category}/${file.replace('.mdx', '')}`,
        };
      });
  } catch (err) {
    console.error(`Error reading posts for category "${category}":`, err);
  }

  return (
    <div className={`w-[100%] lg:w-[20%] border border-r-3 h-[90vh] overflow-y-scroll absolute lg:sticky top-0 bg-slate-50 dark:bg-bgDark z-20 py-2 dark:border-gray-700 lg:block`}>
      <h1 className='mt-4 text-center font-semibold'>{category}</h1>
      {posts.length > 0 ? (
        <ul>
          {posts?.map((post: any) => (
            <li
              key={post.title}
              className={`capitalize text-sm font-bold rounded-sm px-2 py-3 md:py-2 sm:py-4 list-none cursor-pointer border-b border-gray-200 dark:text-gray-300 ${post?.title === category
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-300 dark:hover:bg-black"
                }`}
            >
              <Link href={post.path} >{post.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found for this category.</p>
      )}
    </div>
  );
};

export default DocContentList;