'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa6';
import Link from 'next/link';
import { getFetchFeedList, likeFeed, removeLikeFromFeed } from '@/app/api/api';
import MainContent from '@/components/common/MainComment';
import styles from './main.module.scss';

const cx = classNames.bind(styles);

interface FeedItem {
  id: number;
  title: string;
  content: string;
  place: string;
  nickname: string;
  profileImage: string;
  likeCnt: number;
  createDate: string;
  imageList: string[];
  commentList: any[];
  commentCount: number;
  isLiked: boolean;
}

interface User {
  id: number;
  username: string;
  email: string;
  profileImage: string;
  nickName: string | null;
  familyId: number | null;
}

interface InfiniteScrollClientProps {
  initialFeedData: FeedItem[];
  token: string;
  user: User;
}

export default function MainClient({
  initialFeedData,
  token,
  user,
}: InfiniteScrollClientProps) {
  const [feedList, setFeedList] = useState<FeedItem[]>(initialFeedData);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const [animateLike, setAnimateLike] = useState<number | null>(null);

  const handleLike = async (feedId: number) => {
    try {
      await likeFeed({ feedId, token });
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
      await removeLikeFromFeed({ feedId, token });
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
    if (!token || loading || !hasMore) return;

    setLoading(true);

    try {
      const data = await getFetchFeedList({ page, size: 10, token });
      setFeedList((prev) => {
        const newFeeds = data.content.filter(
          (newFeed: FeedItem) => !prev.some((feed) => feed.id === newFeed.id),
        );
        return [...prev, ...newFeeds];
      });

      setHasMore(page + 1 < data.page.totalPages);
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
    }
  }, [page]);

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
        {feedList.map((content, index) => (
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
                      content.isLiked
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
                      if (user.nickName === content.nickname) {
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
