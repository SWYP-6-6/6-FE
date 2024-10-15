'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { familyData, putFamilyImage, userData } from '@/app/api/api';
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
  useEffect(() => {
    fetchGroupData();
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const img = event.target.files?.[0];
    if (img && img.type.startsWith('image/')) {
      // await familyImg(file, myCookie);
      try {
        const response = await putFamilyImage(img);
        if (response) {
          // router.push(`/myfamily/storage/${travelId}/travel-review`);
          fetchGroupData();
          console.log(response);
        }
      } catch (error) {
        console.error('가족 프로필 사진을 변경 중 오류가 발생했습니다:', error);
      }
    }
  };

  const onClickAnniversary = () => {
    router.push('/group/anniversary');
  };
  const onClickeMember = () => {
    router.push('/group/member');
  };

  return (
    <div className={cx('container')}>
      <div className={cx('title')}>그룹 프로필</div>
      {groupData && (
        <>
          <div className={cx('image-container')}>
            {groupData?.profileImage && (
              <Image
                className={cx('image-container-img')}
                src={`http://13.209.88.22:8080/api/v1/image/${groupData?.profileImage}`}
                alt="profileImage"
                width={277}
                height={277}
                priority
              />
            )}
            <label htmlFor="fileInput" className={cx('image-container-camera')}>
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
              onClick={onClickAnniversary}
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
              onClick={onClickeMember}
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
          {/* <div className={cx('family-member-list')}>
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
          </div> */}
          {/* 기념일 표시 */}
          {/* <div className={cx('anniversary-list')}>
            {groupData.anniversary &&
              Object.entries(groupData.anniversary).map(([date, event]) => (
                <div key={date} className={cx('anniversary-item')}>
                  <span>{date}</span>: <span>{event}</span>
                </div>
              ))}
          </div> */}
        </>
      )}
    </div>
  );
}
