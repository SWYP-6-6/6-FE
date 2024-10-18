/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ['styles'],
    additionalData: '@import "@/styles/main.scss";',
  },
  images: {
    remotePatterns: [
      {
        hostname: 'img1.kakaocdn.net',
      },
      {
        hostname: 't1.kakaocdn.net',
      },
      {
        hostname: '13.209.88.22',
      },
      {
        hostname: 'k.kakaocdn.net',
      },
    ],
  },
};

export default nextConfig;
