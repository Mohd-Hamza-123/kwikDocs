
// next.config.mjs (or ESM next.config.js)

// Detect command (dev or build)
const isDev = process.argv.indexOf('dev') !== -1;
const isBuild = process.argv.indexOf('build') !== -1;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  allowedDevOrigins: ['192.168.86.147'],
  // (optional) explicitly say you're using Turbopack
  // turbopack: {},
};


export default nextConfig;

