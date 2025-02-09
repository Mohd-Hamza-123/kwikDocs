import { build } from 'velite'

/** @type {import('next').NextConfig} */
export default {
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true
  },
  webpack: config => {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  }
}

class VeliteWebpackPlugin {
  static started = false
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      const dev = compiler.options.mode === 'development'
      await build({ watch: dev, clean: !dev })
    })
  }
}


// import createMDX from '@next/mdx';
// import rehypePrettyCode from 'rehype-pretty-code';

// const withMDX = createMDX({

//   extension: /\.mdx?$/, 
//   options: {
//     rehypePlugins: [
//       [
//         rehypePrettyCode,
//         {
//           theme: "github-dark",
//           // Additional rehype-pretty-code options
//         },
//       ],
//     ],
//   },
// });

// const nextConfig = {
//   pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'], 
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: '**',
//         port: '',
//       },
//       {
//         protocol: 'https',
//         hostname: '**',
//         port: '',
//       },
//       {
//         protocol: 'https',
//         hostname: 'contents.mediadecathlon.com',
//         port: '',
//       },
//     ],
//   },
// };


// export default withMDX(nextConfig);
