// const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_APP_CLOUDINARY_API_KEY: process.env.NEXT_APP_CLOUDINARY_API_KEY,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_APP_CLOUDINARY_UPLOAD_PRESET:
      process.env.NEXT_APP_CLOUDINARY_UPLOAD_PRESET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.etsystatic.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // webpack: (config, { isServer, nextRuntime, webpack }) => {
  //   // Avoid AWS SDK Node.js require issue
  //   if (isServer && nextRuntime === "nodejs")
  //     config.plugins.push(
  //       new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
  //     );
  //   return config;
  // },
};

module.exports = nextConfig;
