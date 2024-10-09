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
  user: User; // Add the User interface to the props
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
    setTimeout(() => {
      window.location.reload();
    }, 100);
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
        <div className={cx('profile-button')}>
          <Image
            src={user.profileImage}
            alt="Profile"
            width={33}
            height={33}
            className={cx('profile-image')}
          />
        </div>
      ) : (
        isShowProfile && (
          <div className={cx('profile-button')}>
            {/* 대체 프로필 이미지 혹은 UI */}
          </div>
        )
      )}
    </div>
  );
}
