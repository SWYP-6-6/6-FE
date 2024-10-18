import React from 'react';
import Header from '@/components/common/Header';
import { cookies } from 'next/headers';
import { getFamilyDetail } from '@/app/api/api';
import JoinGroupConfirmCient from './JoinGroupConfirmCient'; // 클라이언트 컴포넌트

export default async function JoinGroupConfirmPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('JWT')?.value;

  // 토큰과 URL의 familyId (params.id)로 API 호출
  const FamilyDetailData = await getFamilyDetail({
    token,
    familyId: params.id,
  });

  return (
    <div>
      <Header isShowButton={false} isShowProfile={false}>
        MY FAMILY
      </Header>
      <JoinGroupConfirmCient
        familyData={FamilyDetailData}
        token={token}
        familyId={params.id}
      />
    </div>
  );
}
