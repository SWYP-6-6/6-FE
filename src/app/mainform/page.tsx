'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import { FaX } from 'react-icons/fa6';
import CommonButton from '@/components/common/CommonButton';
import Header from '@/components/common/Header';
import styles from './MainFormPage.module.scss';
import { creatFeed } from '../api/api';

const cx = classNames.bind(styles);
export default function MainFormPage() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [visibility, setVisibility] = useState<string>('true');
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [content, setContent] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    title: '',
    place: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const submitForm = async (formData: FormData) => {
    const titleData = formData.get('title') as string;
    const contentData = formData.get('content') as string;
    const placeData = formData.get('place') as string;
    const isPublicData = formData.get('isPublic') === 'true';
    const imagesData = formData.getAll('images') as File[];

    const requestBody = JSON.stringify({
      title: titleData,
      content: contentData,
      place: placeData,
      isPublic: isPublicData,
    });

    // FormData 생성
    const apiFormData = new FormData();
    apiFormData.append('request', requestBody);
    imagesData.forEach((image) => {
      apiFormData.append('imageFiles', image);
    });
    await creatFeed(apiFormData);
    router.push('/');
  };

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

      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
      setErrorMessages({
        ...errorMessages,
        email: '',
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
    return !errors.title && !errors.place && !errors.content;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      selectedImages.forEach((image) => formData.append('images', image));
      formData.append('title', title);
      formData.append('content', content);
      formData.append('place', place);
      formData.append('isPublic', visibility);

      await submitForm(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header isShowButton isShowProfile={false}>
        게시글작성
      </Header>
      <div className={cx('mainform')}>
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
                      src={URL.createObjectURL(image)}
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
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}
