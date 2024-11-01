'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import ProfileToggles from '@/components/profile/ProfileToggles';
import classNames from 'classnames/bind';
import { changeNickname, getFetchPersonalFeedList } from '@/app/api/api';
import Image from 'next/image';
import MainContent from '@/components/common/MainComment';
import Link from 'next/link';
import styles from './ProfilePageClient.module.scss';

const cx = classNames.bind(styles);

interface ProfileClientProps {
  INITIAL_NICKNAME: string;
  initialFeedData: FeedItem[];
  fetchUserData: () => void;
}

interface FeedItem {
  id: number;
  title: string;
  content: string;
  place: string;
  nickname: string;
  profileImage: string;
  likeCnt: number;
  createDate: string;
  imageList: string[];
  commentList: any[];
  commentCount: number;
  isLiked: boolean;
}

export default function ProfilePageClient({
  INITIAL_NICKNAME,
  initialFeedData,
  fetchUserData,
}: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [nickname, setNickname] = useState(INITIAL_NICKNAME); // 실제 닉네임 상태
  const [newNickname, setNewNickname] = useState(INITIAL_NICKNAME); // 임시로 입력한 닉네임 상태
  const [isEditing, setIsEditing] = useState(false); // 닉네임 수정 모드
  const [showFirstModal, setShowFirstModal] = useState(false); // 첫 번째 모달 표시 여부
  const [showSecondModal, setShowSecondModal] = useState(false); // 두 번째 모달 표시 여부
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
  const [feedList, setFeedList] = useState<FeedItem[]>();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (initialFeedData) {
      setFeedList(initialFeedData);
    }
  }, []);

  const submitNickname = async (formData: FormData) => {
    const nicknameData = formData.get('nickname') as string;

    if (!nicknameData) {
      throw new Error('닉네임을 입력해주세요.');
    }

    try {
      await changeNickname({ nickname: nicknameData });
      fetchUserData();
    } catch (error) {
      setErrorMessage('닉네임 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };
  // 탭 변경 함수
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // 닉네임 입력 필드 클릭 시 편집 모드로 전환
  const handleNicknameClick = () => {
    setIsEditing(true);
  };

  // 유효성 검사 함수
  const validateNickname = () => {
    if (newNickname.trim() === '') {
      setErrorMessage('닉네임은 빈값일 수 없습니다.');
      return false;
    }
    if (newNickname.length > 10) {
      setErrorMessage('닉네임은 10글자 이하이어야 합니다.');
      return false;
    }
    if (newNickname === nickname) {
      setErrorMessage('새로운 닉네임이 기존 닉네임과 동일합니다.');
      return false;
    }
    return true;
  };

  // 닉네임 입력 후 엔터 키를 누르면 유효성 검사 수행 후 첫 번째 모달 표시
  const handleNicknameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 새로고침 방지
      if (validateNickname()) {
        setShowFirstModal(true); // 첫 번째 모달 표시
        setIsEditing(false); // 편집 모드 종료
        setErrorMessage(''); // 에러 메시지 초기화
      }
    }
  };

  // 첫 번째 모달에서 "확인"을 눌렀을 때 onSubmit 호출
  const handleConfirmFirstModal = async () => {
    const formData = new FormData();
    formData.set('nickname', newNickname);

    try {
      await submitNickname(formData);
      setNickname(newNickname); // 실제 닉네임 변경
      setShowFirstModal(false); // 첫 번째 모달 닫기
      setShowSecondModal(true); // 두 번째 모달 표시
    } catch (error) {
      setErrorMessage(
        `닉네임 업데이트에 실패했습니다. 다시 시도해주세요: ${error}`,
      );
    }
  };

  const fetchFeedData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const data = await getFetchPersonalFeedList(page, 10);
      setFeedList((prev) => {
        const newFeeds = data.content.filter(
          (newFeed: FeedItem) =>
            !(prev || []).some((feed) => feed.id === newFeed.id),
        );
        return [...(prev || []), ...newFeeds];
      });

      setHasMore(page + 1 < data.page.totalPages);
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  const lastFeedElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore],
  );

  useEffect(() => {
    if (page > 0 && hasMore) {
      fetchFeedData();
    }
  }, [page]);

  return (
    <>
      <div className={cx('tabs')}>
        <button
          type="button"
          className={cx({ active: activeTab === 'profile' }, 'tab')}
          onClick={() => handleTabChange('profile')}
        >
          프로필
        </button>
        <button
          type="button"
          className={cx({ active: activeTab === 'posts' }, 'tab')}
          onClick={() => handleTabChange('posts')}
        >
          게시글
        </button>
      </div>

      {activeTab === 'profile' && (
        <form className={cx('profile-content')}>
          <label htmlFor="nickname" className={cx('profile-content-nickname')}>
            <div>닉네임</div>
            <input
              id="nickname"
              className={cx('profile-content-nickname-input')}
              type="text"
              value={newNickname}
              readOnly={!isEditing}
              onClick={handleNicknameClick}
              onKeyDown={handleNicknameChange}
              onChange={(e) => setNewNickname(e.target.value)}
            />
            {errorMessage && (
              <p className={cx('error-message')}>{errorMessage}</p>
            )}
          </label>
          <div className={cx('profile-content-alarm')}>
            <div className={cx('profile-content-alarm-title')}>알림설정</div>
            <ProfileToggles />
          </div>

          {/* 첫 번째 모달 */}
          {showFirstModal && (
            <div className={cx('modal')}>
              <div className={cx('modal-content')}>
                <div className={cx('modal-content-description')}>
                  <div className={cx('modal-content-description-text')}>
                    <strong>닉네임</strong>을 변경하시겠습니까?
                  </div>
                  <p className={cx('modal-content-description-subtext')}>
                    변경된 닉네임은 언제든 수정이 가능합니다.
                  </p>
                </div>
                <div className={cx('modal-content-buttons')}>
                  <button
                    type="button"
                    className={cx('modal-content-buttons-cancel')}
                    onClick={() => setShowFirstModal(false)}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className={cx('modal-content-buttons-confirm')}
                    onClick={handleConfirmFirstModal} // 모달에서 확인 버튼 클릭 시 제출 처리
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      )}

      {activeTab === 'posts' && (
        <>
          <div className={cx('pernoanl-posts')}>
            {feedList!.map((content, index) => (
              <Link href={`/${content.id}`} key={content.id}>
                <div
                  className={cx('post')}
                  ref={
                    feedList!.length === index + 1 ? lastFeedElementRef : null
                  }
                >
                  <div className={cx('post-profile')}>
                    <div className={cx('post-profile-Info')}>
                      <Image
                        width={49}
                        height={49}
                        className={cx('post-profile-Info-avatar')}
                        src={content.profileImage}
                        alt={`${content.nickname}의 프로필 사진`}
                      />
                      <div className={cx('post-profile-Info-texts')}>
                        <div className={cx('userName')}>{content.nickname}</div>
                        <div className={cx('location')}>{content.place}</div>
                      </div>
                    </div>
                    <div className={cx('post-profile-date')}>
                      {content.createDate}
                    </div>
                  </div>
                  <div className={cx('post-content')}>
                    <div className={cx('post-content-title')}>
                      {content.title}
                    </div>
                    <div className={cx('post-content-content')}>
                      <MainContent text={content.content} />
                    </div>
                    {content.imageList.length > 0 && (
                      <div className={cx('post-content-images')}>
                        {content.imageList.length > 0 &&
                          content.imageList.map((image, idx) => (
                            <Image
                              key={image}
                              width={150}
                              height={150}
                              src={`http://13.209.88.22:8080/api/v1/image/${image}`}
                              alt={`${content.title} - ${idx + 1}번째 이미지`}
                              className={cx('feimage')}
                            />
                          ))}
                      </div>
                    )}
                    <div className={cx('post-content-buttons')}>
                      <Image
                        src="/svgs/heart-gray.svg"
                        alt="좋아요 버튼"
                        width={15}
                        height={15}
                        className={cx('heart-icon')} // 애니메이션 클래스 적용
                      />
                      {content.likeCnt}
                      <Image
                        src="/svgs/main-comment.svg"
                        alt="댓글 집계 버튼"
                        width={15}
                        height={15}
                      />
                      {content.commentCount}
                    </div>
                  </div>
                  {content.commentCount > 0 && (
                    <div className={cx('post-comments')}>
                      {content.commentList.slice(0, 2).map((comment: any) => (
                        <div className={cx('comment')} key={comment.id}>
                          <div className={cx('avatar')}>
                            <Image
                              src={comment.profileImage}
                              alt={`${comment.nickname}의 아바타`}
                              width={35}
                              height={35}
                              className={cx('img')}
                            />
                          </div>
                          <div className={cx('comment-content')}>
                            <div className={cx('username')}>
                              {comment.nickname}
                            </div>
                            <div className={cx('text')}>{comment.comment}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {loading && (
            <div className={cx('spinner')}>
              <div className={cx('spinner-icon')} />
            </div>
          )}
        </>
      )}

      {/* 두 번째 모달 */}
      {showSecondModal && (
        <div className={cx('modal')}>
          <div className={cx('second-modal-content')}>
            <p>변경이 완료되었습니다</p>
            <button
              className={cx('second-modal-content-button')}
              type="button"
              onClick={() => setShowSecondModal(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}
