'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Header from '@/components/common/Header';
import Link from 'next/link'; // 페이지 이동을 위해 링크 사용
import { UserProfile } from '@/types/types';
import styles from './SigninGroupPage.module.scss';
import { getUserData } from '../api/api';

const cx = classNames.bind(styles);

export default function SigninGroupPage() {
  const [userData, setUserData] = useState<UserProfile>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();

        // 데이터가 있으면 userData 상태 설정
        if (data) {
          setUserData(data);
        } else {
          console.error('User data not found or unauthorized.');
        }
      } catch (err: any) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={cx('container')}>
      <Header user={userData} isShowButton={false} isShowProfile={false}>
        MY FAMILY
      </Header>
      <div className={cx('container-content')}>
        <div className={cx('container-content-title')}>
          현재 가족프로필이
          <br />
          있으신가요?
        </div>
        <div className={cx('container-content-text')}>
          가족그룹이 있다면, 지금 바로 검색해보세요!
        </div>
        <Image
          src="/svgs/group-signup-icon.svg"
          alt="그룹 가입 svg"
          width={211}
          height={166}
          className={cx('image')}
        />
        <div className={cx('buttons')}>
          <Link
            href="/signin-group/create-group"
            className={cx('button', 'no')}
          >
            없어요
          </Link>
          <Link href="/signin-group/join-group" className={cx('button', 'yes')}>
            있어요!
          </Link>
        </div>
      </div>
    </div>
  );
}
