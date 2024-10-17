import React from 'react';
import { cookies } from 'next/headers';
import { getFetchFeedList, getFetchUser } from '@/app/api/api';
import { redirect } from 'next/navigation'; // 리다이렉트를 위한 모듈
import Header from '@/components/common/Header';
import MainClient from '@/components/mainClient';
import Footer from '@/components/common/Footer';

export default async function Home() {
  // 쿠키에서 JWT 토큰 가져오기
  const cookieStore = cookies();
  const token = cookieStore.get('JWT')?.value;

  // 토큰이 없으면 /signin 페이지로 리다이렉트
  if (!token) {
    return redirect('/signin');
  }

  // 사용자 정보와 피드 데이터를 가져오기
  const userData = await getFetchUser({ token });
  const initialFeedData = await getFetchFeedList({
    page: 0,
    size: 10,
    token,
  });

  // 사용자 정보가 없거나 유효하지 않으면 /signin 페이지로 리다이렉트
  if (!userData) {
    return redirect('/signin');
  }

  // 닉네임이 없으면 /nicknamesetting 페이지로 리다이렉트
  if (userData.nickName === null) {
    return redirect('/nicknamesetting');
  }

  // initialFeedData가 없거나 content 배열이 비어 있으면 /signin 페이지로 리다이렉트
  if (!initialFeedData) {
    return redirect('/signin');
  }

  // JSX 반환
  return (
    <>
      <Header
        user={userData} // 사용자 정보도 전달
        isShowButton={false}
        isShowProfile
      >
        트립테리어
      </Header>
      <MainClient
        initialFeedData={initialFeedData.content}
        token={token}
        user={userData} // 사용자 정보도 전달
      />
      <Footer pathname="/" />
    </>
  );
}
