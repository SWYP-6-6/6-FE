'use client';

import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames/bind';
import Header from '@/components/common/Header';
import { useRouter } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';
import { CheckDestinationListProps } from '@/types/types';
import { travelAllData } from '@/app/api/api';

import Image from 'next/image';
import styles from './checklist.module.scss';

const cx = classNames.bind(styles);

// 아이템 타입 정의
// interface Item {
//   id: number;
//   destination: string;
//   startDate: string;
//   endDate: string;
// }

export default function ChecklistPage({ token }: { token: string }) {
  const [travelData, setTravelData] = useState<CheckDestinationListProps[]>([]);

  const router = useRouter();

  // const [items] = useState<Item[]>([
  //   {
  //     id: 1,
  //     destination: 'Seoul',
  //     startDate: '2024.09.26',
  //     endDate: '2024.10.01',
  //   },
  //   {
  //     id: 2,
  //     destination: 'Busan',
  //     startDate: '2024.10.05',
  //     endDate: '2024.10.10',
  //   },
  //   {
  //     id: 3,
  //     destination: 'Jeju',
  //     startDate: '2024.10.15',
  //     endDate: '2024.10.20',
  //   },
  // ]);

  // 각 아이템의 삭제 버튼 표시 여부와 스와이프 상태 관리
  const [showDelete, setShowDelete] = useState<{ [key: number]: boolean }>({});
  const [isSwiping, setIsSwiping] = useState<{ [key: number]: boolean }>({});

  const Handlers = (id: number) => {
    return useSwipeable({
      onSwipedLeft: () => {
        setShowDelete((prev) => ({
          ...prev,
          [id]: true, // id가 일치하는 항목의 삭제 버튼을 표시
        }));
      },
      onSwipedRight: () => {
        setShowDelete((prev) => ({
          ...prev,
          [id]: false, // id가 일치하는 항목의 삭제 버튼을 숨기기
        }));
      },
      onSwiping: () => {
        setIsSwiping((prev) => ({
          ...prev,
          [id]: true, // id가 일치하는 항목에서 스와이프 중임을 표시
        }));
      },
      onSwiped: () => {
        setIsSwiping((prev) => ({
          ...prev,
          [id]: false, // id가 일치하는 항목에서 스와이프가 완료되었음을 표시
        }));
      },
      preventScrollOnSwipe: false, // 스와이프 중 스크롤을 막지 않음
      trackMouse: true, // 마우스 드래그로도 스와이프 가능
    });
  };

  const handleAddClick = () => {
    router.push('/myfamily/checklist/add');
  };

  const handleChecklistClick = (id: number) => {
    router.push(`/myfamily/checklist/${id}/detail`);
  };

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const data = await travelAllData();
        setTravelData(data);
      } catch (err) {
        console.error('Error liking feed:', err);
      }
    };

    fetchTravelData();
  }, [token]);

  const sortedData = travelData.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  return (
    <div className={cx('container')}>
      <Header isShowButton isShowProfile>
        체크리스트
      </Header>
      <div className={cx('title')}>여행기록 저장소</div>
      <div className={cx('swipeableLists')}>
        <div className={cx('swipeableList')}>
          {sortedData.map((item) => {
            return (
              <div
                key={item.id}
                className={cx('draggableContent', {
                  showButton: showDelete[item.id],
                })}
                {...Handlers(item.id)}
                style={{
                  transition: isSwiping[item.id]
                    ? 'none'
                    : 'transform 0.3s ease',
                }}
              >
                <button
                  className={cx('draggableContent-button')}
                  type="button"
                  onClick={() => handleChecklistClick(item.id)}
                >
                  {/* <p className={cx('draggableContent-button-title')}>
                    {item.destination}
                  </p> */}
                  <p className={cx('draggableContent-button-duration')}>
                    {item.startDate}-{item.endDate}
                  </p>
                </button>
                <div
                  className={cx('Buttons', {
                    showButton: showDelete[item.id],
                  })}
                >
                  <button
                    onClick={(e) => e.stopPropagation}
                    type="button"
                    className={cx('button-cover')}
                  >
                    <div className={cx('button', 'revise')}>
                      <Image
                        src="/svgs/revise_icon.svg"
                        alt="revise Icon"
                        width={17}
                        height={17}
                        priority
                      />
                    </div>
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation}
                    type="button"
                    className={cx('button-cover')}
                  >
                    <div className={cx('button', 'delete')}>
                      <FaTrashAlt />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={handleAddClick}
        className={cx('addButton')}
        type="button"
      >
        <Image
          src="/svgs/add-icon.svg"
          alt="Add Icon"
          width={48}
          height={48}
          priority
          className={cx('button')}
        />
      </button>
    </div>
  );
}
