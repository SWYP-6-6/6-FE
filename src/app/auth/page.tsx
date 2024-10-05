import React from 'react';
import { redirect } from 'next/navigation';

export default function AuthPage({
  searchParams,
}: {
  searchParams: { jwt?: string };
}) {
  const { jwt } = searchParams;

  if (jwt) {
    // Redirect to the API route handler to set the cookie
    redirect(`/api/auth?jwt=${jwt}`);
  }

  return (
    <div>
      <p>로그인 처리 중...</p>
    </div>
  );
}
