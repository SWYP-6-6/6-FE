'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';
import { familyData, travelAllData, getUserData } from '@/app/api/api';
import GroupHeader from '@/components/common/GroupHeader';
import SwipeableListItem from '@/components/myfamily/storage/SwipeableListItem';
import styles from './StoragePage.module.scss';

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
        const user = await getUserData();
        const { familyId } = user;
        const family = await familyData(familyId);
        const { profileImage } = family;
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
    </div>
  );
}
