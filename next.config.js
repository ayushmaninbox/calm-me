/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove headers configuration since it's not compatible with static exports
  transpilePackages: ['framer-motion', '@emotion/is-prop-valid'],
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
      },
    };
    return config;
  }
};

module.exports = nextConfig;