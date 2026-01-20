import { build } from "velite";

/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
  turbopack : {
    
  }
};

class VeliteWebpackPlugin {
  static started = false;
  constructor(/** @type {import('velite').Options} */ options = {}) {
    this.options = options;
  }
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs !!!
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      this.options.watch = this.options.watch ?? dev;
      this.options.clean = this.options.clean ?? !dev;
      await build(this.options); // start velite
    });
  }
}


// // next.config.mjs (or ESM next.config.js)

// // Detect command (dev or build)
// const isDev = process.argv.indexOf('dev') !== -1;
// const isBuild = process.argv.indexOf('build') !== -1;

// // Start Velite only once, for dev or build
// if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
//   process.env.VELITE_STARTED = '1';
//   const { build } = await import('velite');
//   await build({ watch: isDev, clean: !isDev });
// }

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         pathname: '**',
//       },
//     ],
//   },
//   // (optional) explicitly say you're using Turbopack
//   // turbopack: {},
// };

// export default nextConfig;

