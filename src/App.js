import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage";
import DetailsPage from "./routes/DetailsPage";
import TestPage from "./routes/TestPage";
import { CssBaseline, Box, useMediaQuery } from "@mui/material";
import { InvoicesContextProvider } from "./context/InvoicesContext";
import NavBarHorizontal from "./components/NavBarHorizontal";
import NavBarVertical from "./components/NavBarVertical";
import "./App.css";
import styles from "./styles/styles";

function App() {
  const isMobileDisplay = useMediaQuery("(max-width:1025px)");
  return (
    <InvoicesContextProvider>
      <Box sx={{ ...styles[1] }}>
        {isMobileDisplay ? <NavBarHorizontal /> : <NavBarVertical />}
        <Box sx={{ ...styles[2] }}>
          <CssBaseline />
          <Box sx={{ ...styles[3] }}>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/invoices/:id" element={<DetailsPage />} />
                <Route path="/test" element={<TestPage />} />
              </Routes>
            </Router>
          </Box>
        </Box>
      </Box>
    </InvoicesContextProvider>
  );
}

export default App;
