'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams, useRouter } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';
import Image from 'next/image';
import {
  deleteReview,
  editReview,
  familyData,
  travelData,
  travelReviewData,
  userData,
} from '@/app/api/api';
import GroupHeader from '@/components/common/GroupHeader';
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
  nickName: string;
  title: string;
  content: string;
  profileImage?: string;
  travelId: number;
}

export default function TravelReviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [groupImage, setGroupImage] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [title, setTitle] = useState<Title>({
    title: '',
    startDate: '',
    endDate: '',
  });

  const travelParamId = id as string;

  const fetchTravelData = async () => {
    try {
      const travel = await travelData(travelParamId); // travelData로 여행 데이터 가져옴
      const { name, startDate, endDate } = travel; // ednDate -> endDate 수정
      setTitle({ title: name, startDate, endDate }); // setTitle에 올바른 데이터 설정
    } catch (err) {
      console.error('Error fetching travel data:', err); // 에러 메시지 수정
    }
  };
  useEffect(() => {
    if (id) {
      fetchTravelData();
    }
  }, [id]);

  const fetchTravelReviewData = async () => {
    try {
      const reviewsData = await travelReviewData(travelParamId);
      setReviews(reviewsData);
    } catch (err) {
      console.error('Error fetching travel data:', err);
    }
  };
  useEffect(() => {
    if (id) {
      fetchTravelReviewData();
    }
  }, [id]);

  useEffect(() => {
    const fetchGroupImage = async () => {
      try {
        const user = await userData();
        const { familyId } = user;
        const family = await familyData(familyId);
        const { profileImage } = family;
        setGroupImage(profileImage);
      } catch (err) {
        console.error('Error fetching group image:', err);
      }
    };

    fetchGroupImage();
  }, []);

  const handleAddClick = () => {
    if (id) {
      const numericId = Number(id);
      router.push(`/myfamily/storage/${numericId}/travel-review-form`);
    }
  };

  const handleDelete = async (reviewId: number) => {
    try {
      const response = await deleteReview(travelParamId, reviewId);

      if (response) {
        fetchTravelReviewData();
        console.log(response);
      }
    } catch (error) {
      console.error('리뷰를 삭제하는 중 오류가 발생했습니다:', error);
    }
  };

  const handleEditClick = (review: Review) => {
    if (editingReviewId === review.id) {
      // 현재 수정 중인 리뷰를 다시 클릭하면 수정 모드 종료
      setEditingReviewId(null);
    } else {
      // 새로운 리뷰를 수정하려고 할 때만 수정 모드 활성화
      setEditingReviewId(review.id);
      setEditTitle(review.title);
      setEditContent(review.content);
    }
  };

  const handleEditSave = async (reviewId: number) => {
    try {
      const response = await editReview(travelParamId, reviewId, {
        title: editTitle,
        content: editContent,
      });
      if (response) {
        setEditingReviewId(null); // 수정 완료 후 편집 모드 해제
        fetchTravelReviewData(); // 수정 후 리뷰 목록을 다시 불러오기
      }
    } catch (error) {
      console.error('리뷰 수정 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className={cx('container')}>
      <GroupHeader groupImage={groupImage} isShowButton isShowProfile>
        MY FAMILY
      </GroupHeader>
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
                  <div className={cx('profile-picture')}>
                    {review.profileImage && (
                      <Image
                        src={review.profileImage}
                        alt="revise Icon"
                        width={28}
                        height={28}
                        priority
                        className={cx('profile-picture-img')}
                      />
                    )}
                  </div>
                  {review.nickName}
                </div>
                <div className={cx('buttons')}>
                  <button
                    type="button"
                    className={cx('revise')}
                    onClick={() => handleEditClick(review)} // 수정 버튼 클릭 시 수정 모드 토글
                  >
                    <Image
                      src="/svgs/revise_icon.svg"
                      alt="revise Icon"
                      width={17}
                      height={17}
                      priority
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    type="button"
                    className={cx('delete')}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
              {editingReviewId === review.id ? (
                <div className={cx('review-text')}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className={cx('review-text-title', 'editing-mode')}
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className={cx('review-text-description', 'editing-mode')}
                  />
                  <button
                    type="button"
                    onClick={() => handleEditSave(review.id)}
                  >
                    저장
                  </button>
                </div>
              ) : (
                <div className={cx('review-text')}>
                  <div className={cx('review-text-title')}>{review.title}</div>
                  <div className={cx('review-text-description')}>
                    {review.content}
                  </div>
                </div>
              )}
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
