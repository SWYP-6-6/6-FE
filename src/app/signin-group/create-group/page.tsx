import React from 'react';
import { cookies } from 'next/headers';
import {
  createFamily,
  getFetchUser,
  updateFamilyProfileImage,
} from '@/app/api/api';
import CreatGroupClientContent from './CreatGroupClientContent'; // 분리된 클라이언트 컴포넌트

export default async function CreatGroupPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('JWT')?.value;
  const userData = await getFetchUser({ token });

  const submitFamilyName = async (formData: FormData): Promise<void> => {
    'use server';

    const familyName = formData.get('familyName') as string;

    return createFamily({
      token,
      formData: { nickname: familyName },
    });
  };

  const submitForm = async (formData: FormData) => {
    'use server';

    return updateFamilyProfileImage({ token, formData });
  };

  return (
    <div>
      <CreatGroupClientContent
        user={userData}
        submitFamilyName={submitFamilyName}
        submitGgoupProfilePictureForm={submitForm} // 서버 액션 함수 prop으로 전달
      />
    </div>
  );
}
