import * as firebase from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { IResult, IUser } from 'util/type';
import FirebaseError = firebase.FirebaseError;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);

export const fbAuth = getAuth(app);

export const fbSignIn = async (password: string): Promise<IResult<IUser>> => {
  try {
    const response = await signInWithEmailAndPassword(fbAuth, process.env.REACT_APP_USER_ID || '', password);

    return {
      result: true,
      data: {
        displayName: response.user.displayName || '',
        email: response.user.email || '',
      }
    }
  } catch (error: any) {
    console.error(error);

    let message = error.message;
    if (error instanceof FirebaseError) {
      console.error('firebase error!!');

      if (message.indexOf('auth/wrong-password') > -1) {
        message = '비밀번호가 일지하지 않습니다.';
      } else if (message.indexOf('auth/too-many-requests') > -1) {
        message = '비밀번호 입력 횟수 초과로 인해 일시적으로 로그인이 제한됩니다.';
      }
    }

    throw {
      result: false,
      message,
    };
  }
}

export const fbSignOut = async () => {
  await signOut(fbAuth);
}