// Importing the i18n configuration from next-i18next.config.js
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n, // Using the i18n configuration
  reactStrictMode: true, // Enabling React strict mode

  // Customizing Webpack configuration
  webpack(config, { isServer, dev }) {
    // Enabling experimental features in Webpack
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config; // Returning the modified Webpack configuration
  },
};

// Exporting the Next.js configuration
module.exports = nextConfig;
