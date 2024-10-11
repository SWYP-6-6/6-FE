'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import ProfileImg from '@/components/group/profileImg';
import { familyImg, familyInfo } from '@/app/api/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from './GroupPage.module.scss';

const cx = classNames.bind(styles);

interface ProfileData {
  id?: number;
  familyName?: string;
  profileImage?: any;
  userList?: any;
  anniversary?: any;
}

export default function GroupPage() {
  // 나중에 [id]라우트 경로 바꿔야함.
  const id = '5';

  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const router = useRouter();

  // 나의 정보 가져오는함수
  const fetchData = async () => {
    try {
      const data = await familyInfo(id); // familyInfo로부터 데이터 가져오기
      setProfileData(data); // 상태에 데이터 저장
    } catch (error) {
      console.error('Error fetching family info:', error);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // 나중에 쿠키 바꾸기
    const myCookie = Cookies.get('JWT');
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      await familyImg(file, myCookie);
    }
  };

  useEffect(() => {
    fetchData(); // fetchData 호출
  }, [id]); // id가 변경될 때마다 다시 호출

  // 기념일 날짜 설정 페이지 이동 함수
  const handleAnniversary = () => {
    router.push('./anniversary');
  };

  return (
    <div className={cx('container')}>
      <div className={cx('title')}>그룹 프로필</div>
      <ProfileImg
        handleFileChange={handleFileChange}
        profileData={profileData}
      />
      <div className={cx('profile-info-container')}>
        <div className={cx('nickname')}>
          <span>{profileData?.familyName}</span>
          <Image
            src="/svgs/revise_icon.svg"
            alt="Revise Icon"
            width={17}
            height={17}
            priority
          />
        </div>
      </div>
      <div className={cx('grid-container')}>
        <button
          className={cx('setting-card', 'anniversary-setting-card')}
          onClick={handleAnniversary}
          type="button"
        >
          <Image
            src="/svgs/aniversary_icon.svg"
            alt="Calender Icon"
            width={19}
            height={22}
            priority
          />
          {/* 여기 글자 색 수정 button태그로 바꿨음 */}
          <span>기념일 설정</span>
        </button>
        <button
          className={cx('setting-card', 'family-member-setting-card')}
          type="button"
        >
          <Image
            src="/svgs/family_icon.svg"
            alt="Family Icon"
            width={20}
            height={23}
            priority
          />
          {/* 여기도 수정 */}
          <span>가족 구성원 설정</span>
        </button>
      </div>
    </div>
  );
}
