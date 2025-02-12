import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import DocContentList from '@/components/DocContentList';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const postsDir = path.join(process.cwd(), 'src/content', category);
  let posts: any[] = [];

  try {
    const files = fs.readdirSync(postsDir);
    posts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        return {
          title: data.title || file.replace('.mdx', ''),
          path: `/doc/${category}/${file.replace('.mdx', '')}`,
        };
      });
  } catch (err) {
    console.error(`Error reading posts for category "${category}":`, err);
  }

  return <DocContentList category={category} posts={posts} />;
}
