'use client';

import 'client-only';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import pagePath from '@/services/pagePath';
import { getFirebaseAuth, signoutFirebase, FirebaseError } from '@/services/firebase';
import { getApiClient } from '@/services/openapi';
import { GetUserRequest } from '@/openapi/apis/DefaultApi';

export const SigninButton = (): JSX.Element => {
  const [isSignedIn, setisSignedIn] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string>();

  const NoSignin = (
    <div className="flex items-center justify-end">
      <Link
        href={pagePath.signin}
        className="rounded-md bg-black px-7 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2  focus:ring-gray-600 focus:ring-offset-2"
      >
        Sign in
      </Link>
    </div>
  );

  const handleSignout = async (): Promise<void> => {
    try {
      await signoutFirebase();
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        window.alert(err.message);
      } else {
        throw err;
      }
    }
  };
  const Signin = (
    <div className="flex items-center justify-end">
      <div className="rounded-md bg-black px-7 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2  focus:ring-gray-600 focus:ring-offset-2">
        {userName}
      </div>
      <div
        onClick={handleSignout}
        className="rounded-md bg-white px-7 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2  focus:ring-gray-800 focus:ring-offset-2"
      >
        Signout
      </div>
    </div>
  );

  const Loading = (
    <div className="flex items-center justify-end">
      <div className="rounded-md bg-black px-7 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2  focus:ring-gray-600 focus:ring-offset-2">
        Loading...
      </div>
    </div>
  );

  const getUserName = async (userId: string): Promise<string> => {
    const apiClient = getApiClient();
    const req: GetUserRequest = {
      userId: userId,
    };
    const getUserResponse = await apiClient.getUser(req);
    return getUserResponse.userName;
  };

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserName(user.uid)
          .then((userName: string) => {
            setUserName(userName);
            setisSignedIn(true);
          })
          .catch((err: unknown) => {
            console.error(err);
          });
      } else {
        setisSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  switch (isSignedIn) {
    case true:
      return Signin;
    case false:
      return NoSignin;
    default:
      return Loading;
  }
};
