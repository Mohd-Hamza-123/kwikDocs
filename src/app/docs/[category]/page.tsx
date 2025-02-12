import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import DocContentList from '@/components/DocContentList';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const postsDir = path.join(process.cwd(), 'src/content', category);
  let posts: any[] = [];

  try {
    const files = fs.readdirSync(postsDir); // Read all files in the category folder
    posts = files
      .filter((file) => file.endsWith('.mdx')) // Filter Markdown files
      .map((file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8'); // Read file content
        const { data } = matter(fileContent); // Parse frontmatter
        return {
          title: data.title || file.replace('.mdx', ''), // Use title from frontmatter or fallback to file name
          path: `/doc/${category}/${file.replace('.mdx', '')}`, // Build the path for navigation
        };
      });
  } catch (err) {
    console.error(`Error reading posts for category "${category}":`, err);
  }

  return <DocContentList category={category} posts={posts} />;
}

export async function generateStaticParams() {
  const categoriesDir = path.join(process.cwd(), 'src/content');
  let categories: string[] = [];

  try {
    categories = fs.readdirSync(categoriesDir); // Read all category directories
  } catch (err) {
    console.error('Error reading categories directory:', err);
  }

  return categories.map((category) => ({
    category,
  }));
}