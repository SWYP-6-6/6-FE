'use client';

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import classNames from 'classnames/bind';
import Header from '@/_components/common/Header';
import styles from './CheckListPage.module.scss';

const cx = classNames.bind(styles);

const destinations: string[] = ['경주', '여수', '부산', '강릉', '제주', '양평'];

interface TodoItem {
  id: number;
  text: string;
  check: boolean;
}

export default function CheckListPage() {
  const [selectedDestination, setSelectedDestination] = useState<string>(
    destinations[0],
  );
  const [text, setText] = useState<string>('');
  const [todoLists, setTodoLists] = useState<Record<string, TodoItem[]>>(
    destinations.reduce(
      (acc, destination) => {
        acc[destination] = [];
        return acc;
      },
      {} as Record<string, TodoItem[]>,
    ),
  );

  const handleText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleListAddText = () => {
    if (text.trim() === '') return;
    const newItem: TodoItem = { id: Math.random(), text, check: false };
    setTodoLists({
      ...todoLists,
      [selectedDestination]: [...todoLists[selectedDestination], newItem],
    });
    setText('');
  };

  const handleToggleCheck = (id: number) => {
    const updatedList = todoLists[selectedDestination].map((item) =>
      item.id === id ? { ...item, check: !item.check } : item,
    );
    setTodoLists({ ...todoLists, [selectedDestination]: updatedList });
  };

  const handleDelete = (id: number) => {
    const updatedList = todoLists[selectedDestination].filter(
      (item) => item.id !== id,
    );
    setTodoLists({ ...todoLists, [selectedDestination]: updatedList });
  };

  return (
    <div className={cx('container')}>
      <Header isShowButton isShowProfile>
        체크리스트
      </Header>
      <div className={cx('tabs')}>
        {destinations.map((destination) => (
          <button
            type="button"
            key={destination}
            className={cx('tab', {
              active: selectedDestination === destination,
            })}
            onClick={() => setSelectedDestination(destination)}
          >
            {destination}
          </button>
        ))}
      </div>
      <div className={cx('todolist')}>
        {todoLists[selectedDestination].map((item) => (
          <div className={cx('todolist-textlists')} key={item.id}>
            <div className={cx('checkTextBox')}>
              <input
                className={cx('checkInput')}
                type="checkbox"
                checked={item.check}
                onChange={() => handleToggleCheck(item.id)}
              />
              <div className={cx(item.check ? 'checkedTextList' : 'textList')}>
                {item.text}
              </div>
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
              e.key === 'Enter' && handleListAddText()
            }
          />
        </div>
      </div>
    </div>
  );
}
