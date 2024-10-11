'use client';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import DataPick from '@/components/anniversary/DataPick';
import validateTitle from '@/utils/validate';
import Cookies from 'js-cookie';
import styles from './SettingForm.module.scss';
import DateBetween from '../../utils/dateBetween';
import { familyAnniversary } from '../../app/api/api';

const cx = classNames.bind(styles);

export default function SettingForm() {
  // 나중에 ID값 넣기
  const id = '5';
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 에러 상태 추가
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [pickerDate, setPickerDate] = useState<{
    year: string;
    month: string;
    day: string;
  }>({ year: '', month: '', day: '' });
  const [isDateTouched, setIsDateTouched] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTitle = e.target.value;
    setTitle(inputTitle);
    const isValid = validateTitle(inputTitle);
    setIsButtonEnabled(isValid);
    if (!isValid) {
      setErrorMessage('제목을 입력하세요.');
    } else {
      setErrorMessage('');
    }
  };

  const handleDateChange = (selectedDate: {
    year: string;
    month: string;
    day: string;
  }) => {
    setPickerDate(selectedDate);

    if (!isDateTouched) {
      setIsDateTouched(true);
    } else if (!validateTitle(title)) {
      setErrorMessage('제목을 입력하세요.');
    }
  };

  const handleSubmitForm = () => {
    // 나중에 쿠키 바꾸기
    const myCookie = Cookies.get('JWT');
    const startDate = DateBetween(
      pickerDate.year,
      pickerDate.month,
      pickerDate.day,
    );
    familyAnniversary(title, startDate, id, myCookie);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') {
      setErrorMessage('제목을 입력하세요.');
    }
    if (pickerDate === null) {
      setErrorMessage('날짜를 선택하세요.');
    }
    handleSubmitForm();
  };

  return (
    <form onSubmit={handleSubmit} className={cx('form')}>
      <label htmlFor="title" className={cx('title-label')}>
        제목
        <input
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력하세요."
          onFocus={() => setErrorMessage('')}
        />
      </label>
      <p className={cx('date')}>날짜</p>
      <DataPick onChange={handleDateChange} />
      <button
        type="submit"
        disabled={!isButtonEnabled}
        className={cx('complete-button', { 'not-allow': !isButtonEnabled })}
      >
        완료
      </button>
      {errorMessage && <p className={cx('error-message')}>{errorMessage}</p>}
    </form>
  );
}
