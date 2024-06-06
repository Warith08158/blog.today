import { createContext, useContext, useState } from "react";

export const userContext = createContext();

export const useUserContext = () => useContext(userContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
