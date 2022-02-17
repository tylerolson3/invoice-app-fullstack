import { useState, useContext, useEffect } from "react";
import styles from "../styles/styles";
import { Typography, Button, TextField, Box } from "@mui/material";
import InvoiceFinder from "../APIs/InvoiceFinder";
import { InvoicesContext } from "../context/InvoicesContext";
import { useNavigate } from "react-router-dom";
import DatePickerMui from "./DatePickerMui";
import PaymentTermsMenu from "./PaymentTermsMenu";
import InputBase from "@mui/material/InputBase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const InvoiceForm = ({ isMobileDisplay }) => {
  const {
    addInvoice,
    generateInvoiceId,
    twoDecimalPlace,
    userSchema,
    calcDueDate,
  } = useContext(InvoicesContext);
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    // e.preventDefault();
    console.log(data);
    console.log("submitting...");
    try {
      const response = await InvoiceFinder.post("/", {
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
        status: invoiceForm.status,
        total: invoiceForm.total,
      });
      addInvoice(response.data.data.invoice);
      console.log(response);

      navigate(`/test`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  async function onDraftSubmit(data) {
    console.log("submitting draft...");
    try {
      const response = await InvoiceFinder.post("/", {
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
        status: "draft",
        total: invoiceForm.total,
      });
      addInvoice(response.data.data.invoice);
      console.log(response);

      navigate(`/test`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(userSchema),
  });

  const [dateValue, setDateValue] = useState(
    new Date().toISOString().slice(0, 10)
  );

  // manages state for the payment terms menu component and is used in the invoice form value
  const [paymentTermsValue, setPaymentTermsValue] = useState("");

  // console.log("dateValue", dateValue);
  const [invoiceForm, setInvoiceForm] = useState({
    clientCity: "",
    clientCountry: "",
    clientEmail: "",
    clientName: "",
    clientPostcode: "",
    clientStreet: "",
    createdAt: dateValue,
    description: "",
    id: generateInvoiceId(),
    itemName: "",
    itemPrice: "",
    itemQuanity: "",
    paymentDue: "",
    paymentTerms: paymentTermsValue,
    senderCity: "",
    senderCountry: "",
    senderPostCode: "",
    senderStreet: "",
    status: "pending",
    total: "",
  });

  // when the date picker value or payment terms value changes, re-render the form
  useEffect(() => {
    setInvoiceForm((prevForm) => ({
      ...prevForm,
      createdAt: dateValue,
      paymentTerms: paymentTermsValue,
      paymentDue: calcDueDate(dateValue, paymentTermsValue),
    }));
  }, [dateValue, paymentTermsValue]);

  // when item quantity or price change, update the total price value on the form
  useEffect(() => {
    // console.log("total price changed!");
    setInvoiceForm((prevForm) => ({
      ...prevForm,
      total: invoiceForm.itemPrice * invoiceForm.itemQuanity,
    }));
  }, [invoiceForm.itemPrice, invoiceForm.itemQuanity]);

  return (
    <form>
      <Box sx={{ ...styles[27] }}>
        <Typography sx={{ ...styles[28] }}>New Invoice</Typography>
        <Box sx={{ ...styles[29] }}>
          <Typography sx={{ ...styles[30] }}>Bill From</Typography>
          <Box sx={{ mt: { xs: "10px", sm: "10px" } }}>
            <Typography sx={{ ...styles[31] }}>Street Name</Typography>
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
              sx={{ ...styles[32] }}
              value={invoiceForm.senderStreet}
              onChange={(e) =>
                setInvoiceForm((prevForm) => ({
                  ...prevForm,
                  senderStreet: e.target.value,
                }))
              }
            />
          </Box>
          <Box sx={{ ...styles[33] }}>
            <Box sx={{ ...styles[36] }}>
              <Typography sx={{ ...styles[34] }}>City</Typography>
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
                sx={{ ...styles[35] }}
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
              <Typography sx={{ ...styles[37] }}>Post Code</Typography>
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
                sx={{ ...styles[38] }}
                value={invoiceForm.senderPostCode}
                onChange={(e) =>
                  setInvoiceForm((prevForm) => ({
                    ...prevForm,
                    senderPostCode: e.target.value,
                  }))
                }
              />
            </Box>
            <Box sx={{ ...styles[39] }}>
              <Typography sx={{ ...styles[40] }}>Country</Typography>
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
        <Box sx={{ ...styles[42] }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ ...styles[43] }}
          >
            Bill To
          </Typography>
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
            <Typography sx={{ ...styles[45] }}>Client's Email</Typography>
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
          <Box sx={{ ...styles[46] }}>
            <Box sx={{ ...styles[47] }}>
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
            <Box sx={{ ...styles[47] }}>
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
            <Box sx={{ ...styles[48] }}>
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
        <Box sx={{ ...styles[49] }}>
          <Box sx={{ ...styles[76] }}>
            <Typography sx={{ ...styles[44] }}>Invoice Date</Typography>
            <DatePickerMui dateValue={dateValue} setDateValue={setDateValue} />
            <span id="hide">l</span>
          </Box>
          <Box sx={{ ...styles[76] }}>
            <Typography sx={{ ...styles[44] }}>Payment Terms</Typography>
            <PaymentTermsMenu
              name="paymentTerms"
              paymentTermsValue={paymentTermsValue}
              setPaymentTermsValue={setPaymentTermsValue}
            />
            <span id="hide">l</span>
          </Box>
        </Box>
        <Box sx={{ ...styles[52] }}>
          <Typography sx={{ ...styles[53] }}>Project Description</Typography>
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
        <Typography sx={{ ...styles[54] }}>Item List</Typography>
        <Box sx={{ ...styles[55] }}>
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
              type="number"
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
              type="number"
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
          <Box sx={{ ...styles[59] }}>
            <Typography sx={{ ...styles[60] }}>Total</Typography>
            <InputBase
              disabled
              variant="standard"
              id="text-field"
              placeholder="total"
              // value={invoiceForm.total}
              value={twoDecimalPlace(invoiceForm.total) || ""}
              onChange={(e) =>
                setInvoiceForm((prevForm) => ({
                  ...prevForm,
                  total: e.target.value,
                }))
              }
              sx={{ ...styles[61] }}
            />
          </Box>
        </Box>
        <Box sx={{ ...styles[62] }}>
          <Box sx={{ ...styles[63] }}>
            <Box sx={{ ...styles[64] }}>
              {!isMobileDisplay && (
                <Button
                  onClick={onDraftSubmit}
                  variant="contained"
                  color="charcoal"
                >
                  Save as Draft
                </Button>
              )}

              <Button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                variant="contained"
                color="purpleBig"
              >
                Save & Send
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default InvoiceForm;
