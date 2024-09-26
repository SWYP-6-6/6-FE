import React from 'react';
import Header from '@/app/_components/common/Header';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa6';
import Link from 'next/link';
import { getFetchFeedList } from '@/app/api/api';
import MainContent from '@/_components/common/MainComment';
import styles from './main.module.scss';

const cx = classNames.bind(styles);

interface FeedItem {
  createdDateTime: string;
  lastModifiedDate: string;
  id: number;
  title: string;
  content: string;
  place: string;
  userId: number;
  likeList: any[]; // 타입을 더 구체적으로 정의할 수 있다면 변경해주세요
  imageList: string[];
  commentList: any[]; // 타입을 더 구체적으로 정의할 수 있다면 변경해주세요
  likeCnt: number;
}

export default async function Page() {
  const feedList = await getFetchFeedList({
    userId: 2,
    page: 0,
    size: 10,
  });
  console.log(feedList);

  return (
    <>
      <Header isShowButton={false} isShowProfile>
        트립테리어
      </Header>
      <div className={cx('card')}>
        {feedList?.map((content: FeedItem) => (
          <div key={content.id} className={cx('post')}>
            <div className={cx('profile')}>
              <Image className={cx('avatar')} src="" alt="" />
              <div className={cx('profileInfo')}>
                <div className={cx('userName')}>{content.userId}</div>
                <div className={cx('location')}>{content.place}</div>
              </div>
              <div className={cx('date')}>{content.createdDateTime}</div>
            </div>
            <Link href={`/main/${content.id}`}>
              <h2 className={cx('title')}>{content.title}</h2>
              <MainContent text={content.content} />
              <div className={cx('imagePlaceholder')}>
                <Image src="" alt="" className={cx('image')} />
              </div>
              <div className={cx('actions')}>
                <Image
                  src="/svgs/main-like.svg"
                  alt=""
                  width={15}
                  height={15}
                />
                <Image
                  src="/svgs/main-comment.svg"
                  alt=""
                  width={15}
                  height={15}
                />
              </div>
            </Link>
          </div>
        ))}
        <Link href="/mainform" className={cx('write-button')}>
          <FaPlus className={cx('plus-icon')} />
          글쓰기
        </Link>
      </div>
    </>
  );
}
