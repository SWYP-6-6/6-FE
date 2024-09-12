'use client';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import CommonButton from '../_components/common/CommonButton'; // 공용 버튼 컴포넌트 경로
import styles from './NicknamePage.module.scss';

const cx = classNames.bind(styles);

export default function NicknamePage() {
  const [nickname, setNickname] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const isValid =
      input.trim().length > 0 &&
      input.trim().length <= 10 &&
      !input.includes(' ');
    setNickname(input);
    setIsButtonEnabled(isValid);
  };

  const handleNextStep = () => {
    console.log('다음 단계로 이동합니다.');
  };

  return (
    <div className={cx('container')}>
      <div className={cx('introduction')}>
        <span className={cx('bold')}>트립 테리어의 </span> <br />
        기본 정보를 입력해주세요!
      </div>
      <label htmlFor="nickname" className={cx('input-group')}>
        <p className={cx('title')}>닉네임</p>
        <p className={cx('description')}>
          닉네임은 공백 없는 10글자 이하만 가능해요.
        </p>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={handleInputChange}
          placeholder="닉네임을 입력하세요"
          className={cx('input')}
        />
      </label>
      <CommonButton
        isEnabled={isButtonEnabled}
        onClick={handleNextStep}
        text="다음 단계로"
      />
    </div>
  );
}
