'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa6';
import Link from 'next/link';
import { getFetchFeedList } from '@/app/api/api';
import MainContent from '@/components/common/MainComment';
import styles from './main.module.scss';

const cx = classNames.bind(styles);

interface FeedItem {
  id: number;
  title: string;
  content: string;
  place: string;
  nickname: string; // 변경된 필드
  profileImage: string;
  likeCnt: number;
  createDate: string;
  imageList: string[];
  commentList: any[];
  commentCount: number;
}

interface InfiniteScrollClientProps {
  initialFeedData: FeedItem[];
  token: string | undefined;
}

export default function InfiniteScrollClient({
  initialFeedData,
  token,
}: InfiniteScrollClientProps) {
  const [feedList, setFeedList] = useState<FeedItem[]>(initialFeedData);
  const [page, setPage] = useState(0); // page는 이제 0부터 시작
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchFeedData = useCallback(async () => {
    if (!token || loading || !hasMore) return; // 토큰이 없거나 로딩 중이거나 더 불러올 데이터가 없으면 요청하지 않음

    setLoading(true); // 데이터를 불러오는 중 스피너를 표시하기 위해 로딩 상태를 true로 설정

    try {
      // 요청 지연을 위해 1.5초 딜레이
      await new Promise((resolve) => {
        setTimeout(resolve, 1500); // return을 명시적으로 하지 않음
      });

      const data = await getFetchFeedList({ page, size: 10, token });
      setFeedList((prev) => [...prev, ...data.content]); // 기존 데이터에 새로 가져온 데이터를 추가

      // 다음 페이지가 있는지 여부를 콘솔에 출력
      // console.log(
      //   '다음 페이지가 있나요?',
      //   page + 1 < data.page.totalPages ? '예' : '아니오',
      // );

      setHasMore(page + 1 < data.page.totalPages); // totalPages와 현재 페이지를 비교해 마지막 페이지 여부 체크
    } catch (error) {
      // console.error('데이터를 불러오는 중 에러가 발생했습니다:', error);
    } finally {
      setLoading(false); // 로딩 완료 후 스피너를 제거하기 위해 false로 설정
    }
  }, [page, token, loading, hasMore]);

  const lastFeedElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect(); // 이전 관찰자 해제
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // 페이지 증가
        }
      });
      if (node) observer.current.observe(node); // 새로운 요소 관찰 시작
    },
    [hasMore],
  );

  useEffect(() => {
    if (page > 0 && hasMore) {
      fetchFeedData(); // 페이지가 1 이상일 때만 데이터 요청
    }
  }, [page, fetchFeedData, hasMore]);

  return (
    <>
      <div className={cx('card')}>
        {feedList.map((content, index) => (
          <div
            key={content.id}
            className={cx('post')}
            ref={feedList.length === index + 1 ? lastFeedElementRef : null} // 마지막 요소에 ref 추가
          >
            <div className={cx('profile')}>
              <Image
                width={49}
                height={49}
                className={cx('avatar')}
                src={content.profileImage}
                alt={content.nickname} // 변경된 필드
              />
              <div className={cx('profileInfo')}>
                <div className={cx('userName')}>{content.nickname}</div>{' '}
                {/* 변경된 필드 */}
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
                      alt={`${content.title} - 이미지 ${idx + 1}`}
                      className={cx('image')}
                    />
                  ))}
                </div>
              )}
              <div className={cx('actions')}>
                <Image
                  src="/svgs/main-like.svg"
                  alt="좋아요"
                  width={15}
                  height={15}
                />
                <Image
                  src="/svgs/main-comment.svg"
                  alt="댓글"
                  width={15}
                  height={15}
                />
              </div>
            </div>
          </div>
        ))}
        <Link href="/mainform" className={cx('write-button')}>
          <FaPlus className={cx('plus-icon')} />
          글쓰기
        </Link>
      </div>

      {/* 로딩 중일 때 스피너 표시 */}
      {loading && (
        <div className={cx('spinner')}>
          <div className={cx('spinner-icon')} /> {/* 스피너 아이콘 */}
        </div>
      )}
    </>
  );
}
