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
        getLoggedInUser(user.uid)
          .then((data) => {
            setIsLoading(false);
            setUser(data);
          })
          .catch((error) => {
            setIsLoading(false);
            setUser(null);
          });
      } else {
        setIsLoading(false);
        setUser(null);
      }
    });

    function getLoggedInUser(uid) {
      return new Promise(
        (resolve, reject) => {
          const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
            if (doc) {
              resolve(doc.data());
              unsub();
            } else {
              unsub();
              reject("an error occurred");
            }
          });
        },
        (error) => {
          throw error;
        }
      );
    }

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
