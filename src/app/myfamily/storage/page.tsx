'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';
import { familyData, travelAllData, userData } from '@/app/api/api';
import GroupHeader from '@/components/common/GroupHeader';
import styles from './StoragePage.module.scss';
import SwipeableListItem from './SwipeableListItem';

const cx = classNames.bind(styles);

// 아이템 타입 정의
interface Item {
  id: number;
  destination: string;
  startDate: string;
  endDate: string;
}

export default function StoragePage() {
  const router = useRouter();
  const [groupImage, setGroupImage] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [showDelete, setShowDelete] = useState<{ [key: number]: boolean }>({});

  const fetchTravelData = async () => {
    try {
      const data = await travelAllData();

      const formattedItems: Item[] = data.map((item: any) => ({
        id: item.id,
        destination: item.name,
        startDate: item.startDate,
        endDate: item.endDate,
      }));

      setItems(formattedItems);
    } catch (err) {
      console.error('Error fetching travel data:', err);
    }
  };
  useEffect(() => {
    fetchTravelData();
  }, []);

  useEffect(() => {
    const fetchGroupImage = async () => {
      try {
        // userData를 실행하여 familyId 추출
        const user = await userData();
        const { familyId } = user;

        // familyId로 familyData 호출하여 profileImage 가져오기
        const family = await familyData(familyId);
        const { profileImage } = family;

        // 가져온 profileImage를 state에 저장
        setGroupImage(profileImage);
      } catch (err) {
        console.error('Error fetching group image:', err);
      }
    };

    fetchGroupImage();
  }, []);

  // const handleAddClick = () => {
  //   router.push('/myfamily/storage/add');
  // };

  const handleStorageClick = (id: number) => {
    router.push(`/myfamily/storage/${id}/travel-review`);
  };

  // console.log(items);

  return (
    <div className={cx('container')}>
      <GroupHeader groupImage={groupImage} isShowButton isShowProfile>
        MY FAMILY
      </GroupHeader>
      <div className={cx('title')}>여행기록 저장소</div>
      <div className={cx('swipeableLists')}>
        <div className={cx('swipeableList')}>
          {items.length > 0 ? (
            items.map((item) => (
              <SwipeableListItem
                key={item.id}
                item={item}
                showDelete={showDelete[item.id]}
                setShowDelete={setShowDelete}
                handleStorageClick={handleStorageClick}
                fetchTravelData={fetchTravelData}
              />
            ))
          ) : (
            <p>여행기록이 없습니다.</p>
          )}
        </div>
      </div>
      {/* <button
        onClick={handleAddClick}
        className={cx('addButton')}
        type="button"
      >
        <Image
          src="/svgs/add-icon.svg"
          alt="Add Icon"
          width={48}
          height={48}
          priority
          className={cx('button')}
        />
      </button> */}
    </div>
  );
}
