'use client';

import React, { useState, FormEvent } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import CommonButton from '@/components/common/CommonButton';
import styles from './NicknamePage.module.scss';
import { changeNickname } from '../api/api';

const cx = classNames.bind(styles);

export default function NicknamePage() {
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // 추가된 상태값
  const router = useRouter();

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

    // 이미 제출 중이면 요청을 중단
    if (isSubmitting) return;

    const data = { nickname };

    setIsSubmitting(true); // 제출 중 상태 설정

    try {
      await changeNickname(data);
      router.push('/');
    } catch (error) {
      setErrorMessage('닉네임 업데이트에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false); // 제출 완료 후 다시 활성화
    }
  };

  return (
    <div className={cx('container')}>
      <div className={cx('introduction')}>
        <span className={cx('bold')}>트립 테리어의 </span> <br />
        기본 정보를 입력해주세요!
      </div>
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
            disabled={isSubmitting} // 제출 중일 때 입력 필드 비활성화 (선택 사항)
          />
          {errorMessage && (
            <p className={cx('error-message')}>{errorMessage}</p>
          )}
        </label>
        <CommonButton
          isEnabled={!errorMessage && nickname.length > 0 && !isSubmitting} // 제출 중일 때 버튼 비활성화
          text={isSubmitting ? '처리 중...' : '다음 단계로'}
          type="submit" // 'submit' 타입으로 설정
        />
      </form>
    </div>
  );
}
