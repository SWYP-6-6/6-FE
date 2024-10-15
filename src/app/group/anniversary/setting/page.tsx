'use client';

import React from 'react';
import Header from '@/components/common/Header';
import SettingForm from '@/components/group/anniversary/setting/SettingForm';

export default function AnniversarySettingPage() {
  return (
    <>
      <Header isShowButton isShowProfile={false}>
        기념일 설정
      </Header>
      <SettingForm />
    </>
  );
}
