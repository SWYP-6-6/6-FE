'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { FaX } from 'react-icons/fa6';
import Header from '@/_components/common/Header';
import styles from './MainFormPage.module.scss';

const cx = classNames.bind(styles);

export default function MainFormPage() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [visibility, setVisibility] = useState<string>('whole ');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      if (selectedImages.length + filesArray.length > 10) {
        alert('이미지는 최대 10개까지 업로드할 수 있습니다.');
        return;
      }

      setSelectedImages((prevImages) => [...prevImages, ...filesArray]); // setSelectedImages안에 filesArray 하나씩 누적되는 형태
    }
  };

  const handleImageRemove = (name: string, lastModified: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter(
        (image) => image.name !== name || image.lastModified !== lastModified,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { selectedImages, visibility });
  };

  return (
    <div className={cx('mainform')}>
      <Header isShowButton isShowProfile={false}>
        게시글작성
      </Header>
      <form onSubmit={handleSubmit} className={cx('form-container')}>
        <div className={cx('image-container')}>
          <div className={cx('image-form-section')}>
            <label htmlFor="fileInput" className={cx('imageLabel')}>
              사진
              <div className={cx('imagePlaceholder')}>
                <div>
                  <Image
                    src="/svgs/camera.svg"
                    alt=""
                    width={31}
                    height={22}
                    priority
                  />
                  <p>{`${selectedImages.length}/10`}</p>
                </div>
              </div>
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
              className={cx('fileInput')}
            />
          </div>
          <div className={cx('image-preview-section')}>
            <div className={cx('image-preview-position')}>
              {selectedImages.map((image) => (
                <div
                  key={`${image.name}-${image.lastModified}`}
                  className={cx('image-preview-remove')}
                >
                  <Image
                    src={URL.createObjectURL(image)} // 로컬에서 이미지 미리보기
                    alt={`uploaded image ${image.name}`}
                    width={85}
                    height={85}
                    className={cx('image')}
                  />
                  <button
                    type="button"
                    className={cx('remove-button')}
                    onClick={() =>
                      handleImageRemove(image.name, image.lastModified)
                    }
                  >
                    <FaX size={7} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={cx('form-group')}>
          <label htmlFor="title">
            제목
            <input
              id="title"
              name="title"
              type="text"
              placeholder="제목을 작성해 주세요."
              className={cx('input-field')}
            />
          </label>
        </div>

        <div className={cx('form-group')}>
          <label htmlFor="location">
            장소
            <input
              id="location"
              type="text"
              name="location"
              placeholder="장소를 입력해 주세요."
              className={cx('input-field')}
            />
          </label>
        </div>

        <div className={cx('form-group')}>
          <label htmlFor="description">
            자세한 설명
            <textarea
              id="description"
              name="description"
              placeholder="메인 피드에 올라갈 게시글 내용을 작성해 주세요."
              className={cx('textArea')}
            />
          </label>
        </div>
        <div className={cx('share-container')}>
          <p className={cx('text')}>공유방식</p>
          <div className={cx('visibility')}>
            <button
              type="button"
              className={cx('all', { active: visibility === 'whole' })}
              onClick={() => setVisibility('whole')}
            >
              전체 공개
            </button>
            <button
              type="button"
              className={cx('group', { active: visibility === 'group' })}
              onClick={() => setVisibility('group')}
            >
              그룹 공개
            </button>
          </div>
        </div>

        <button type="submit" className={cx('submitButton')}>
          작성완료
        </button>
      </form>
    </div>
  );
}
