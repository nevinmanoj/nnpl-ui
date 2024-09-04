import { createContext, useState, useEffect, useContext } from "react";
import { runAxios } from "../utils/runAxios";
import { UserContext } from "./userProvider";

export const MasterContext = createContext();

export const MasterProvider = ({ children }) => {
  const masters = [
    "distributor",
    "neural",
    "customer",
    "products",
    "ledger",
    "executive",
  ];
  const { token } = useContext(UserContext);
  const [distributorOptions, setDistributorOptions] = useState([]);
  const [neuralOptions, setneuralOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [ledgerOptions, setLedgerOptions] = useState([]);
  const [executiveOptions, setexecutiveOptions] = useState([]);
  const getOptionValues = (item) => {
    switch (item) {
      case "distributor":
        return distributorOptions;
      case "neural":
        return neuralOptions;
      case "customer":
        return customerOptions;
      case "products":
        return productOptions;
      case "ledger":
        return ledgerOptions;
      case "executive":
        return executiveOptions;
    }
  };
  const getOptionSetter = (item) => {
    switch (item) {
      case "distributor":
        return setDistributorOptions;
      case "neural":
        return setneuralOptions;
      case "customer":
        return setCustomerOptions;
      case "products":
        return setProductOptions;
      case "ledger":
        return setLedgerOptions;
      case "executive":
        return setexecutiveOptions;
    }
  };
  useEffect(() => {
    getAlloptions();
  }, [token]);

  const getAlloptions = async () => {
    if (token != null) {
      masters.map(async (v, i) => {
        var data = await getOptions(v);
        var setter = getOptionSetter(v);
        setter(data);
      });
    }
  };
  const getOptions = async (item) => {
    return await runAxios("get", {}, "/master/" + item, token)
      .then((res) => res.data.data)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(" Error:", error);
        return null;
      });
  };
  const getOptionDetails = async (item, id) => {
    return await runAxios("get", {}, "/master/" + item + "/" + id, token)
      .then((res) => res.data.data)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(" Error:", error);
        return [];
      });
  };
  const addItemToMaster = async (item, data) => {
    const result = await runAxios(
      "post",
      {
        data: data,
      },
      "/master/" + item,
      token
    );
    if (result.success) {
      const data = await getOptions(item);
      setCustomerOptions(data);
    }
    return result;
  };

  return (
    <MasterContext.Provider
      value={{
        getOptionValues,
        getOptionSetter,
        getOptionDetails,
        addItemToMaster,
      }}
    >
      {children}
    </MasterContext.Provider>
  );
};
