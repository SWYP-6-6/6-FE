import React from 'react';
import Header from '@/components/common/Header';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { getFetchFeedDetail } from '@/app/api/api';
import styles from './mainId.module.scss';

const cx = classNames.bind(styles);

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data } = await getFetchFeedDetail({ id });
  console.log(data);

  return (
    <>
      <Header isShowButton isShowProfile>
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
          <p className={cx('text-content')}>
            하늘도 이쁘고 어쩌구 저쩌구 또 가고싶은 여행지다 어쩌구저쩌구
            어쩌구저ㅉ거하늘도 이쁘고 어쩌구 저쩌구 또 가고싶은 여행지다
            어쩌구저쩌구어쩌구저ㅉ거하늘도 이쁘고 어쩌구 저쩌구 또 가고싶은
            여행지다 어쩌구저쩌구어쩌구저ㅉ거하늘도 이쁘고 어쩌구 저쩌구 또
            가고싶은 여행지다 어쩌구저쩌구어쩌구저ㅉ거
          </p>
          <div className={cx('imagePlaceholder')}>
            <Image src="" alt="" className={cx('image')} />
          </div>
          <div className={cx('actions')}>
            <Image src="/svgs/main-like.svg" alt="" width={15} height={15} />
            <Image src="/svgs/main-comment.svg" alt="" width={15} height={15} />
          </div>
        </div>
        {/* 댓글 */}
        <div className={cx('comment-section')}>
          <div className={cx('comment')}>
            <div className={cx('avatar')}>
              <Image
                src=""
                alt=""
                width={25}
                height={25}
                className={cx('img')}
              />
            </div>
            <div className={cx('content')}>
              <div className={cx('username-title-box')}>
                <div className={cx('username')}>진달래</div>
                <div className={cx('date')}>2024.09.20</div>
              </div>
              <div className={cx('text')}>우와 가을 제주도도 어쩌구저쩌구</div>
            </div>
          </div>

          <div className={cx('comment')}>
            <div className={cx('avatar')}>
              <Image src="" alt="" width={25} height={25} />
            </div>
            <input className={cx('add-comment')} />
          </div>
        </div>
      </div>
    </>
  );
}
