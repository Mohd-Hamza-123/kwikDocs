/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';

const withMDX = createMDX({
  // Add MDX-specific configurations here
  extension: /\.mdx?$/, // Match MDX file extensions
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'], // Include MDX extensions for routing
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'contents.mediadecathlon.com',
        port: '',
      },
    ],
  },
};

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
