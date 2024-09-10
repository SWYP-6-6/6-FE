/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ['styles'],
    additionalData: '@import "@/styles/main.scss";',
  },
};

export default nextConfig;
