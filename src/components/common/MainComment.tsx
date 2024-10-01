'use client';

import classNames from 'classnames/bind';
import React, { useState, MouseEvent, useEffect } from 'react';
import styles from './MainComment.module.scss';

const cx = classNames.bind(styles);

interface MainContentProps {
  text: string;
}

export default function MainContent({ text }: MainContentProps) {
  // 더보기 버튼과 접기버튼 번갈아 나오도록
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // 더보기버튼을 보여줄지 여부
  const [isClamped, setIsClamped] = useState<boolean>(false);
  const charLimit = 80;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isClamped) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (text.length > charLimit) {
      setIsClamped(true);
    } else {
      setIsClamped(false);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx('buttonContainer')}
    >
      <div className={cx('ContentStyled', { 'toggle-open': isExpanded })}>
        <p>
          {isExpanded || text.length <= charLimit
            ? text
            : `${text.slice(0, charLimit)}...`}
        </p>
      </div>
      {isClamped && (
        <p className={cx('toggle')}>{isExpanded ? '접기' : '더보기'}</p>
      )}
    </button>
  );
}
