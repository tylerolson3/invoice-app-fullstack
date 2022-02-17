import { useContext } from "react";
import styles from "../styles/styles";
import { Typography, Box, useMediaQuery } from "@mui/material";
import InvoiceDrawer from "./InvoiceDrawer";
import { InvoicesContext } from "../context/InvoicesContext";
import FilterMenu from "./FilterMenu";

const Header = () => {
  const isMobileDisplay = useMediaQuery("(max-width:750px)");
  const { displayLength } = useContext(InvoicesContext);

  // conditionally render display text based upon screen size
  const responsiveText = isMobileDisplay ? "New" : "New Invoice";
  const responsiveTitle = isMobileDisplay ? "Filter" : "Filter By Status";
  const invoicesTitle = isMobileDisplay
    ? `${displayLength} invoices`
    : `There are ${displayLength} total invoices`;

  return (
    <Box sx={{ ...styles[21] }}>
      <Box>
        <Typography gutterBottom variant="h3" sx={{ ...styles[22] }}>
          Invoices
        </Typography>
        <Typography sx={{ ...styles[23] }}>{invoicesTitle}</Typography>
      </Box>
      <Box sx={{ ...styles[24] }}>
        <FilterMenu title={responsiveTitle} />
        <InvoiceDrawer
          buttonBackground="#7C5DFA"
          buttonColor="#ffffff"
          buttonText={responsiveText}
        />
      </Box>
    </Box>
  );
};

export default Header;
