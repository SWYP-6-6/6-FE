'use client';

import React from 'react';
import SettingForm from '@/components/anniversary/SettingForm';
import Header from '@/components/common/Header';

export default function Page() {
  return (
    <>
      <Header isShowButton isShowProfile={false}>
        기념일 설정
      </Header>
      기념일
      <SettingForm />
    </>
  );
}
