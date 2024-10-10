import React from 'react';
import classNames from 'classnames/bind';
import Header from '@/components/common/Header';
import Calendar from '@/components/myfamily/Calendar';
import Checklist from '@/components/myfamily/Checklist';
import TravelRecord from '@/components/myfamily/TravelRecord';
import Upcoming from '@/components/myfamily/Upcoming';
import Footer from '@/components/common/Footer';
import styles from './MyFamily.module.scss';

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
      <Footer pathname="/myfamily" />
    </div>
  );
}
