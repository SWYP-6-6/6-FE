'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import classNames from 'classnames/bind';
import DatePicker from '@/_components/common/DatePicker';
import CommonButton from '@/_components/common/CommonButton';
import Header from '@/_components/common/Header';
import styles from './CalendarPage.module.scss';
import './Calendar.scss';

const cx = classNames.bind(styles);

type EventType = {
  title: string;
  start: string;
  end: string;
  color: string;
};

export default function CalendarPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isAddScheduleVisible, setIsAddScheduleVisible] = useState(false);
  const [isStartPickerVisible, setIsStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setIsEndPickerVisible] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [destination, setDestination] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState(false); // Track if the form has been touched

  const startPickerRef = useRef<HTMLDivElement>(null);
  const endPickerRef = useRef<HTMLDivElement>(null);

  // 시작 날짜와 종료 날짜의 상태 관리
  const [startPickerValue, setStartPickerValue] = useState({
    year: '',
    month: '',
    day: '',
  });

  const [endPickerValue, setEndPickerValue] = useState({
    year: '',
    month: '',
    day: '',
  });

  useEffect(() => {
    setEvents([
      {
        title: '공부',
        start: '2024-09-13',
        end: '2024-09-14',
        color: '#5302FF',
      },
      {
        title: '축구하기',
        start: '2024-09-15',
        end: '2024-09-19',
        color: '#5302FF',
      },
      {
        title: '빨래',
        start: '2024-09-28',
        end: '2024-09-30',
        color: '#5302FF',
      },
    ]);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      startPickerRef.current &&
      !startPickerRef.current.contains(event.target as Node)
    ) {
      setIsStartPickerVisible(false);
    }
    if (
      endPickerRef.current &&
      !endPickerRef.current.contains(event.target as Node)
    ) {
      setIsEndPickerVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to validate if the button should be enabled
  const validateButton = () => {
    setErrorMessage(''); // Reset error message before validation

    // Check if the destination is empty
    if (destination.trim() === '') {
      setErrorMessage('여행지를 입력하세요.');
      setIsButtonEnabled(false);
      return;
    }

    // Check if both dates are set
    if (
      !startPickerValue.year ||
      !startPickerValue.month ||
      !startPickerValue.day ||
      !endPickerValue.year ||
      !endPickerValue.month ||
      !endPickerValue.day
    ) {
      setErrorMessage('시작 날짜와 종료 날짜를 모두 선택하세요.');
      setIsButtonEnabled(false);
      return;
    }

    // Convert dates to comparable formats (e.g., YYYY-MM-DD)
    const startDate = new Date(
      `${startPickerValue.year}-${startPickerValue.month}-${startPickerValue.day}`,
    );
    const endDate = new Date(
      `${endPickerValue.year}-${endPickerValue.month}-${endPickerValue.day}`,
    );

    // Check if end date is before start date
    if (endDate < startDate) {
      setErrorMessage('종료 날짜는 시작 날짜와 같거나 이후여야 합니다.');
      setIsButtonEnabled(false);
      return;
    }

    // Enable the button if all validations pass
    setIsButtonEnabled(true);
  };

  // Use effects to validate whenever inputs change
  useEffect(() => {
    if (touched) validateButton();
  }, [destination, startPickerValue, endPickerValue, touched]);

  const renderDayCellContent = (renderProps: any) => {
    const dayNumber = renderProps.dayNumberText.replace('일', '');
    return <span>{dayNumber}</span>;
  };

  const handleAddClick = () => {
    setIsAddScheduleVisible(true);
  };

  const handleClose = () => {
    setIsAddScheduleVisible(false);
  };

  // Handle form interaction to set touched state
  const handleInteraction = () => {
    setTouched(true);
    validateButton();
  };

  return (
    <div className={cx('container')}>
      <Header isShowButton isShowProfile>
        MY FAMILY
      </Header>
      <div className={cx('calendar-container')}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          events={events}
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          titleFormat={{
            year: 'numeric',
            month: 'numeric',
          }}
          dayCellContent={renderDayCellContent}
          height="auto"
        />
      </div>
      <Image
        src="/svgs/add-icon.svg"
        alt="Add Icon"
        width={48}
        height={48}
        priority
        className={cx('button')}
        onClick={handleAddClick}
      />
      <div
        className={cx('overlay', { show: isAddScheduleVisible })}
        onClick={handleClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClose();
          }
        }}
      >
        <div
          className={cx('addSchedule', { show: isAddScheduleVisible })}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              e.currentTarget.click();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="여행일정 추가"
        >
          <p>여행일정 추가</p>
          <div className={cx('addSchedule-name')}>
            여행지 설정
            <input
              className={cx('addSchedule-name-input')}
              type="text"
              placeholder="여행지를 입력하세요"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                handleInteraction();
              }}
            />
          </div>
          <div className={cx('addSchedule-date')}>
            여행 일정
            <div className={cx('addSchedule-date-inputs')}>
              <button
                type="button"
                className={cx('addSchedule-date-input', {
                  invisible: isStartPickerVisible,
                })}
                onClick={() => {
                  setIsStartPickerVisible(true);
                  handleInteraction();
                }}
              >
                <span
                  className={cx('text-content', {
                    invisible: isStartPickerVisible,
                  })}
                >
                  {`${startPickerValue.year}-${startPickerValue.month}-${startPickerValue.day}` ||
                    '시작 날짜'}
                </span>
                {isStartPickerVisible && (
                  <div className={cx('picker-overlay')} ref={startPickerRef}>
                    <DatePicker
                      pickerValue={startPickerValue}
                      setPickerValue={setStartPickerValue}
                    />
                  </div>
                )}
              </button>
              <span>-</span>
              <button
                type="button"
                className={cx('addSchedule-date-input', {
                  invisible: isEndPickerVisible,
                })}
                onClick={() => {
                  setIsEndPickerVisible(true);
                  handleInteraction();
                }}
              >
                <span
                  className={cx('text-content', {
                    invisible: isEndPickerVisible,
                  })}
                >
                  {`${endPickerValue.year}-${endPickerValue.month}-${endPickerValue.day}` ||
                    '종료 날짜'}
                </span>
                {isEndPickerVisible && (
                  <div className={cx('picker-overlay')} ref={endPickerRef}>
                    <DatePicker
                      pickerValue={endPickerValue}
                      setPickerValue={setEndPickerValue}
                    />
                  </div>
                )}
              </button>
            </div>
          </div>
          <CommonButton
            isEnabled={isButtonEnabled}
            onClick={() => {
              console.log(
                '시작 날짜:',
                startPickerValue,
                '끝나는 날짜:',
                endPickerValue,
              );
              handleClose();
            }}
            text="완료"
          />
          {touched && errorMessage && (
            <p className={cx('error-message')}>{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
