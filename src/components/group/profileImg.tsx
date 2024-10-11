'use client';

import React from 'react';
import classNames from 'classnames/bind';
import styles from '@/app/group/GroupPage.module.scss';
import Image from 'next/image';

const cx = classNames.bind(styles);

interface ProfileImgProps {
  handleFileChange: (event: any) => void;
  profileData: any;
}

// 임시 컴포넌트
// 나중에 id값으로 변경
export default function ProfileImg({
  handleFileChange,
  profileData,
}: ProfileImgProps) {
  return (
    <div className={cx('image-container')}>
      {profileData?.profileImage && (
        <img
          src={`http://13.209.88.22:8080/api/v1/image/${profileData?.profileImage}`}
          alt="profileImage"
          style={{ width: '27.7rem', height: '27.7rem', borderRadius: '50%' }}
        />
      )}
      <div className={cx('image-container-camera')}>
        <label htmlFor="fileInput">
          <Image
            src="/svgs/camera_icon.svg"
            alt="Camera Icon"
            width={87}
            height={87}
            priority
          />

          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}
