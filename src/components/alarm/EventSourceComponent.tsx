// 'use client';

// import React, { useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

// interface EventSourceProps {
//   setEvent: React.Dispatch<React.SetStateAction<string | null>>; // 실시간 알림 상태 업데이트 함수
//   setEventSource: React.Dispatch<React.SetStateAction<EventSource | null>>; // EventSource 상태 업데이트 함수
//   eventSource: EventSource | null; // 외부에서 전달된 EventSource 객체
// }

// function EventSourceComponent({
//   setEvent,
//   setEventSource,
//   eventSource,
// }: EventSourceProps) {
//   const token = Cookies.get('JWT');
//   console.log(token);
//   const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN;

//   useEffect(() => {
//     if (!eventSource) {
//       const EventSource = EventSourcePolyfill || NativeEventSource;

//       try {
//         const es = new EventSource(`${BASE_URL}api/v1/notification/connect`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setEventSource(es); // EventSource 객체 저장

//         es.addEventListener('notification', (event: MessageEvent) => {
//           console.log('실시간 알림 데이터:', event.data);
//           setEvent(event.data); // 상위 컴포넌트에 이벤트 데이터 전달
//         });
//       } catch (error) {
//         console.error('실시간 알림을 설정하는 데 실패했습니다:', error);
//       }
//     }

//     // 컴포넌트 언마운트 시 EventSource 종료
//     return () => {
//       if (eventSource) {
//         eventSource.close();
//       }
//     };
//   }, [eventSource, setEvent, setEventSource]); // eventSource와 상태 변경을 주시

//   return null; // 이 컴포넌트는 UI가 없으므로 아무것도 렌더링하지 않음
// }

// export default EventSourceComponent;
