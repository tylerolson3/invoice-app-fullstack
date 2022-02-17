import { useContext } from "react";
import { Typography, Grid } from "@mui/material";
import styles from "../styles/styles";
import { InvoicesContext } from "../context/InvoicesContext";

const DetailsItemsListBody = ({ form }) => {
  const { twoDecimalPlace } = useContext(InvoicesContext);
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography sx={{ ...styles[104] }}>{form.item_name}</Typography>
      </Grid>
      <Grid item xs={1} sm={1}>
        <Typography textAlign="center" sx={{ ...styles[105] }}>
          {form.item_quantity}x
        </Typography>
      </Grid>
      <Grid item xs={5} sm={2.5}>
        <Typography textAlign="right" sx={{ ...styles[106] }}>
          {/* {form.item_price} */}
          {twoDecimalPlace(form.item_price)}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={2.5}>
        <Typography variant="h5" textAlign="right" sx={{ ...styles[107] }}>
          {/* {form.total} */}
          {twoDecimalPlace(form.total)}
        </Typography>
      </Grid>
    </>
  );
};

export default DetailsItemsListBody;
