'use client';

import React, { useState } from 'react';
import ProfileToggles from '@/components/profile/ProfileToggles';
import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';

const cx = classNames.bind(styles);

const INITIAL_NICKNAME = '해바라기';
const EMAIL = 'johndoe@kakao.com';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [nickname, setNickname] = useState(INITIAL_NICKNAME); // 실제 닉네임 상태
  const [newNickname, setNewNickname] = useState(INITIAL_NICKNAME); // 임시로 입력한 닉네임 상태
  const [isEditing, setIsEditing] = useState(false); // 닉네임 수정 모드
  const [showFirstModal, setShowFirstModal] = useState(false); // 첫 번째 모달 표시 여부
  const [showSecondModal, setShowSecondModal] = useState(false); // 두 번째 모달 표시 여부
  const [error, setError] = useState(''); // 에러 메시지 상태

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
      setError('닉네임은 빈값일 수 없습니다.');
      return false;
    }
    if (newNickname.length > 10) {
      setError('닉네임은 10글자 이하이어야 합니다.');
      return false;
    }
    if (newNickname === nickname) {
      setError('새로운 닉네임이 기존 닉네임과 동일합니다.');
      return false;
    }
    return true;
  };

  // 닉네임 입력 후 엔터 키를 누르면 유효성 검사 수행 후 첫 번째 모달 표시
  const handleNicknameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (validateNickname()) {
        setShowFirstModal(true); // 첫 번째 모달 표시
        setIsEditing(false); // 편집 모드 종료
        setError(''); // 에러 메시지 초기화
      }
    }
  };

  // 첫 번째 모달에서 "확인"을 눌렀을 때 두 번째 모달로 전환
  const handleConfirmFirstModal = () => {
    setNickname(newNickname); // 실제 닉네임 변경
    setShowFirstModal(false); // 첫 번째 모달 닫기
    setShowSecondModal(true); // 두 번째 모달 표시
  };

  return (
    <div className={cx('container')}>
      <div className={cx('title')}>마이트립</div>
      <div className={cx('profile')}>
        <div className={cx('image-container')} />
        <div className={cx('profile-info')}>
          <div>
            <span>{nickname}</span>
          </div>
          <div className={cx('profile-info-email')}>
            <span>{EMAIL}</span>
          </div>
        </div>
      </div>
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
        <div className={cx('profile-content')}>
          <div className={cx('profile-content-nickname')}>
            <div>닉네임</div>
            <input
              className={cx('profile-content-nickname-input')}
              type="text"
              value={newNickname}
              readOnly={!isEditing}
              onClick={handleNicknameClick}
              onKeyDown={handleNicknameChange}
              onChange={(e) => setNewNickname(e.target.value)}
            />
            {error && <p className={cx('error-message')}>{error}</p>}
          </div>
          <div className={cx('profile-content-alarm')}>
            <div className={cx('profile-content-alarm-title')}>알림설정</div>
            <ProfileToggles />
          </div>
        </div>
      )}
      {activeTab === 'posts' && (
        <div className={cx('posts-content')}>
          <h3>게시글</h3>
          <div className={cx('post')}>
            <p>2024.09.14</p>
            <h4>제주도가조와</h4>
            <p>
              하늘도 이쁘고 어쩌구 저쩌구 <br />또 가고싶은 여행지다
              어쩌구저쩌구...
            </p>
          </div>
          <div className={cx('post')}>
            <p>2024.09.14</p>
            <h4>제주도가조와</h4>
            <p>
              하늘도 이쁘고 어쩌구 저쩌구 <br />또 가고싶은 여행지다
              어쩌구저쩌구...
            </p>
          </div>
        </div>
      )}

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
                onClick={handleConfirmFirstModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
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
    </div>
  );
}
