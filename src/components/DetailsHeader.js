import React, { useContext } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import styles from "../styles/styles";
import CircleIcon from "@mui/icons-material/Circle";
import InvoiceDrawer from "./InvoiceDrawer";
import InvoiceFinder from "../APIs/InvoiceFinder";
import { useNavigate } from "react-router-dom";
import { InvoicesContext } from "../context/InvoicesContext";
import DetailsDeleteModal from "./DetailsDeleteModal";

const DetailsHeader = ({ id, form }) => {
  const { invoices, capitalizeFirstLetter } = useContext(InvoicesContext);

  let navigate = useNavigate();

  async function handleMarkAsPaid() {
    console.log("marking as paid...");
    // get the invoice with the matching id, and mark as paid
    const nowPaid = invoices.map((item) => {
      return item.id === id ? { ...item, status: "paid" } : item;
    });
    const getInvoiceWithMatchingId = nowPaid.filter(
      (invoice) => invoice.id === id
    );
    // conver object-array with length of 1 to an object
    const convertToObject = getInvoiceWithMatchingId[0];
    try {
      const response = await InvoiceFinder.put(`/${id}`, convertToObject);

      navigate("/");
      navigate("/test");
      navigate(`/invoices/${id}`);
    } catch (error) {
      console.log("error---------", error);
    }
  }

  return (
    <Grid container sx={{ ...styles[93] }}>
      <Box sx={{ ...styles[94] }}>
        <Box variant="contained" sx={{ ...styles[95] }}>
          <Typography sx={{ ...styles[96] }}>Status</Typography>
        </Box>
        <Box className={form.status} id="status-box" sx={{ ...styles[97] }}>
          <CircleIcon sx={{ ...styles[98] }} />
          <Typography sx={{ ...styles[96] }}>
            {form.status && capitalizeFirstLetter(form.status)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ ...styles[99] }}>
        {form.status !== "paid" && (
          <InvoiceDrawer
            buttonBackground="#F9FAFE"
            buttonColor="#7E88C3"
            buttonText="Edit"
            form={form}
          />
        )}

        <DetailsDeleteModal id={id} />

        {form.status === "pending" && (
          <Button
            //   onClick={handleSubmit}
            onClick={handleMarkAsPaid}
            type="submit"
            variant="contained"
            color="purple"
            sx={{ ...styles[100] }}
          >
            Mark as Paid
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default DetailsHeader;

// import React, { useContext, useEffect } from "react";
// import { Box, Button, Typography, Grid } from "@mui/material";
// import styles from "../styles/styles";
// import CircleIcon from "@mui/icons-material/Circle";
// import InvoiceDrawer from "./InvoiceDrawer";
// import InvoiceFinder from "../APIs/InvoiceFinder";
// import { useNavigate } from "react-router-dom";
// import { InvoicesContext } from "../context/InvoicesContext";
// import DetailsDeleteModal from "./DetailsDeleteModal";

// const DetailsHeader = ({ id, form }) => {
//   const { contextForm, setContextForm, invoices, setInvoices } =
//     useContext(InvoicesContext);

//   // change this to use the item.id when it is dynamically rendered
//   // let { id } = useParams();
//   let navigate = useNavigate();

//   function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

//   // console.log("contextForm @ DETAILS HEADER", contextForm);
//   // console.log("id", id);

//   async function handleMarkAsPaid() {
//     console.log("marking as paid...");

//     console.log("invoices", invoices);

//     const nowPaid = invoices.map((item) => {
//       return item.id === id ? { ...item, status: "paid" } : item;
//     });

//     console.log("------------- NOW PAID", nowPaid);

//     let getInvoiceWithMatchingId = nowPaid.filter(
//       (invoice) => invoice.id === id
//     );
//     // console.log("getInvoiceWithMatchingId", getInvoiceWithMatchingId);

//     const convertToObject = getInvoiceWithMatchingId[0];
//     // console.log("OBJECT", convertToObject);
//     try {
//       const response = await InvoiceFinder.put(`/${id}`, convertToObject);
//       // console.log("update response", response.data.data.invoice);

//       navigate("/");
//       navigate("/test");
//       navigate(`/invoices/${id}`);
//     } catch (error) {
//       console.log("error---------", error);
//     }
//   }

//   // console.log("invoices", invoices);

//   useEffect(() => {
//     console.log("USE EFFECT RUNNING");
//     let getInvoiceWithMatchingId = invoices.filter(
//       (invoice) => invoice.id === id
//     );
//     // console.log("getInvoiceWithMatchingId", getInvoiceWithMatchingId);

//     // convert object array to object
//     let editForm = getInvoiceWithMatchingId[0];
//     // console.log("updated invoice", editForm);
//   }, []);

//   return (
//     <Grid container sx={{ ...styles[93] }}>
//       <Box sx={{ ...styles[94] }}>
//         <Box variant="contained" sx={{ ...styles[95] }}>
//           <Typography sx={{ ...styles[96] }}>Status</Typography>
//         </Box>
//         <Box className={form.status} id="status-box" sx={{ ...styles[97] }}>
//           <CircleIcon sx={{ ...styles[98] }} />
//           <Typography sx={{ ...styles[96] }}>
//             {form.status && capitalizeFirstLetter(form.status)}
//           </Typography>
//         </Box>
//       </Box>
//       <Box sx={{ ...styles[99] }}>
//         {form.status !== "paid" && (
//           <InvoiceDrawer
//             buttonBackground="#F9FAFE"
//             buttonColor="#7E88C3"
//             buttonText="Edit"
//             form={form}
//           />
//         )}

//         <DetailsDeleteModal id={id} />

//         {form.status === "pending" && (
//           <Button
//             //   onClick={handleSubmit}
//             onClick={handleMarkAsPaid}
//             type="submit"
//             variant="contained"
//             color="purple"
//             sx={{ ...styles[100] }}
//           >
//             Mark as Paid
//           </Button>
//         )}
//       </Box>
//     </Grid>
//   );
// };

// export default DetailsHeader;
