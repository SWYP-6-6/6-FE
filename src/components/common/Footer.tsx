'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer({ pathname }: { pathname: string }) {
  // 버튼 클릭을 방지하는 함수
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    isActive: boolean,
  ) => {
    if (isActive) {
      event.preventDefault();
    }
  };

  return (
    <div className={cx('footer-container')}>
      <div className={cx('emoticon-box')}>
        <Link
          href="/myfamily"
          className={cx('emoticon-box-button', {
            active: pathname === '/myfamily',
          })}
          onClick={(e) => handleClick(e, pathname === '/myfamily')}
        >
          <Image
            src="/svgs/footer-group.svg"
            alt="MY FAMILY"
            width={33}
            height={26}
            className={cx('image')}
          />
          MY FAMILY
        </Link>

        <Link
          href="/"
          className={cx('emoticon-box-button', { active: pathname === '/' })}
          onClick={(e) => handleClick(e, pathname === '/')}
        >
          <Image
            src="/svgs/footer-home.svg"
            alt="HOME"
            width={27}
            height={24}
            className={cx('image')}
          />
          HOME
        </Link>

        <Link
          href="/profile"
          className={cx('emoticon-box-button', {
            active: pathname === '/profile',
          })}
          onClick={(e) => handleClick(e, pathname === '/profile')}
        >
          <Image
            src="/svgs/footer-individual.svg"
            alt="MY TRIP"
            width={21}
            height={24}
            className={cx('image')}
          />
          MY TRIP
        </Link>
      </div>
    </div>
  );
}
