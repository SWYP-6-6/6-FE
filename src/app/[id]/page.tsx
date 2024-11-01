'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { FeedItemProps, UserProfile } from '@/types/types';
import { getUserData, getFetchFeedDetail, deleteComment } from '@/app/api/api';
import { FaTrashAlt } from 'react-icons/fa';
import CommentSection from '@/components/[id]/CommentSection';
import LikeButton from '@/components/[id]/LikeButton';
import CommentLikeButton from '@/components/[id]/CommentLikeButton';
import styles from './mainId.module.scss';

const cx = classNames.bind(styles);

export default function FeedDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [userData, setUserData] = useState<UserProfile>();
  const [feedData, setFeedData] = useState<FeedItemProps>();

  const fetchFeedData = async () => {
    try {
      const data = await getFetchFeedDetail(id);

      setFeedData(data);
    } catch (err) {
      console.error('Error fetching feed data:', err);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();

        if (!data) {
          router.push('/signin');
          return;
        }

        if (data.nickName === null) {
          router.push('/nicknamesetting');
          return;
        }

        setUserData(data);
      } catch (err) {
        router.push('/signin');
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
    fetchFeedData();
  }, []);

  const handleDeletecomment = async (commentId: number) => {
    await deleteComment(commentId);
    fetchFeedData();
  };

  if (!userData || !feedData) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <Header user={userData} isShowButton isShowProfile>
        트립테리어
      </Header>
      <div className={cx('feed-container')}>
        <div className={cx('feed-post')}>
          <div className={cx('profile')}>
            <Image
              className={cx('big-avatar')}
              src={feedData.profileImage}
              alt="avatar"
              width={50}
              height={50}
            />
            <div className={cx('profile-info')}>
              <div className={cx('user-name')}>{feedData.nickname}</div>
              <div className={cx('location')}>{feedData.place}</div>
            </div>
            <div className={cx('date')}>{feedData.createDate}</div>
          </div>
          <h2 className={cx('title')}>{feedData.title}</h2>
          <p className={cx('text-content')}>{feedData.content}</p>
          <div className={cx('image-container')}>
            {feedData.imageList.map((image: string) => (
              <Image
                key={image}
                src={`http://13.209.88.22:8080/api/v1/image/${image}`}
                alt={`이미지 ${image}`}
                className={cx('image')}
                width={150}
                height={150}
              />
            ))}
          </div>
          <div className={cx('actions')}>
            <LikeButton
              feedId={feedData.id}
              initialIsLiked={feedData.isLiked}
              initialLikeCnt={feedData.likeCnt}
              userNickName={userData.nickName}
              FeedNickName={feedData.nickname}
              isThisPostMine={feedData.nickname === userData.nickName}
            />
            <Image
              src="/svgs/main-comment.svg"
              alt="comment"
              width={15}
              height={15}
            />
            {feedData.commentList?.length || 0}
          </div>
        </div>
        <div className={cx('comment-section')}>
          {feedData.commentList.map((comment: any) => (
            <div className={cx('comment')} key={comment.id}>
              <div className={cx('comment-container')}>
                <div className={cx('avatar')}>
                  <Image
                    src={comment.profileImage}
                    alt={`${comment.nickname}의 아바타`}
                    width={25}
                    height={25}
                    className={cx('img')}
                  />
                </div>
                <div className={cx('content')}>
                  <div className={cx('username-title-box')}>
                    <div className={cx('username')}>{comment.nickname}</div>
                    <div className={cx('date')}>{comment.createdAt}</div>
                  </div>
                  <div className={cx('text')}>{comment.comment}</div>
                </div>
              </div>
              <div className={cx('buttons')}>
                {comment.nickname === userData.nickName && (
                  <button
                    onClick={() => handleDeletecomment(comment.id)}
                    type="button"
                    className={cx('delete-button')}
                  >
                    <FaTrashAlt />
                  </button>
                )}
                <CommentLikeButton
                  commentId={comment.id}
                  initialIsLiked={comment.isLiked}
                  initialLikeCnt={comment.likeCnt}
                  userNickName={userData.nickName}
                  CommentNickName={comment.nickname}
                />
              </div>
            </div>
          ))}
          <div className={cx('comment')}>
            <div className={cx('avatar')}>
              <Image
                src={userData.profileImage}
                alt="avatar"
                width={35}
                height={35}
                className={cx('avatar')}
              />
            </div>
            <CommentSection feedId={id} fetchFeedData={fetchFeedData} />
          </div>
        </div>
      </div>
    </>
  );
}
