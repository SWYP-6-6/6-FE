'use client';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ProfilePage.module.scss';

const cx = classNames.bind(styles);

const NICKNAME = 'JohnDoe';
const EMAIL = 'johndoe@example.com';

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
      <div className={cx('title')}>프로필</div>
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
      <div className={cx('grid-container')}>
        <div className={cx('character-container')}>
          <p>이곳에 캐릭터가 들어갈 예정</p>
        </div>
        <div className={cx('settings-container')}>
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
