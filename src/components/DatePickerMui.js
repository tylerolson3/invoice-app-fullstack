import { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { parseISO } from "date-fns";

export default function DatePickerMui({ dateValue, setDateValue }) {
  const [value, setValue] = useState(dateValue);

  const style = {
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "#7C5DFA",
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        placeholder="select a date"
        inputFormat="MM/dd/yyyy"
        value={parseISO(value)}
        onChange={(newValue) => {
          setValue(newValue.toISOString().slice(0, 10));
          setDateValue(newValue.toISOString().slice(0, 10));
        }}
        renderInput={(params) => (
          <TextField
            id="text-field"
            sx={{ ...style, minWidth: "100%" }}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
}
