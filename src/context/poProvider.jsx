import { createContext, useState } from "react";
import axios from "axios";

import { server } from "../constants/server";
import { runAxios } from "../utils/runAxios";
import { useContext } from "react";
import { UserContext } from "./userProvider";
import { povalidator } from "../utils/poValidator";
import { MasterContext } from "./masterProvider";
import { structValidator } from "../utils/structValidator";
import { reqCustomerProperties } from "../constants/dataModalProperties";

export const PoContext = createContext();

export const PoProvider = ({ children }) => {
  const { token, showNotification } = useContext(UserContext);
  const { addItemToMaster } = useContext(MasterContext);

  //po details
  const [ref, setref] = useState(null);
  const [date, setDate] = useState(0);
  const [ledgerAccount, setledgerAccount] = useState(null);
  const [products, setProducts] = useState([]);
  const [distributor, setDistributor] = useState(null);
  const [billing, setBilling] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [tc, setTc] = useState({});
  const [poLoading, setPoLoading] = useState(false);
  const [id, setid] = useState(null);
  const [status, setPoStatus] = useState(null);

  //new values for po details
  const [isNew, setIsNew] = useState(false);

  //error flags
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
    ledgerAccount: {
      value: false,
      msg: "",
    },
  });

  const setPo = (i) => {
    setPoLoading(true);
    if (i != null && i != "new") {
      axios
        .get(server + "/docs/po/" + i, {
          headers: {
            // authorization: "Bearer " + token,
          },
        })
        .then((res) => res.data.data)
        .then((data) => {
          setref(data["ref"]);
          setDate(data["date"]);
          setledgerAccount(data["ledgerAccount"]);
          setProducts(data["products"]);
          setDistributor(data["distributor"]);
          setBilling(data["billing"]);
          setCustomer(data["customer"]);
          setTc(data["tc"]);
          setid(i);
          setPoLoading(false);
          setPoStatus(data["status"]);
        })
        .catch((error) => {
          console.error(" Error:", error);
          setid(null);
          setPoLoading(false);
        });
    } else {
      setid(null);
      setTc({
        payment:
          "100 % of the product cost will be paid within 60 days from the date of billing",
        billing: "new billings",
        taxes:
          "Taxes as applicable will be charged extra or as applicable at the time of billing.",
        delivery: "At the earliest",
      });
    }
  };
  console.log();

  const savePo = async () => {
    var _customer = customer;
    if (isNew) {
      var isValidCustomer = structValidator(_customer, reqCustomerProperties);
      console.log(isValidCustomer);
      if (!isValidCustomer) {
        setErrors({
          ...errors,
          customer: {
            value: true,
            msg: "No fields can be empty",
          },
        });
        return;
      }

      var res = await addItemToMaster("customer", _customer);
      if (res.success) {
        setCustomer(res.data.data);
        setIsNew(false);
        _customer = res.data.data;
      } else {
        return;
      }
    }

    const err = povalidator({
      ledgerAccount,
      date,
      products,
      distributor,
      billing,
      customer: _customer,
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
            ref,
            ledgerAccount,
            date,
            products,
            distributor,
            billing,
            customer: _customer,
            tc,
            status,
          },
        },
        "/docs/po/" + id,
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
            ledgerAccount,
            date,
            products,
            distributor,
            billing,
            customer: _customer,
            tc,
            status,
          },
        },
        "/docs/po",
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
    const result = await runAxios("delete", {}, "/docs/po/" + id, token);
    if (result.success) {
      //handle delete
    }
  };

  const clearPo = () => {
    setref(null);
    setDate(0);
    setledgerAccount(0);
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
        ref,
        ledgerAccount,
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
        setledgerAccount,
        setTc,
        isNew,
        setIsNew,
      }}
    >
      {children}
    </PoContext.Provider>
  );
};
