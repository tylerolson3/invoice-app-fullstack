import { useState, useContext, useEffect } from "react";
import styles from "../styles/styles";
import { Typography, InputBase, Button, TextField, Box } from "@mui/material";
import InvoiceFinder from "../APIs/InvoiceFinder";
import { useNavigate } from "react-router-dom";
import DatePickerMui from "./DatePickerMui";
import PaymentTermsMenu from "./PaymentTermsMenu";
import { InvoicesContext } from "../context/InvoicesContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const InvoiceEdit = ({ id }) => {
  const { invoices, twoDecimalPlace, userSchema, calcDueDate } =
    useContext(InvoicesContext);
  let navigate = useNavigate();

  const getInvoiceWithMatchingId = invoices.filter(
    (invoice) => invoice.id === id
  );
  // convert object array to object
  const editForm = getInvoiceWithMatchingId[0];

  const [invoiceForm, setInvoiceForm] = useState({
    clientCity: editForm?.client_city,
    clientCountry: editForm?.client_country,
    clientEmail: editForm?.client_email,
    clientName: editForm?.client_name,
    clientPostcode: editForm?.client_post_code,
    clientStreet: editForm?.client_street,
    createdAt: editForm?.created_at || "2011-11-11",
    description: editForm?.description,
    id: editForm?.id,
    itemName: editForm?.item_name,
    itemPrice: editForm?.item_price,
    itemQuanity: editForm?.item_quantity,
    paymentDue: editForm?.payment_due,
    paymentTerms: editForm?.payment_terms || 90,
    senderCity: editForm?.sender_city,
    senderCountry: editForm?.sender_country,
    senderPostCode: editForm?.sender_post_code,
    senderStreet: editForm?.sender_street,
    status: editForm?.status,
    total: editForm?.total,
  });

  const [paymentTermsValue, setPaymentTermsValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(userSchema),
  });

  // function calcDueDate(myDate, n) {
  //   let formattedDate = new Date(parseISO(myDate));
  //   // console.log("formattedDate", formattedDate);
  //   const addedDays = new Date(
  //     formattedDate.setDate(formattedDate.getDate() + n)
  //   );
  //   // console.log("addedDays", addedDays);
  //   const yyyyFormat = addedDays.toISOString().slice(0, 10);
  //   // console.log("yyyyFormat", yyyyFormat);
  //   return yyyyFormat;
  // }

  // update the form for the single invoice when there's a change to the entire invoices array
  useEffect(() => {
    setInvoiceForm({
      clientCity: editForm?.client_city || "",
      clientCountry: editForm?.client_country || "",
      clientEmail: editForm?.client_email || "",
      clientName: editForm?.client_name || "",
      clientPostcode: editForm?.client_post_code || "",
      clientStreet: editForm?.client_street || "",
      createdAt: editForm?.created_at || "1999-09-09",
      description: editForm?.description || "",
      id: editForm?.id || "",
      itemName: editForm?.item_name || "",
      itemPrice: editForm?.item_price || "",
      itemQuanity: editForm?.item_quantity || "",
      paymentDue: editForm?.payment_due || "",
      paymentTerms: editForm?.payment_terms || 90,
      senderCity: editForm?.sender_city || "",
      senderCountry: editForm?.sender_country || "",
      senderPostCode: editForm?.sender_post_code || "",
      senderStreet: editForm?.sender_street || "",
      status: editForm?.status || "",
      total: editForm?.total || "",
    });
  }, [invoices]);

  // when the payment terms value changes, re-render the form w the updated payment terms
  useEffect(() => {
    setInvoiceForm((prevForm) => ({
      ...prevForm,
      paymentTerms: paymentTermsValue,
      paymentDue: calcDueDate(invoiceForm.createdAt, paymentTermsValue),
    }));
  }, [paymentTermsValue]);

  // when item quantity or price change, update the total price value on the form
  useEffect(() => {
    setInvoiceForm((prevForm) => ({
      ...prevForm,
      total: invoiceForm.itemPrice * invoiceForm.itemQuanity,
    }));
  }, [invoiceForm.itemPrice, invoiceForm.itemQuanity]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      console.log("submitting...");
      const response = await InvoiceFinder.put(`/${id}`, {
        client_city: invoiceForm.clientCity,
        client_country: invoiceForm.clientCountry,
        client_email: invoiceForm.clientEmail,
        client_name: invoiceForm.clientName,
        client_post_code: invoiceForm.clientPostcode,
        client_street: invoiceForm.clientStreet,
        created_at: invoiceForm.createdAt,
        description: invoiceForm.description,
        id: invoiceForm.id,
        item_name: invoiceForm.itemName,
        item_price: invoiceForm.itemPrice,
        item_quantity: invoiceForm.itemQuanity,
        payment_due: invoiceForm.paymentDue,
        payment_terms: invoiceForm.paymentTerms,
        sender_city: invoiceForm.senderCity,
        sender_country: invoiceForm.senderCountry,
        sender_post_code: invoiceForm.senderPostCode,
        sender_street: invoiceForm.senderStreet,
        status: "pending",
        total: invoiceForm.total,
      });
      console.log("update response", response.data.data.invoice);
      navigate("/");
      navigate("/test");
      navigate(`/invoices/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <Box sx={{ ...styles[65] }}>
        <Typography sx={{ ...styles[66] }}>
          Edit <span id="hash-sign">#</span>
          {invoiceForm.id}
        </Typography>
        <Box sx={{ ...styles[67] }}>
          <Typography sx={{ ...styles[68] }}>Bill From</Typography>
          <Box>
            <Typography sx={{ ...styles[69] }}>Street Name</Typography>
            <TextField
              name="senderStreet"
              {...register("senderStreet")}
              id="text-field"
              error={!!errors.senderStreet}
              helperText={
                errors.senderStreet ? (
                  errors?.senderStreet?.message
                ) : (
                  <span id="hide">l</span>
                )
              }
              sx={{ ...styles[41] }}
              value={invoiceForm.senderStreet}
              onChange={(e) =>
                setInvoiceForm((prevForm) => ({
                  ...prevForm,
                  senderStreet: e.target.value,
                }))
              }
            />
          </Box>
          <Box sx={{ ...styles[70] }}>
            <Box sx={{ ...styles[36] }}>
              <Typography sx={{ ...styles[44] }}>City</Typography>
              <TextField
                name="senderCity"
                {...register("senderCity")}
                id="text-field"
                error={!!errors.senderCity}
                helperText={
                  errors.senderCity ? (
                    errors?.senderCity?.message
                  ) : (
                    <span id="hide">l</span>
                  )
                }
                sx={{ ...styles[41] }}
                value={invoiceForm.senderCity}
                onChange={(e) =>
                  setInvoiceForm((prevForm) => ({
                    ...prevForm,
                    senderCity: e.target.value,
                  }))
                }
              />
            </Box>
            <Box sx={{ ...styles[36] }}>
              <Typography sx={{ ...styles[44] }}>Post Code</Typography>
              <TextField
                name="senderPostCode"
                {...register("senderPostCode")}
                id="text-field"
                error={!!errors.senderPostCode}
                helperText={
                  errors.senderPostCode ? (
                    errors?.senderPostCode?.message
                  ) : (
                    <span id="hide">l</span>
                  )
                }
                sx={{ ...styles[41] }}
                value={invoiceForm.senderPostCode}
                onChange={(e) =>
                  setInvoiceForm((prevForm) => ({
                    ...prevForm,
                    senderPostCode: e.target.value,
                  }))
                }
              />
            </Box>
            <Box sx={{ ...styles[71] }}>
              <Typography sx={{ ...styles[44] }}>Country</Typography>
              <TextField
                name="senderCountry"
                {...register("senderCountry")}
                id="text-field"
                error={!!errors.senderCountry}
                helperText={
                  errors.senderCountry ? (
                    errors?.senderCountry?.message
                  ) : (
                    <span id="hide">l</span>
                  )
                }
                sx={{ ...styles[41] }}
                value={invoiceForm.senderCountry}
                onChange={(e) =>
                  setInvoiceForm((prevForm) => ({
                    ...prevForm,
                    senderCountry: e.target.value,
                  }))
                }
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ ...styles[72] }}>
          <Typography sx={{ ...styles[73] }}>Bill To</Typography>
          <Box sx={{ mt: "10px" }}>
            <Typography sx={{ ...styles[44] }}>Client's Name</Typography>
            <TextField
              name="clientName"
              {...register("clientName")}
              id="text-field"
              error={!!errors.clientName}
              helperText={
                errors.clientName ? (
                  errors?.clientName?.message
                ) : (
                  <span id="hide">l</span>
                )
              }
              sx={{ ...styles[41] }}
              value={invoiceForm.clientName}
              onChange={(e) =>
                setInvoiceForm((prevForm) => ({
                  ...prevForm,
                  clientName: e.target.value,
                }))
              }
            />
          </Box>
          <Box sx={{ mt: "17px" }}>
            <Typography sx={{ ...styles[44] }}>Client's Email</Typography>
            <TextField
              error={!!errors.clientEmail}
              helperText={
                errors.clientEmail ? (
                  errors?.clientEmail?.message
                ) : (
                  <span id="hide">l</span>
                )
              }
              name="clientEmail"
              {...register("clientEmail")}
              id="text-field"
              sx={{ ...styles[41] }}
              value={invoiceForm.clientEmail}
              onChange={(e) =>
                setInvoiceForm((prevForm) => ({
                  ...prevForm,
                  clientEmail: e.target.value,
                }))
              }
            />
          </Box>
          <Box sx={{ mt: "17px" }}>
            <Typography sx={{ ...styles[44] }}>Street Address</Typography>
            <TextField
              name="clientStreet"
              {...register("clientStreet")}
              id="text-field"
              error={!!errors.clientStreet}
              helperText={
                errors.clientStreet ? (
                  errors?.clientStreet?.message
                ) : (
                  <span id="hide">l</span>
                )
              }
              sx={{ ...styles[41] }}
              value={invoiceForm.clientStreet}
              onChange={(e) =>
                setInvoiceForm((prevForm) => ({
                  ...prevForm,
                  clientStreet: e.target.value,
                }))
              }
            />
          </Box>
          <Box sx={{ ...styles[74] }}>
            <Box sx={{ ...styles[36] }}>
              <Typography sx={{ ...styles[44] }}>City</Typography>
              <TextField
                name="clientCity"
                {...register("clientCity")}
                id="text-field"
                error={!!errors.clientCity}
                helperText={
                  errors.clientCity ? (
                    errors?.clientCity?.message
                  ) : (
                    <span id="hide">l</span>
                  )
                }
                sx={{ ...styles[41] }}
                value={invoiceForm.clientCity}
                onChange={(e) =>
                  setInvoiceForm((prevForm) => ({
                    ...prevForm,
                    clientCity: e.target.value,
                  }))
                }
              />
            </Box>
            <Box sx={{ ...styles[36] }}>
              <Typography sx={{ ...styles[44] }}>Post Code</Typography>
              <TextField
                name="clientPostcode"
                {...register("clientPostcode")}
                id="text-field"
                error={!!errors.clientPostcode}
                helperText={
                  errors.clientPostcode ? (
                    errors?.clientPostcode?.message
                  ) : (
                    <span id="hide">l</span>
                  )
                }
                sx={{ ...styles[41] }}
                value={invoiceForm.clientPostcode}
                onChange={(e) =>
                  setInvoiceForm((prevForm) => ({
                    ...prevForm,
                    clientPostcode: e.target.value,
                  }))
                }
              />
            </Box>
            <Box sx={{ ...styles[39] }}>
              <Typography sx={{ ...styles[44] }}>Country</Typography>
              <TextField
                name="clientCountry"
                {...register("clientCountry")}
                id="text-field"
                error={!!errors.clientCountry}
                helperText={
                  errors.clientCountry ? (
                    errors?.clientCountry?.message
                  ) : (
                    <span id="hide">l</span>
                  )
                }
                sx={{ ...styles[41] }}
                value={invoiceForm.clientCountry}
                onChange={(e) =>
                  setInvoiceForm((prevForm) => ({
                    ...prevForm,
                    clientCountry: e.target.value,
                  }))
                }
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ ...styles[75] }}>
          <Box sx={{ ...styles[76] }}>
            <Typography sx={{ ...styles[44] }}>Invoice Date</Typography>
            {id ? (
              <TextField
                disabled
                id="text-field"
                defaultValue={invoiceForm.createdAt}
                sx={{ minWidth: "100%", border: "none" }}
              />
            ) : (
              <DatePickerMui />
            )}
          </Box>
          <Box sx={{ ...styles[76] }}>
            <Typography sx={{ ...styles[44] }}>Payment Terms</Typography>
            <PaymentTermsMenu
              paymentTermsValue={paymentTermsValue}
              setPaymentTermsValue={setPaymentTermsValue}
              id={id}
              prevPaymentTermsValue={invoiceForm.paymentTerms}
            />
          </Box>
        </Box>
        <Box sx={{ mt: "17px" }}>
          <Typography sx={{ ...styles[77] }}>Project Description</Typography>
          <TextField
            name="description"
            {...register("description")}
            id="text-field"
            error={!!errors.description}
            helperText={
              errors.description ? (
                errors?.description?.message
              ) : (
                <span id="hide">l</span>
              )
            }
            sx={{ ...styles[41] }}
            value={invoiceForm.description}
            onChange={(e) =>
              setInvoiceForm((prevForm) => ({
                ...prevForm,
                description: e.target.value,
              }))
            }
          />
        </Box>
        <Typography sx={{ ...styles[78] }}>Item List</Typography>
        <Box sx={{ ...styles[79] }}>
          <Box sx={{ ...styles[56] }}>
            <Typography sx={{ ...styles[44] }}>Item Name</Typography>
            <TextField
              name="itemName"
              {...register("itemName")}
              id="text-field"
              error={!!errors.itemName}
              helperText={
                errors.itemName ? (
                  errors?.itemName?.message
                ) : (
                  <span id="hide">l</span>
                )
              }
              sx={{ ...styles[41] }}
              value={invoiceForm.itemName}
              onChange={(e) =>
                setInvoiceForm((prevForm) => ({
                  ...prevForm,
                  itemName: e.target.value,
                }))
              }
            />
          </Box>
          <Box sx={{ ...styles[57] }}>
            <Typography sx={{ ...styles[44] }}>Qty.</Typography>
            <TextField
              name="itemQuanity"
              {...register("itemQuanity")}
              id="text-field"
              error={!!errors.itemQuanity}
              helperText={
                errors.itemQuanity ? (
                  errors?.itemQuanity?.message
                ) : (
                  <span id="hide">l</span>
                )
              }
              sx={{ ...styles[41] }}
              value={invoiceForm.itemQuanity}
              onChange={(e) =>
                setInvoiceForm((prevForm) => ({
                  ...prevForm,
                  itemQuanity: e.target.value,
                }))
              }
            />
          </Box>
          <Box sx={{ ...styles[58] }}>
            <Typography sx={{ ...styles[44] }}>Price</Typography>
            <TextField
              name="itemPrice"
              {...register("itemPrice")}
              id="text-field"
              error={!!errors.itemPrice}
              helperText={
                errors.itemPrice ? (
                  errors?.itemPrice?.message
                ) : (
                  <span id="hide">l</span>
                )
              }
              sx={{ ...styles[41] }}
              value={invoiceForm.itemPrice}
              onChange={(e) =>
                setInvoiceForm((prevForm) => ({
                  ...prevForm,
                  itemPrice: e.target.value,
                }))
              }
            />
          </Box>
          <Box sx={{ ...styles[80] }}>
            <Typography sx={{ ...styles[81] }}>Total</Typography>
            <InputBase
              disabled
              id="text-field"
              placeholder="total"
              sx={{ ...styles[82] }}
              // value={invoiceForm.total || ""}
              value={twoDecimalPlace(invoiceForm.total) || ""}
              onChange={(e) => {
                setInvoiceForm((prevForm) => ({
                  ...prevForm,
                  total: e.target.value,
                }));
              }}
            />
          </Box>
        </Box>
        <Box sx={{ ...styles[83] }}>
          <Box sx={{ ...styles[84] }}>
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              variant="contained"
              color="purpleBigEdit"
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default InvoiceEdit;
