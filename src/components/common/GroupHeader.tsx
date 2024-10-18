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
  groupImage?: string; // Optional groupImage prop
}

export default function GroupHeader({
  children,
  isShowButton,
  isShowProfile,
  groupImage,
}: HeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleProfileClick = () => {
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
            priority
          />
        </button>
      )}
      <p className={cx('create-post')}>{children}</p>
      {isShowProfile &&
        (groupImage ? (
          <button
            type="button"
            onClick={handleProfileClick}
            className={cx('profile-button')}
          >
            <Image
              src={`http://13.209.88.22:8080/api/v1/image/${groupImage}`}
              alt="Profile"
              width={33}
              height={33}
              className={cx('profile-image')}
              priority
            />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleProfileClick}
            aria-label="Go to profile"
          >
            <div className={cx('profile-button')} />
          </button>
        ))}
    </div>
  );
}
