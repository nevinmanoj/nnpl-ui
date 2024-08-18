import axios from "axios";

const prod = "";
const devPublic = "https://6vc9m5px-3000.inc1.devtunnels.ms";
const dev = "http://localhost:3000";
export const server = dev;
// export const server=prod;

export const runAxios = async (method, data, path, jwtToken, config) => {
  const finalconfig = {
    ...config,
    method,
    url: server + path,
    headers: {
      authorization: "Bearer " + jwtToken,
    },
    data,
  };
  const result = await axios(finalconfig)
    .then((response) => {
      return { data: response.data, success: response.status == 200 };
    })
    .catch((error) => {
      console.error("Error " + method + "ing data:", error);
      return { success: false, error };
    });
  return result;
};
