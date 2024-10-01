'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Header from '@/components/common/Header';
import { useParams, useRouter } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';
import Image from 'next/image';
import styles from './TravelReviewPage.module.scss';

const cx = classNames.bind(styles);

// 타입 정의
interface Title {
  title: string;
  startDate: string;
  endDate: string;
}

interface Review {
  id: number;
  username: string;
  title: string;
  description: string;
}

export default function TravelReviewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState<Title>({
    title: '',
    startDate: '',
    endDate: '',
  });

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const mockTitle: Title = {
      title: '가족 여행',
      startDate: '2024-09-01',
      endDate: '2024-09-05',
    };

    const mockReviews: Review[] = [
      {
        id: 1,
        username: 'John Doe',
        title: '환상적인 여행',
        description:
          '가족과 함께 너무 즐거운 시간을 보냈습니다.가족과 함께 너무 즐거운 시간을 보냈습니다.가족과 함께 너무 즐거운 시간을 보냈습니다.가족과 함께 너무 즐거운 시간을 보냈습니다.가족과 함께 너무 즐거운 시간을 보냈습니다.가족과 함께 너무 즐거운 시간을 보냈습니다.가족과 함께 너무 즐거운 시간을 보냈습니다.가족과 함께 너무 즐거운 시간을 보냈습니다.가족과 함께 너무 즐거운 시간을 보냈습니다.',
      },
      {
        id: 2,
        username: 'Jane Smith',
        title: '기억에 남는 순간',
        description:
          '자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!자연이 아름답고 음식도 맛있었어요!',
      },
    ];

    setTitle(mockTitle);
    setReviews(mockReviews);
  }, []);

  const handleAddClick = () => {
    if (id) {
      const numericId = Number(id);
      router.push(`/myfamily/storage/${numericId}/travel-review-form`);
    }
  };

  return (
    <div className={cx('container')}>
      <Header isShowButton isShowProfile>
        MY FAMILY
      </Header>
      <div className={cx('review')}>
        <div className={cx('title')}>
          <div className={cx('title-title')}>{title.title}</div>
          <div className={cx('title-duration')}>
            {title.startDate} - {title.endDate}
          </div>
        </div>
        <div className={cx('reviews')}>
          {reviews.map((review) => (
            <div key={review.id} className={cx('review')}>
              <div className={cx('review-header')}>
                <div className={cx('profile')}>
                  <div className={cx('profile-picture')} />
                  {review.username}
                </div>
                <div className={cx('buttons')}>
                  <button type="button" className={cx('revise')}>
                    <Image
                      src="/svgs/revise_icon.svg"
                      alt="revise Icon"
                      width={17}
                      height={17}
                      priority
                      // onClick={handleAddClick}
                    />
                  </button>
                  <button type="button" className={cx('delete')}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
              <div className={cx('review-title')}>{review.title}</div>
              <div className={cx('review-description')}>
                {review.description}
              </div>
            </div>
          ))}
        </div>
        <div className={cx('add')}>
          <button
            type="button"
            onClick={handleAddClick}
            className={cx('add-button')}
          >
            <Image
              src="/svgs/add-icon-2.svg"
              alt="Add Icon"
              width={19}
              height={19}
              priority
            />
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
