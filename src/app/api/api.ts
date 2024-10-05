import { NextResponse } from 'next/server';

const BASE_URL = 'http://13.209.88.22:8080/';
const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // 기본값 설정

export interface FetchFeedParamsType {
  page: number;
  size: number;
  token?: string;
}

export async function getFetchFeedList({
  page,
  size,
  token,
}: FetchFeedParamsType) {
  if (!token) {
    // 절대 URL로 리디렉션
    const signinUrl = `${NEXT_PUBLIC_BASE_URL}/signin`;
    return NextResponse.redirect(signinUrl);
  }

  try {
    const res = await fetch(
      `${BASE_URL}api/v1/feed/recommend/feedList?page=${page}&size=${size}&sort=string`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          accept: '*/*',
        },
      },
    );

    if (!res.ok) {
      // 응답 실패 시 절대 URL로 리디렉션
      const signinUrl = `${NEXT_PUBLIC_BASE_URL}/signin`;
      return NextResponse.redirect(signinUrl);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // console.error('Error fetching feed list:', error);
    // 네트워크 오류 시 절대 URL로 리디렉션
    const signinUrl = `${NEXT_PUBLIC_BASE_URL}/signin`;
    return NextResponse.redirect(signinUrl);
  }
}
