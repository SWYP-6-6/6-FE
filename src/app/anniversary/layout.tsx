import React from 'react';
import Header from '@/components/common/Header';

export default function MyFamilyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header isShowButton isShowProfile={false}>
        기념일 설정
      </Header>
      {children}
    </div>
  );
}
