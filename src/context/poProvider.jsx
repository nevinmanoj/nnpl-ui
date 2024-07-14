import { createContext, useState } from "react";
import axios from "axios";

import { server } from "../utils/server";
import { runAxios } from "../utils/runAxios";
import { useContext } from "react";
import { UserContext } from "./userProvider";
import { povalidator } from "../utils/poValidator";
export const PoContext = createContext();

export const PoProvider = ({ children }) => {
  const { token, showNotification } = useContext(UserContext);

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
  const [poStatus, setPoStatus] = useState(null);
  const [errors, setErrors] = useState({
    date: {
      value: false,
      msg: "",
    },
    distributor: {
      value: false,
      msg: "",
    },
    billing: {
      value: false,
      msg: "",
    },
    products: {
      value: false,
      msg: "",
    },
    customer: {
      value: false,
      msg: "",
    },
  });

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
          setPoStatus(data["poStatus"]);
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
    const err = povalidator({
      tax,
      date,
      products,
      distributor,
      billing,
      customer,
      errors,
    });
    setErrors(err.errors);
    if (err.fail) {
      return;
    }
    setPoLoading(true);
    if (id != null || id != "new") {
      //Save  PO

      const result = await runAxios(
        "put",
        {
          data: {
            pno,
            tax,
            date,
            products,
            distributor,
            billing,
            customer,
            tc,
            poStatus,
          },
        },
        "/po/" + id,
        token
      );
      if (!result.success) {
        //handle improper save
        showNotification("Error while saving", "error");
      } else {
        showNotification("Save Success", "success");
      }
    } else {
      const result = await runAxios(
        "post",
        {
          data: {
            pno,
            tax,
            date,
            products,
            distributor,
            billing,
            customer,
            tc,
            poStatus,
          },
        },
        "/po",
        token
      );
      if (result.success) {
        setid(result.data.data._id);
        showNotification("Save Success", "success");
      } else {
        showNotification("Error while saving", "error");
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
        id,
        pno,
        tax,
        date,
        products,
        distributor,
        billing,
        customer,
        tc,
        poLoading,
        errors,
        setDate,
        setPo,
        savePo,
        setDistributor,
        setCustomer,
        setBilling,
        setProducts,
        setTax,
        setTc,
      }}
    >
      {children}
    </PoContext.Provider>
  );
};
