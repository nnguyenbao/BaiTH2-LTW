import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

function TopBar() {
  const location = useLocation();

  const getAppContext = () => {
    const pathParts = location.pathname.split("/");

    try {
      if (pathParts[1] === "users" && pathParts.length === 3) {
        const userId = pathParts[2];
        const user = models.userModel(userId);
        return user ? `${user.first_name} ${user.last_name}` : "User Details";
      }

      if (pathParts[1] === "photos" && pathParts.length === 3) {
        const userId = pathParts[2];
        const user = models.userModel(userId);

        return user
          ? `Photos of ${user.first_name} ${user.last_name}`
          : "User Photos";
      }
    } catch (e) {
      console.error("Không tìm thấy người dùng:", e);
      return pathParts[1] === "users" ? "User Details" : "User Photos";
    }

    return "User List";
  };

  const appContext = getAppContext();

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
          Nguyễn Đình Bảo B22DCAT030
        </Typography>
        <Typography variant="h5" color="inherit">
          {appContext}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
