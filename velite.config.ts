import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import { defineConfig, s, defineCollection } from 'velite'
import rehypeAutoLinkHeadings from 'rehype-autolink-headings'

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split(`/`).slice(1).join(`/`)
});

const posts = defineCollection({
  name: `Post`,
  pattern: `**/*.mdx`,
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      published: s.boolean().default(true),
      body: s.mdx()
    })
    .transform(computedFields)
})


export default defineConfig({
  root: process.env.NODE_ENV === "production" ? "src/content" : 'src/content/mongodb',
  output: {
    data: `.velite`,
    assets: `public/static`,
    base: `/static/`,
    name: `[name]-[hash:6]-[.ext]`,
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark" }],
      [
        rehypeAutoLinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to Section'
          }
        }]
    ],
    remarkPlugins: [],
  }
})
