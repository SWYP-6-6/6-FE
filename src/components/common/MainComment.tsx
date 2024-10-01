'use client';

import classNames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './MainComment.module.scss';

const cx = classNames.bind(styles);
export default function MainComment() {
  const [isExpanded, setIsExpanded] = useState(false); // 상태 관리

  const handleToggle = () => {
    setIsExpanded(!isExpanded); // 버튼 클릭 시 상태 변경
  };

  return (
    // isExpanded가 true일 경우:
    // <div>는 두 개의 클래스를 가집니다: content expanded
    <>
      <div className={cx('content', { expanded: isExpanded })}>
        <p>
          하늘도 이쁘고 어쩌구 저쩌구 또 가고싶은 여행지다 어쩌구저쩌구
          어쩌구저ㅉ거하늘도 이쁘고 어쩌구 저쩌구 또 가고싶은 여행지다
          어쩌구저쩌구어쩌구저ㅉ거하늘도 이쁘고 어쩌구 저쩌구 또 가고싶은
          여행지다 어쩌구저쩌구어쩌구저ㅉ거하늘도 이쁘고 어쩌구 저쩌구 또
          가고싶은 여행지다 어쩌구저쩌구어쩌구저ㅉ거
        </p>
      </div>
      <button type="button" className={cx('more')} onClick={handleToggle}>
        {isExpanded ? '접기' : '더보기'}
      </button>
    </>
  );
}
