import axios from "axios";
import axiosRetry from "axios-retry";

const InvoiceFinder = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3001/api/v1/invoices"
      : "https://alluring-bryce-canyon-75245.herokuapp.com/api/v1/restaurants",
  timeout: 5000,
});

axiosRetry(InvoiceFinder, { retries: 3 });

export default InvoiceFinder;