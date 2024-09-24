'use client';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import CommonButton from '@/_components/common/CommonButton';
import styles from './NicknameForm.module.scss';

const cx = classNames.bind(styles);

export default function NicknameForm() {
  const [nickname, setNickname] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.trim().length === 0) {
      setErrorMessage('닉네임을 작성해주세요!');
      setIsButtonEnabled(false);
    } else if (input.length > 10) {
      setErrorMessage('닉네임은 10글자 이하로 작성해주세요!(공백 포함)');
      setIsButtonEnabled(false);
    } else {
      setErrorMessage('');
      setIsButtonEnabled(true);
    }

    setNickname(input);
  };

  const handleNextStep = () => {
    console.log('다음 단계로 이동합니다.');
  };

  return (
    <>
      <label htmlFor="nickname" className={cx('input-group')}>
        <p className={cx('title')}>닉네임</p>
        <p className={cx('description')}>
          닉네임은 공백을 포함해도 10글자 이하만 가능해요.
        </p>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={handleInputChange}
          placeholder="닉네임을 입력하세요"
          className={cx('input')}
        />
        {errorMessage && <p className={cx('error-message')}>{errorMessage}</p>}
      </label>
      <CommonButton
        isEnabled={isButtonEnabled}
        onClick={handleNextStep}
        text="다음 단계로"
      />
    </>
  );
}
