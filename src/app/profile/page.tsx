'use client';

import React, { useEffect, useState } from 'react';
import { getFetchPersonalFeedList, getUserData } from '@/app/api/api';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Footer from '@/components/common/Footer';
import ProfilePageClient from '@/components/profile/ProfilePageClient';
import { FeedItemProps, UserProfile } from '@/types/types';
import styles from './ProfilePage.module.scss';

const cx = classNames.bind(styles);

export default function ProfilePage() {
  const [initialFeedData, setInitialFeedData] = useState<FeedItemProps[]>([]);
  const [userData, setUserData] = useState<UserProfile>();

  useEffect(() => {
    const fetchFeedListData = async () => {
      try {
        const data = await getFetchPersonalFeedList(0, 10); // 전체 공개 피드 리스트

        setInitialFeedData(data.content);
      } catch (err) {
        console.error('Error fetching feedList data:', err);
      }
    };

    fetchFeedListData();
  }, []);

  console.log(initialFeedData);
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
  useEffect(() => {
    fetchUserData();
  }, []);
  // const userData = await getFetchUser({ token });
  // const initialFeedData = await getFetchPersonalFeedList({
  //   page: 0,
  //   size: 10,
  //   token,
  // });
  // const submitNickname = async (formData: FormData) => {
  //   'use server';

  //   const nickname = formData.get('nickname') as string;

  //   if (!nickname) {
  //     throw new Error('닉네임을 입력해주세요.');
  //   }

  //   // 닉네임 업데이트 요청
  //   const response = await fetch('http://13.209.88.22:8080/users/update', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`, // Include the Authorization header
  //       accept: '*/*', // This matches the curl command's accept header
  //     },
  //     body: JSON.stringify({ nickname }), // nickname을 JSON으로 변환하여 전달
  //   });

  //   if (!response.ok) {
  //     throw new Error('닉네임 업데이트에 실패했습니다.');
  //   }

  //   // 성공 시, /로 리다이렉트
  //   revalidatePath('/profile');
  // };

  if (!userData || !initialFeedData) {
    return <div>로딩 중...</div>; // 로딩 상태 시 출력할 UI
  }

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('title')}>마이트립</div>
        <div className={cx('profile')}>
          <div className={cx('image-container')}>
            <Image
              src={userData.profileImage}
              alt="Profile"
              width={65}
              height={65}
              className={cx('profile-image')}
            />
          </div>
          <div className={cx('profile-info')}>
            <div>
              <span>{userData.nickName}</span>
            </div>
            <div className={cx('profile-info-email')}>
              <span>{userData.email}</span>
            </div>
          </div>
        </div>
        <ProfilePageClient
          INITIAL_NICKNAME={userData.nickName}
          initialFeedData={initialFeedData}
          fetchUserData={fetchUserData}
        />
      </div>
      <Footer pathname="/profile" />
    </>
  );
}
