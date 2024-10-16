import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames/bind';
import { FaTrashAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './SwipeableListItem.module.scss';

const cx = classNames.bind(styles);

interface Item {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

interface SwipeableListItemProps {
  item: Item;
  showDelete: { [key: number]: boolean }; // 삭제 버튼 상태
  isSwiping: { [key: number]: boolean }; // 스와이프 상태
  setShowDelete: React.Dispatch<
    React.SetStateAction<{ [key: number]: boolean }>
  >;
  setIsSwiping: React.Dispatch<
    React.SetStateAction<{ [key: number]: boolean }>
  >;
  handleChecklistClick: (id: number) => void;
  handleDelete: (id: number) => void; // 삭제 처리 함수
}

export default function SwipeableListItem({
  item,
  showDelete,
  isSwiping,
  setShowDelete,
  setIsSwiping,
  handleChecklistClick,
  handleDelete,
}: SwipeableListItemProps) {
  console.log(item);

  const [isSwipeComplete, setIsSwipeComplete] = useState(false); // 스와이프 완료 상태

  const router = useRouter();

  // 스와이프 핸들러 설정
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setShowDelete((prev) => ({
        ...prev,
        [item.id]: true, // 왼쪽으로 스와이프 시 삭제 버튼 표시
      }));
      setIsSwipeComplete(true); // 스와이프 완료 상태
    },
    onSwipedRight: () => {
      setShowDelete((prev) => ({
        ...prev,
        [item.id]: false, // 오른쪽으로 스와이프 시 삭제 버튼 숨김
      }));
      setIsSwipeComplete(true); // 스와이프 완료 상태
    },
    onSwiping: () => {
      setIsSwiping((prev) => ({
        ...prev,
        [item.id]: true, // 스와이프 중 상태 설정
      }));
    },
    onSwiped: () => {
      setIsSwiping((prev) => ({
        ...prev,
        [item.id]: false, // 스와이프 완료 후 상태 초기화
      }));
      setTimeout(() => setIsSwipeComplete(false), 300); // 300ms 후에 스와이프 완료 상태 초기화
    },
    preventScrollOnSwipe: true, // 스와이프 중 스크롤 방지
    trackMouse: true, // 마우스 스와이프 감지
  });

  const handleTravelEdit = (id: number) => {
    router.push(`/myfamily/checklist/${id}/edit`);
  };

  return (
    <div
      className={cx('draggableContent', {
        showButton: showDelete[item.id],
      })}
      {...handlers}
      style={{
        transition: isSwiping[item.id] ? 'none' : 'transform 0.3s ease',
      }}
    >
      <button
        className={cx('draggableContent-button')}
        type="button"
        onClick={(e) => {
          e.preventDefault(); // 기본 클릭 동작 방지
          if (!isSwiping[item.id] && !isSwipeComplete) {
            // 스와이프 중이 아니고 스와이프가 완료되지 않은 경우에만 클릭 허용
            handleChecklistClick(item.id);
          }
        }}
      >
        <p className={cx('draggableContent-button-title')}>{item.name}</p>
        <p className={cx('draggableContent-button-duration')}>
          {item.startDate} - {item.endDate}
        </p>
      </button>
      <div className={cx('Buttons', { showButton: showDelete[item.id] })}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleTravelEdit(item.id);
          }}
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
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(item.id); // 삭제 처리
          }}
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
}
