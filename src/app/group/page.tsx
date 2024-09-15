'use client';

import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './GroupPage.module.scss';

const cx = classNames.bind(styles);

const GROUPNAME = '패밀리';

export default function GroupPage() {
  return (
    <div className={cx('container')}>
      <div className={cx('title')}>그룹 프로필</div>
      <div className={cx('image-container')}>
        <div className={cx('image-container-camera')}>
          <Image
            src="/svg/camera_icon.svg"
            alt="Camera Icon"
            width={87}
            height={87}
            priority
          />
        </div>
      </div>
      <div className={cx('profile-info-container')}>
        <div className={cx('nickname')}>
          <span>{GROUPNAME}</span>
          <Image
            src="/svg/revise_icon.svg"
            alt="Revise Icon"
            width={17}
            height={17}
            priority
          />
        </div>
      </div>
      <div className={cx('grid-container')}>
        <div className={cx('setting-card', 'anniversary-setting-card')}>
          <Image
            src="/svg/aniversary_icon.svg"
            alt="Calender Icon"
            width={19}
            height={22}
            priority
          />
          <span>기념일 설정</span>
        </div>
        <div className={cx('setting-card', 'family-member-setting-card')}>
          <Image
            src="/svg/family_icon.svg"
            alt="Family Icon"
            width={20}
            height={23}
            priority
          />
          <span>가족 구성원 설정</span>
        </div>
      </div>
    </div>
  );
}
