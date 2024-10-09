import React from 'react';
import { cookies } from 'next/headers';
import { getFetchFeedList, getFetchUser } from '@/app/api/api';
import { redirect } from 'next/navigation'; // 리다이렉트를 위한 모듈
import Header from '@/components/common/Header';
import MainClient from '@/components/mainClient';

export default async function Home() {
  // 쿠키에서 JWT 토큰 가져오기
  const cookieStore = cookies();
  const token = cookieStore.get('JWT')?.value;

  // 토큰이 없으면 /signin 페이지로 리다이렉트
  if (!token) {
    redirect('/signin');
  }

  try {
    // 사용자 정보 가져오기
    const userData = await getFetchUser({ token });

    if (!userData) {
      redirect('/signin');
    }

    if (userData.nickName === null) {
      redirect('/nicknamesetting');
    }

    // 초기 피드 데이터 가져오기
    const initialFeedData = await getFetchFeedList({
      page: 0,
      size: 10,
      token,
    });

    // 리다이렉트 응답일 경우 처리
    if (
      !initialFeedData ||
      initialFeedData.status === 307 ||
      !initialFeedData.content
    ) {
      redirect('/signin');
    }

    // 초기 데이터와 토큰을 클라이언트 컴포넌트로 전달
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
      </>
    );
  } catch (error) {
    // 에러가 발생했을 경우 /signin 페이지로 리다이렉트
    redirect('/signin');
  }
}
