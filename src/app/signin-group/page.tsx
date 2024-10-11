import React from 'react';
import { cookies } from 'next/headers';
import { getFetchUser } from '@/app/api/api';
import Image from 'next/image';
import classNames from 'classnames/bind';
import Header from '@/components/common/Header';
import Link from 'next/link'; // 페이지 이동을 위해 링크 사용
import styles from './SigninGroupPage.module.scss';

const cx = classNames.bind(styles);

export default async function SigninGroupPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('JWT')?.value;
  const userData = await getFetchUser({ token });

  return (
    <div className={cx('container')}>
      <Header user={userData} isShowButton={false} isShowProfile={false}>
        MY FAMILY
      </Header>
      <div className={cx('container-content')}>
        <div className={cx('container-content-title')}>
          현재 가족프로필이
          <br />
          있으신가요?
        </div>
        <div className={cx('container-content-text')}>
          가족그룹이 있다면, 지금 바로 검색해보세요!
        </div>
        <Image
          src="/svgs/group-signup-icon.svg"
          alt="그룹 가입 svg"
          width={211}
          height={166}
          className={cx('image')}
        />
        <div className={cx('buttons')}>
          <Link
            href="/signin-group/create-group"
            className={cx('button', 'no')}
          >
            없어요
          </Link>
          <Link href="/signin-group/join-group" className={cx('button', 'yes')}>
            있어요!
          </Link>
        </div>
      </div>
    </div>
  );
}
