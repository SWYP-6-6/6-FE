'use client';

import React from 'react';
import classNames from 'classnames/bind';
// import Image from 'next/image';
import styles from './InvitePage.module.scss';

const cx = classNames.bind(styles);

export default function InvitePage() {
  const NICKNAME = '해바라기';

  return (
    <div className={cx('container')}>
      <div className={cx('introductionContainer')}>
        <div className={cx('introduction')}>
          안녕하세요 <span className={cx('bolder')}>{NICKNAME}</span>님!
          <br />
          지금 <span className={cx('bold')}>링크를 공유</span>하고,
          <br />
          가족들과의 여행을 공유해보아요!
        </div>
      </div>
      <div className={cx('image-container')}>
        {/* <Image
          src=""
          fill
          alt=""
        /> */}
        초대장 일러스트 만드는중,,
      </div>
      <div className={cx('button')}>버튼</div>
      {/* 버튼컴포넌트 추가되면 삭제예정 */}
    </div>
  );
}
