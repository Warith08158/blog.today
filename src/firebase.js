import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtfeivP-y5R6QfvLfgCOZJC2UVHrEVKm0",
  authDomain: "blogtoday-afd1a.firebaseapp.com",
  projectId: "blogtoday-afd1a",
  storageBucket: "blogtoday-afd1a.appspot.com",
  messagingSenderId: "145748615550",
  appId: "1:145748615550:web:e020ab4ab72396a477d32f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
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

//get user data from firestore
export const getUserData = (userID) => {
  const docRef = doc(db, "users", userID);
  return new Promise(
    (resolve, reject) => {
      getDoc(docRef)
        .then((docSnap) => resolve(docSnap))
        .catch((error) => reject(error));
    },
    (error) => {
      throw new Error(error);
    }
  );
};

//add doc
export const addUserToDatabase = (userID, data) => {
  const docRef = doc(db, "users", userID);
  return new Promise(
    (resolve, reject) => {
      setDoc(docRef, data)
        .then(() => resolve("Doc added"))
        .catch((error) => reject(error));
    },
    (error) => {
      throw new Error(error);
    }
  );
};

//update user profile
export const updateUserProfile = (userName) => {
  return new Promise(
    (resolve, reject) => {
      updateProfile(auth.currentUser, {
        displayName: userName,
      })
        .then(() => resolve("Profile updated"))
        .catch((error) => reject(error));
    },
    (error) => {
      throw new Error(error);
    }
  );
};

//get user profile
export const getUserProfile = () => {
  const user = auth.currentUser;
  return new Promise(
    (resolve, reject) => {
      if (user !== null) {
        user.providerData.forEach((profile) => {
          resolve(profile.displayName);
        });
      } else {
        reject("An error occurred");
      }
    },
    (error) => {
      throw new Error(error);
    }
  );
};
