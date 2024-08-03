import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DashboardIcon from "@mui/icons-material/Dashboard";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "./topbar.css";

export const Topbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const jwtToken = null;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    setAnchorElUser(null);
    // logout();
  };

  return (
    <AppBar position="fixed">
      {/* <Container maxWidth="xl"> */}
      <Toolbar disableGutters>
        <DashboardIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          onClick={() => {
            createTask({});
          }}
        >
          Task Board
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ flexGrow: 0 }}>
          {jwtToken == null ? (
            <div>he</div>
          ) : (
            <>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {<img className="profile-pic" src={pic} alt="Logo" />}
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
};
