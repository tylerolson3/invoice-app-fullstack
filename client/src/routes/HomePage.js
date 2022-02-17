import React from "react";
import styles from "../styles/styles";
import InvoicesList from "../components/InvoicesList";
import Header from "../components/Header";
import { Box, Container } from "@mui/material";

const HomePage = () => {
  return (
    <Container sx={{ ...styles[4] }}>
      <Box sx={{ ...styles[5] }}>
        <Header />
        <InvoicesList />
      </Box>
    </Container>
  );
};

export default HomePage;
