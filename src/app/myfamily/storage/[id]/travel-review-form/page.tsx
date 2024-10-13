'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Header from '@/components/common/Header';
import { useParams, useRouter } from 'next/navigation';
import CommonButton from '@/components/common/CommonButton';
import { postTravelReviewData } from '@/app/api/api';
import styles from './TravelReviewFormPage.module.scss';

const cx = classNames.bind(styles);

export default function TravelReviewFormPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState(false);

  const travelId = id as string;

  const validateButton = () => {
    setErrorMessage('');

    if (title.trim() === '') {
      setErrorMessage('제목을 입력하세요.');
      setIsButtonEnabled(false);
      return;
    }

    if (description.trim() === '') {
      setErrorMessage('상세 내용을 입력하세요.');
      setIsButtonEnabled(false);
      return;
    }

    setIsButtonEnabled(true);
  };

  useEffect(() => {
    if (touched) validateButton();
  }, [title, description, touched]);

  const handleInteraction = () => {
    setTouched(true);
    validateButton();
  };

  const handleCompleteClick = async () => {
    const reviewData = {
      title,
      content: description,
    };

    console.log(reviewData);

    try {
      const response = await postTravelReviewData(travelId, reviewData);

      if (response) {
        router.push(`/myfamily/storage/${travelId}/travel-review`);
        console.log(response);
      }
    } catch (error) {
      console.error('리뷰 데이터를 제출하는 중 오류가 발생했습니다:', error);
    }
  };
  return (
    <div className={cx('container')}>
      <Header isShowButton isShowProfile={false}>
        여행 기록 작성
      </Header>
      <div className={cx('title')}>
        제목
        <input
          className={cx('title-input')}
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleInteraction();
          }}
        />
      </div>
      <div className={cx('description')}>
        상세 내용
        <textarea
          className={cx('description-input')}
          placeholder="상세 내용을 입력하세요"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            handleInteraction();
          }}
        />
      </div>
      <div className={cx('button-container')}>
        <CommonButton
          isEnabled={isButtonEnabled}
          onClick={() => {
            handleCompleteClick();
            setTouched(false);
          }}
          text="작성 완료"
        />
      </div>
      {touched && errorMessage && (
        <p className={cx('error-message')}>{errorMessage}</p>
      )}
    </div>
  );
}
