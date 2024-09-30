import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Picker from 'react-mobile-picker';
import styles from './DataPick.module.scss';

const cx = classNames.bind(styles);

interface DataPickProps {
  onChange: (newDate: { year: string; month: string; day: string }) => void; // onChange 함수 타입 설정
}

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getMaxDays = (year: number, month: number): number => {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

export default function DataPick({ onChange }: DataPickProps) {
  console.log(onChange);
  const today = new Date();
  const currentYear = today.getFullYear().toString();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const currentDay = today.getDate().toString().padStart(2, '0');

  const [pickerValue, setPickerValue] = useState({
    year: currentYear,
    month: currentMonth,
    day: currentDay,
  });

  const yearOptions = Array.from({ length: 24 }, (v, i) =>
    (i + Number(currentYear) - 12).toString(),
  );

  const [days, setDays] = useState<string[]>([]);

  const selections = {
    year: yearOptions,
    month: [
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
    ],
    day: days,
  };

  useEffect(() => {
    const maxDays = getMaxDays(
      parseInt(pickerValue.year, 10),
      parseInt(pickerValue.month, 10),
    );
    const newDays = Array.from({ length: maxDays }, (_, i) =>
      (i + 1).toString().padStart(2, '0'),
    );
    setDays(newDays);

    if (parseInt(pickerValue.day, 10) > maxDays) {
      setPickerValue((prev) => ({
        ...prev,
        day: newDays[newDays.length - 1], // 최대 일수로 설정
      }));
    }

    if (onChange) {
      onChange(pickerValue); // 부모 컴포넌트로 선택한 값 전달
    }
  }, [pickerValue.year, pickerValue.month]);

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
        <Picker.Column name="year">
          {selections.year.map((option) => (
            <Picker.Item key={option} value={option}>
              {({ selected }) => (
                <div
                  className={cx({
                    'picker-item-selected': selected, // 선택된 항목에 클래스 추가
                  })}
                >
                  {option}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>
        <Picker.Column name="month">
          {selections.month.map((option) => (
            <Picker.Item
              key={option}
              value={option}
              className={cx('picker-item')}
            >
              {({ selected }) => (
                <div
                  className={cx({
                    'picker-item-selected': selected, // 선택된 항목에 클래스 추가
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
            <Picker.Item
              key={option}
              value={option}
              className={cx('picker-item')}
            >
              {({ selected }) => (
                <div
                  className={cx({
                    'picker-item-selected': selected, // 선택된 항목에 클래스 추가
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
