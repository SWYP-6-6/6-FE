'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { DdayData, travelAllData } from '@/app/api/api';
import styles from './Upcoming.module.scss';

const cx = classNames.bind(styles);

// dDayData의 타입 정의 (객체)
interface DdayDataType {
  name: string;
  dday: number;
}

export default function Upcoming() {
  // dDayData의 초기 상태를 null로 설정 (객체)
  const [dDayData, setDDayData] = useState<DdayDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchAllTravelData = async () => {
      try {
        const allTravelData = await travelAllData(); // travelAllData API 호출

        if (Array.isArray(allTravelData) && allTravelData.length === 0) {
          // 빈 배열이면 DdayData 호출하지 않음
          setIsLoading(false);
          return;
        }

        // travelAllData가 빈 배열이 아니면 DdayData 호출
        const data: DdayDataType = await DdayData();
        setDDayData(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching travel or dDay data:', err);
        setIsLoading(false);
      }
    };

    fetchAllTravelData();
  }, []);

  if (isLoading) {
    return <p>데이터를 불러오는 중...</p>;
  }

  if (!dDayData) {
    return (
      <div className={cx('upcoming')}>
        <div className={cx('upcoming-title')}>
          다가오는 일정
          <Image
            src="/svgs/triangle_icon.svg"
            alt="Triangle Icon"
            width={13}
            height={13}
            priority
          />
        </div>
        <div className={cx('upcoming-main')}>
          <p>다가오는 일정이 없습니다, 캘린더에서 일정을 추가해보세요!</p>{' '}
        </div>
      </div>
    );
  }

  return (
    <div className={cx('upcoming')}>
      <div className={cx('upcoming-title')}>
        다가오는 일정
        <Image
          src="/svgs/triangle_icon.svg"
          alt="Triangle Icon"
          width={13}
          height={13}
          priority
        />
      </div>
      <div className={cx('upcoming-main')}>
        <p>{dDayData.name}</p>
        <p>{dDayData.dday === 0 ? 'D-Day' : `D-${dDayData.dday}`}</p>
      </div>
    </div>
  );
}
