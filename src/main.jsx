import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";
import { AppRoutes } from "./Routes.jsx";
import { UserProvider } from "./context/userProvider.jsx";
import { CoProvider } from "./context/coProvider.jsx";
import { PoProvider } from "./context/poProvider.jsx";
import { MasterProvider } from "./context/masterProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <MasterProvider>
        <CoProvider>
          <PoProvider>
            <BrowserRouter>
              <ThemeProvider theme={theme}>
                <AppRoutes />
              </ThemeProvider>
            </BrowserRouter>
          </PoProvider>
        </CoProvider>
      </MasterProvider>
    </UserProvider>
  </React.StrictMode>
);
