import React from 'react';
import classNames from 'classnames/bind';
import styles from './CommonButton.module.scss';

const cx = classNames.bind(styles);

interface CommonButtonProps {
  isEnabled: boolean;
  onClick: () => void;
  text: string;
}

export default function CommonButton({
  isEnabled,
  onClick,
  text,
}: CommonButtonProps) {
  return (
    <button
      type="button"
      disabled={!isEnabled}
      onClick={onClick}
      className={cx('button', { enabled: isEnabled })}
    >
      {text}
    </button>
  );
}
