/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
