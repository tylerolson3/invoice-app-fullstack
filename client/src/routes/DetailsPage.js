import { useEffect, useState } from "react";
import styles from "../styles/styles";
// import NewInvoice from "../components/InvoiceDrawer";
import DetailsBody from "../components/DetailsBody";
import { useParams } from "react-router-dom";
import InvoiceFinder from "../APIs/InvoiceFinder";
import DetailsHeader from "../components/DetailsHeader";
import { Box, Container, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const DetailsPage = (props) => {
  let { id } = useParams();
  const [form, setForm] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await InvoiceFinder.get(`/${id}`);
      setForm(response.data.data.invoice);
    };
    fetchData();
  }, [id]);

  return (
    <Container sx={{ ...styles[6] }}>
      <Box>
        <Button
          onClick={() => navigate("/")}
          variant="text"
          sx={{ ...styles[7], mb: { xs: "10px", sm: "20px" } }}
        >
          <ArrowBackIosIcon sx={{ ...styles[8] }} />
          <Typography variant="h5" color="text.secondary" sx={{ ...styles[9] }}>
            Go Back
          </Typography>
        </Button>
        <DetailsHeader id={id} form={form} />
        <DetailsBody form={form} />
      </Box>
    </Container>
  );
};

export default DetailsPage;
