'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

import classNames from 'classnames/bind';
import DatePicker from '@/components/common/DatePicker';
import CommonButton from '@/components/common/CommonButton';
import Header from '@/components/common/Header';
import { DatePickerValue, PostCreateTravel } from '@/types/types';
import { getTravels, patchTravels } from '@/app/api/api';
// checklist add scss 를 가져온다.
import styles from '@/app/myfamily/checklist/add/ChecklistAdd.module.scss';

const cx = classNames.bind(styles);

export default function ChecklistEdit() {
  const router = useRouter();
  const { id } = useParams();
  const listId = Number(id);

  // 시작 날짜 선택기 표시 여부를 관리하는 상태
  const [isStartPickerVisible, setIsStartPickerVisible] = useState(false);
  // 종료 날짜 선택기 표시 여부를 관리하는 상태
  const [isEndPickerVisible, setIsEndPickerVisible] = useState(false);
  // 완료 버튼 활성화 여부를 관리하는 상태
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  // 여행지 입력값을 관리하는 상태
  const [destination, setDestination] = useState('');
  // 오류 메시지 상태 관리
  const [errorMessage, setErrorMessage] = useState('');
  // 폼이 상호작용되었는지 여부를 관리하는 상태
  const [touched, setTouched] = useState(false);

  // 시작 날짜 선택기 참조
  const startPickerRef = useRef<HTMLDivElement>(null);
  // 종료 날짜 선택기 참조
  const endPickerRef = useRef<HTMLDivElement>(null);

  // 시작 날짜의 상태 관리
  const [startPickerValue, setStartPickerValue] = useState<DatePickerValue>({
    year: '',
    month: '',
    day: '',
  });

  // 종료 날짜의 상태 관리
  const [endPickerValue, setEndPickerValue] = useState<DatePickerValue>({
    year: '',
    month: '',
    day: '',
  });

  // 현진 추가
  // 여행 데이터를 불러오는 useEffect
  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const travelData = await getTravels(listId); // 여행 데이터 불러오기
        setDestination(travelData.name); // 여행지 이름 설정
        const startDate = new Date(travelData.startDate);
        const endDate = new Date(travelData.endDate);

        // 시작 날짜 설정
        setStartPickerValue({
          year: startDate.getFullYear().toString(),
          month: (startDate.getMonth() + 1).toString().padStart(2, '0'), // 월은 0부터 시작하므로 +1
          day: startDate.getDate().toString().padStart(2, '0'),
        });

        // 종료 날짜 설정
        setEndPickerValue({
          year: endDate.getFullYear().toString(),
          month: (endDate.getMonth() + 1).toString().padStart(2, '0'),
          day: endDate.getDate().toString().padStart(2, '0'),
        });
      } catch (error) {
        console.error('Error fetching travel data:', error);
      }
    };

    fetchTravelData(); // 컴포넌트가 마운트될 때 여행 데이터 불러오기
  }, [id]);

  // 완료 버튼 활성화 여부를 검증하는 함수
  const validateButton = () => {
    setErrorMessage(''); // 검증 전에 오류 메시지 초기화

    // 여행지 입력값이 비어 있는지 확인
    if (destination.trim() === '') {
      setErrorMessage('장소를 입력하세요.');
      setIsButtonEnabled(false);
      return;
    }

    // 시작 날짜와 종료 날짜가 설정되었는지 확인
    if (
      !startPickerValue.year ||
      !startPickerValue.month ||
      !startPickerValue.day ||
      !endPickerValue.year ||
      !endPickerValue.month ||
      !endPickerValue.day
    ) {
      setErrorMessage('출발 날짜와 도착 날짜를 모두 선택하세요.');
      setIsButtonEnabled(false);
      return;
    }

    // 날짜를 비교 가능한 형식(예: YYYY-MM-DD)으로 변환
    const startDate = new Date(
      `${startPickerValue.year}-${startPickerValue.month}-${startPickerValue.day}`,
    );
    const endDate = new Date(
      `${endPickerValue.year}-${endPickerValue.month}-${endPickerValue.day}`,
    );

    // 종료 날짜가 시작 날짜보다 빠른지 확인
    if (endDate < startDate) {
      setErrorMessage('도착 날짜는 출발 날짜와 같거나 이후여야 합니다.');
      setIsButtonEnabled(false);
      return;
    }

    // 모든 검증을 통과하면 버튼 활성화
    setIsButtonEnabled(true);
  };

  // 입력 값이 변경될 때마다 검증 실행
  useEffect(() => {
    if (touched) validateButton();
  }, [destination, startPickerValue, endPickerValue, touched]);

  // 폼과의 상호작용 시 상태 변경
  const handleInteraction = () => {
    setTouched(true);
    validateButton();
  };

  // 클릭 이벤트가 선택기 바깥에서 발생했는지 확인하고 선택기를 닫음
  const handleClickOutside = (event: MouseEvent) => {
    if (
      startPickerRef.current &&
      !startPickerRef.current.contains(event.target as Node)
    ) {
      setIsStartPickerVisible(false);
    }
    if (
      endPickerRef.current &&
      !endPickerRef.current.contains(event.target as Node)
    ) {
      setIsEndPickerVisible(false);
    }
  };

  // 컴포넌트가 마운트되거나 언마운트될 때 클릭 이벤트 리스너 추가/제거
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCompleteClick = async () => {
    // 날짜를 'YYYY-MM-DD' 형식으로 변환
    const formattedStartDate = `${startPickerValue.year}-${startPickerValue.month}-${startPickerValue.day}`;
    const formattedEndDate = `${endPickerValue.year}-${endPickerValue.month}-${endPickerValue.day}`;

    // 여행 데이터를 객체로 정의
    const travelEditData: PostCreateTravel = {
      name: destination,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    // API 요청 보내기
    try {
      await patchTravels(listId, travelEditData); // 정의한 객체를 전달
      router.push('/myfamily/checklist'); // 성공 시 페이지 이동
    } catch (error) {
      console.error('Error creating travel', error);
    }
  };

  return (
    <div
      className={cx('addSchedule')}
      role="button"
      tabIndex={0}
      aria-label="여행일정 추가"
    >
      <Header isShowButton isShowProfile={false}>
        수정하기
      </Header>
      <div className={cx('addSchedule-name')}>
        장소
        <input
          className={cx('addSchedule-name-input')}
          type="text"
          placeholder="장소를 입력하세요"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            handleInteraction();
          }}
        />
      </div>
      <div className={cx('addSchedule-date')}>
        날짜
        <div className={cx('addSchedule-date-inputs')}>
          <button
            type="button"
            className={cx('addSchedule-date-input', {
              invisible: isStartPickerVisible,
            })}
            onClick={() => {
              setIsStartPickerVisible(true);
              handleInteraction();
            }}
          >
            <span
              className={cx('text-content', {
                invisible: isStartPickerVisible,
              })}
            >
              {`${startPickerValue.year}-${startPickerValue.month}-${startPickerValue.day}` ||
                '시작 날짜'}
            </span>
            {isStartPickerVisible && (
              <div className={cx('picker-overlay')} ref={startPickerRef}>
                <DatePicker
                  pickerValue={startPickerValue}
                  setPickerValue={setStartPickerValue}
                />
              </div>
            )}
          </button>
          <span>-</span>
          <button
            type="button"
            className={cx('addSchedule-date-input', {
              invisible: isEndPickerVisible,
            })}
            onClick={() => {
              setIsEndPickerVisible(true);
              handleInteraction();
            }}
          >
            <span
              className={cx('text-content', {
                invisible: isEndPickerVisible,
              })}
            >
              {`${endPickerValue.year}-${endPickerValue.month}-${endPickerValue.day}` ||
                '종료 날짜'}
            </span>
            {isEndPickerVisible && (
              <div className={cx('picker-overlay')} ref={endPickerRef}>
                <DatePicker
                  pickerValue={endPickerValue}
                  setPickerValue={setEndPickerValue}
                />
              </div>
            )}
          </button>
        </div>
      </div>
      <div className={cx('button-container')}>
        <CommonButton
          isEnabled={isButtonEnabled}
          onClick={() => {
            handleCompleteClick();
            setTouched(false); // 제출 후 상호작용 상태 초기화
          }}
          text="입력 완료"
        />
      </div>
      {touched && errorMessage && (
        <p className={cx('error-message')}>{errorMessage}</p>
      )}
    </div>
  );
}
