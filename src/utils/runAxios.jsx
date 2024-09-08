import axios from "axios";

const prod = "";
const preProd =
  "https://nnpl-kochi-anguc7hwh6bvhwe2.centralindia-01.azurewebsites.net";
const dev = "http://localhost:8080";
export const server = preProd + "/nnpl/api";
// export const server=prod;

export const runAxios = async (method, data, path, jwtToken, config) => {
  const finalconfig = {
    ...config,
    method,
    url: server + path,
    headers: {
      authorization: jwtToken,
    },
    data,
  };

  const result = await axios(finalconfig)
    .then((response) => {
      return {
        data: response.data,
        success: response.status == 200,
        headers: response.headers,
      };
    })
    .catch((error) => {
      console.error("Error " + method + "ing data:", error);
      return { success: false, error };
    });
  return result;
};
