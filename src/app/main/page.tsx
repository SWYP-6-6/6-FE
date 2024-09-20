import React from 'react';
import Header from '@/_components/common/Header';
import classNames from 'classnames/bind';
import Image from 'next/image';
import MainComment from '@/_components/common/MainComment';
import { FaPlus } from 'react-icons/fa6';
import Link from 'next/link';
import styles from './main.module.scss';

const cx = classNames.bind(styles);

// const getFetchList = async () => {
//   return fetch('http://13.209.88.22:8080/api/v1/feed/recommend/feedList')
//     .then((res) => res.json())
//     .catch((err) => 'error');
// };
export default async function Page() {
  // const data = await getFetchList();
  // console.log(data);

  return (
    <>
      <Header isShowButton={false} isShowProfile>
        트립테리어
      </Header>
      <div className={cx('card')}>
        {/* {data.map((post) => ( */}
        <div className={cx('post')}>
          <div className={cx('profile')}>
            <Image className={cx('avatar')} src="" alt="" />
            <div className={cx('profileInfo')}>
              <div className={cx('userName')}>해바라기</div>
              <div className={cx('location')}>제주도</div>
            </div>
            <div className={cx('date')}>2024.09.14</div>
          </div>
          <h2 className={cx('title')}>제주도가 좋아</h2>
          <MainComment />
          <div className={cx('imagePlaceholder')}>
            <Image src="" alt="" className={cx('image')} />
          </div>
          <div className={cx('actions')}>
            <Image src="/svgs/main-like.svg" alt="" width={15} height={15} />
            <Image src="/svgs/main-comment.svg" alt="" width={15} height={15} />
          </div>
        </div>
        {/* ))} */}
        <Link href="/mainform" className={cx('write-button')}>
          <FaPlus className={cx('plus-icon')} />
          글쓰기
        </Link>
      </div>
    </>
  );
}
