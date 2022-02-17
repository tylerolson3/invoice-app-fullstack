import { useEffect, useContext } from "react";
import styles from "../styles/styles";
import InvoiceFinder from "../APIs/InvoiceFinder";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import { InvoicesContext } from "../context/InvoicesContext";
import { useNavigate } from "react-router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function InvoicesList() {
  const {
    invoices,
    setInvoices,
    filterCheckboxes,
    setDisplayLength,
    twoDecimalPlace,
    displayMonthName,
    capitalizeFirstLetter,
  } = useContext(InvoicesContext);

  let navigate = useNavigate();

  // fetch all the invoices from the API when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await InvoiceFinder.get("/");
        setInvoices(response.data.data.invoices);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // from the filter status drop-down menu, get the key names (pending, draft, paid)
  const keyNames = Object.keys(filterCheckboxes);
  //  get an array of only the key names that are checked
  const trueKeyNames = keyNames.filter((item) => filterCheckboxes[item]);
  // only display the invoices who's status matches what is checked on the filter menu
  const filteredInvoices = invoices.filter((item) =>
    trueKeyNames.includes(item.status)
  );
  // if no statuses are checked & the filterInvoices array is empty, then display all the invoices
  const myDisplayedInvoices =
    filteredInvoices.length < 1 ? invoices : filteredInvoices;

  const invoicesSummaryList = myDisplayedInvoices.map((item) => (
    <Card
      onClick={() => navigate(`/invoices/${item.id}`)}
      key={item.id}
      sx={{ ...styles[10] }}
    >
      <CardActionArea>
        <CardContent className="grid-container" sx={{ ...styles[11] }}>
          <Typography className="grid-id" sx={{ ...styles[12] }}>
            <span id="hash-sign">#</span>
            {item.id}
          </Typography>
          <Typography
            className="grid-payment-due"
            // variant="h5"
            align="left"
            sx={{ ...styles[13] }}
          >
            Due {displayMonthName(item.payment_due)}
          </Typography>
          <Typography className="grid-name" sx={{ ...styles[14] }}>
            {item.client_name}
          </Typography>
          <Typography className="grid-total" sx={{ ...styles[15] }}>
            ${twoDecimalPlace(item.total)}
          </Typography>
          <Box className={`grid-status ${item.status}`} sx={{ ...styles[16] }}>
            <CircleIcon sx={{ ...styles[17] }} />
            <Typography sx={{ ...styles[18] }}>
              {capitalizeFirstLetter(item.status)}
            </Typography>
          </Box>
          <ArrowForwardIosIcon sx={{ ...styles[19] }} />
        </CardContent>
      </CardActionArea>
    </Card>
  ));

  // when the filter menue changes the display, re-calc invoices.length so it can be displayed in the sub-title
  useEffect(() => {
    setDisplayLength(invoicesSummaryList.length);
  }, [invoicesSummaryList]);

  return (
    <>
      <Box sx={{ ...styles[20] }}>{invoicesSummaryList}</Box>
    </>
  );
}

export default InvoicesList;
