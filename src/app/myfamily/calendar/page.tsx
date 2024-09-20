'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import classNames from 'classnames/bind';
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

  return (
    <div className={cx('container')}>
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

      {/* Add Schedule Modal */}
      <div
        className={cx('overlay', { show: isAddScheduleVisible })}
        onClick={handleClose}
        role="button" // 접근성 향상: 버튼 역할 지정
        tabIndex={0} // 키보드 포커스 가능하도록 설정
        onKeyDown={(e) => {
          // 키보드 이벤트 핸들러 추가
          if (e.key === 'Enter' || e.key === ' ') {
            handleClose(); // Enter 또는 스페이스바로도 닫기 가능
          }
        }}
      >
        <div
          className={cx('addSchedule', { show: isAddScheduleVisible })}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            // 키보드 이벤트 처리: Enter 또는 Space 키로 클릭 동작과 동일하게 설정
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              e.currentTarget.click();
            }
          }}
          role="button" // 대화형 역할을 명시하여 접근성 향상
          tabIndex={0} // 키보드 포커스를 받을 수 있도록 설정
          aria-label="여행일정 추가" // 접근성을 위한 설명 추가
        >
          <h2>여행일정 추가</h2>
          <div>
            여행지 설정
            <input type="text" placeholder="여행지를 입력하세요" />
          </div>
          <div>
            여행 일정
            <div>
              <input type="date" id="startDate" />
              <span>-</span>
              <input type="date" id="endDate" />
            </div>
          </div>
          <button
            type="button"
            className={cx('completeButton')}
            onClick={handleClose}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
