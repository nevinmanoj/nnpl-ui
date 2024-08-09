import "./topbar.scss";

import { useState } from "react";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

import { topBarOptions } from "../../constants/topBarOptions";

export const Topbar = () => {
  const navigator = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const jwtToken = "null";

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
    <div className="topbar-outer2">
      <div className="topbar-logo">
        <DashboardIcon
          sx={{ display: { xs: "none", md: "flex" }, color: "white", mr: 1 }}
        />
        <Typography
          sx={{ color: "white", marginRight: "20px" }}
          variant="h5"
          noWrap
        >
          NNPL
        </Typography>
      </div>
      {topBarOptions.map((v, i) => (
        <Button
          sx={{ color: "white", marginRight: "10px" }}
          className="topbar-button"
          variant="text"
          onClick={() => navigator(v.path)}
        >
          {v.value}
        </Button>
      ))}

      <div className="topbar-profile">
        {jwtToken == null ? (
          <div>
            <Button variant="text">Login</Button>
          </div>
        ) : (
          <>
            <Typography
              sx={{ color: "white", marginRight: "20px" }}
              variant="h6"
              noWrap
            >
              Nevin Manoj
            </Typography>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                backgroundColor: "beige",
              }}
            >
              <PersonIcon
                sx={{
                  height: "35px",
                  width: "35px",
                  borderRadius: "40px",
                }}
              />
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
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};
