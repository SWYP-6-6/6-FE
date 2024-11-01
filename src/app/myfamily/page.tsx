'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { getUserData, getFamilyDetail } from '@/app/api/api';
import Calendar from '@/components/myfamily/Calendar';
import Checklist from '@/components/myfamily/Checklist';
import TravelRecord from '@/components/myfamily/TravelRecord';
import Upcoming from '@/components/myfamily/Upcoming';
import Footer from '@/components/common/Footer';
import GroupHeader from '@/components/common/GroupHeader';
import { Family, UserProfile } from '@/types/types';
import styles from './MyFamily.module.scss';

const cx = classNames.bind(styles);

export default function MyFamily() {
  const [userData, setUserData] = useState<UserProfile>();
  const [groupData, setGroupData] = useState<Family>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();

        // 데이터가 있으면 userData 상태 설정
        if (data) {
          setUserData(data);

          const secondData = await getFamilyDetail(data.familyId);
          setGroupData(secondData);
          console.log(groupData);
        } else {
          console.error('User data not found or unauthorized.');
        }
      } catch (err: any) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  if (!userData || !groupData) {
    return <div>로딩 중...</div>; // 로딩 상태 시 출력할 UI
  }

  return (
    <div className={cx('container')}>
      <GroupHeader
        groupImage={groupData.profileImage}
        isShowButton={false}
        isShowProfile
      >
        MY FAMILY
      </GroupHeader>
      <Calendar />
      <Upcoming />
      <Checklist />
      <TravelRecord />
      <Footer pathname="/myfamily" />
    </div>
  );
}
