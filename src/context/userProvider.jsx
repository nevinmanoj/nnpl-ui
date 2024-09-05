import { createContext, useState, useEffect } from "react";
import { runAxios } from "../utils/runAxios";
export const UserContext = createContext();
import { useNavigate, useLocation } from "react-router-dom";

export const UserProvider = ({ children }) => {
  const navigator = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);
  const [expiry, setExpiry] = useState(0);
  const [username, setusername] = useState(null);

  //sales invoices, purchase orders, purchase invoices
  const [docList, setdocList] = useState([]);
  const [page, setpage] = useState(0);
  const [limit, setlimit] = useState(25);
  const [totalDocs, settotalDocs] = useState(0);
  const [totalPages, settotalPages] = useState(0);

  const [filter, setFilter] = useState({});

  //notifcations
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);
  //loading
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const tkn = localStorage.getItem("token");

    setToken(tkn);
  }, []);

  const login = async (key) => {
    //run code to verify key
    const result = await runAxios("get", {}, "/user", key);
    if (result.success) {
      localStorage.setItem("token", key);
      setToken(key);
    }
    return result.success;
  };
  const logout = () => {
    setToken(null);
    setExpiry(0);
  };
  const makeFilterStr = (query) => {
    var str = "?";

    Object.entries(query).forEach(([key, value]) => {
      if (value != null && value != "") {
        str = str + key + "=" + value + "&";
      }
    });
    str = str.slice(0, -1);

    return str;
  };
  const modifyFilter = (newFilter) => {
    const newMergedFilter = { ...filter, ...newFilter };
    setFilter(newMergedFilter);
    const str = makeFilterStr(newMergedFilter);
    navigator(location.pathname + str);
  };
  const clearFilter = () => {
    setpage(0);
    setlimit(25);
    setFilter({});
  };

  const getPaginationSeparator = (search) => {
    return search == "" ? `?` : "&";
  };

  const fetchAndSetdocList = async (item) => {
    setloading(true);
    const formattedPage = page + 1;
    if (token != null) {
      const result = await runAxios(
        "get",
        {},
        "/docs/" +
          item +
          location.search +
          getPaginationSeparator(location.search) +
          "limit=" +
          limit +
          "&page=" +
          formattedPage,
        token
      );
      if (result.success) {
        // setdocList(Array.from({ length: 30 }, () => result.data.data[0]));
        setdocList(result.data.data);
        settotalDocs(result.data.totalDocs);
        settotalPages(result.data.totalPages);
      } else {
        showNotification(`Error while fetching ${item}s`, "error");
      }
    }
    setloading(false);
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
        setToken,
        token,
        fetchAndSetdocList,
        filter,
        setFilter,
        modifyFilter,
        clearFilter,
        setdocList,
        totalDocs,
        totalPages,
        page,
        setpage,
        limit,
        setlimit,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
