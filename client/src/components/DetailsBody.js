import styles from "../styles/styles";
import { Box, Typography, Grid } from "@mui/material";
import DetailsItemsListTitle from "./DetailsItemsListTitle";
import DetailsItemsListBody from "./DetailsItemsListBody";
import DetailsItemsListTotal from "./DetailsItemsListTotal";

const DetailsBody = ({ form }) => {
  function displayMonthName(numDate) {
    return new Date(numDate).toLocaleDateString("en-gb", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={0}
        columns={12}
        sx={{ ...styles[85] }}
      >
        <Grid
          item
          xs={12}
          sm={4}
          md={6}
          container
          direction="column"
          spacing={2}
        >
          <Grid item sm>
            <Typography sx={{ fontSize: "1rem", fontWeight: 700 }}>
              <span id="hash-sign">#</span>
              {form.id}
            </Typography>
            <Typography sx={{ ...styles[86] }}>{form.description}</Typography>
          </Grid>
        </Grid>
        <Grid item sm={4} md={1} sx={{ ...styles[114] }}></Grid>
        <Grid item sm={4} md={4} container direction="column" spacing={2}>
          <Grid item sm sx={{ mr: { sm: "10px", md: "0" } }}>
            <Typography sx={{ ...styles[87] }}>{form.sender_street}</Typography>
            <Typography sx={{ ...styles[87] }}>{form.sender_city}</Typography>
            <Typography sx={{ ...styles[87] }}>
              {form.sender_post_code}
            </Typography>
            <Typography sx={{ ...styles[87] }}>
              {form.sender_country}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={6}
          sm={3.5}
          direction="column"
          sx={{ minHeight: "200px" }}
        >
          <Grid item sm>
            <Typography sx={{ ...styles[88] }}>Invoice Date</Typography>
            <Typography sx={{ ...styles[89] }}>
              {displayMonthName(form.created_at)}
            </Typography>
            <Box>
              <Typography sx={{ ...styles[88] }}>Payment Due</Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: 700 }}>
                {displayMonthName(form.payment_due) || ""}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container item xs={6} sm={3.5} direction="column">
          <Grid item sm>
            {" "}
            <Typography sx={{ ...styles[88] }}>Bill To</Typography>
            <Typography sx={{ ...styles[89] }}>{form.client_name}</Typography>
            <Typography sx={{ ...styles[90] }}>{form.client_street}</Typography>
            <Typography sx={{ ...styles[90] }}>{form.client_city}</Typography>
            <Typography sx={{ ...styles[90] }}>
              {form.client_post_code}
            </Typography>
            <Typography sx={{ ...styles[90] }}>
              {form.client_country}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={5} direction="column">
          <Grid item sm>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ ...styles[88], mt: { xs: "-35px", sm: 0 } }}
            >
              Sent to
            </Typography>
            <Typography sx={{ ...styles[89] }}>{form.client_email}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={2}
          columns={12}
          spacing={0}
          sx={{ ...styles[91] }}
        >
          <DetailsItemsListTitle />
          <DetailsItemsListBody form={form} />
        </Grid>
        <Grid
          container
          rowSpacing={2}
          columns={12}
          spacing={0}
          sx={{ ...styles[92] }}
        >
          <DetailsItemsListTotal form={form} />
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsBody;
