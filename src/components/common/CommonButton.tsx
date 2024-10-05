// CommonButton.tsx

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

function CommonButton({ isEnabled, onClick, text, type }: CommonButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'} // Explicit ternary expression
      disabled={!isEnabled}
      onClick={onClick}
      className={cx('button', { enabled: isEnabled })}
    >
      {text}
    </button>
  );
}

// Set defaultProps for optional props
CommonButton.defaultProps = {
  type: 'button',
  onClick: () => {},
};

export default CommonButton;
