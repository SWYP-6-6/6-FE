'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { FaX } from 'react-icons/fa6';
import CommonButton from '@/components/common/CommonButton';
import styles from './MainFormPage.module.scss';

const cx = classNames.bind(styles);

interface MainFormPageProps {
  submitForm: (formData: FormData) => Promise<void>;
}

export default function MainFormPage({ submitForm }: MainFormPageProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [visibility, setVisibility] = useState<string>('true'); // 'true'는 공개, 'false'는 비공개
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [content, setContent] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    title: '',
    place: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태 추가

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      if (selectedImages.length + filesArray.length > 10) {
        setErrorMessages({
          ...errorMessages,
          email: '이미지는 최대 10개까지 업로드할 수 있습니다.',
        });
        return;
      }

      setSelectedImages((prevImages) => [...prevImages, ...filesArray]); // setSelectedImages안에 filesArray 하나씩 누적되는 형태

      // 에러가 없으면 에러 메시지 초기화
      setErrorMessages({
        ...errorMessages,
        email: '', // 이미지가 정상적으로 추가되면 에러 메시지 제거
      });
    }
  };

  const handleImageRemove = (name: string, lastModified: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter(
        (image) => image.name !== name || image.lastModified !== lastModified,
      ),
    );
  };

  const validateInputs = () => {
    const errors = {
      email: '',
      title: '',
      place: '',
      content: '',
    };

    if (!title.trim()) {
      errors.title = '제목을 작성해 주세요.';
    }

    if (!place.trim()) {
      errors.place = '장소를 입력해 주세요.';
    }

    if (!content.trim()) {
      errors.content = '내용을 작성해 주세요.';
    }

    setErrorMessages(errors);

    // 에러가 없으면 true 반환
    return !errors.title && !errors.place && !errors.content;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사를 통과하지 못하면 중단
    if (!validateInputs()) {
      return;
    }

    // 폼이 제출 중이라면 중복 제출 방지
    if (isSubmitting) return;

    setIsSubmitting(true); // 제출 시작 시 상태를 true로 설정

    try {
      // FormData 생성
      const formData = new FormData();
      selectedImages.forEach((image) => formData.append('images', image)); // 이미지 추가
      formData.append('title', title);
      formData.append('content', content);
      formData.append('place', place);
      formData.append('isPublic', visibility); // 공개 여부 추가

      // 서버로 폼 데이터 전송
      await submitForm(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false); // 요청 완료 후 다시 false로 설정
    }
  };

  return (
    <div className={cx('mainform')}>
      <form onSubmit={handleSubmit} className={cx('form-container')}>
        {/* 이미지 업로드 및 미리보기 */}
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
        {errorMessages.email && (
          <p className={cx('error-message')}>{errorMessages.email}</p>
        )}

        {/* 제목 입력 */}
        <div className={cx('form-group')}>
          <label htmlFor="title">
            제목
            <input
              id="title"
              name="title"
              type="text"
              placeholder="제목을 작성해 주세요."
              className={cx('input-field')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errorMessages.title && (
              <p className={cx('error-message')}>{errorMessages.title}</p>
            )}
          </label>
        </div>

        {/* 장소 입력 */}
        <div className={cx('form-group')}>
          <label htmlFor="place">
            장소
            <input
              id="place"
              type="text"
              name="place"
              placeholder="장소를 입력해 주세요."
              className={cx('input-field')}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            {errorMessages.place && (
              <p className={cx('error-message')}>{errorMessages.place}</p>
            )}
          </label>
        </div>

        {/* 설명 입력 */}
        <div className={cx('form-group')}>
          <label htmlFor="content">
            자세한 설명
            <textarea
              id="content"
              name="content"
              placeholder="메인 피드에 올라갈 게시글 내용을 작성해 주세요."
              className={cx('textArea')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {errorMessages.content && (
              <p className={cx('error-message')}>{errorMessages.content}</p>
            )}
          </label>
        </div>

        {/* 공개 여부 선택 */}
        <div className={cx('share-container')}>
          <p className={cx('text')}>공개 방식</p>
          <div className={cx('visibility')}>
            <button
              type="button"
              className={cx('all', { active: visibility === 'true' })}
              onClick={() => setVisibility('true')}
            >
              전체 공개
            </button>
            <button
              type="button"
              className={cx('group', { active: visibility === 'false' })}
              onClick={() => setVisibility('false')}
            >
              비공개
            </button>
          </div>
        </div>

        <div className={cx('submitButton')}>
          <CommonButton
            isEnabled={!isSubmitting}
            text={isSubmitting ? '작성 중...' : '작성 완료'}
            type="submit" // 'submit' 타입으로 설정
          />
        </div>
      </form>
    </div>
  );
}
