'use client';

import React from 'react';
import classNames from 'classnames/bind';
import styles from './CommonButton.module.scss';

const cx = classNames.bind(styles);

interface CommonButtonProps {
  isEnabled: boolean;
  onClick?: () => void;
  text: string;
  type?: 'button' | 'submit';
}

function CommonButton({
  isEnabled,
  onClick = () => {}, // 기본값 설정
  text,
  type = 'button', // 기본값 설정
}: CommonButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={!isEnabled}
      onClick={onClick}
      className={cx('button', { enabled: isEnabled })}
    >
      {text}
    </button>
  );
}

export default CommonButton;
