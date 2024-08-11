import { createContext, useState, useContext } from "react";
import axios from "axios";

import { sivalidator } from "../utils/siValidator";
import { structValidator } from "../utils/structValidator";
import { server } from "../constants/server";
import { UserContext } from "./userProvider";
import { runAxios } from "../utils/runAxios";

export const SIContext = createContext();

export const SIProvider = ({ children }) => {
  const { token, showNotification } = useContext(UserContext);

  const [siId, setSiId] = useState(null);
  const [ref, setref] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [ledgerAccount, setLedgerAccount] = useState(null);
  const [roundOff, setRoundOff] = useState(0);
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(null);
  const [status, setstatus] = useState(null);
  const [billing, setBilling] = useState(null);
  const [executive, setExecutive] = useState(null);

  //new values for po details
  const [isNew, setIsNew] = useState(false);

  //error flags
  const [errors, setErrors] = useState({
    date: {
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
    executive: {
      value: false,
      msg: "",
    },
  });

  const setSi = (i) => {
    if (i != null && i != "new") {
      axios
        .get(server + "/docs/sales-invoice/" + i, {
          headers: {
            // authorization: "Bearer " + token,
          },
        })
        .then((res) => res.data.data)
        .then((data) => {
          setref(data["ref"]);
          setDate(data["date"]);
          setLedgerAccount(data["ledgerAccount"]);
          setProducts(data["products"]);
          setBilling(data["billing"]);
          setCustomer(data["customer"]);
          setSiId(i);
          setRoundOff(data["roundOff"].toString());
          setstatus(data["status"]);
          setExecutive(data["executive"]);
        })
        .catch((error) => {
          console.error(" Error:", error);
          setSiId(null);
        });
    } else {
      setSiId(null);
    }
  };

  const saveSi = async () => {
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

    var siData = {
      ledgerAccount,
      date,
      status,
      products,
      roundOff,
      billing,
      executive,
      customer: _customer,
    };
    console.log(siData);
    const err = sivalidator({
      data: siData,
    });

    setErrors(err.errors);
    if (err.fail) {
      return;
    }

    if (siId != null || siId != "new") {
      //Save  PO

      const result = await runAxios(
        "put",
        {
          data: {
            ref,
            ...siData,
          },
        },
        "/docs/sales-invoice/" + siId,
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
          data: siData,
        },
        "/docs/sales-invoice",
        token
      );
      if (result.success) {
        setSiId(result.data.data._id);
        showNotification("Save Success", "success");
      } else {
        showNotification("Error while saving", "error");
      }
    }
  };

  return (
    <SIContext.Provider
      value={{
        customer,
        errors,
        setErrors,
        isNew,
        setIsNew,
        setCustomer,
        ref,
        setref,
        ledgerAccount,
        setLedgerAccount,
        roundOff,
        setRoundOff,
        products,
        setProducts,
        date,
        setDate,
        setSi,
        saveSi,
        billing,
        setBilling,
        executive,
        setExecutive,
      }}
    >
      {children}
    </SIContext.Provider>
  );
};
