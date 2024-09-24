import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './Upcoming.module.scss';

const cx = classNames.bind(styles);

type ScheduleType = {
  title: string;
  dueDate: string;
};

const scheduleData: ScheduleType = {
  title: '경주',
  dueDate: 'D-1',
};

export default function Upcoming() {
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
        <p>{scheduleData.title}</p>
        <p>{scheduleData.dueDate}</p>
      </div>
    </div>
  );
}
