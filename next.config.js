/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['framer-motion', '@emotion/is-prop-valid'],
  webpack: (config) => {
    // Add WASM support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }

    // Add rule for WASM files
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    })

    // Existing aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': require.resolve('framer-motion'),
      '@emotion/is-prop-valid': require.resolve('@emotion/is-prop-valid'),
    };

    return config;
  },
};

module.exports = nextConfig;