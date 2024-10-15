import React from 'react';
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames/bind';
import { FaTrashAlt } from 'react-icons/fa';
// import { deleteTravel } from '@/app/api/api';
import styles from './AnniversaySwipeableListItem.module.scss';

const cx = classNames.bind(styles);

// 아이템 타입 정의
interface Item {
  id: string;
  name: string;
}

interface SwipeableListItemProps {
  item: Item;
  showDelete: boolean;
  setShowDelete: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  fetchAnniversaries: () => void;
}

export default function AnniversaySwipeableListItem({
  item,
  showDelete,
  setShowDelete,
  // fetchAnniversaries,
}: SwipeableListItemProps) {
  // useSwipeable hook 설정
  const handlers = useSwipeable({
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

  // const handleDelete = async () => {
  //   try {
  //     const response = await deleteTravel(item.id);

  //     if (response) {
  //       fetchAnniversaries();
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.error('리뷰를 삭제하는 중 오류가 발생했습니다:', error);
  //   }
  // };

  return (
    <div
      className={cx('draggableContent', {
        showButton: showDelete,
      })}
      {...handlers}
      style={{
        transition: 'transform 0.3s ease', // 항상 트랜지션 적용
        transform: showDelete ? 'translateX(-10.2rem)' : 'translateX(0)',
      }}
    >
      <button className={cx('draggableContent-button')} type="button">
        <p className={cx('draggableContent-button-title')}>{item.name}</p>
        <p className={cx('draggableContent-button-duration')}>{item.id}</p>
      </button>
      <div className={cx('draggableContent-noticeButton')} />
      <div
        className={cx('Buttons', {
          showButton: showDelete,
        })}
      >
        <button
          onClick={(e) => e.stopPropagation()}
          type="button"
          className={cx('button-cover')}
        >
          <button
            type="button"
            // onClick={handleDelete}
            className={cx('button', 'delete')}
          >
            <FaTrashAlt />
          </button>
        </button>
      </div>
    </div>
  );
}
