import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

import { server } from "../constants/server";
import { runAxios } from "../utils/runAxios";
import { UserContext } from "./userProvider";

export const MasterContext = createContext();

export const MasterProvider = ({ children }) => {
  const { token } = useContext(UserContext);
  const [distributorOptions, setDistributorOptions] = useState([]);
  const [neuralOptions, setneuralOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [ledgerOptions, setLedgerOptions] = useState([]);
  const [executiveOptions, setexecutiveOptions] = useState([]);

  useEffect(() => {
    getAlloptions();
  }, []);

  const getAlloptions = async () => {
    var data = await getOptions("distributor");
    setDistributorOptions(data);
    data = await getOptions("neural");
    setneuralOptions(data);
    data = await getOptions("customer");
    setCustomerOptions(data);
    data = await getOptions("products");
    setProductOptions(data);
    data = await getOptions("ledger");
    setLedgerOptions(data);
    data = await getOptions("executive");
    setexecutiveOptions(data);
  };
  const getOptions = async (item) => {
    return await axios
      .get(server + "/master/" + item, {
        headers: {
          // authorization: "Bearer " + token,
        },
      })
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
    return await axios
      .get(server + "/master/" + item + "/" + id, {
        headers: {
          // authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data.data)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(" Error:", error);
        return null;
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
        distributorOptions,
        neuralOptions,
        customerOptions,
        productOptions,
        ledgerOptions,
        executiveOptions,
        getOptionDetails,
        addItemToMaster,
      }}
    >
      {children}
    </MasterContext.Provider>
  );
};
