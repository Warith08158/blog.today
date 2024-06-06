import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, getUserData } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export const userContext = createContext();

export const useUserContext = () => useContext(userContext);

const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        onSnapshot(doc(db, "users", user.uid), (doc) => {
          setUser(doc.data());
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userContext.Provider value={{ isLoading, user }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
