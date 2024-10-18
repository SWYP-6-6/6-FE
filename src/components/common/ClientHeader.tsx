'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

interface ClientHeaderProps {
  token: string | '';
  children: React.ReactNode;
  isShowButton: boolean;
  isShowProfile: boolean;
}

export default function ClientHeader({
  token,
  children,
  isShowButton,
  isShowProfile,
}: ClientHeaderProps) {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetch('http://13.209.88.22:8080/users/get', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          accept: '*/*',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProfileImage(data.profileImage);
        })
        .catch((error) => console.log('Error fetching profile:', error));
    }
  }, [token]);

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
      {isShowProfile && profileImage ? (
        <Image
          src={profileImage}
          alt="Profile"
          width={40}
          height={40}
          className={cx('profile-image')}
        />
      ) : (
        <div className={cx('profile-button')}>
          {/* 프로필 이미지가 없을 때 */}
        </div>
      )}
    </div>
  );
}
