'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './signin.module.scss';

const cx = classNames.bind(styles);

const KAKAO_TOKEN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            <Image
              src="/svgs/login-center.svg"
              alt=""
              width={371}
              height={445}
              className={cx('image-container')}
            />
            <p className={cx('introduce-text')}>
              가족끼리 갔던 여행에서
              <br /> 찍은 사진을 공유해봐요!
            </p>
          </>
        );
      case 2:
        return (
          <>
            <Image
              src="/svgs/login-center.svg"
              alt=""
              width={371}
              height={445}
              className={cx('image-container')}
            />
            <p className={cx('introduce-text')}>
              우리가족 뿐만 아니라,
              <br /> 다른 가족들의 사진을 볼 수 있어요!
            </p>
          </>
        );
      case 3:
        return (
          <>
            <Image
              src="/svgs/login-center.svg"
              alt=""
              width={371}
              height={445}
              className={cx('image-container')}
            />
            <p className={cx('introduce-text')}>어쩌구 어쩌구 어쩌구 </p>
          </>
        );
      case 4:
        return (
          <>
            <Image
              src="/svgs/login-center4.svg"
              alt=""
              width={332}
              height={329}
            />
            <p className={cx('title')}>OUR TRIPTERRIOR</p>
            <p className={cx('introduce-text')}>
              여행에서 가족과 찍은 사진을
              <br /> 공유하고 <b>패밀몽</b>을 키워봐요!
            </p>
          </>
        );
      default:
        return <p>UI디자인 완성후 목업사진</p>;
    }
  };

  return (
    <div className={cx('container')}>
      {renderContent()}

      <div className={cx('pagination')}>
        {Array.from({ length: totalPages }, (_, index) => {
          let activeClass = '';

          if (currentPage === 4 && index === 3) {
            activeClass = cx('yellow-active');
          } else if (currentPage === index + 1) {
            activeClass = cx('purple-active');
          }
          return <div key={index} className={`${cx('dot')} ${activeClass}`} />;
        })}
      </div>

      {currentPage < totalPages ? (
        <button
          type="button"
          className={cx('button', 'next-button')}
          onClick={handleNextClick}
        >
          다음
        </button>
      ) : (
        <button
          type="button"
          className={cx('button', 'kakao-button')}
          onClick={() => {
            window.location.href = KAKAO_TOKEN_URL;
          }}
        >
          <Image
            src="/svgs/kakao-icon.svg"
            alt="카카오톡 로그인"
            className={cx('kakao-icon')}
            width={19}
            height={16}
          />
          카카오톡으로 로그인하기
        </button>
      )}
    </div>
  );
}
