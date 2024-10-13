'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { DdayData } from '@/app/api/api';
import styles from './Upcoming.module.scss';

const cx = classNames.bind(styles);

// dDayData의 타입 정의
interface DdayDataType {
  name: string;
  dday: number;
}

export default function Upcoming() {
  // 초기 상태를 빈 객체로 설정하고 타입을 적용
  const [dDayData, setDDayData] = useState<DdayDataType | null>(null);

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const data: DdayDataType = await DdayData();
        setDDayData(data);
      } catch (err) {
        console.error('Error fetching dDay data:', err);
      }
    };

    fetchTravelData();
  }, []);

  if (!dDayData) {
    return <p>디데이 받아오는 중...</p>;
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
