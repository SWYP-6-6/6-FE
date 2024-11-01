'use client';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { addComment } from '@/app/api/api';
import styles from './CommentSection.module.scss';

const cx = classNames.bind(styles);

interface CommentSectionProps {
  feedId: string;
  fetchFeedData: () => void;
}

export default function CommentSection({
  feedId,
  fetchFeedData,
}: CommentSectionProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addComment(comment, feedId);
    setComment(''); // 댓글 입력 후 초기화
    fetchFeedData();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form className={cx('add-comment-form')} onSubmit={handleSubmit}>
      <input
        className={cx('add-comment')}
        placeholder="댓글추가"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}
