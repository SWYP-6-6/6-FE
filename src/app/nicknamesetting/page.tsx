import React from 'react';
import classNames from 'classnames/bind';
import NicknameForm from '../_components/nicknamesetting/NicknameForm';
import styles from './NicknamePage.module.scss';

const cx = classNames.bind(styles);

export default function NicknamePage() {
  return (
    <div className={cx('container')}>
      <div className={cx('introduction')}>
        <span className={cx('bold')}>트립 테리어의 </span> <br />
        기본 정보를 입력해주세요!
      </div>
      <NicknameForm />
    </div>
  );
}
