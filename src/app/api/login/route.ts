// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: '로그인 성공' });
  response.cookies.set(
    'JWT',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLtlYTqsrgiLCJpYXQiOjE3Mjg2NTQ1MTYsImV4cCI6MTcyODc0MDkxNn0.UBsxTCCYKRjP9sBnipUj13OPvN-w6peZTxxPxHpu6V4',
    { maxAge: 60 * 60 * 24, httpOnly: false },
  );
  return response;
}
