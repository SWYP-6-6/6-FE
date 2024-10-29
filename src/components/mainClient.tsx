'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa6';
import Link from 'next/link';
import {
  getFeedList,
  getGroupFeedList,
  likeFeed,
  removeLikeFromFeed,
} from '@/app/api/api';
import MainContent from '@/components/common/MainComment';
import { FeedItemProps } from '@/types/types';
import CommentLikeButton from '@/app/main/[id]/CommentLikeButton';
import styles from './main.module.scss';

const cx = classNames.bind(styles);

export default function MainClient({
  userNIckName,
  activeTab,
}: {
  userNIckName: string;
  activeTab: string;
}) {
  const [feedList, setFeedList] = useState<FeedItemProps[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const [animateLike, setAnimateLike] = useState<number | null>(null);

  useEffect(() => {
    const fetchFeedListData = async () => {
      try {
        let data;
        if (activeTab === 'public') {
          data = await getFeedList(0, 10); // 전체 공개 피드 리스트
        } else {
          data = await getGroupFeedList(0, 10); // 그룹 공개 피드 리스트
        }
        setFeedList(data.content);
      } catch (err) {
        console.error('Error fetching feedList data:', err);
      }
    };

    fetchFeedListData();
  }, [activeTab]); // activeTab이 변경될 때마다 호출

  const handleLike = async (feedId: number) => {
    try {
      await likeFeed(feedId);
      setFeedList((prevFeedList) =>
        prevFeedList.map((feed) =>
          feed.id === feedId
            ? { ...feed, isLiked: true, likeCnt: feed.likeCnt + 1 }
            : feed,
        ),
      );
      setAnimateLike(feedId);
      setTimeout(() => setAnimateLike(null), 500);
    } catch (error) {
      console.error('Error liking feed:', error);
    }
  };

  const handleRemoveLike = async (feedId: number) => {
    try {
      await removeLikeFromFeed(feedId);
      setFeedList((prevFeedList) =>
        prevFeedList.map((feed) =>
          feed.id === feedId
            ? { ...feed, isLiked: false, likeCnt: feed.likeCnt - 1 }
            : feed,
        ),
      );
      setAnimateLike(feedId);
      setTimeout(() => setAnimateLike(null), 500);
    } catch (error) {
      console.error('Error removing like from feed:', error);
    }
  };

  const fetchFeedData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      let data;
      if (activeTab === 'public') {
        data = await getFeedList(page, 10); // 전체 공개
      } else {
        data = await getGroupFeedList(page, 10); // 그룹 공개
      }

      setFeedList((prev) => {
        const newFeeds = data.content.filter(
          (newFeed: FeedItemProps) =>
            !prev.some((feed) => feed.id === newFeed.id),
        );
        return [...prev, ...newFeeds];
      });

      setHasMore(page + 1 < data.page.totalPages);
    } catch (error) {
      console.error('Error fetching feed data:', error);
    } finally {
      setLoading(false);
    }
  }, [page, activeTab]);

  const lastFeedElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore],
  );

  useEffect(() => {
    if (page > 0 && hasMore) {
      fetchFeedData();
    }
  }, [page]);

  return (
    <>
      <div className={cx('card')}>
        {feedList?.map((content, index) => (
          <Link href={`/main/${content.id}`} key={content.id}>
            <div
              className={cx('post')}
              ref={feedList.length === index + 1 ? lastFeedElementRef : null}
            >
              <div className={cx('profile')}>
                <Image
                  width={49}
                  height={49}
                  className={cx('avatar')}
                  src={content.profileImage}
                  alt={`${content.nickname}의 프로필 사진`}
                />
                <div className={cx('profileInfo')}>
                  <div className={cx('userName')}>{content.nickname}</div>
                  <div className={cx('location')}>{content.place}</div>
                </div>
                <div className={cx('date')}>{content.createDate}</div>
              </div>
              <div>
                <h2 className={cx('title')}>{content.title}</h2>
                <MainContent text={content.content} />
                {content.imageList.length > 0 && (
                  <div className={cx('imagePlaceholder')}>
                    {content.imageList.map((image, idx) => (
                      <Image
                        key={image}
                        width={150}
                        height={150}
                        src={`http://13.209.88.22:8080/api/v1/image/${image}`}
                        alt={`${content.title} - ${idx + 1}번째 이미지`}
                        className={cx('image')}
                      />
                    ))}
                  </div>
                )}
                <div className={cx('actions')}>
                  <Image
                    src={
                      userNIckName === content.nickname
                        ? '/svgs/heart-gray.svg'
                        : content.isLiked
                          ? '/svgs/liked-heart.svg'
                          : '/svgs/main-like.svg'
                    }
                    alt="좋아요 버튼"
                    width={15}
                    height={15}
                    className={cx('heart-icon', {
                      liked: animateLike === content.id,
                    })} // 애니메이션 클래스 적용
                    onClick={(e) => {
                      e.preventDefault();
                      if (userNIckName === content.nickname) {
                        return;
                      }
                      if (content.isLiked) {
                        handleRemoveLike(content.id);
                      } else {
                        handleLike(content.id);
                      }
                    }}
                  />
                  {content.likeCnt}
                  <Image
                    src="/svgs/main-comment.svg"
                    alt="댓글"
                    width={15}
                    height={15}
                  />
                  {content.commentCount}
                </div>
                {content.commentCount > 0 && (
                  <div className={cx('comments')}>
                    {content.commentList.slice(0, 2).map((comment: any) => (
                      <div className={cx('comment')} key={comment.id}>
                        <div className={cx('comment-profile')}>
                          <div className={cx('avatar')}>
                            <Image
                              src={comment.profileImage}
                              alt={`${comment.nickname}의 아바타`}
                              width={35}
                              height={35}
                              className={cx('img')}
                            />
                          </div>
                          <div className={cx('content')}>
                            <div className={cx('username')}>
                              {comment.nickname}
                            </div>
                            <div className={cx('text')}>{comment.comment}</div>
                          </div>
                        </div>
                        <CommentLikeButton
                          commentId={comment.id}
                          initialIsLiked={comment.isLiked}
                          initialLikeCnt={comment.likeCnt}
                          userNickName={userNIckName}
                          CommentNickName={comment.nickname}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
        <Link href="/mainform" className={cx('write-button')}>
          <FaPlus className={cx('plus-icon')} />
          글쓰기
        </Link>
      </div>

      {loading && (
        <div className={cx('spinner')}>
          <div className={cx('spinner-icon')} />
        </div>
      )}
    </>
  );
}
