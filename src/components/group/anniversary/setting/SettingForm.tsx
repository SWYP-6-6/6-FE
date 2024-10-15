'use client';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import validateTitle from '@/utils/validate';
import DateBetween from '@/utils/dateBetween';
import { addAnniversary, userData } from '@/app/api/api';
import { useRouter } from 'next/navigation';
import styles from './SettingForm.module.scss';
import DataPick from './DataPick';

const cx = classNames.bind(styles);

export default function SettingForm() {
  const router = useRouter();
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

  const handleSubmitForm = async () => {
    const startDate = DateBetween(
      pickerDate.year,
      pickerDate.month,
      pickerDate.day,
    );
    try {
      const user = await userData();
      const { familyId } = user;
      await addAnniversary(title, startDate, familyId);
      router.push('/group/anniversary');
    } catch (err) {
      console.error('Error fetching group image:', err);
    }
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
