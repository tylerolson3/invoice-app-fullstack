import { useContext } from "react";
import { Box, Typography, Grid } from "@mui/material";
import styles from "../styles/styles";
import { InvoicesContext } from "../context/InvoicesContext";

const DetailsItemsListTotal = ({ form }) => {
  // console.log("DetailsItemsListTotal", form);
  const { twoDecimalPlace } = useContext(InvoicesContext);

  return (
    <Box sx={{ ...styles[108] }}>
      <Grid item sm={6}>
        <Typography textAlign="left" variant="h5" sx={{ ...styles[109] }}>
          Amount Due
        </Typography>
      </Grid>

      <Grid item sm={6}>
        <Typography variant="h5" textAlign="right" sx={{ ...styles[110] }}>
          {/* ${form.total} */}${twoDecimalPlace(form.total)}
        </Typography>
      </Grid>
    </Box>
  );
};

export default DetailsItemsListTotal;
