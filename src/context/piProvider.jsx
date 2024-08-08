import { createContext, useState, useContext } from "react";
import axios from "axios";

import { pivalidator } from "../utils/piValidator";
import { server } from "../constants/server";
import { UserContext } from "./userProvider";
import { runAxios } from "../utils/runAxios";

export const PIContext = createContext();

export const PIProvider = ({ children }) => {
  const { token, showNotification } = useContext(UserContext);

  const [piId, setpiId] = useState(null);
  const [pino, setpino] = useState(null);
  const [distributor, setdistributor] = useState(null);
  const [ledgerAccount, setLedgerAccount] = useState(null);
  const [roundOff, setRoundOff] = useState(0);
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(null);
  const [status, setstatus] = useState(null);
  const [billing, setBilling] = useState(null);
  const [customer, setCustomer] = useState(null);

  // flag for new customer
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
    distributor: {
      value: false,
      msg: "",
    },
    ledgerAccount: {
      value: false,
      msg: "",
    },
    customer: {
      value: false,
      msg: "",
    },
  });

  const setPi = (i) => {
    if (i != null && i != "new") {
      axios
        .get(server + "/docs/purchase-invoice/" + i, {
          headers: {
            // authorization: "Bearer " + token,
          },
        })
        .then((res) => res.data.data)
        .then((data) => {
          setpino(data["pino"]);
          setDate(data["date"]);
          setLedgerAccount(data["ledgerAccount"]);
          setProducts(data["products"]);
          setBilling(data["billing"]);
          setdistributor(data["distributor"]);
          setpiId(i);
          setRoundOff(data["roundOff"].toString());
          setstatus(data["status"]);
          setCustomer(data["customer"]);
        })
        .catch((error) => {
          console.error(" Error:", error);
          setpiId(null);
        });
    } else {
      setpiId(null);
    }
  };

  const savePi = async () => {
    var _customer = customer;
    if (isNew) {
      var isValidCustomer = structValidator(_customer, reqCustomerProperties);
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
    var piData = {
      ledgerAccount,
      date,
      status,
      products,
      roundOff,
      billing,
      distributor,
      customer: _customer,
    };

    const err = pivalidator({
      data: piData,
    });
    setErrors(err.errors);
    if (err.fail) {
      return;
    }

    if (piId != null || piId != "new") {
      //Save  PO

      const result = await runAxios(
        "put",
        {
          data: {
            pino,
            ...piData,
          },
        },
        "/docs/purchase-invoice/" + piId,
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
          data: piData,
        },
        "/docs/purchase-invoice",
        token
      );
      if (result.success) {
        setpiId(result.data.data._id);
        showNotification("Save Success", "success");
      } else {
        showNotification("Error while saving", "error");
      }
    }
  };

  return (
    <PIContext.Provider
      value={{
        distributor,
        errors,
        setErrors,
        setdistributor,
        pino,
        setpino,
        ledgerAccount,
        setLedgerAccount,
        roundOff,
        setRoundOff,
        products,
        setProducts,
        date,
        setDate,
        setPi,
        savePi,
        billing,
        setBilling,
        customer,
        setCustomer,
        isNew,
        setIsNew,
      }}
    >
      {children}
    </PIContext.Provider>
  );
};
