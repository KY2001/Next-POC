'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  signinFirebase,
  signupFirebase,
  deleteFirebaseUser,
  sendEmailVerification,
  FirebaseError,
} from '@/services/firebase';
import { PostAuthSignupRequest } from '@/openapi/apis/DefaultApi';
import { getApiClientWithCredential } from '@/services/openapi';
import pagePath from '@/services/pagePath';

export type SigninFormData = {
  username: string;
  email: string;
  password: string;
};

const SigninPage = (): JSX.Element => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SigninFormData>();
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (data: SigninFormData): Promise<void> => {
    setError(null);
    try {
      await signup(data);
    } catch (err: unknown) {
      if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Failed to create user');
      }
    }
  };

  const signup = async (data: SigninFormData): Promise<void> => {
    const { username, email, password } = data;
    // ユーザを登録する関数(user.uid);
    // ユーザーが重複していたらそれ専用の失敗が返され、エラーメッセージを表示する。
    // 失敗したらawait deleteFirebaseUser(user);を実行する。
    // 本当はFirebaseのユーザ登録処理はバックエンドでまとめてやったほうがデータの不整合を防げるかもしれない。
    const user = await signupFirebase(email, password).catch((err: unknown) => {
      if (err instanceof FirebaseError) {
        throw err.message;
      }
      throw err;
    });
    try {
      const apiClient = await getApiClientWithCredential(user);
      const req: PostAuthSignupRequest = {
        userName: username,
        userId: user.uid,
      };
      await apiClient.postAuthSignup(req);
    } catch (err: unknown) {
      // ユーザー名の重複等によって失敗した場合はFirebaseのユーザーも削除する。
      await deleteFirebaseUser(user);
      // TODO: なぜ失敗したのかを明確に示す ex. ユーザー名の重複、ユーザーIDの重複 etc.
      throw 'Internal Server Error';
    }
    await signinFirebase(email, password);
    await sendEmailVerification(user);
    router.push(pagePath.verify);
  };

  return (
    <div className="-mt-56 flex min-h-screen flex-col items-center justify-center bg-gray-100 py-2">
      <div className="w-full px-3 sm:w-1/2 lg:w-1/3">
        <div className="my-10 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-6 text-center text-xl font-semibold text-black">Create account</h2>
          {error && <p className="text-center text-red-500">{error}</p>}
          <form onSubmit={handleSubmit(handleSignup)}>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-600">Username</label>
              <input
                {...register('username', { required: true })}
                className="w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:border-green-500 focus:outline-none"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:border-green-500 focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                {...register('password', { required: true })}
                className="mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:border-green-500 focus:outline-none"
                placeholder="Password"
              />
            </div>
            <div className="mb-6 ">
              <button
                type="submit"
                className="w-full rounded-lg bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-700 focus:outline-none"
              >
                Create account
              </button>
            </div>
          </form>
          <div className="text-center">
            <Link href={pagePath.signin} className="text-green-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
