'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { getUserData } from '@/app/api/api';
import Header from '@/components/common/Header';
import MainClient from '@/components/mainClient';
import Footer from '@/components/common/Footer';
import { UserProfile } from '@/types/types';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  const [activeTab, setActiveTab] = useState('public');
  const [userData, setUserData] = useState<UserProfile>();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();

        // if (!data) {
        //   router.push('/signin');
        //   return;
        // }

        if (data.nickName === null) {
          router.push('/nicknamesetting');
          return;
        }

        setUserData(data);
      } catch (err: any) {
        // 서버 응답에서 에러 메시지 추출
        const errorMessage = err.message || (await err.response?.text()) || '';

        if (errorMessage.includes('가족이 존재하지 않습니다.')) {
          router.push('/signin-group');
        } else {
          router.push('/signin');
        }
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, [router]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (!userData) {
    return <div>로딩 중...</div>; // 로딩 상태 시 출력할 UI
  }

  return (
    <>
      <Header user={userData} isShowButton={false} isShowProfile>
        트립테리어
      </Header>
      <div className={cx('tabs')}>
        <button
          type="button"
          className={cx({ active: activeTab === 'public' }, 'tab')}
          onClick={() => handleTabChange('public')}
        >
          전체공개
        </button>
        <button
          type="button"
          className={cx({ active: activeTab === 'group' }, 'tab')}
          onClick={() => handleTabChange('group')}
        >
          그룹공개
        </button>
      </div>
      <MainClient
        userNIckName={userData?.nickName || ''}
        activeTab={activeTab}
      />
      <Footer pathname="/" />
    </>
  );
}
