'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import styles from './Splash.module.scss';

const cx = classNames.bind(styles);
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/signin');
    }, 2000);
    return () => {};
  }, [router]);

  return (
    <div className={cx('image-container')}>
      <Image
        src="/svgs/splash.svg"
        alt="splash"
        width={455}
        height={982}
        objectFit="cover"
      />
    </div>
  );
}
