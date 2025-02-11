import { defineConfig, s, defineCollection } from 'velite';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import { createHighlighter} from 'shiki';


// Define collections
const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split(`/`).slice(1).join(`/`),
});

const posts = defineCollection({
  name: `Post`,
  pattern: `**/*.mdx`,
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      published: s.boolean().default(true),
      body: s.mdx(),
    })
    .transform(computedFields),
});

// Create highlighter and return plugins synchronously
async function getResolvedRehypePlugins() {
  const highlighter = await createHighlighter({
    themes: ['nord'], // Provide themes as an array
    langs: ['javascript', 'typescript', 'python', 'html', 'css'],
  });

  return [
    rehypeSlug,
    [
      rehypePrettyCode,
      {
        theme: 'github-dark',
        getHighlighter: () => highlighter,
      },
    ],
    [
      rehypeAutoLinkHeadings,
      {
        behavior: 'wrap',
        properties: {
          className: ['subheading-anchor'],
          ariaLabel: 'Link to Section',
        },
      },
    ],
  ];
}

// Generate configuration
export default defineConfig({
  root: `src/content`,
  output: {
    data: `.velite`,
    assets: `public/static`,
    base: `/static/`,
    name: `[name]-[hash:6]-[ext]`,
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: (() => {
      const plugins = getResolvedRehypePlugins();
      return plugins instanceof Promise ? [] : plugins; // Provide fallback if necessary
    })(),
    remarkPlugins: [],
  },
});
