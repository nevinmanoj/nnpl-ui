import { createContext, useState } from "react";

export const CoContext = createContext();

export const CoProvider = ({ children }) => {
  const [cno, setCno] = useState(null);
  const [poList, setPoList] = useState([]);
  const [customer, setCustomer] = useState(null);

  const setCo = (data) => {
    setCno(data["cno"]);
    setPoList(data["poList"]);
    setCustomer(data["customer"]);
  };
  const clearCo = () => {
    setCno(null);
    setPoList([]);
    setCustomer(null);
  };

  return (
    <CoContext.Provider
      value={{
        cno,
        poList,
        customer,
      }}
    >
      {children}
    </CoContext.Provider>
  );
};
