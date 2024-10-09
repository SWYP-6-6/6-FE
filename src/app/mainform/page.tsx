// app/mainform/page.tsx

import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Header from '@/components/common/Header';
import { getFetchUser } from '@/app/api/api';
import MainFormPage from './MainFormPage';

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get('JWT')?.value;
  const userData = await getFetchUser({ token });

  // submitForm 함수 정의
  const submitForm = async (formData: FormData) => {
    'use server';

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const place = formData.get('place') as string;
    const isPublic = formData.get('isPublic') === 'true';
    const images = formData.getAll('images') as File[];

    // 필수 데이터가 없는 경우 에러 처리
    if (!title || !content || !place || images.length === 0) {
      throw new Error('제목, 내용, 장소 및 이미지를 모두 입력해주세요.');
    }

    // 서버에 보낼 request 필드에 포함될 JSON 데이터 생성
    const requestBody = JSON.stringify({
      title,
      content,
      place,
      isPublic,
    });

    // FormData 생성
    const apiFormData = new FormData();
    apiFormData.append('request', requestBody); // JSON 데이터는 문자열로 변환 후 추가
    images.forEach((image) => {
      apiFormData.append('imageFiles', image); // 이미지 파일들 추가
    });

    // 게시글 생성 요청
    const response = await fetch('http://13.209.88.22:8080/api/v1/feed', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 포함
        // Content-Type은 fetch가 자동으로 설정하므로 명시적으로 설정하지 않음
      },
      body: apiFormData, // multipart/form-data 형식으로 전송
    });

    if (!response.ok) {
      throw new Error('피드 생성에 실패했습니다.');
    }

    // 성공 시, 메인 페이지로 리다이렉트
    redirect('/');
  };

  // MainFormPage 컴포넌트에 submitForm을 prop으로 전달
  return (
    <>
      <Header user={userData} isShowButton isShowProfile={false}>
        게시글작성
      </Header>
      <MainFormPage submitForm={submitForm} />
    </>
  );
}
