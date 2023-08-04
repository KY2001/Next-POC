'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signinFirebase } from '@/services/firebase';
import { FirebaseError } from 'firebase/app';
import pagePath from '@/services/pagePath';

export type SigninFormData = {
  email: string;
  password: string;
};

const SigninPage = (): JSX.Element => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SigninFormData>();

  const handleSignin = async (data: SigninFormData): Promise<void> => {
    const { email, password } = data;
    try {
      await signinFirebase(email, password);
      router.push(pagePath.home);
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        window.alert(err.message);
      } else {
        throw err;
      }
    }
  };

  return (
    <div className="-mt-56 flex min-h-screen flex-col items-center justify-center bg-gray-100 py-2">
      <div className="w-full px-3 sm:w-1/2 lg:w-1/3">
        <div className="my-10 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-6 text-center text-xl font-semibold text-black">Sign in</h2>
          <form onSubmit={handleSubmit(handleSignin)}>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                {...register('password', { required: true })}
                className="mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                placeholder="Password"
              />
            </div>
            <div className="mb-6 ">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center">
            <Link href={pagePath.signup} className="text-blue-500 hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
