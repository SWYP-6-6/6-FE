import type { Metadata } from 'next';
import '@/styles/base/common.scss';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './layout.module.scss';

const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: 'Tripterrior',
  description: '여행의 모든 순간을 특별하게, 트립테리어와 함께하세요.',
  icons: {
    icon: '/svgs/favicon.svg',
  },
  openGraph: {
    title: 'Tripterrior',
    description: '여행의 모든 순간을 특별하게, 트립테리어와 함께하세요.',
    url: 'http://13.209.88.22:3000/',
    images: [
      {
        url: '/svgs/preview.svg',
        width: 441,
        height: 957,
        alt: 'Tripterrior Splash Image',
      },
    ],
    type: 'website',
    siteName: 'Tripterrior',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tripterrior',
    description: '여행의 모든 순간을 특별하게, 트립테리어와 함께하세요.',
    images: [
      {
        url: '/svgs/preview.svg',
        alt: 'Tripterrior Preview Image',
      },
    ],
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
