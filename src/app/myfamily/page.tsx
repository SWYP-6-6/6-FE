import React from 'react';
import classNames from 'classnames/bind';
import Header from '@/app/_components/common/Header';
import Calendar from '@/app/_components/myfamily/Calendar';
import Checklist from '@/app/_components/myfamily/Checklist';
import TravelRecord from '@/app/_components/myfamily/TravelRecord';
import styles from './MyFamily.module.scss';
import Upcoming from '../_components/myfamily/Upcoming';

const cx = classNames.bind(styles);

export default function MyFamily() {
  return (
    <div className={cx('container')}>
      <Header isShowButton={false} isShowProfile>
        MY FAMILY
      </Header>
      <Calendar />
      <Upcoming />
      <Checklist />
      <TravelRecord />
    </div>
  );
}
