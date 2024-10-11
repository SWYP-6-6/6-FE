'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import { joinFamilyDetail } from '@/app/api/api';
import Image from 'next/image';
import Link from 'next/link';
import styles from './JoinGroupConfirmCient.module.scss';

const cx = classNames.bind(styles);

interface JoinGroupClientProps {
  familyData: {
    familyName: string;
    profileImage: string | null;
  };
  token: string | undefined; // 서버에서 받은 JWT 토큰
  familyId: string; // 가족 그룹 ID
}

export default function JoinGroupConfirmCient({
  familyData,
  token,
  familyId,
}: JoinGroupClientProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleJoinFamily = async () => {
    try {
      await joinFamilyDetail({ token, familyId });
      router.push('/signin-group/complete'); // 가입 성공 시 complete 페이지로 이동
    } catch (error) {
      console.error('Error joining family:', error);
      // 에러 메시지를 사용자에게 표시
      setErrorMessage(error.message || '가입하는 동안 문제가 발생했습니다.');
    }
  };
  return (
    <div>
      <div className={cx('title')}>
        현재 찾으시는
        <br />
        가족그룹 프로필이 맞나요?
      </div>
      <div className={cx('profile')}>
        <div className={cx('profile-imageContainer')}>
          {familyData.profileImage && (
            <Image
              width={258}
              height={258}
              src={`http://13.209.88.22:8080/api/v1/image/${familyData.profileImage}`}
              alt={`${familyData.familyName} 그룹의 프로필 이미지`}
              className={cx('profile-imageContainer-image')}
            />
          )}
        </div>
        <div className={cx('profile-nickname')}>{familyData.familyName}</div>
      </div>
      <div className={cx('buttons')}>
        <button
          type="button"
          className={cx('button', 'yes')}
          onClick={handleJoinFamily}
        >
          맞습니다
        </button>
        <Link href="/signin-group/join-group" className={cx('button', 'no')}>
          아닙니다
        </Link>
      </div>
      {errorMessage && <p className={cx('error-message')}>{errorMessage}</p>}
    </div>
  );
}
