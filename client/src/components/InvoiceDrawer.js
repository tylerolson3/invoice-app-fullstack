import React from "react";
import styles from "../styles/styles";
import { Drawer, Button } from "@mui/material";
import InvoiceForm from "./InvoiceForm";
import InvoiceEdit from "./InvoiceEdit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

function InvoiceDrawer({ buttonBackground, buttonColor, buttonText, form }) {
  let { id } = useParams();
  const isMobileDisplay = useMediaQuery("(max-width:750px)");

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // if we're on a page that has an id param, render the edit form.  else, render the new invoice form
  const list = (anchor) => (
    <>
      {" "}
      {id ? (
        <InvoiceEdit id={id} />
      ) : (
        <InvoiceForm isMobileDisplay={isMobileDisplay} />
      )}
    </>
  );

  // if the id param exists, we want a gray button, if not, a purple button
  const buttonClassName = id ? "gray" : "purple";

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            variant="contained"
            color={buttonClassName}
            onClick={toggleDrawer(anchor, true)}
          >
            {(buttonText === "New Invoice" || buttonText === "New") && (
              <AddCircleIcon sx={{ ...styles[25] }} />
            )}{" "}
            {buttonText}
          </Button>
          <Drawer
            variant="temporary"
            ModalProps={{
              keepMounted: true,
            }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            <Button
              onClick={toggleDrawer(anchor, false)}
              variant="contained"
              color="grayForm"
              sx={{ ...styles[26] }}
            >
              Discard
            </Button>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default InvoiceDrawer;
