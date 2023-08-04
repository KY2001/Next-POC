import { initializeApp, getApps, FirebaseError as Error, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification as sendFirebaseEmailVerification,
  deleteUser,
  User,
  Auth,
} from 'firebase/auth';

export const FirebaseError = Error;
export type FirebaseUser = User;

export const getFirebaseApp = (): FirebaseApp => {
  const apps = getApps();
  if (apps.length) {
    return apps[0];
  }

  const firebaseConfig = {
    apiKey: 'AIzaSyBWw61US5C_BjEGNA_FiDlcCCwbglPYa9c',
    authDomain: 'go-server-poc.firebaseapp.com',
    projectId: 'go-server-poc',
    storageBucket: 'go-server-poc.appspot.com',
    messagingSenderId: '784536242027',
    appId: '1:784536242027:web:bebb8a85beab2da209ee2e',
    //   measurementId: 'G-7NMBPKQ78Y',
  };

  const app = initializeApp(firebaseConfig);
  return app;
};

export const getFirebaseAuth = (): Auth => {
  const app = getFirebaseApp();
  const auth = getAuth(app);
  return auth;
};

export const getCurrentUser = (): User | null => {
  const auth = getFirebaseAuth();
  return auth.currentUser;
};

export const getLatestUser = async (): Promise<User | null> => {
  const auth = getFirebaseAuth();
  await auth.currentUser?.reload();
  return auth.currentUser;
};

export const signinFirebase = async (email: string, password: string): Promise<User> => {
  const auth = getFirebaseAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signoutFirebase = async (): Promise<void> => {
  const auth = getFirebaseAuth();
  await signOut(auth);
};

export const signupFirebase = async (email: string, password: string): Promise<User> => {
  const auth = getFirebaseAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const deleteFirebaseUser = async (user: User): Promise<void> => {
  await deleteUser(user);
};

export const sendEmailVerification = async (user: User): Promise<void> => {
  await sendFirebaseEmailVerification(user);
};

export const checkEmailVerification = async (): Promise<boolean> => {
  const user = await getLatestUser();
  if (!user) {
    throw 'You need to signin first.';
  }
  return user.emailVerified;
};
