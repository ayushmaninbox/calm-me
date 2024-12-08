/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['framer-motion', '@emotion/is-prop-valid'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': require.resolve('framer-motion'),
      '@emotion/is-prop-valid': require.resolve('@emotion/is-prop-valid'),
    };
    return config;
  },
};

module.exports = nextConfig;