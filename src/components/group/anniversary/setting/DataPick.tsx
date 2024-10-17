import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Picker from 'react-mobile-picker';
import styles from './DataPick.module.scss';

const cx = classNames.bind(styles);

interface DataPickProps {
  onChange: (newDate: { month: string; day: string }) => void; // onChange 함수 타입 설정
}

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getMaxDays = (month: number): number => {
  // 2023년 기준으로 최대 일 수 반환
  const year = new Date().getFullYear();
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

export default function DataPick({ onChange }: DataPickProps) {
  const [pickerValue, setPickerValue] = useState({
    month: '01',
    day: '01',
  });

  const monthOptions = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  const [days, setDays] = useState<string[]>([]);

  const selections = {
    month: monthOptions,
    day: days,
  };

  useEffect(() => {
    const maxDays = getMaxDays(parseInt(pickerValue.month, 10));
    const newDays = Array.from({ length: maxDays }, (_, i) =>
      (i + 1).toString().padStart(2, '0'),
    );
    setDays(newDays);

    // 선택한 일이 최대 일수보다 크면 최대 일로 설정
    if (parseInt(pickerValue.day, 10) > maxDays) {
      setPickerValue((prev) => ({
        ...prev,
        day: newDays[newDays.length - 1],
      }));
    }

    if (onChange) {
      onChange(pickerValue); // 부모 컴포넌트로 선택한 값 전달
    }
  }, [pickerValue.month]);

  return (
    <div className={cx('picker')}>
      <div className={cx('border')} />
      <Picker
        value={pickerValue}
        onChange={setPickerValue}
        wheelMode="normal"
        className={cx('picker-wheel')}
        height={140}
        itemHeight={48}
      >
        <Picker.Column name="month">
          {selections.month.map((option) => (
            <Picker.Item key={option} value={option}>
              {({ selected }) => (
                <div
                  className={cx({
                    'picker-item-selected': selected,
                  })}
                >
                  {option}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>
        <Picker.Column name="day">
          {selections.day.map((option) => (
            <Picker.Item key={option} value={option}>
              {({ selected }) => (
                <div
                  className={cx({
                    'picker-item-selected': selected,
                  })}
                >
                  {option}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
    </div>
  );
}
