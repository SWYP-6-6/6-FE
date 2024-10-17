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
  user?: User; // user를 선택적인 prop으로 설정
}

interface User {
  id: number;
  username: string;
  email: string;
  profileImage: string;
  nickName: string | null;
  familyId: number | null;
}

export default function Header({
  children,
  isShowButton,
  isShowProfile,
  user,
}: HeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleRouterGroup = () => {
    router.push('/group');
  };

  return (
    <div className={cx('header-container')}>
      {isShowButton && (
        <button type="button" onClick={handleBackClick}>
          <Image
            src="/svgs/return-button.svg"
            alt="Return"
            width={13}
            height={20}
            className={cx('return-button')}
          />
        </button>
      )}
      <p className={cx('create-post')}>{children}</p>
      {isShowProfile && user?.profileImage ? (
        <button
          type="button"
          onClick={handleProfileClick}
          className={cx('profile-button')}
        >
          <Image
            src={user.profileImage}
            alt="Profile"
            width={33}
            height={33}
            className={cx('profile-image')}
          />
        </button>
      ) : (
        isShowProfile && (
          <button
            className={cx('profile-button')}
            onClick={handleRouterGroup}
            type="button"
            aria-label="프로필 보기" // 접근성을 위한 레이블 추가
          >
            {/* 대체 프로필 이미지 혹은 UI */}
          </button>
        )
      )}
    </div>
  );
}
