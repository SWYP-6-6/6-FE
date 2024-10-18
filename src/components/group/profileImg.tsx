'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { familyData, familyImg, userData } from '@/app/api/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from './GroupPage.module.scss';

const cx = classNames.bind(styles);

interface GroupData {
  id?: number;
  familyName?: string;
  profileImage?: string;
  userList?: Array<{
    id: number;
    username: string;
    email: string;
    profileImage: string;
    nickName: string;
    familyId: number;
  }>;
  anniversary?: { [key: string]: string };
}

export default function GroupPage() {
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const user = await userData();
        const { familyId } = user;

        const family = await familyData(familyId);

        setGroupData(family);
      } catch (err) {
        console.error('Error fetching group data:', err);
      }
    };

    fetchGroupData();
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const myCookie = Cookies.get('JWT');
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      await familyImg(file, myCookie);
    }
  };

  // 기념일 날짜 설정 페이지 이동 함수
  const handleAnniversary = () => {
    router.push('./anniversary');
  };

  return (
    <div className={cx('container')}>
      <div className={cx('title')}>그룹 프로필</div>

      {groupData && (
        <>
          <div className={cx('image-container')}>
            {groupData?.profileImage && (
              <img
                src={`http://13.209.88.22:8080/api/v1/image/${groupData?.profileImage}`}
                alt="profileImage"
                style={{
                  width: '27.7rem',
                  height: '27.7rem',
                  borderRadius: '50%',
                }}
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

          <div className={cx('profile-info-container')}>
            <div className={cx('nickname')}>
              <span>{groupData.familyName}</span>
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
              <span>가족 구성원 설정</span>
            </button>
          </div>

          {/* 가족 구성원 표시 */}
          <div className={cx('family-member-list')}>
            {groupData.userList?.map((user) => (
              <div key={user.id} className={cx('family-member')}>
                <Image
                  src={user.profileImage}
                  alt={`${user.nickName}의 프로필 이미지`}
                  width={40}
                  height={40}
                  className={cx('family-member-img')}
                />
                <span>{user.username}</span>
              </div>
            ))}
          </div>

          {/* 기념일 표시 */}
          <div className={cx('anniversary-list')}>
            {groupData.anniversary &&
              Object.entries(groupData.anniversary).map(([date, event]) => (
                <div key={date} className={cx('anniversary-item')}>
                  <span>{date}</span>: <span>{event}</span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
