// app/dashboard/loading.js
import React from 'react';
import classNames from 'classnames/bind';
import styles from './loading.module.scss';

const cx = classNames.bind(styles);

export default function Loading() {
  return (
    <div className={cx('spinnerContainer')}>
      <div className={cx('spinner')} />
    </div>
  );
}
