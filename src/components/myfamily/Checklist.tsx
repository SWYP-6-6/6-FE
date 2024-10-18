'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import { travelAllData } from '@/app/api/api';
import { CheckDestinationListProps } from '@/types/types';
import styles from './Checklist.module.scss';

const cx = classNames.bind(styles);

export default function Checklist() {
  const [travelData, setTravelData] = useState<CheckDestinationListProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const data = await travelAllData();
        setTravelData(data);
      } catch (err) {
        console.error('Error liking feed:', err);
      }
    };

    fetchTravelData();
  }, []);

  const sortedData = travelData.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  const handleChecklistClick = () => {
    router.push('/myfamily/checklist');
  };

  return (
    <button
      type="button"
      className={cx('checklist')}
      onClick={handleChecklistClick}
    >
      <div className={cx('checklist-title')}>
        체크리스트
        <Image
          src="/svgs/triangle_icon.svg"
          alt="Triangle Icon"
          width={13}
          height={13}
          priority
        />
      </div>
      <div className={cx('checklist-main')}>
        {sortedData.map((item) => (
          <div key={item.id} className={cx('checklist-main-section')}>
            <p>{item.name}</p>
            <p>{item.startDate}</p>
          </div>
        ))}
        <div className={cx('checklist-main-menu')}>
          <Image
            src="/svgs/dotmenu_icon.svg"
            alt="Dot Menu Icon"
            width={22}
            height={4}
            priority
          />
        </div>
      </div>
    </button>
  );
}
