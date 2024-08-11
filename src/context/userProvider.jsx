import { createContext, useState } from "react";
import { runAxios } from "../utils/runAxios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [expiry, setExpiry] = useState(0);
  const [username, setusername] = useState(null);

  //sales invoices, purchase orders, purchase invoices
  const [docList, setdocList] = useState([]);

  //notifcations
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);

  const login = () => {};
  const logout = () => {};

  const fetchAndSetdocList = async (item) => {
    const result = await runAxios("get", {}, "/docs/" + item, token);
    if (result.success) {
      // setdocList(Array.from({ length: 30 }, () => result.data.data[0]));
      setdocList(result.data.data);
    } else {
      showNotification(`Error while fetching ${item}s`, "error");
    }
  };
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
        message,
        setMessage,
        severity,
        showNotification,
        logout,
        login,
        docList,
        fetchAndSetdocList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
