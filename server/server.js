require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 4040;

app.use(cors());
app.use(express.json());

// get all invoices
app.get(`/api/v1/invoices`, async (req, res) => {
  try {
    // const results = await db.query("select * from details");
    const results = await db.query("select * from initial_details");
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        invoices: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// get one invoice
app.get("/api/v1/invoices/:id", async (req, res) => {
  try {
    const test = "RT3080";
    // const results = await db.query("select * from details WHERE id = $1", [
    const results = await db.query(
      "select * from initial_details WHERE id = $1",
      [req.params.id]
    );
    console.log("results", results);
    res.status(200).json({
      status: "success",
      data: {
        invoice: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// create an invoice
app.post("/api/v1/invoices", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      // "INSERT INTO details (id, created_at, payment_due, description, payment_terms, client_name, client_email, status, sender_street, sender_city, sender_post_code, sender_country, client_street, client_city, client_post_code, client_country, item_name, item_quantity, item_price, total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) returning *",
      "INSERT INTO initial_details (id, created_at, payment_due, description, payment_terms, client_name, client_email, status, sender_street, sender_city, sender_post_code, sender_country, client_street, client_city, client_post_code, client_country, item_name, item_quantity, item_price, total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) returning *",
      [
        req.body.id,
        req.body.created_at,
        req.body.payment_due,
        req.body.description,
        req.body.payment_terms,
        req.body.client_name,
        req.body.client_email,
        req.body.status,
        req.body.sender_street,
        req.body.sender_city,
        req.body.sender_post_code,
        req.body.sender_country,
        req.body.client_street,
        req.body.client_city,
        req.body.client_post_code,
        req.body.client_country,
        req.body.item_name,
        req.body.item_quantity,
        req.body.item_price,
        req.body.total,
      ]
    );
    // console.log(results);
    console.log(req.body);
    res.status(201).json({
      status: "success",
      data: {
        invoice: results.rows[0],
        // invoice: "johnnys bar n grill",
      },
    });
  } catch (err) {}
});

// update an invoice
app.put(`/api/v1/invoices/:id`, async (req, res) => {
  try {
    const results = await db.query(
      // "UPDATE details SET client_name = $1, payment_due = $2, status = $3, total = $5 WHERE id = $4 returning *",

      // "UPDATE details SET payment_due = $2, description = $3,  payment_terms = $4, client_name = $5, client_email = $6, status = $7, sender_street = $8,  sender_city = $9, sender_post_code = $10, sender_country = $11, client_street = $12, client_city = $13, client_post_code = $14, client_country = $15, item_name = $16, item_quantity = $17,  item_price = $18, total = $19    WHERE id = $1 returning *",
      "UPDATE initial_details SET payment_due = $2, description = $3,  payment_terms = $4, client_name = $5, client_email = $6, status = $7, sender_street = $8,  sender_city = $9, sender_post_code = $10, sender_country = $11, client_street = $12, client_city = $13, client_post_code = $14, client_country = $15, item_name = $16, item_quantity = $17,  item_price = $18, total = $19    WHERE id = $1 returning *",

      [
        req.body.id,
        req.body.payment_due,
        req.body.description,
        req.body.payment_terms,
        req.body.client_name,
        req.body.client_email,
        req.body.status,
        req.body.sender_street,
        req.body.sender_city,
        req.body.sender_post_code,
        req.body.sender_country,
        req.body.client_street,
        req.body.client_city,
        req.body.client_post_code,
        req.body.client_country,
        req.body.item_name,
        req.body.item_quantity,
        req.body.item_price,
        req.body.total,
      ]
    );
    res.status(200).json({
      status: "success",
      data: {
        invoice: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// delete an invoice
app.delete(`/api/v1/invoices/:id`, async (req, res) => {
  try {
    // const results = await db.query("DELETE from details WHERE id = $1", [
    const results = await db.query(
      "DELETE from initial_details WHERE id = $1",
      [req.params.id]
    );
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));