import type { Metadata } from 'next';
import { META } from '@/constants/metadata';
import '@/styles/base/common.scss';
import classNames from 'classnames/bind';
import React from 'react';
import Head from 'next/head';
import styles from './layout.module.scss';

const cx = classNames.bind(styles);
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
    locale: 'ko_KR',
    images: [
      {
        url: META.ogImage, // 절대 경로로 설정해야 함
        width: 1200, // 적절한 이미지 크기 설정
        height: 630,
        alt: 'Tripterior Open Graph Image',
      },
    ],
    siteName: META.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: META.title,
    description: META.description,
    images: [
      {
        url: META.ogImage, // 절대 경로로 설정해야 함
        alt: 'Tripterior Twitter Image',
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
      <Head>
        <script
          defer
          src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
        />
      </Head>
      <body className={cx('layout')}>{children}</body>
    </html>
  );
}
