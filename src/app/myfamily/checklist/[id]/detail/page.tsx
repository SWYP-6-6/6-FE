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
  deleteCheckListItem,
  putCheckListItem,
} from '@/app/api/api'; // API 호출 함수들 가져오기
import { CheckDestinationListProps, CheckListItem } from '@/types/types';
import styles from './CheckListDetailPage.module.scss';

const cx = classNames.bind(styles);

export default function CheckListDetailPage() {
  const [text, setText] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false);
  const [travelData, setTravelData] = useState<CheckDestinationListProps[]>([]);
  const [todoLists, setTodoLists] = useState<Record<string, CheckListItem[]>>(
    {},
  ); // 체크리스트 데이터
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [selectedDestinationId, setSelectedDestinationId] = useState<
    number | null
  >(null); // 선택된 여행지 ID
  const [loading, setLoading] = useState<boolean>(true);

  // 체크리스트 항목을 서버에서 가져오는 함수 (GET 요청)
  const fetchCheckListItems = async (
    travelId: number,
    destinationName: string,
  ) => {
    try {
      const items = await getCheckListItems(travelId);
      setTodoLists((prev) => ({
        ...prev,
        [destinationName]: items,
      }));
    } catch (error) {
      console.error('Error fetching checklist items:', error);
    }
  };

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const data = await travelAllData(); // 모든 여행지 데이터를 가져오는 API
        setTravelData(data);

        if (data.length > 0) {
          setSelectedDestination(data[0].name); // 첫 번째 여행지를 기본으로 선택
          setSelectedDestinationId(data[0].id); // 첫 번째 여행지의 ID도 상태로 저장
          await fetchCheckListItems(data[0].id, data[0].name); // 첫 번째 여행지의 체크리스트 항목 불러오기
        }
      } catch (err) {
        console.error('Error fetching travel data:', err);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };
    fetchTravelData();
  }, []);

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleListAddText = async () => {
    if (text.trim() === '') return;

    const newItemForPost = {
      checkName: selectedDestination,
      content: text,
    };

    try {
      const selectedTravelData = travelData.find(
        (destination) => destination.name === selectedDestination,
      );

      if (selectedTravelData) {
        await postCheckListItem(selectedTravelData.id, newItemForPost);
        await fetchCheckListItems(selectedTravelData.id, selectedDestination); // 추가된 항목 반영된 리스트를 다시 불러오기
      }
    } catch (error) {
      console.error('Error sending new checklist item:', error);
    }

    setText(''); // 입력 필드를 비움
  };

  const handleToggleSuccess = async (
    checkId: number,
    currentSuccess: boolean,
  ) => {
    if (!selectedDestinationId) return;

    try {
      const newSuccess = !currentSuccess;
      await putCheckListItem(selectedDestinationId, checkId, newSuccess);
      await fetchCheckListItems(selectedDestinationId, selectedDestination);
    } catch (error) {
      console.error('Error updating checklist success status:', error);
    }
  };

  const handleDelete = async (checkId: number) => {
    if (!selectedDestinationId) return;

    try {
      await deleteCheckListItem(selectedDestinationId, checkId);
      await fetchCheckListItems(selectedDestinationId, selectedDestination);
    } catch (error) {
      console.error('Error deleting checklist item:', error);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 상태 시 출력할 UI
  }

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
            className={cx('tab', { active: selectedDestination === item.name })}
            onClick={() => {
              setSelectedDestination(item.name);
              setSelectedDestinationId(item.id);
              fetchCheckListItems(item.id, item.name);
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
                onChange={() => handleToggleSuccess(item.id, item.success)}
              />
              <div className={cx('textList')}>{item.content}</div>
            </div>
            <FaTrashAlt
              className={cx('trash-icon')}
              onClick={() => handleDelete(item.id)}
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
                onChange={() => handleToggleSuccess(item.id, item.success)}
              />
              <div className={cx('checkedTextList')}>{item.content}</div>
            </div>
            <FaTrashAlt
              className={cx('trash-icon')}
              onClick={() => handleDelete(item.id)}
            />
          </div>
        ))}
        <div className={cx('inputBox')}>
          <input
            className={cx('addInput')}
            placeholder="할 일을 입력 후 Enter를 누르세요."
            value={text}
            onChange={handleText}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              !isComposing && e.key === 'Enter' && handleListAddText()
            }
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={(e: CompositionEvent<HTMLInputElement>) => {
              setIsComposing(false);
              setText(e.currentTarget.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
