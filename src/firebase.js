import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_AUTH_DOMAIN,
  authDomain: import.meta.env.REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_APP_APP_ID,
};

initializeApp(firebaseConfig);
const auth = getAuth();

//create new user account
export const createUser = (email, password) => {
  return new Promise(
    (resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          resolve(user);
        })
        .catch((error) => reject(error));
    },
    (error) => {
      throw new Error(error);
    }
  );
};

//send email verification link
export const sendEmailVerificationLink = () => {
  return new Promise(
    (resolve, reject) => {
      sendEmailVerification(auth.currentUser)
        .then(resolve("link sent to email"))
        .catch((error) => reject(error));
    },
    (error) => {
      throw new Error(error);
    }
  );
};

//sign user in
export const signInUser = (email, password) => {
  return new Promise(
    (resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    },
    (error) => {
      throw new Error(error);
    }
  );
};

//continue with google
const provider = new GoogleAuthProvider();

export const continueWithGoogle = () => {
  return new Promise(
    (resolve, reject) => {
      signInWithPopup(auth, provider)
        .then((result) => resolve(result.user))
        .catch((error) => reject(error));
    },
    (error) => {
      throw new Error(error);
    }
  );
};

//recover account
export const recoverAccount = (email) => {
  return new Promise(
    (resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => resolve("Password reset email sent"))
        .catch((error) => reject(error));
    },
    (error) => {
      throw new Error(error);
    }
  );
};
