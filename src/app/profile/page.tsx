import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ProfilePage.module.scss';
import ProfileToggles from '../_components/profile/ProfileToggles';

const cx = classNames.bind(styles);

const NICKNAME = '해바라기';
const EMAIL = 'johndoe@kakao.com';

export default function ProfilePage() {
  return (
    <div className={cx('container')}>
      <div className={cx('title')}>개인 프로필</div>
      <div className={cx('image-container')} />
      <div className={cx('profile-info-container')}>
        <div className={cx('nickname')}>
          <span>{NICKNAME}</span>
          <Image
            src="/svgs/revise_icon.svg"
            alt="Revise Icon"
            width={17}
            height={17}
            priority
          />
        </div>
        <div className={cx('email')}>
          <span>{EMAIL}</span>
        </div>
      </div>
      <ProfileToggles />
    </div>
  );
}
