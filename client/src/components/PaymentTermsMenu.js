import { useState, useEffect } from "react";
import { Box, MenuItem, FormControl, Select } from "@mui/material";

export default function PaymentTermsMenu({
  paymentTermsValue,
  setPaymentTermsValue,
  prevPaymentTermsValue,
  id,
}) {
  const [terms, setTerms] = useState(parseInt(prevPaymentTermsValue) || 1);
  // console.log("prev payment terms", prevPaymentTermsValue);
  // console.log("payment terms value", paymentTermsValue);
  // console.log("payment state value", terms);
  // console.log("ID @ payment terms", id);

  const style = {
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "#7C5DFA",
      },
    },
  };

  // if the id param exists (aka the payment terms value arleady exists), set the edit form menu w it's value
  useEffect(() => {
    if (id !== undefined) {
      setTerms(prevPaymentTermsValue);
    }
  }, []);

  const handleChange = (event) => {
    setTerms(event.target.value);
    setPaymentTermsValue(event.target.value);
  };

  useEffect(() => {
    // console.log("TERMS CHANGED");
    setPaymentTermsValue(terms);
  }, [terms]);

  return (
    <Box sx={{ ...style, minWidth: 120 }}>
      <FormControl fullWidth id="text-field">
        <Select
          placeholder="grayvy"
          labelId="demo-simple-select-label"
          id="text-field"
          value={id !== undefined ? prevPaymentTermsValue : terms}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>select</em>
          </MenuItem>
          <MenuItem id="text-field" value={1}>
            Net 1 Day
          </MenuItem>
          <MenuItem id="text-field" value={7}>
            Net 7 Days
          </MenuItem>
          <MenuItem id="text-field" value={30}>
            Net 30 Days
          </MenuItem>
          <MenuItem id="text-field" value={60}>
            Net 60 Days
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
