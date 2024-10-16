// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: '로그인 성공' });
  response.cookies.set(
    'JWT',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLtmITsp4QiLCJpYXQiOjE3Mjg5Nzc2NDEsImV4cCI6MTcyOTA2NDA0MX0.x-XXecyN5Y8mJNdeBzHjIDYh8MspoepBQn8WWY_ihfk',
    { maxAge: 60 * 60 * 24, httpOnly: false },
  );

  return response;
}
