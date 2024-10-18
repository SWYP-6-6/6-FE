import classNames from 'classnames/bind';
import React from 'react';
import styles from './layout.module.scss';

const cx = classNames.bind(styles);

export default function MyFamilyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={cx('layout')}>{children}</div>;
}
