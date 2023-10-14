module.exports = (app) => {
  const company = require("../controllers/company.controller.js");

  var router = require("express").Router();

  // Create a new company
  router.post("/", company.create);
  // Update
  router.put("/", company.update);

  // Get user companies
  router.get("/user/:userId", company.getUserCompanies);

  // Get company purchase invoices
  router.get("/invoices/:companyId", company.getCompanyInvoices);

  // Create secret key
  router.post("/secret/:companyId", company.generateSecretKey);
  // Read secret key
  router.get("/decode", company.decodeSecretKey);
  app.use("/api/company", router);
};
