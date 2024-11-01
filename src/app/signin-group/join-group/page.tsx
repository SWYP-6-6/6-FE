'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import { useRouter } from 'next/navigation'; // Next.js 라우터를 사용하여 페이지 이동
import Image from 'next/image';
import { getAllFamily } from '@/app/api/api';
import classNames from 'classnames/bind';
import styles from './JoinGroupPage.module.scss';

const cx = classNames.bind(styles);

interface FamilyData {
  id: number;
  familyName: string;
  userList: User[]; // userList 배열은 User 객체의 배열로 가정
  profileImage: string | null;
  anniversary: { [date: string]: string }; // 날짜를 키로 가지고 문자열 값을 가지는 객체
}

interface User {
  id: number;
  username: string;
  email: string;
  profileImage: string | null;
  nickName: string | null;
  familyId: number | null;
}

export default function JoinGroupPage() {
  const [allFamilyData, setAllFamilyData] = useState<FamilyData[]>();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [groupNames, setGroupNames] = useState<FamilyData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 메시지 상태 추가
  const router = useRouter(); // Next.js useRouter를 사용하여 페이지 이동

  useEffect(() => {
    const fetchFamiliesData = async () => {
      try {
        const data = await getAllFamily();

        setAllFamilyData(data);
      } catch (err) {
        console.error('Error fetching allFamiles data:', err);
      }
    };

    fetchFamiliesData();
  }, []);

  useEffect(() => {
    if (allFamilyData && allFamilyData.length > 0) {
      setGroupNames(allFamilyData); // FamilyData로 groupNames 설정
    }
  }, [allFamilyData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim(); // 입력값에서 공백 제거
    setSearchTerm(query);
    setErrorMessage(''); // 입력 중 에러 메시지 초기화

    if (query.length > 0) {
      const filteredSuggestions = groupNames
        .filter((family) => family.familyName.includes(query)) // includes로 부분 문자열 검색
        .map((family) => family.familyName)
        .slice(0, 8);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    setErrorMessage(''); // 클릭 시 에러 메시지 초기화
  };

  const handleSearchClick = () => {
    if (searchTerm === '') {
      setErrorMessage('그룹 이름를 입력해 주세요.'); // 빈 값에 대한 에러 메시지 설정
    } else {
      const matchingFamily = groupNames.find(
        (family) => family.familyName === searchTerm,
      );
      if (matchingFamily) {
        setErrorMessage('');
        router.push(`/signin-group/join-group/${matchingFamily.id}`); // 해당 그룹의 id로 이동
      } else {
        setErrorMessage('해당 그룹 이름이 존재하지 않습니다.'); // 에러 메시지 설정
      }
    }
  };

  const highlightMatch = (suggestion: string) => {
    const index = suggestion.toLowerCase().indexOf(searchTerm.toLowerCase()); // 대소문자 구분 없이 검색
    if (index === -1) return suggestion;

    return (
      <div>
        {suggestion.substring(0, index)}
        <span className={cx('highlight')}>
          {suggestion.substring(index, index + searchTerm.length)}
        </span>
        {suggestion.substring(index + searchTerm.length)}
      </div>
    );
  };

  if (!allFamilyData) {
    return <div>로딩중...</div>;
  }
  return (
    <div>
      <Header isShowButton={false} isShowProfile={false}>
        MY FAMILY
      </Header>
      <div className={cx('title')}>
        가족그룹의 프로필을
        <br />
        검색으로 쉽고 빠르게 찾아보세요.
      </div>
      <div className={cx('input-container')}>
        <div className={cx('input-container-title')}>그룹이름</div>
        <div className={cx('searchContainer')}>
          <div className={cx('inputWrapper')}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="그룹 이름을 검색하세요"
              className={cx('searchInput')}
            />
            <button
              type="button"
              className={cx('searchButton')}
              onClick={handleSearchClick}
            >
              <Image
                src="/svgs/magnifying-glass-icon.svg"
                alt="Magnifying Glass"
                width={20}
                height={20}
                priority
              />
            </button>
          </div>
          {errorMessage && <p className={cx('errorMessage')}>{errorMessage}</p>}
          {suggestions.length > 0 && (
            <ul className={cx('suggestions')}>
              {suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={`key-${suggestion}`}
                  className={cx('suggestionItem')}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Image
                    src="/svgs/magnifying-glass-icon-gray.svg"
                    alt="Gray Magnifying Glass"
                    width={15}
                    height={15}
                    priority
                  />
                  {highlightMatch(suggestion)}
                </button>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
