'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { travelAllData } from '@/app/api/api';
import styles from './TravelRecord.module.scss';

const cx = classNames.bind(styles);

interface TravelData {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export default function TravelRecord() {
  const router = useRouter();
  const [events, setEvents] = useState<TravelData[]>([]);

  // API 호출을 통해 여행 데이터를 가져옴
  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const data: TravelData[] = await travelAllData();

        // TravelData를 그대로 설정
        setEvents(data); // 이벤트 설정
      } catch (err) {
        console.error('Error fetching travel data:', err);
      }
    };

    fetchTravelData();
  }, []);

  // console.log(events);

  // 여행 기록 저장소로 이동
  const handleRecordClick = () => {
    router.push('/myfamily/storage');
  };

  return (
    <button
      type="button"
      onClick={handleRecordClick}
      className={cx('travelRecord')}
    >
      <div className={cx('travelRecord-title')}>
        여행기록 저장소
        <Image
          src="/svgs/triangle_icon.svg"
          alt="Triangle Icon"
          width={13}
          height={13}
          priority
        />
      </div>
      <div className={cx('scroll-container')}>
        <div className={cx('travelRecord-main')}>
          {events.length > 0 ? (
            events.map((item) => (
              <div key={item.id} className={cx('travelRecord-main-section')}>
                <p className={cx('travelRecord-main-section-title')}>
                  {item.name}
                </p>
                <p>
                  {item.startDate}
                  <br />~{item.endDate}
                </p>
              </div>
            ))
          ) : (
            <p>여행 기록이 없습니다.</p>
          )}
        </div>
      </div>
    </button>
  );
}
