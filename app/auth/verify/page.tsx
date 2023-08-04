'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import pagePath from '@/services/pagePath';
import { checkEmailVerification } from '@/services/firebase';

export default function VerifyPage(): JSX.Element {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const verificationStatus = await checkEmailVerification();

      if (verificationStatus) {
        setIsVerified(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isVerified) {
      router.push(pagePath.home);
    }
  }, [isVerified, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-semibold">Waiting for email verification...</h2>
      <p className="mb-8 text-gray-700">
        Please check your email and follow the instructions to verify your account.
      </p>
    </div>
  );
}
