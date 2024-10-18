// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { getAlarmList, getUserData } from '@/app/api/api';
// import classNames from 'classnames/bind';
// import { UserProfile } from '@/types/types';
// import { EventSourceComponent } from './EventSourceComponent'; // 분리한 EventSource 컴포넌트 가져오기
// import styles from './AlarmList.module.scss';

// const cx = classNames.bind(styles);

// export default function AlarmListComponent() {
//   const [userInfo, setUserInfo] = useState<UserProfile>(); // 유저 정보 상태
//   console.log(userInfo);
//   const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
//   const [event, setEvent] = useState<string | null>(null); // 실시간 알림 상태
//   const [eventSource, setEventSource] = useState<EventSource | null>(null); // EventSource 상태 추가

//   useEffect(() => {
//     // 기존 알람 목록 가져오는 함수
//     const loadAlarms = async () => {
//       try {
//         const alarmData = await getAlarmList(); // API 호출
//         setEvent(alarmData); // 가져온 데이터 상태에 저장
//       } catch (error) {
//         console.error('알람 목록을 불러오는 중 오류가 발생했습니다:', error);
//       } finally {
//         setLoading(false); // 로딩 상태 해제
//       }
//     };

//     loadAlarms(); // 컴포넌트가 마운트될 때 한 번 실행
//   }, []);

//   useEffect(() => {
//     // 기존 사용자 정보 가져오는 함수
//     const loadUserData = async () => {
//       try {
//         const userData = await getUserData(); // API 호출
//         console.log(userData);
//         setUserInfo(userData); // 가져온 데이터 상태에 저장
//       } catch (error) {
//         console.error('유저 정보를 불러오는 중 오류가 발생했습니다:', error);
//       } finally {
//         setLoading(false); // 로딩 상태 해제
//       }
//     };

//     loadUserData(); // 컴포넌트가 마운트될 때 한 번 실행
//   }, []);

//   if (loading) {
//     return <p>로딩 중...</p>; // 로딩 상태 표시
//   }

//   return (
//     <div>
//       {/* 실시간 알림을 처리하는 EventSourceComponent */}
//       <EventSourceComponent
//         setEvent={setEvent}
//         setEventSource={setEventSource}
//         eventSource={eventSource}
//       />

//       {/* 알람 목록 렌더링 */}
//       <ul className={cx('container')}>
//         {userInfo?.map((data) => (
//           <li key={data.id} className={cx('alarm')}>
//             <div className={cx('alarm-profile')}>
//               <Image
//                 src={data.profileImage}
//                 alt={`${data.userName}의 프로필 이미지`}
//                 width={40}
//                 height={40}
//                 className={cx('image')}
//               />
//             </div>
//             <div className={cx('alarm-text')}>
//               <p>
//                 <strong>{data.nickName}</strong>
//                 <span>{event && <p>{event}</p>}</span> {/* 실시간 알림 출력 */}
//               </p>
//               {/* <p className={cx('timestamp')}>{data.timestamp}</p> */}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
