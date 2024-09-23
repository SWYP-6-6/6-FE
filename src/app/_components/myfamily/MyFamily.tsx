'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import classNames from 'classnames/bind';
import Header from '@/_components/common/Header';
import styles from './MyFamily.module.scss';
import './MainCalendar.scss';

const cx = classNames.bind(styles);

type EventType = {
  title: string;
  start: string;
  end: string;
  color: string;
};

const scheduleData = {
  title: '경주',
  dueDate: 'D-1',
};

const checklistData = [
  {
    id: 1,
    title: '경주',
    startDate: '2024-09-20', // 시작 날짜로 변경
  },
  {
    id: 2,
    title: '서울 여행',
    startDate: '2024-09-18',
  },
  {
    id: 3,
    title: '회의',
    startDate: '2024-09-25',
  },
];

const storedtData = [
  {
    id: 1,
    title: '경주',
    startDate: '2024-09-20',
    endDate: '2024-09-25',
  },
  {
    id: 2,
    title: '서울 여행',
    startDate: '2024-09-18',
    endDate: '2024-09-25',
  },
  {
    id: 3,
    title: '회의',
    startDate: '2024-09-25',
    endDate: '2024-09-25',
  },
];

const sortedData = checklistData.sort(
  (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
);
const sortedStoredData = storedtData.sort(
  (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
);
export default function MyFamily() {
  const [events, setEvents] = useState<EventType[]>([]);
  const router = useRouter();

  useEffect(() => {
    setEvents([
      {
        title: '공부하기',
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
        title: '빨래하기',
        start: '2024-09-28',
        end: '2024-09-30',
        color: '#5302FF',
      },
    ]);
  }, []);

  const handleDateClick = () => {
    router.push('/myfamily/calendar');
  };

  const renderDayCellContent = (renderProps: any) => {
    const dayNumber = renderProps.dayNumberText.replace('일', '');
    return <span>{dayNumber}</span>;
  };

  return (
    <div className={cx('container')}>
      <Header isShowButton isShowProfile>
        MY FAMILY
      </Header>
      <div className={cx('calander-container')}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          dateClick={handleDateClick}
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
      <div className={cx('upcoming')}>
        <div className={cx('upcoming-title')}>
          다가오는 일정
          <Image
            src="/svgs/triangle_icon.svg"
            alt="Triangle Icon"
            width={13}
            height={13}
            priority
          />
        </div>
        <div className={cx('upcoming-main')}>
          <p>{scheduleData.title}</p>
          <p>{scheduleData.dueDate}</p>
        </div>
      </div>
      <div className={cx('checklist')}>
        <div className={cx('checklist-title')}>
          체크리스트
          <Image
            src="/svgs/triangle_icon.svg"
            alt="Triangle Icon"
            width={13}
            height={13}
            priority
          />
        </div>
        <div className={cx('checklist-main')}>
          {sortedData.map((item) => (
            <div key={item.id} className={cx('checklist-main-section')}>
              <p>{item.title}</p>
              <p>{item.startDate}</p>
            </div>
          ))}
          <div className={cx('checklist-main-menu')}>
            <Image
              src="/svgs/dotmenu_icon.svg"
              alt="Dot Menu Icon"
              width={22}
              height={4}
              priority
            />
          </div>
        </div>
      </div>
      <div className={cx('travelRecord')}>
        <div className={cx('travelRecord-title')}>
          여행기록 저장소
          <Image
            src="/svgs/triangle_icon.svg"
            alt="Triangle Icon"
            width={13}
            height={13}
            priority
          />
        </div>
        <div className={cx('scroll-container')}>
          <div className={cx('travelRecord-main')}>
            {sortedStoredData.map((item) => (
              <div key={item.id} className={cx('travelRecord-main-section')}>
                <p className={cx('travelRecord-main-section-title')}>
                  {item.title}
                </p>
                <p>
                  {item.startDate}
                  <br />~{item.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
