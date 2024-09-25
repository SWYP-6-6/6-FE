import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './Checklist.module.scss';

const cx = classNames.bind(styles);

const checklistData = [
  { id: 1, title: '경주', startDate: '2024-09-20' },
  { id: 2, title: '서울 여행', startDate: '2024-09-18' },
  { id: 3, title: '회의', startDate: '2024-09-25' },
];

const sortedData = checklistData.sort(
  (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
);

export default function Checklist() {
  return (
    <div className={cx('checklist')}>
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
            <p>{item.title}</p>
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
    </div>
  );
}
