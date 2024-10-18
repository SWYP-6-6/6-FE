'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { likeFeed, removeLikeFromFeed } from '@/app/api/api';
import styles from './LikeButton.module.scss';

const cx = classNames.bind(styles);

interface LikeButtonProps {
  feedId: number;
  initialIsLiked: boolean;
  initialLikeCnt: number;
  userNickName: string;
  FeedNickName: string;
}

export default function LikeButton({
  feedId,
  initialIsLiked,
  initialLikeCnt,
  userNickName,
  FeedNickName,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCnt, setLikeCnt] = useState(initialLikeCnt);
  const [animateLike, setAnimateLike] = useState<number | null>(null);

  const handleLike = async () => {
    try {
      await likeFeed(feedId);
      setIsLiked(true);
      setLikeCnt((prevCnt) => prevCnt + 1);
      setAnimateLike(feedId);
      setTimeout(() => setAnimateLike(null), 500);
    } catch (error) {
      console.error('Error liking feed:', error);
    }
  };

  const handleRemoveLike = async () => {
    try {
      await removeLikeFromFeed(feedId);
      setIsLiked(false);
      setLikeCnt((prevCnt) => prevCnt - 1);
      setAnimateLike(feedId);
      setTimeout(() => setAnimateLike(null), 500);
    } catch (error) {
      console.error('Error removing like from feed:', error);
    }
  };

  return (
    <div className={cx('actions')}>
      <Image
        src={isLiked ? '/svgs/liked-heart.svg' : '/svgs/main-like.svg'}
        alt="좋아요"
        width={15}
        height={15}
        className={cx('heart-icon', { liked: animateLike === feedId })}
        onClick={() => {
          if (userNickName === FeedNickName) {
            return;
          }

          if (isLiked) {
            handleRemoveLike();
          } else {
            handleLike();
          }
        }}
      />
      {likeCnt}
    </div>
  );
}
