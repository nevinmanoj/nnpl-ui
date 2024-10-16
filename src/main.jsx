import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AppRoutes } from "./Routes.jsx";
import { UserProvider } from "./context/userProvider.jsx";
import { MasterProvider } from "./context/masterProvider.jsx";
import { DocProvider } from "./context/docProvider.jsx";

import { msalConfig } from "./constants/authConfig.js";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <UserProvider>
          <MasterProvider>
            <DocProvider>
              <ThemeProvider theme={theme}>
                <AppRoutes />
              </ThemeProvider>
            </DocProvider>
          </MasterProvider>
        </UserProvider>
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>
);
