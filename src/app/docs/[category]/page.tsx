import { posts } from '#site/content'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

interface postPageParams {

}

const page = ({ params }: { params: { category: string } }) => {
  const { category } = params
 
  const post = posts?.map((post) => {
    if (post?.slug.indexOf(category) === 0) return post
  }).filter(Boolean)

  return (
    <main className="flex flex-col-reverse lg:flex-row relative h-[90vh] overflow-x-hidden w-full justify-between">
      {/* Sidebar */}
      <section className="w-[100%] lg:w-[20%] border border-r-3 max-h-[88vh] overflow-y-scroll absolute lg:sticky top-0 bg-slate-50 dark:bg-bgDark z-20 py-2 dark:border-gray-700 lg:block">
        <p className="mt-4 text-center font-semibold capitalize">{category}</p>

        {/* List of MDX files in the current category */}
        <ul className="flex flex-col gap-1 mt-5">
          {post.map((file) => (
            <Link key={file?.slug} href={`/doc/${category}/${file?.slug}`}>
              <li
                className={`capitalize text-sm font-bold rounded-sm px-2 py-3 md:py-2 sm:py-4 list-none cursor-pointer border-b border-gray-200 dark:text-gray-300 ${file?.slug === category
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-300 dark:hover:bg-black"
                  }`}
              >
                {file?.title}
              </li>
            </Link>
          ))}
        </ul>

        {post?.length === 0 && (
          <span className="text-center text-sm mx-auto block my-2">
            No documents found.
          </span>
        )}
      </section>

      {/* Main Content */}
      <section className="lg:w-[60%] prose lg:prose-xl dark:prose-invert px-3 border overflow-y-scroll mx-0">
        {/* <div className="dark:border-gray-700 font-bold text-gray-800 dark:text-gray-300 flex items-center border border-solid border-gray-200 border-t-0 border-l-0 border-r-0 justify-between">
          <h2 className="text-md lg:text-2xl">
            {data?.title}</h2>
        </div> */}
        {/* <Prism>
            <MDXRemote source={content} />
        </Prism> */}
      </section>

      {/* Right Section */}
      <section className="lg:w-[20%] border"></section>
    </main>
  )
}

export default page






// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import DocContentList from '@/components/DocContentList';

// export default async function CategoryPage({ params }: { params: { category: string } }) {
//   const { category } = params;
//   const postsDir = path.join(process.cwd(), 'src/content', category);
//   let posts: any[] = [];

//   try {
//     const files = fs.readdirSync(postsDir); // Read all files in the category folder
//     posts = files
//       .filter((file) => file.endsWith('.mdx')) // Filter Markdown files
//       .map((file) => {
//         const filePath = path.join(postsDir, file);
//         const fileContent = fs.readFileSync(filePath, 'utf-8'); // Read file content
//         const { data } = matter(fileContent); // Parse frontmatter
//         return {
//           title: data.title || file.replace('.mdx', ''), // Use title from frontmatter or fallback to file name
//           path: `/doc/${category}/${file.replace('.mdx', '')}`, // Build the path for navigation
//         };
//       });
//   } catch (err) {
//     console.error(`Error reading posts for category "${category}":`, err);
//   }

//   return <DocContentList category={category} posts={posts} />;
// }

// export async function generateStaticParams() {
//   const categoriesDir = path.join(process.cwd(), 'src/content');
//   let categories: string[] = [];

//   try {
//     categories = fs.readdirSync(categoriesDir); // Read all category directories
//   } catch (err) {
//     console.error('Error reading categories directory:', err);
//   }

//   return categories.map((category) => ({
//     category,
//   }));
// }