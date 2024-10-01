'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './TravelRecord.module.scss';

const cx = classNames.bind(styles);

const storedData = [
  { id: 1, title: '경주', startDate: '2024-09-20', endDate: '2024-09-25' },
  { id: 2, title: '서울 여행', startDate: '2024-09-18', endDate: '2024-09-25' },
  { id: 3, title: '회의', startDate: '2024-09-25', endDate: '2024-09-25' },
];

const sortedStoredData = storedData.sort(
  (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
);

export default function TravelRecord() {
  const router = useRouter();

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
          {sortedStoredData.map((item) => (
            <div key={item.id} className={cx('travelRecord-main-section')}>
              <p className={cx('travelRecord-main-section-title')}>
                {item.title}
              </p>
              <p>
                {item.startDate}
                <br />~{item.endDate}
              </p>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
