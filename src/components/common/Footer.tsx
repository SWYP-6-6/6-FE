import classNames from 'classnames/bind';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <div className={cx('footer-container')}>
      <div className={cx('emoticon-box')}>
        {/* 주소값 안나옴 */}
        <Link href="/">
          <Image
            src="/svgs/footer-group.svg"
            alt=""
            width={33}
            height={26}
            className={cx('image')}
          />
        </Link>
        <Link href="/main">
          <Image
            src="/svgs/footer-home.svg"
            alt=""
            width={27}
            height={24}
            className={cx('image')}
          />
        </Link>
        {/* 주소값 안나옴 */}
        <Link href="/">
          <Image
            src="/svgs/footer-individual.svg"
            alt=""
            width={21}
            height={24}
            className={cx('image')}
          />
        </Link>
      </div>
    </div>
  );
}
