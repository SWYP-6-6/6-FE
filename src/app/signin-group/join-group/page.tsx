import React from 'react';
import Header from '@/components/common/Header';
import { cookies } from 'next/headers';
import { getAllFamily } from '@/app/api/api';
import classNames from 'classnames/bind';
import JoinGroupClient from './JoinGroupClient';
import styles from './JoinGroupPage.module.scss';

const cx = classNames.bind(styles);

export default async function JoinGroupPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('JWT')?.value;

  const allFamilyData = await getAllFamily({ token });

  return (
    <div>
      <Header isShowButton={false} isShowProfile={false}>
        MY FAMILY
      </Header>
      <div className={cx('title')}>
        가족그룹의 프로필을
        <br />
        검색으로 쉽고 빠르게 찾아보세요.
      </div>
      <div className={cx('input-container')}>
        <div className={cx('input-container-title')}>그룹이름</div>
        <JoinGroupClient allFamilyData={allFamilyData} />
      </div>
    </div>
  );
}
