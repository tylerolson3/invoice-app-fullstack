import React from "react";
import Box from "@mui/material/Box";
import userPhoto from "../image-avatar.jpg";
import logo from "../logo.png";
import styles from "../styles/styles";

const NavBarHorizontal = () => {
  return (
    <Box sx={{ ...styles[111] }}>
      <img src={logo} alt="logo" width="80px" height="80px" />
      <Box sx={{ mr: "30px", display: "flex" }}>
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

export default NavBarHorizontal;
