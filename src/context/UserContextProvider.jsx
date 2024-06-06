import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export const userContext = createContext();

export const useUserContext = () => useContext(userContext);

const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsLoading(false);
        setIsLoggedIn(true);
      } else {
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    });

    function getLoggedInUser(uid) {
      console.log(uid);
      return new Promise(
        (resolve, reject) => {},
        (error) => {
          throw error;
        }
      );
    }

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  // const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
  //   console.log("Current data: ", doc.data());
  // });

  //   return () => {
  //
  //   };
  // }, []);

  // console.log(auth.currentUser.uid);
  return (
    <userContext.Provider value={{ isLoading, isLoggedIn }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
