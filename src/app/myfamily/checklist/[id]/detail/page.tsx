'use client';

import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  CompositionEvent,
  useEffect,
} from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import classNames from 'classnames/bind';
import Header from '@/components/common/Header';
import {
  travelAllData,
  postCheckListItem,
  getCheckListItems,
  // deleteCheckListItem,
} from '@/app/api/api'; // API 호출 함수들 가져오기
import { CheckDestinationListProps, CheckListItem } from '@/types/types';
import styles from './CheckListDetailPage.module.scss';

const cx = classNames.bind(styles);

export default function CheckListDetailPage() {
  const [text, setText] = useState<string>(''); // 입력 상태
  const [isComposing, setIsComposing] = useState(false); // 조합 중 여부
  const [travelData, setTravelData] = useState<CheckDestinationListProps[]>([]); // 여행지 데이터
  console.log(travelData);
  const [todoLists, setTodoLists] = useState<Record<string, CheckListItem[]>>(
    {},
  ); // 체크리스트 데이터
  const [selectedDestination, setSelectedDestination] = useState<string>(''); // 선택된 여행지

  // 체크리스트 항목을 서버에서 가져오는 함수 (GET 요청)
  const fetchCheckListItems = async (
    travelId: number,
    destinationName: string,
  ) => {
    try {
      const items = await getCheckListItems(travelId); // 서버에서 체크리스트 항목을 가져옴
      setTodoLists((prev) => ({
        ...prev, // 기존 상태 유지
        [destinationName]: items, // 선택된 여행지의 항목을 업데이트
      }));
    } catch (error) {
      console.error('Error fetching checklist items:', error);
    }
  };

  // 여행지 데이터를 불러오는 useEffect
  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const data = await travelAllData(); // 모든 여행지 데이터를 가져오는 API
        console.log(data);
        setTravelData(data);

        // 첫 번째 여행지를 기본으로 선택하고 체크리스트 항목 불러오기
        if (data.length > 0) {
          setSelectedDestination(data[0].name);
          await fetchCheckListItems(data[0].id, data[0].name); // 첫 번째 여행지의 체크리스트 항목 불러오기
        }
      } catch (err) {
        console.error('Error fetching travel data:', err);
      }
    };
    fetchTravelData();
  }, []);

  // 입력 값을 처리하는 함수
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value); // 조합 중 여부와 관계없이 항상 값 반영
  };

  // 새로운 체크리스트 항목을 추가하는 함수 (POST 요청)
  const handleListAddText = async () => {
    if (text.trim() === '') return;

    // 서버에 전송할 데이터 (checkName과 content만)
    const newItemForPost = {
      checkName: selectedDestination,
      content: text,
    };

    try {
      // 선택된 여행지에 맞는 객체를 찾는다.
      const selectedTravelData = travelData.find(
        (destination) => destination.name === selectedDestination,
      );

      if (selectedTravelData) {
        // POST 요청으로 서버에 데이터 전송 및 추가된 항목을 서버로부터 다시 불러옴
        await postCheckListItem(selectedTravelData.id, newItemForPost);
        await fetchCheckListItems(selectedTravelData.id, selectedDestination); // 추가된 항목 반영된 리스트를 다시 불러오기
      }
    } catch (error) {
      console.error('Error sending new checklist item:', error);
    }

    setText(''); // 입력 필드를 비움
  };

  // const handleDelete = async (id) => {

  // }

  // 완료되지 않은 할 일 목록과 완료된 할 일 목록 분리
  const uncheckedItems =
    todoLists[selectedDestination]?.filter((item) => !item.success) || [];
  const checkedItems =
    todoLists[selectedDestination]?.filter((item) => item.success) || [];

  return (
    <div className={cx('container')}>
      <Header isShowButton isShowProfile>
        체크리스트
      </Header>
      <div className={cx('tabs')}>
        {travelData.map((item) => (
          <button
            type="button"
            key={item.id}
            className={cx('tab', {
              active: selectedDestination === item.name,
            })}
            onClick={() => {
              setSelectedDestination(item.name); // 선택된 여행지를 업데이트
              fetchCheckListItems(item.id, item.name); // 선택된 여행지의 체크리스트 항목 가져오기
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className={cx('todolist')}>
        {uncheckedItems.map((item) => (
          <div className={cx('todolist-textlists')} key={item.id}>
            <div className={cx('checkTextBox')}>
              <input
                className={cx('checkInput')}
                type="checkbox"
                checked={item.success}
                onChange={() => {}} // 토글 삭제 관련 기능 유지
              />
              <div className={cx('textList')}>{item.content}</div>
            </div>
            <FaTrashAlt
              className={cx('trash-icon')}
              onClick={() => {}} // 토글 삭제 관련 기능 유지
            />
          </div>
        ))}
        {checkedItems.map((item) => (
          <div className={cx('todolist-textlists')} key={item.id}>
            <div className={cx('checkTextBox')}>
              <input
                className={cx('checkInput')}
                type="checkbox"
                checked={item.success}
                onChange={() => {}} // 토글 삭제 관련 기능 유지
              />
              <div className={cx('checkedTextList')}>{item.content}</div>
            </div>
            <FaTrashAlt
              className={cx('trash-icon')}
              onClick={() => {}} // 토글 삭제 관련 기능 유지
            />
          </div>
        ))}
        <div className={cx('inputBox')}>
          <input
            className={cx('addInput')}
            placeholder="할 일을 입력 후 Enter를 누르세요."
            value={text}
            onChange={handleText} // 입력값을 항상 업데이트
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              !isComposing && e.key === 'Enter' && handleListAddText()
            }
            onCompositionStart={() => setIsComposing(true)} // 한글 조합 시작
            onCompositionEnd={(e: CompositionEvent<HTMLInputElement>) => {
              setIsComposing(false); // 한글 조합 종료
              setText(e.currentTarget.value); // 한글 조합 종료 후 입력된 값 반영
            }}
          />
        </div>
      </div>
    </div>
  );
}
