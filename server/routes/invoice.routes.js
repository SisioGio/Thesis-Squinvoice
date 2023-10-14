module.exports = (app) => {
  const invoice = require("../controllers/invoice.controller.js");

  var router = require("express").Router();

  // Create a new invoice
  router.post("/", invoice.create);

  // Get All Invoices

  router.get("/", invoice.findAll);

  // Get Invoice Data

  router.get("/data/:invoiceId", invoice.getData);
  app.use("/api/invoice", router);
};
