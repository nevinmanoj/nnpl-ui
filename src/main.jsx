import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";
import { AppRoutes } from "./Routes.jsx";
import { UserProvider } from "./context/userProvider.jsx";
import { MasterProvider } from "./context/masterProvider.jsx";

import { DocProvider } from "./context/docProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <MasterProvider>
        <DocProvider>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <AppRoutes />
            </ThemeProvider>
          </BrowserRouter>
        </DocProvider>
      </MasterProvider>
    </UserProvider>
  </React.StrictMode>
);
