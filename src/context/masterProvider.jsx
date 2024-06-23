import { createContext, useState, useEffect } from "react";
import axios from "axios";

import { server } from "../utils/server";

export const MasterContext = createContext();

export const MasterProvider = ({ children }) => {
  const [distributorOptions, setDistributorOptions] = useState([]);
  const [neuralOptions, setneuralOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

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

  return (
    <MasterContext.Provider
      value={{
        distributorOptions,
        neuralOptions,
        customerOptions,
        productOptions,
        getOptionDetails,
      }}
    >
      {children}
    </MasterContext.Provider>
  );
};
