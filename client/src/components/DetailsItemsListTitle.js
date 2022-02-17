import React from "react";
import { Typography, Grid } from "@mui/material";
import styles from "../styles/styles";

const DetailsItemsList = () => {
  return (
    <>
      <Grid item sm={6} sx={{ display: { xs: "none", sm: "inline" } }}>
        <Typography variant="h5" sx={{ ...styles[90] }}>
          Item Name
        </Typography>
      </Grid>
      <Grid item sm={1} sx={{ display: { xs: "none", sm: "inline" } }}>
        <Typography variant="h5" textAlign="center" sx={{ ...styles[90] }}>
          QTY.
        </Typography>
      </Grid>
      <Grid item sm={2.5} sx={{ display: { xs: "none", sm: "inline" } }}>
        <Typography variant="h5" textAlign="right" sx={{ ...styles[90] }}>
          Price
        </Typography>
      </Grid>
      <Grid item sm={2.5} sx={{ display: { xs: "none", sm: "inline" } }}>
        <Typography variant="h5" textAlign="right" sx={{ ...styles[90] }}>
          Total
        </Typography>
      </Grid>
    </>
  );
};

export default DetailsItemsList;
