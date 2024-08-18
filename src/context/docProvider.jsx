import { createContext, useState, useContext } from "react";

import { sivalidator } from "../utils/validators/siValidator";
import { pivalidator } from "../utils/validators/piValidator";
import { povalidator } from "../utils/validators/poValidator";
import { structValidator } from "../utils/validators/structValidator";
import { UserContext } from "./userProvider";
import { runAxios, server } from "../utils/runAxios";
import { MasterContext } from "./masterProvider";
import { reqCustomerProperties } from "../constants/dataModalProperties";

import axios from "axios";
import { saveAs } from "file-saver";

export const DocContext = createContext();

export const DocProvider = ({ children }) => {
  const { token, showNotification } = useContext(UserContext);
  const { addItemToMaster } = useContext(MasterContext);

  const [item, setItem] = useState(null);

  const [tc, setTc] = useState({});
  const [docId, setdocId] = useState(null);
  const [ref, setref] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [distributor, setDistributor] = useState(null);
  const [ledgerAccount, setLedgerAccount] = useState(null);
  const [roundOff, setRoundOff] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(null);
  const [status, setstatus] = useState("draft");
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
    distributor: {
      value: false,
      msg: "",
    },
  });

  const setDoc = ({ i, type }) => {
    setItem(type);
    if (i != null && i != "new") {
      runAxios("get", {}, "/docs/" + type + "/" + i, token)
        .then((res) => res.data.data)
        .then((data) => {
          setref(data["ref"]);
          setDate(data["date"]);
          setLedgerAccount(data["ledgerAccount"]);
          setProducts(data["products"]);
          setBilling(data["billing"]);
          setCustomer(data["customer"]);
          setDistributor(data["distributor"]);
          setdocId(i);
          // setstatus(data["status"]);
          setExecutive(data["executive"]);
          setTc(data["tc"] != null ? data["tc"] : {});
          setDiscount(data["discount"] && data["discount"].toString());
          setRoundOff(data["roundOff"] && data["roundOff"].toString());
        })
        .catch((error) => {
          console.error(" Error:", error);
          setdocId(null);
        });
    } else {
      setdocId(null);
      setDate(Date.now());
      if (type == "po") {
        setTc({
          payment:
            "100 % of the product cost will be paid within 60 days from the date of billing",
          billing: "new billings",
          taxes:
            "Taxes as applicable will be charged extra or as applicable at the time of billing.",
          delivery: "At the earliest",
        });
      }
    }
  };

  const saveDoc = async () => {
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
    var docData = {
      ledgerAccount,
      date,
      discount,
      ref,
      distributor,
      status,
      products,
      roundOff,
      billing,
      executive,
      customer: _customer,
    };
    if (item == "po") {
      docData = { ...docData, tc };
    }
    var dataErr = {};
    switch (item) {
      case "purchase-invoice":
        dataErr = pivalidator({ data: docData });
        break;
      case "sales-invoice":
        dataErr = sivalidator({
          data: docData,
        });
      case "po":
        dataErr = povalidator({ data: docData });
        break;
    }

    setErrors(dataErr.errors);
    if (dataErr.fail) {
      return;
    }

    if (docId != null && docId != "new") {
      //Save  Doc

      const result = await runAxios(
        "put",
        {
          data: {
            ref,
            ...docData,
          },
        },
        "/docs/" + item + "/" + docId,
        token
      );
      if (!result.success) {
        //handle improper save
        showNotification("Error while saving", "error");
      } else {
        showNotification("Save Success", "success");
      }
    } else {
      //create and save Doc

      const result = await runAxios(
        "post",
        {
          data: docData,
        },
        "/docs/" + item,
        token
      );
      if (result.success) {
        setdocId(result.data.data._id);
        showNotification("Save Success", "success");
        return result.data.data._id;
      } else {
        showNotification("Error while saving", "error");
      }
    }
  };

  const downloadExcel = async () => {
    console.log("hi");

    try {
      const response = await axios.get(
        server + "/docs/po/" + docId + "/excel",
        {
          responseType: "blob",
        }
      );
      console.log(response.headers);

      const contentDisposition = response.headers["Content-Disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : distributor.title.split(" ")[0] + "_" + ref.replace(/\//g, "_");
      (".xlsx");

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, filename);
    } catch (error) {
      console.error("Error downloading the Excel file:", error);
    }
  };

  return (
    <DocContext.Provider
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
        setDoc,
        saveDoc,
        billing,
        setBilling,
        executive,
        setExecutive,
        distributor,
        setDistributor,
        item,
        setItem,
        tc,
        setTc,
        status,
        discount,
        setDiscount,
        downloadExcel,
      }}
    >
      {children}
    </DocContext.Provider>
  );
};
