'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/signin');
    }, 2000);
    return () => {};
  }, [router]);

  return (
    <div>
      <Image
        src="/svgs/splash.svg"
        alt="splash"
        width={455}
        height={982}
        objectFit="cover"
      />
    </div>
  );
}
