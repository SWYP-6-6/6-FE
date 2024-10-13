'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import classNames from 'classnames/bind';
import { travelAllData } from '@/app/api/api';
import styles from './Calendar.module.scss';
import './MainCalendar.scss';

const cx = classNames.bind(styles);

interface TravelData {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  checklist: {
    id: number;
    checkName: string;
    content: string;
    success: boolean;
  }[];
  familyId: number;
}

interface Event {
  title: string;
  start: string;
  end: string;
  color: string;
}

export default function Calendar() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const data: TravelData[] = await travelAllData();

        // travelData를 이벤트 형식으로 변환
        const formattedEvents: Event[] = data.map((travel: TravelData) => ({
          title: travel.name,
          start: travel.startDate,
          end: travel.endDate,
          color: '#5302FF', // 모든 이벤트에 같은 색상 적용
        }));

        setEvents(formattedEvents); // 이벤트를 설정
      } catch (err) {
        console.error('Error liking feed:', err);
      }
    };

    fetchTravelData();
  }, []);

  const renderDayCellContent = (renderProps: any) => {
    const dayNumber = renderProps.dayNumberText.replace('일', '');
    return <span>{dayNumber}</span>;
  };

  const handleCalendarClick = () => {
    router.push('/myfamily/calendar');
  };

  return (
    <button
      type="button"
      onClick={handleCalendarClick}
      className={cx('main-calander-container')}
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        events={events}
        headerToolbar={{ left: 'prev', center: 'title', right: 'next' }}
        titleFormat={{ year: 'numeric', month: 'numeric' }}
        dayCellContent={renderDayCellContent}
        height="auto"
      />
    </button>
  );
}
