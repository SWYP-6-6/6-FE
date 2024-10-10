import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getFetchUser, getFetchPersonalFeedList } from '@/app/api/api';
import { revalidatePath } from 'next/cache';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Footer from '@/components/common/Footer';
import styles from './ProfilePage.module.scss';
import ProfilePageClient from './ProfilePageClient';

const cx = classNames.bind(styles);

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('JWT')?.value;

  if (!token) {
    redirect('/signin');
  }

  const userData = await getFetchUser({ token });
  const initialFeedData = await getFetchPersonalFeedList({
    page: 0,
    size: 10,
    token,
  });
  const submitNickname = async (formData: FormData) => {
    'use server';

    const nickname = formData.get('nickname') as string;

    if (!nickname) {
      throw new Error('닉네임을 입력해주세요.');
    }

    // 닉네임 업데이트 요청
    const response = await fetch('http://13.209.88.22:8080/users/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the Authorization header
        accept: '*/*', // This matches the curl command's accept header
      },
      body: JSON.stringify({ nickname }), // nickname을 JSON으로 변환하여 전달
    });

    if (!response.ok) {
      throw new Error('닉네임 업데이트에 실패했습니다.');
    }

    // 성공 시, /로 리다이렉트
    revalidatePath('/profile');
  };

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
          submitNickname={submitNickname}
          INITIAL_NICKNAME={userData.nickName}
          initialFeedData={initialFeedData.content}
          token={token}
        />
      </div>
      <Footer pathname="/profile" />
    </>
  );
}
