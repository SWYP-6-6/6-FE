// import type { Metadata } from 'next';
// import '@/styles/base/common.scss';
// import classNames from 'classnames/bind';
// import React from 'react';
// import styles from './layout.module.scss';

// const cx = classNames.bind(styles);

// export const metadata: Metadata = {
//   title: 'Tripterior',
//   description: '여행의 모든 순간을 특별하게, 트립테리어와 함께하세요.',
//   icons: {
//     icon: '/svgs/favicon.svg',
//   },
//   openGraph: {
//     title: 'Tripterior',
//     description: '여행의 모든 순간을 특별하게, 트오립테리어와 함께하세요.',
//     url: 'http://13.209.88.22:3000/',
//     images: [
//       {
//         url: '/svgs/preview.svg',
//         width: 441,
//         height: 957,
//         alt: 'Tripterior Splash Image',
//       },
//     ],
//     type: 'website',
//     siteName: 'Tripterior',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Tripterior',
//     description: '여행의 모든 순간을 특별하게, 트립테리어와 함께하세요.',
//     images: [
//       {
//         url: '/svgs/preview.svg',
//         alt: 'Tripterior Preview Image',
//       },
//     ],
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="ko">
//       <body className={cx('layout')}>{children}</body>
//     </html>
//   );
// }

// description: `${useName}님의 여행의 모든 순간을 특별하게, 트립테리어와 함께하세요.`,

import type { Metadata } from 'next';
import { META } from '@/constants/metadata';
import '@/styles/base/common.scss';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './layout.module.scss';

const cx = classNames.bind(styles);

// const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';
// const ogImage = `${domain}/preview.png`;

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  icons: {
    icon: META.icon,
  },
  openGraph: {
    title: META.title,
    description: META.description,
    url: META.url,
    // images: {
    //   url: ogImage,
    // },
    siteName: META.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: META.title,
    description: META.description,
    // images: {
    //   url: ogImage,
    // },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cx('layout')}>{children}</body>
    </html>
  );
}
