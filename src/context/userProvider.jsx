import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [expiry, setExpiry] = useState(0);
  const [username, setusername] = useState(null);

  const [coList, setCoList] = useState([]);

  //notifcations
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);

  const showNotification = (msg, sev) => {
    setMessage(msg);
    setSeverity(sev);
    setTimeout(() => {
      setMessage(null);
      setSeverity(null);
    }, 5000);
  };
  return (
    <UserContext.Provider
      value={{
        username,
        coList,
        message,
        setMessage,
        severity,
        showNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
