// app/components/nicknamesetting/NicknamePage.tsx

import React from 'react';
import classNames from 'classnames/bind';
import NicknameForm from '@/components/nicknamesetting/NicknameForm';
import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';
import styles from './NicknamePage.module.scss';

const cx = classNames.bind(styles);

export default function NicknamePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('JWT')?.value;

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
    redirect('/');
  };

  return (
    <div className={cx('container')}>
      <div className={cx('introduction')}>
        <span className={cx('bold')}>트립 테리어의 </span> <br />
        기본 정보를 입력해주세요!
      </div>
      <NicknameForm submitNickname={submitNickname} />
    </div>
  );
}
