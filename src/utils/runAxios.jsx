import axios from "axios";

const prod = "";
const dev = "http://localhost:3000";
export const server = dev;
// export const server=prod;

export const runAxios = async (method, data, path, jwtToken) => {
  const config = {
    method,
    url: server + path,
    headers: {
      authorization: "Bearer " + jwtToken,
    },
    data,
  };
  const result = await axios(config)
    .then((response) => {
      return { data: response.data, success: response.status == 200 };
    })
    .catch((error) => {
      console.error("Error " + method + "ing data:", error);
      return { success: false, error };
    });
  return result;
};
