'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { FamilyAllItemParams } from '@/types/types';
import {
  familyData,
  travelAllData,
  travelDestinationDelete,
  getUserData,
} from '@/app/api/api';
import Image from 'next/image';
import SwipeableListItem from '@/components/checklist/SwipeableListItem';
import GroupHeader from '@/components/common/GroupHeader';
import styles from './checklist.module.scss';

const cx = classNames.bind(styles);

export default function ChecklistPage() {
  const [travelData, setTravelData] = useState<FamilyAllItemParams[]>([]);
  const [showDelete, setShowDelete] = useState<{ [key: number]: boolean }>({});
  const [isSwiping, setIsSwiping] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [groupImage, setGroupImage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchGroupImage = async () => {
      try {
        // userData를 실행하여 familyId 추출
        const user = await getUserData();
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

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const data = await travelAllData(); // API 호출
        const formattedItems: FamilyAllItemParams[] = data.map(
          (item: FamilyAllItemParams) => ({
            id: item.id,
            name: item.name,
            startDate: item.startDate,
            endDate: item.endDate,
          }),
        );
        setTravelData(formattedItems);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching travel data:', err);
        setLoading(false);
      }
    };
    fetchTravelData();
  }, []);

  // 항목 클릭 시 상세 페이지로 이동
  const handleChecklistClick = (id: number) => {
    router.push(`/myfamily/checklist/${id}/detail`);
  };

  // 삭제 버튼 클릭 시 처리
  const handleDelete = async (id: number) => {
    try {
      await travelDestinationDelete(id); // 항목 삭제 API 호출

      // 삭제된 항목을 상태에서 제거하여 UI 업데이트
      setTravelData((prev) => {
        const updatedData = prev.filter((travelItem) => travelItem.id !== id);
        return updatedData;
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // 로딩 중 메시지 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={cx('container')}>
      <GroupHeader groupImage={groupImage} isShowButton isShowProfile>
        MY FAMILY
      </GroupHeader>
      <div className={cx('title')}>여행기록 저장소</div>
      <div className={cx('swipeableLists')}>
        <div className={cx('swipeableList')}>
          {travelData.length > 0 ? (
            travelData.map((item) => (
              <SwipeableListItem
                key={item.id}
                item={item}
                showDelete={showDelete}
                isSwiping={isSwiping}
                setShowDelete={setShowDelete}
                setIsSwiping={setIsSwiping}
                handleChecklistClick={handleChecklistClick}
                handleDelete={handleDelete} // 삭제 처리 함수 전달
              />
            ))
          ) : (
            <p>여행기록이 없습니다.</p>
          )}
        </div>
      </div>
      <button
        onClick={() => router.push('/myfamily/checklist/add')}
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
      </button>
    </div>
  );
}
