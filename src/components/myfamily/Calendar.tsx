'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';
import './MainCalendar.scss';

const cx = classNames.bind(styles);

export default function Calendar() {
  const router = useRouter();

  const [events, setEvents] = useState([]);

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

  const renderDayCellContent = (renderProps) => {
    const dayNumber = renderProps.dayNumberText.replace('일', '');
    return <span>{dayNumber}</span>;
  };

  const handleDateClick = () => {
    router.push('/myfamily/calendar');
  };

  return (
    <div className={cx('main-calander-container')}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        dateClick={handleDateClick}
        events={events}
        headerToolbar={{ left: 'prev', center: 'title', right: 'next' }}
        titleFormat={{ year: 'numeric', month: 'numeric' }}
        dayCellContent={renderDayCellContent}
        height="auto"
      />
    </div>
  );
}
