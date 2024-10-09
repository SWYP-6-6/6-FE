'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { likeComment, removeLikeFromComment } from '@/app/api/api';
import styles from './CommentLikeButton.module.scss';

const cx = classNames.bind(styles);

interface LikeButtonProps {
  commentId: number;
  initialIsLiked: boolean;
  initialLikeCnt: number;
  token: string;
  userNickName: string;
  CommentNickName: string;
}

export default function CommentLikeButton({
  commentId,
  initialIsLiked,
  initialLikeCnt,
  token,
  userNickName,
  CommentNickName,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCnt, setLikeCnt] = useState(initialLikeCnt);
  const [animateLike, setAnimateLike] = useState<number | null>(null);

  const handleLike = async () => {
    try {
      await likeComment({ commentId, token });
      setIsLiked(true);
      setLikeCnt((prevCnt) => prevCnt + 1);
      setAnimateLike(commentId);
      setTimeout(() => setAnimateLike(null), 500);
    } catch (error) {
      console.error('Error liking feed:', error);
    }
  };

  const handleRemoveLike = async () => {
    try {
      await removeLikeFromComment({ commentId, token });
      setIsLiked(false);
      setLikeCnt((prevCnt) => prevCnt - 1);
      setAnimateLike(commentId);
      setTimeout(() => setAnimateLike(null), 500);
    } catch (error) {
      console.error('Error removing like from feed:', error);
    }
  };

  return (
    <div className={cx('actions')}>
      {likeCnt}
      <Image
        src={isLiked ? '/svgs/liked-heart.svg' : '/svgs/main-like.svg'}
        alt="좋아요"
        width={15}
        height={15}
        className={cx('heart-icon', { liked: animateLike === commentId })}
        onClick={() => {
          if (userNickName === CommentNickName) {
            return;
          }

          if (isLiked) {
            handleRemoveLike();
          } else {
            handleLike();
          }
        }}
      />
    </div>
  );
}
