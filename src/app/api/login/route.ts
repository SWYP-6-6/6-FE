// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: '로그인 성공' });
  response.cookies.set(
    'JWT',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLtmITsp4QiLCJpYXQiOjE3Mjg4MDQyNDksImV4cCI6MTcyODg5MDY0OX0.EoAsXmoq_hCeP2qikZOyfOsRGNT-Yeg1uyJBzVIdtm8',
    { maxAge: 60 * 60 * 24, httpOnly: false },
  );

  return response;
}
