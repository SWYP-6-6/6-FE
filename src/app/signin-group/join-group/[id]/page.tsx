'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import { getFamilyDetail, joinFamilyDetail } from '@/app/api/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './JoinGroupConfirmPage.module.scss';

const cx = classNames.bind(styles);
interface FamilyData {
  familyName: string;
  profileImage: string | null;
}

export default function JoinGroupConfirmPage({
  params,
}: {
  params: { id: string };
}) {
  const [familyData, setFamilyData] = useState<FamilyData>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const groupId = params.id;
  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
        const data = await getFamilyDetail(groupId);

        setFamilyData(data);
      } catch (err) {
        console.error('Error fetching Family data:', err);
      }
    };

    fetchFamilyData();
  }, []);

  const handleJoinFamily = async () => {
    try {
      await joinFamilyDetail(groupId);
      router.push('/signin-group/complete'); // 가입 성공 시 complete 페이지로 이동
    } catch (error) {
      console.error('Error joining family:', error);
      // 에러가 객체이고 message 속성을 가진 경우만 처리
      if (error instanceof Error) {
        setErrorMessage(error.message || '가입하는 동안 문제가 발생했습니다.');
      } else {
        setErrorMessage('가입하는 동안 문제가 발생했습니다.');
      }
    }
  };

  if (!familyData) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      <Header isShowButton={false} isShowProfile={false}>
        MY FAMILY
      </Header>
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
    </div>
  );
}
