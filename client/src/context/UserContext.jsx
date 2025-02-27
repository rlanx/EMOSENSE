import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../utils/func/userService"; // ดึง API `getUser()`

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then((data) => {
      if (!data.error) {
        setUser(data);
      }
    });
  }, []);

  console.log("UserContext Loaded:", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
