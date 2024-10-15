'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Header from '@/components/common/Header';
import CommonButton from '@/components/common/CommonButton';
import AnniversaySwipeableListItem from '@/components/group/anniversary/AnniversaySwipeableListItem';
import { familyData, userData } from '@/app/api/api';
import { useRouter } from 'next/navigation';
import styles from './AnniversarySettingPage.module.scss';

const cx = classNames.bind(styles);

export default function AnniversarySettingPage() {
  const [anniversaries, setAnniversaries] = useState([]);
  const [showDelete, setShowDelete] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  const fetchAnniversaries = async () => {
    try {
      const user = await userData();
      const { familyId } = user;
      const family = await familyData(familyId);
      const { anniversary } = family;
      setAnniversaries(anniversary);
    } catch (err) {
      console.error('Error fetching anniversaries:', err);
    }
  };
  useEffect(() => {
    fetchAnniversaries();
  }, []);

  const handleAddClick = () => {
    router.push('/group/anniversary/setting');
  };

  return (
    <>
      <Header isShowButton isShowProfile={false}>
        기념일 설정
      </Header>
      <div className={cx('swipeableLists')}>
        <div className={cx('swipeableList')}>
          {Object.keys(anniversaries).length > 0 ? (
            Object.entries(anniversaries).map(([date, event]) => (
              <AnniversaySwipeableListItem
                key={date}
                item={{ id: date, name: event }}
                showDelete={showDelete[date]}
                setShowDelete={setShowDelete}
                fetchAnniversaries={fetchAnniversaries}
              />
            ))
          ) : (
            <p>가족 기념일이 없습니다.</p>
          )}
        </div>
        <CommonButton
          onClick={handleAddClick}
          isEnabled
          text="추가"
          type="button"
        />
      </div>
    </>
  );
}
