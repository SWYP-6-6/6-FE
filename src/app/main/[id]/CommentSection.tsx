'use client';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './mainId.module.scss';

const cx = classNames.bind(styles);

interface CommentSectionProps {
  submitComment: (formData: FormData) => Promise<void>;
}

function CommentSection({ submitComment }: CommentSectionProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('comment', comment);

    await submitComment(formData);
    setComment(''); // 댓글 입력 후 초기화
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
        onKeyDown={handleKeyDown} // 엔터 키 입력 처리
      />
    </form>
  );
}

export default CommentSection;
