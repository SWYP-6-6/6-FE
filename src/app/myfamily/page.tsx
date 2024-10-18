import React from 'react';
import { cookies } from 'next/headers';
import classNames from 'classnames/bind';
import { getFetchUser, getFetchGroup } from '@/app/api/api';
import { redirect } from 'next/navigation'; // 리다이렉트를 위한 모듈
import Calendar from '@/components/myfamily/Calendar';
import Checklist from '@/components/myfamily/Checklist';
import TravelRecord from '@/components/myfamily/TravelRecord';
import Upcoming from '@/components/myfamily/Upcoming';
import Footer from '@/components/common/Footer';
import GroupHeader from '@/components/common/GroupHeader';
import styles from './MyFamily.module.scss';

const cx = classNames.bind(styles);

export default async function MyFamily() {
  const cookieStore = cookies();
  const token = cookieStore.get('JWT')?.value;
  const userData = await getFetchUser({ token });
  // const travelData = await travelAllData();

  if (!userData) {
    return redirect('/signin');
  }

  if (userData.familyId === null) {
    return redirect('/signin-group');
  }
  const groupId = userData.familyId;
  const groupData = await getFetchGroup({ token, groupId });

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
