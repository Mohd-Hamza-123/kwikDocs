/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx'
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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



const withMDX = createMDX({
    // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
// export default nextConfig;
