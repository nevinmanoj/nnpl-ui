import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DashboardIcon from "@mui/icons-material/Dashboard";

import "./topbar.css";

export const Topbar = () => {
  return (
    <AppBar position="fixed" className="topbar-outer">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DashboardIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography variant="h6" noWrap>
            NNPL
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
