'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Header from '@/components/common/Header';
import { familyData, getUserData } from '@/app/api/api';
import CommonButton from '@/components/common/CommonButton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Member } from '@/types/types';
import styles from './MemberPage.module.scss';

const cx = classNames.bind(styles);

export default function MemberPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const router = useRouter();

  // console.log(members);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const user = await getUserData();
        const { familyId } = user;
        const { userList } = await familyData(familyId);
        setMembers(userList);
      } catch (err) {
        console.error('Error fetching anniversaries:', err);
      }
    };
    fetchMembers();
  }, []);

  const onCompleteClick = () => {
    router.push('/group');
  };
  return (
    <div className={cx('container')}>
      <Header isShowButton isShowProfile={false}>
        가족 구성원 설정
      </Header>
      <div className={cx('members-container')}>
        <div className={cx('members-list')}>
          {members.length > 0 ? (
            members.map((member) => (
              <div key={member.id} className={cx('member-item')}>
                <div className={cx('image-container')}>
                  {member.profileImage && (
                    <Image
                      className={cx('image')}
                      src={member.profileImage}
                      alt={`${member.nickName}'s profileImage`}
                      width={37}
                      height={37}
                      priority
                    />
                  )}
                </div>
                <div className={cx('info-container')}>
                  <div className={cx('username')}>
                    {member.username} ({member.nickName})
                  </div>
                  <div className={cx('email')}>{member.email}</div>
                </div>
              </div>
            ))
          ) : (
            <p className={cx('no-members')}>가족 구성원이 없습니다.</p>
          )}
        </div>
        <CommonButton
          onClick={onCompleteClick}
          isEnabled
          text="완료"
          type="button"
        />
      </div>
    </div>
  );
}
