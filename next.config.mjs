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
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 경로는 항상 "/"로 시작해야 합니다.
        destination: 'http://13.209.88.22:8080/:path*', // 프록시할 API 서버 경로
      },
    ];
  },
};

export default nextConfig;
