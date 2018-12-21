const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoice_schema = new Schema({
  to: String,
  date_due: String,
  date_paid: String,
  description: String,
  amount_due: String
});

const Invoice = mongoose.model("Invoice", invoice_schema);

module.exports = Invoice;
