import { defineConfig, s, defineCollection } from 'velite'

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split(`/`).slice(1).join(`/`)
})

const posts = defineCollection({
  name: `Post`,
  pattern: `**/*.mdx`,
  schema: s.object({
    slug: s.path(),
    title: s.string().max(99),
    description: s.string().max(999).optional(),
    published: s.boolean().default(true),
    body: s.mdx()
  }).transform(computedFields)
})


export default defineConfig({
  root: `src/content`,
  output: {
    data: `.velite`,
    assets: `public/static`,
    base: `/static/`,
    name: `[name]-[hash:6]-[.ext]`,
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  }
})

