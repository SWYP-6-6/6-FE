'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import CommonButton from '@/components/common/CommonButton';
import Header from '@/components/common/Header';
import styles from './SignupGroupPage.module.scss';

const cx = classNames.bind(styles);

export default function SignupGroupPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [groupname, setGroupname] = useState('');
  const [groupnameErrorMessage, setGroupnameErrorMessage] = useState('');
  const [isGroupnameButtonEnabled, setIsGroupnameButtonEnabled] =
    useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const totalPages = 3;

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.trim().length === 0) {
      setGroupnameErrorMessage('닉네임을 작성해주세요!');
      setIsGroupnameButtonEnabled(false);
    } else if (input.length > 10) {
      setGroupnameErrorMessage(
        '닉네임은 10글자 이하로 작성해주세요!(공백 포함)',
      );
      setIsGroupnameButtonEnabled(false);
    } else {
      setGroupnameErrorMessage('');
      setIsGroupnameButtonEnabled(true);
    }

    setGroupname(input);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className={cx('group-name')}>
            <Header isShowButton={false} isShowProfile={false}>
              MY FAMILY
            </Header>
            <div className={cx('introduction')}>
              <span className={cx('bold')}>트립 테리어의 </span> <br />
              가족 프로필을 설정해주세요!
            </div>
            <label htmlFor="nickname" className={cx('input-group')}>
              <p className={cx('title')}>그룹이름</p>
              <p className={cx('description')}>
                그룹이름은 공백없는 10글자만 가능해요.
              </p>
              <input
                type="text"
                id="nickname"
                value={groupname}
                onChange={handleInputChange}
                placeholder="그룹 이름을 입력하세요"
                className={cx('input')}
              />
              {groupnameErrorMessage && (
                <p className={cx('error-message')}>{groupnameErrorMessage}</p>
              )}
            </label>
            <CommonButton
              isEnabled={isGroupnameButtonEnabled}
              onClick={handleNextClick}
              text="다음 단계로"
            />
          </div>
        );
      case 2:
        return (
          <div className={cx('group-profilePicture')}>
            <Header isShowButton isShowProfile={false}>
              MY FAMILY
            </Header>
            <div className={cx('title')}>가족 프로필사진 설정</div>
            <div className={cx('image-container')}>
              <div className={cx('image-container-example')}>
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="Selected Profile"
                    width={277}
                    height={277}
                    style={{ borderRadius: '50%' }}
                  />
                ) : null}
              </div>
              <div className={cx('image-container-camera')}>
                <label htmlFor="file-input">
                  <Image
                    src="/svgs/camera_icon.svg"
                    alt="Camera Icon"
                    width={87}
                    height={87}
                    priority
                  />
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
            <div className={cx('buttons')}>
              <CommonButton
                isEnabled={!!selectedImage}
                onClick={() => console.log('사진 저장')}
                text="입력완료"
              />
              <button
                onClick={handleNextClick}
                type="button"
                className={cx('buttons-skip')}
              >
                다음에 하기
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={cx('group-complete')}>
            <Header isShowButton={false} isShowProfile={false}>
              MY FAMILY
            </Header>
            <div className={cx('group-complete-body')}>
              <div className={cx('group-complete-body-description')}>
                <div>
                  가족 프로필 설정이 <br /> 완료되었습니다!
                </div>
                <div className={cx('group-complete-body-description-sub')}>
                  우리 가족들의 여행을 한 번에 기록해보세요!
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
            <CommonButton
              isEnabled
              onClick={() => console.log('사진 저장')}
              text="시작하기"
            />
          </div>
        );

      default:
        return <p>UI디자인 완성후 목업사진</p>;
    }
  };

  return <div className={cx('container')}>{renderContent()}</div>;
}
