import React from 'react';
import Header from '@/components/common/Header';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import CommonButton from '@/components/common/CommonButton';
import styles from './JoinGroupCompletePage.module.scss';

const cx = classNames.bind(styles);

export default function JoinGroupCompletePage() {
  return (
    <div className={cx('group-complete')}>
      <Header isShowButton={false} isShowProfile={false}>
        MY FAMILY
      </Header>
      <div className={cx('group-complete-body')}>
        <div className={cx('group-complete-body-description')}>
          <div>
            가족그룹에 추가가
            <br /> 완료되었습니다!
          </div>
          <div className={cx('group-complete-body-description-sub')}>
            이제 가족과 함께 마이패밀리를 사용하실 수 있습니다!
          </div>
        </div>
        <Image
          src="/svgs/calendar-example.svg"
          alt="Calendar Example"
          width={317}
          height={235}
          priority
        />
      </div>
      <Link className={cx('group-complete-button')} href="/myfamily">
        <CommonButton isEnabled text="시작하기" />
      </Link>
    </div>
  );
}
