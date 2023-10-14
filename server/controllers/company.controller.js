const db = require("../models");
const Company = db.company;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("./../config/auth.config");

exports.getUserCompanies = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userCompanies = await Company.findAll({
      where: { userId: userId },
      include: [db.address],
    });
    return res.send(userCompanies);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

exports.getCompanyInvoices = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const purchaseInvoices = await db.invoice.findAll({
      where: { [Op.or]: [{ customerId: companyId }, { vendorId: companyId }] },
      include: [
        { model: db.company, as: "customer", include: [db.address] },
        { model: db.company, as: "vendor", include: [db.address] },
        db.invoiceLine,
        db.taxLine,
      ],
    });
    return res.send(purchaseInvoices);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
// Create a new company
exports.create = async (req, res) => {
  try {
    const {
      name,
      identificator,
      userId,
      country,
      city,
      street,
      streetNo,
      postcode,
    } = req.body;

    if (
      !(
        name &&
        identificator &&
        userId &&
        country &&
        city &&
        street &&
        streetNo &&
        postcode
      )
    ) {
      return res.status(400).send({ message: "All fields are mandatory" });
    }

    const company = await Company.create(req.body);

    const address = await db.address.create({
      country: country,
      city: city,
      street: street,
      streetNo: streetNo,
      postcode: postcode,
      companyId: company.id,
    });
    return res.send(company);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

exports.decodeSecretKey = async (req, res) => {
  try {
    var token = req.headers["x-access-token"];

    jwt.verify(token, "fdsfdsfsdfdsfsdffsd", function (err, decoded) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate" });
      }
      return res.status(200).send(decoded);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

exports.generateSecretKey = async (req, res) => {
  try {
    const companyId = req.params.companyId;

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(400).send({ message: "Invalid company id" });
    }
    var secret_token = jwt.sign(
      { id: companyId, CreatedAt: Date() },
      config.secret
    );

    company.token = secret_token;

    await company.save();

    return res.send({ secret_token: secret_token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

// Update a company by the id in the request form
exports.update = async (req, res) => {
  const id = req.body.id;
  const addressId = req.body.addressId;

  try {
    const result = await db.sequelize.transaction(async (t) => {
      let company = await Company.update(req.body, {
        where: { id: id },
        transaction: t,
      });
      let address = await db.address.update(req.body, {
        where: { id: addressId },
        transaction: t,
      });
    });
    const output = await Company.findByPk(id, { include: [db.address] });
    return res.send(output);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error updating company with id=" + id,
    });
  }
};
