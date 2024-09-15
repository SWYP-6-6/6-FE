'use client';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ProfilePage.module.scss';

const cx = classNames.bind(styles);

const NICKNAME = '해바라기';
const EMAIL = 'johndoe@kakao.com';

export default function ProfilePage() {
  const [toggles, setToggles] = useState({
    alarm: false,
    anotherAlarm: false,
  });

  const handleToggle = (key: 'alarm' | 'anotherAlarm') => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={cx('container')}>
      <div className={cx('title')}>개인 프로필</div>
      <div className={cx('image-container')} />
      <div className={cx('profile-info-container')}>
        <div className={cx('nickname')}>
          <span>{NICKNAME}</span>
          <Image
            src="/svg/revise_icon.svg"
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
      <div className={cx('alarm')}>
        <p className={cx('alarm-title')}>알림</p>
        <div className={cx('alarm-toggle-container')}>
          <div className={cx('alarm-labels')}>공유 피드 좋아요 알림</div>
          <button
            type="button"
            className={cx('toggle', { on: toggles.alarm })}
            onClick={() => handleToggle('alarm')}
            aria-label={toggles.alarm ? 'Turn off alarm' : 'Turn on alarm'}
          >
            <div className={cx('circle')} />
          </button>
        </div>
        <div className={cx('alarm-toggle-container')}>
          <div className={cx('alarm-labels')}>공유 피드 좋아요 알림</div>
          <button
            type="button"
            className={cx('toggle', { on: toggles.anotherAlarm })}
            onClick={() => handleToggle('anotherAlarm')}
            aria-label={
              toggles.anotherAlarm
                ? 'Turn off another alarm'
                : 'Turn on another alarm'
            }
          >
            <div className={cx('circle')} />
          </button>
        </div>
      </div>
    </div>
  );
}
