import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../styles/styles";
import Modal from "@mui/material/Modal";
import InvoiceFinder from "../APIs/InvoiceFinder";

import { useNavigate } from "react-router-dom";

export default function DetailsDeleteModal({ id }) {
  let navigate = useNavigate();

  async function handleDelete(id) {
    console.log(`deleting ${id}....`);
    const response = await InvoiceFinder.delete(`/${id}`);
    console.log(response);
    navigate("/");
    try {
    } catch (err) {
      console.log(err);
    }
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        color="red"
        sx={{ marginRight: "5px" }}
        onClick={handleOpen}
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...styles[101] }}>
          <Typography sx={{ ...styles[103] }}>Confirm Deletion</Typography>
          <Typography sx={{ ...styles[102] }}>
            Are you sure you want to delete invoice #{id}? This action cannot be
            undone.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="gray" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(id)}
              variant="contained"
              color="red"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
