/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['framer-motion', '@emotion/is-prop-valid'],
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'framer-motion': require.resolve('framer-motion'),
        '@emotion/is-prop-valid': require.resolve('@emotion/is-prop-valid'),
      },
      fallback: {
        ...config.resolve.fallback,
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
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;