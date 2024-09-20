'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

interface HeaderProps {
  children: React.ReactNode;
  isShowButton: boolean;
  isShowProfile: boolean;
}

export default function Header({
  children,
  isShowButton,
  isShowProfile,
}: HeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back(); // 이전 페이지로 이동
  };
  return (
    <div className={cx('header-container')}>
      {isShowButton && (
        <button type="button" onClick={handleBackClick}>
          <Image
            src="/svgs/return-button.svg"
            alt=""
            width={13}
            height={20}
            className={cx('return-button')}
          />
        </button>
      )}
      <p className={cx('create-post')}>{children}</p>
      {isShowProfile && (
        <div className={cx('profile-button')}>
          {/*  프로필 컴포넌트 넣기 상단 className 지우기  - 이보다 더 괜찮은 방법이 생각나지 않는 관계로.. */}
        </div>
      )}
    </div>
  );
}
