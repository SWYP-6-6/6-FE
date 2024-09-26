'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Picker from 'react-mobile-picker';
import styles from './DatePicker.module.scss';

const cx = classNames.bind(styles);

const currentDate = new Date();
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

const selections: { [key: string]: string[] } = {
  year: Array.from({ length: 51 }, (_, i) =>
    (currentDate.getFullYear() + i).toString(),
  ),
  month: Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, '0'),
  ),
};

interface MyPickerProps {
  pickerValue: {
    year: string;
    month: string;
    day: string;
  };
  setPickerValue: React.Dispatch<
    React.SetStateAction<{
      year: string;
      month: string;
      day: string;
    }>
  >;
}

export default function DatePicker({
  pickerValue,
  setPickerValue,
}: MyPickerProps) {
  const [daySelections, setDaySelections] = useState<string[]>(
    Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0')),
  );

  useEffect(() => {
    // 기본값 설정: 최초 렌더링 시 실행
    if (!pickerValue.year && !pickerValue.month && !pickerValue.day) {
      const currentYear = currentDate.getFullYear().toString();
      const currentMonth = (currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0');
      const currentDay = currentDate.getDate().toString().padStart(2, '0');

      setPickerValue({
        year: currentYear,
        month: currentMonth,
        day: currentDay,
      });
    }
  }, [pickerValue, setPickerValue]);

  useEffect(() => {
    const { year, month } = pickerValue;
    const daysInMonth: number = getDaysInMonth(Number(year), Number(month));
    setDaySelections(
      Array.from({ length: daysInMonth }, (_, i) =>
        (i + 1).toString().padStart(2, '0'),
      ),
    );
  }, [pickerValue.year, pickerValue.month]);

  return (
    <div className={cx('container')}>
      <Picker
        value={pickerValue}
        onChange={setPickerValue}
        height={111}
        wheelMode="natural"
      >
        {Object.keys(selections).map((name) => (
          <Picker.Column key={name} name={name}>
            {selections[name].map((option) => (
              <Picker.Item key={option} value={option}>
                {({ selected }) => (
                  <div className={cx('option', { selected })}>{option}</div>
                )}
              </Picker.Item>
            ))}
          </Picker.Column>
        ))}
        <Picker.Column name="day">
          {daySelections.map((option) => (
            <Picker.Item key={option} value={option}>
              {({ selected }) => (
                <div className={cx('option', { selected })}>{option}</div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
    </div>
  );
}
