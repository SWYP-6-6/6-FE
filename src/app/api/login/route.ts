// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: '로그인 성공' });
  response.cookies.set(
    'JWT',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLtlYTqsrgiLCJpYXQiOjE3Mjg2MjI2NjgsImV4cCI6MTcyODcwOTA2OH0.svygj92HaaHyB8iQmei6f_EZ-mRv1F0AQd46o044zZ8',
    { maxAge: 60 * 60 * 24, httpOnly: false },
  );
  return response;
}
