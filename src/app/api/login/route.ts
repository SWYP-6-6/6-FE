// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: '로그인 성공' });
  response.cookies.set(
    'JWT',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLtmITsp4QiLCJpYXQiOjE3Mjg3NTI4ODAsImV4cCI6MTcyODgzOTI4MH0.AsUxkRjg329FRa-s0ZFmwPogPlPdAfHMIGDK6U99k3c',
    { maxAge: 60 * 60 * 24, httpOnly: false },
  );

  return response;
}
