import React from "react";
import Box from "@mui/material/Box";
import userPhoto from "../image-avatar.jpg";
import logo from "../logo.png";
import styles from "../styles/styles";

const ResponsiveNavBar = () => {
  return (
    <Box sx={{ ...styles[112] }}>
      <img src={logo} width="80px" alt="logo" height="80px" />
      <Box sx={{ ...styles[113] }}>
        <img
          id="user-photo"
          src={userPhoto}
          alt="user-profile"
          width="40px"
          height="40px"
        />
      </Box>
    </Box>
  );
};

export default ResponsiveNavBar;
