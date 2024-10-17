import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteTravel } from '@/app/api/api';
import { useRouter } from 'next/navigation';
import styles from './StoragePage.module.scss';

const cx = classNames.bind(styles);

// 아이템 타입 정의
interface Item {
  id: number;
  destination: string;
  startDate: string;
  endDate: string;
}

interface SwipeableListItemProps {
  item: Item;
  showDelete: boolean;
  setShowDelete: React.Dispatch<
    React.SetStateAction<{ [key: number]: boolean }>
  >;
  handleStorageClick: (id: number) => void;
  fetchTravelData: () => void;
}

export default function SwipeableListItem({
  item,
  showDelete,
  setShowDelete,
  handleStorageClick,
  fetchTravelData,
}: SwipeableListItemProps) {
  const [isSwiping, setIsSwiping] = useState(false); // 스와이프 상태를 추적하는 상태 변수

  const router = useRouter();

  // useSwipeable hook 설정
  const handlers = useSwipeable({
    onSwiping: () => {
      setIsSwiping(true); // 스와이프 중임을 설정
    },
    onSwiped: () => {
      setTimeout(() => setIsSwiping(false), 200); // 스와이프가 끝난 후 짧은 시간 후 상태 해제
    },
    onSwipedLeft: () => {
      setShowDelete((prev) => ({
        ...prev,
        [item.id]: true,
      }));
    },
    onSwipedRight: () => {
      setShowDelete((prev) => ({
        ...prev,
        [item.id]: false,
      }));
    },
    preventScrollOnSwipe: false,
    trackMouse: true,
  });

  // 클릭 핸들러에서 스와이프 중이 아닐 때만 클릭 허용
  const handleClick = () => {
    if (!isSwiping) {
      handleStorageClick(item.id);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteTravel(item.id);

      if (response) {
        fetchTravelData();
      }
    } catch (error) {
      console.error('리뷰를 삭제하는 중 오류가 발생했습니다:', error);
    }
  };

  const handleTravelEdit = (id: number) => {
    router.push(`/myfamily/storage/${id}/edit`);
  };

  return (
    <div
      className={cx('draggableContent', {
        showButton: showDelete,
      })}
      {...handlers}
      style={{
        transition: 'transform 0.3s ease', // 항상 트랜지션 적용
        transform: showDelete ? 'translateX(-12.7rem)' : 'translateX(0)',
      }}
    >
      <button
        className={cx('draggableContent-button')}
        type="button"
        onClick={handleClick} // 스와이프 중이 아닐 때만 클릭 동작
      >
        <p className={cx('draggableContent-button-title')}>
          {item.destination}
        </p>
        <p className={cx('draggableContent-button-duration')}>
          {item.startDate}-{item.endDate}
        </p>
      </button>
      <div className={cx('draggableContent-noticeButton')} />
      <div
        className={cx('Buttons', {
          showButton: showDelete,
        })}
      >
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
          onClick={(e) => e.stopPropagation()}
          type="button"
          className={cx('button-cover')}
        >
          <button
            type="button"
            onClick={handleDelete}
            className={cx('button', 'delete')}
          >
            <FaTrashAlt />
          </button>
        </button>
      </div>
    </div>
  );
}
