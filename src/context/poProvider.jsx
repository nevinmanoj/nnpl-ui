import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { server } from "../constants";

export const dataContext = React.createContext();

export const DataProvider = ({ children }) => {
  // const populateUI = () => {
  //   for (var i = 0; i < 15; i++) {
  //     const config = {
  //       method: "post",
  //       url: server + "/task",
  //       headers: {
  //         authorization: "Bearer " + jwtToken,
  //       },
  //       data: {
  //         title: "title" + i,
  //         desc: "desc" + i,
  //         addedDate: Date.now() + i * 100,
  //         isCompleted: i % 2 == 0,
  //         completionDate: i % 2 == 0 ? Date.now() + i * 100 + 2000 : undefined,
  //       },
  //     };
  //     axios(config)
  //       .then((response) => {
  //         getAllTasks(jwtToken);
  //         console.log(
  //           "Data " + method + " successfully! Response:",
  //           response.data
  //         );
  //       })
  //       .catch((error) => {
  //         console.error("Error " + method + "ing data:", error);
  //       });
  //   }
  // };

  return <dataContext.Provider value={{}}>{children}</dataContext.Provider>;
};
