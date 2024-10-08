'use client';

// 클라이언트 컴포넌트로 선언

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import { getFetchUser } from '@/app/api/api'; // getFetchUser 불러오기
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

interface HeaderProps {
  children: React.ReactNode;
  isShowButton: boolean;
  isShowProfile: boolean;
  token: string | undefined;
}

export default function Header({
  children,
  isShowButton,
  isShowProfile,
  token,
}: HeaderProps) {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      // getFetchUser를 사용하여 API 호출
      getFetchUser({ token })
        .then((data) => {
          if (data.nickName === null) {
            router.push('/nicknamesetting');
          } else {
            setProfileImage(data.profileImage);
          }
        })
        .catch((error) => {
          // console.error('프로필 데이터를 불러오는 중 오류 발생:', error);
          return <div> 프로필 데이터를 불러오는 중 오류 발생: {error}</div>;
        });
    }
  }, [token, router]);

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
        <div className={cx('profile-button')}>
          <Image
            src={profileImage}
            alt="Profile"
            width={33}
            height={33}
            className={cx('profile-image')}
          />
        </div>
      ) : (
        isShowProfile && (
          <div className={cx('profile-button')}>
            {/* 프로필 이미지가 없을 때 대체 UI */}
          </div>
        )
      )}
    </div>
  );
}
