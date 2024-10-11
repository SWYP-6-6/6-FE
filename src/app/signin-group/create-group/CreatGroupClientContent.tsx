'use client';

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import CommonButton from '@/components/common/CommonButton';
import Header from '@/components/common/Header';
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './CreatGroupPage.module.scss';

const cx = classNames.bind(styles);

interface User {
  id: number;
  username: string;
  email: string;
  profileImage: string;
  nickName: string | null;
  familyId: number | null;
}

interface CreatGroupClientContentProps {
  user: User;
  submitFamilyName: (formData: FormData) => Promise<void>;
  submitGgoupProfilePictureForm: (formData: FormData) => Promise<void>; // 프로필 사진 업데이트 함수 prop 추가
}

export default function CreatGroupClientContent({
  user,
  submitFamilyName,
  submitGgoupProfilePictureForm, // 여기서 올바른 prop 이름을 사용
}: CreatGroupClientContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [groupname, setGroupname] = useState('');
  const [groupnameErrorMessage, setGroupnameErrorMessage] = useState('');
  const [isGroupnameButtonEnabled, setIsGroupnameButtonEnabled] =
    useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      setSelectedFile(file); // 파일 객체 저장
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('familyName', groupname); // groupname을 폼 데이터로 설정

    try {
      // 서버에 제출 성공 시
      await submitFamilyName(formData);

      // 오류가 없을 때만 다음 단계로 이동
      handleNextClick();
    } catch (error: any) {
      // 서버에서 반환된 오류 메시지를 확인하여 처리
      if (error.message) {
        setGroupnameErrorMessage(error.message);
      } else {
        setGroupnameErrorMessage(
          '가족 생성에 실패했습니다. 다시 시도해주세요.',
        );
      }
    }
  };
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // selectedFile 확인
    if (!selectedFile) {
      alert('프로필 사진을 선택해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('imageFiles', selectedFile);

      await submitGgoupProfilePictureForm(formData);
      handleNextClick();
    } catch (error) {
      console.error('프로필 사진 업데이트 실패:', error);
      alert('프로필 사진을 업데이트하는 데 실패했습니다. 다시 시도해주세요.');
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <form className={cx('group-name')} onSubmit={handleSubmit}>
            <Header user={user} isShowButton isShowProfile={false}>
              MY FAMILY
            </Header>
            <div className={cx('introduction')}>
              <span className={cx('bold')}>트립 테리어의 </span> <br />
              가족 프로필을 설정해주세요!
            </div>
            <label htmlFor="familyName" className={cx('input-group')}>
              <p className={cx('title')}>그룹이름</p>
              <p className={cx('description')}>
                그룹이름은 공백없는 10글자만 가능해요.
              </p>
              <input
                type="text"
                id="familyName"
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
              type="submit"
              text="다음 단계로"
            />
          </form>
        );
      case 2:
        return (
          <form
            className={cx('group-profilePicture')}
            onSubmit={handleProfileSubmit} // onSubmit 이벤트에 함수 연결
          >
            <Header user={user} isShowButton isShowProfile={false}>
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
                type="submit"
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
          </form>
        );
      case 3:
        return (
          <div className={cx('group-complete')}>
            <Header user={user} isShowButton={false} isShowProfile={false}>
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
            <Link className={cx('group-complete-button')} href="/myfamily">
              <CommonButton isEnabled text="시작하기" />
            </Link>
          </div>
        );
      default:
        return <p>UI디자인 완성후 목업사진</p>;
    }
  };

  return <div>{renderContent()}</div>;
}
