import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [expiry, setExpiry] = useState(0);
  const [username, setusername] = useState(null);

  const [coList, setCoList] = useState([]);

  return (
    <UserContext.Provider
      value={{
        username,
        coList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
