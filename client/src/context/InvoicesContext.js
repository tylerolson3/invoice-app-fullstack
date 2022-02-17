import { useState, createContext } from "react";
import { object, string, number } from "yup";
import { parseISO } from "date-fns";

export const InvoicesContext = createContext();

export const InvoicesContextProvider = (props) => {
  const [invoices, setInvoices] = useState([]);
  const [contextForm, setContextForm] = useState([]);
  const [displayLength, setDisplayLength] = useState("");

  const [filterCheckboxes, setFilterCheckboxes] = useState({
    draft: false,
    pending: false,
    paid: false,
  });

  function handleCheckBox(e) {
    setFilterCheckboxes((prevBoxes) => {
      return {
        ...prevBoxes,
        [e.target.name]: e.target.checked,
      };
    });
  }

  function addInvoice(invoice) {
    setInvoices((prevInvoices) => [...prevInvoices, invoice]);
  }

  function generateInvoiceId() {
    const randomFourDigits = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomChar1 = alphabet[Math.floor(Math.random() * alphabet.length)];
    const randomChar2 = alphabet[Math.floor(Math.random() * alphabet.length)];
    const randomId = `${randomChar1}${randomChar2}${randomFourDigits}`;
    return randomId;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function twoDecimalPlace(num) {
    return currencyFormatter.format(num);
  }

  function calcDueDate(myDate, n) {
    let formattedDate = new Date(parseISO(myDate));
    // console.log("formattedDate", formattedDate);
    const addedDays = new Date(
      formattedDate.setDate(formattedDate.getDate() + n)
    );
    // console.log("addedDays", addedDays);
    const yyyyFormat = addedDays.toISOString().slice(0, 10);
    // console.log("yyyyFormat", yyyyFormat);
    return yyyyFormat;
  }

  let userSchema = object({
    clientCity: string()
      .required("Required")
      .matches(/^([^0-9]*)$/, "No numbers"),
    clientCountry: string()
      .required("Required")
      .matches(/^([^0-9]*)$/, "No numbers"),
    clientEmail: string()
      .email("Must be valid email format")
      .required("Required"),
    clientName: string()
      .required("Required")
      .matches(/^([^0-9]*)$/, "Name should not contain numbers"),
    clientPostcode: string().required("Required"),
    clientStreet: string().required("Required"),
    description: string().required("Required"),
    itemName: string().required("Required"),
    itemPrice: number()
      .required("Req.")
      .typeError("Num Req.")
      .min(0.01, "Enter a postive number"),
    itemQuanity: number()
      .required("Req.")
      .typeError("Num.")
      .positive("Enter a positve number"),
    senderCity: string()
      .required("Required")
      .matches(/^([^0-9]*)$/, "No numbers"),
    senderCountry: string()
      .required("Required")
      .matches(/^([^0-9]*)$/, "No numbers"),
    senderPostCode: string().required("Required"),
    senderStreet: string().required("Required"),
  });

  function displayMonthName(numDate) {
    return new Date(numDate).toLocaleDateString("en-gb", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <InvoicesContext.Provider
      value={{
        invoices,
        setInvoices,
        addInvoice,
        filterCheckboxes,
        setFilterCheckboxes,
        handleCheckBox,
        generateInvoiceId,
        contextForm,
        setContextForm,
        displayLength,
        setDisplayLength,
        capitalizeFirstLetter,
        currencyFormatter,
        twoDecimalPlace,
        userSchema,
        displayMonthName,
        calcDueDate,
      }}
    >
      {props.children}
    </InvoicesContext.Provider>
  );
};
