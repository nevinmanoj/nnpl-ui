import { createContext, useState } from "react";
import axios from "axios";

import { server } from "../utils/server";
import { runAxios } from "../utils/runAxios";
import { useContext } from "react";
import { UserContext } from "./userProvider";
import { CoContext } from "./coProvider";
export const PoContext = createContext();

export const PoProvider = ({ children }) => {
  const { token } = useContext(UserContext);
  // const { poList, setPoList } = useContext(CoContext);

  const [pno, setpno] = useState(null);
  const [date, setDate] = useState(0);
  const [tax, setTax] = useState(0);
  const [products, setProducts] = useState([]);
  const [distributor, setDistributor] = useState(null);
  const [billing, setBilling] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [tc, setTc] = useState({});
  const [poLoading, setPoLoading] = useState(false);
  const [id, setid] = useState(null);

  const setPo = (i) => {
    setPoLoading(true);
    if (i != null && i != "new") {
      axios
        .get(server + "/po/" + i, {
          headers: {
            // authorization: "Bearer " + token,
          },
        })
        .then((res) => res.data.po)
        .then((data) => {
          console.log(data);
          setpno(data["pno"]);
          setDate(data["date"]);
          setTax(data["tax"]);
          setProducts(data["products"]);
          setDistributor(data["distributor"]);
          setBilling(data["billing"]);
          setCustomer(data["customer"]);
          setTc(data["tc"]);
          setid(i);
          setPoLoading(false);
        })
        .catch((error) => {
          console.error(" Error:", error);
          setid(null);
          setPoLoading(false);
        });
    } else {
      setid(null);
    }
  };

  const savePo = async () => {
    setPoLoading(true);
    if (id != null) {
      const result = await runAxios(
        "post",
        {
          pno,
          tax,
          date,
          products,
          distributor,
          billing,
          customer,
          tc,
        },
        "/po",
        token
      );
      if (result.success) {
        setid(result.data.data._id);
      }
    } else {
      //create new PO
      const result = await runAxios(
        "put",
        {
          pno,
          tax,
          date,
          products,
          distributor,
          billing,
          customer,
          tc,
        },
        "/po/" + id,
        token
      );
      if (!result.success) {
        //handle improper save
      }
    }
    setPoLoading(false);
  };

  const deletePo = async () => {
    const result = await runAxios("delete", {}, "/po/" + id, token);
    if (result.success) {
      //handle delete
    }
  };

  const clearPo = () => {
    setpno(null);
    setDate(0);
    setTax(0);
    setProducts([]);
    setDistributor(null);
    setBilling(null);
    setCustomer(null);
    setTc({});
  };

  return (
    <PoContext.Provider
      value={{
        pno,
        tax,
        date,
        products,
        distributor,
        billing,
        customer,
        tc,
        poLoading,
        setPo,
        savePo,
        setDistributor,
        setCustomer,
        setBilling,
        setProducts,
        setTax,
      }}
    >
      {children}
    </PoContext.Provider>
  );
};
