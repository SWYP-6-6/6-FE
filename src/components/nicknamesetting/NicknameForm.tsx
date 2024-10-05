// NicknameForm.tsx

'use client';

import React, { useState, FormEvent } from 'react';
import classNames from 'classnames/bind';
import CommonButton from '@/components/common/CommonButton';
import styles from './NicknameForm.module.scss';

const cx = classNames.bind(styles);

interface NicknameFormProps {
  submitNickname: (formData: FormData) => Promise<void>;
}

export default function NicknameForm({ submitNickname }: NicknameFormProps) {
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.trim().length === 0) {
      setErrorMessage('닉네임을 작성해주세요!');
    } else if (input.length > 10) {
      setErrorMessage('닉네임은 10글자 이하로 작성해주세요!(공백 포함)');
    } else {
      setErrorMessage('');
    }

    setNickname(input);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('nickname', nickname);

    try {
      await submitNickname(formData);
    } catch (error) {
      setErrorMessage('닉네임 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form className={cx('inputs')} onSubmit={handleSubmit}>
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
        isEnabled={!errorMessage && nickname.length > 0}
        text="다음 단계로"
        type="submit" // 'submit' 타입으로 설정
      />
    </form>
  );
}
