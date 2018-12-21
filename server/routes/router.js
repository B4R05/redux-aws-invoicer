const express = require("express");
const app = express();
const {
  newInvoice,
  updateInvoice,
  getInvoices
} = require("../handlers/handlers");
const {
  validatePostRequest,
  validatePatchRequest
} = require("../handlers/middlewares");

module.exports = app => {
  app.post("/invoice", validatePostRequest, newInvoice);

  app.get("/invoice", getInvoices);

  app.patch("/invoice", validatePatchRequest, updateInvoice);
};
