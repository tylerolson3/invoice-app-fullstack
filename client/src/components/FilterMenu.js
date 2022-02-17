import { useState, useContext } from "react";
import {
  IconButton,
  Menu,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { InvoicesContext } from "../context/InvoicesContext";

export default function FilterMenu({ title }) {
  const { filterCheckboxes, handleCheckBox } = useContext(InvoicesContext);

  const styles = {
    color: "#7C5DFA",
    "&.Mui-checked": {
      color: "#7C5DFA",
    },
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        aria-label="Open to show more"
        title="Open to show more"
        sx={{ mr: { xs: "10px", sm: "15px" } }}
      >
        <Typography
          sx={{
            color: "#0C0E16",
            fontWeight: 700,
            fontSize: "0.91rem",
            mr: { xs: "3px", sm: "5px" },
            mt: "5px",
            paddingX: 0,
          }}
          gutterBottom
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
        {anchorEl ? (
          <KeyboardArrowUpIcon
            sx={{
              color: "#7C5DFA",
              transform: "scale(0.9)",
              stroke: "#7C5DFA",
              strokeWidth: 2,
            }}
          />
        ) : (
          <KeyboardArrowDownIcon
            sx={{
              color: "#7C5DFA",
              transform: "scale(0.9)",
              stroke: "#7C5DFA",
              strokeWidth: 2,
            }}
          />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <FormGroup
          id="text-field"
          sx={{
            paddingX: "1rem",
            color: "#0C0E16",
            fontWeight: 700,
            fontSize: "0.91rem",
          }}
        >
          <FormControlLabel
            control={<Checkbox sx={{ ...styles }} />}
            checked={filterCheckboxes.draft}
            onChange={handleCheckBox}
            label="Draft"
            name="draft"
          />
          <FormControlLabel
            control={<Checkbox sx={{ ...styles }} />}
            label="Pending"
            checked={filterCheckboxes.pending}
            onChange={handleCheckBox}
            name="pending"
          />
          <FormControlLabel
            control={<Checkbox sx={{ ...styles }} />}
            checked={filterCheckboxes.paid}
            onChange={handleCheckBox}
            label="Paid"
            name="paid"
          />
        </FormGroup>
      </Menu>
    </>
  );
}
