const config = require("../config/auth.config");
const db = require("../models");
const Invoice = db.invoice;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
// Create a new invoice
exports.create = async (req, res) => {
  try {
    const { vendorName, vendorIdentificator } = req.body;

    const [vendor, createdAt] = await db.company.findOrCreate({
      where: {
        name: vendorName,
        identificator: vendorIdentificator,
      },
    });

    req.body.vendorId = vendor.id;

    const invoice = await Invoice.create(req.body);

    const invoiceLines = req.body.lineItems;

    for (const line of invoiceLines) {
      line.invoiceId = invoice.id;
      await db.invoiceLine.create(line);
    }

    const taxLines = req.body.taxLines;
    for (const taxLine of taxLines) {
      taxLine.invoiceId = invoice.id;
      await db.taxLine.create(taxLine);
    }

    if (req.body.shippingAddress) {
      const [shippingAddress, createdAt] = await db.address.findOrCreate({
        where: {
          country: req.body.shippingAddress.country,
          city: req.body.shippingAddress.city,
          street: req.body.shippingAddress.street,
          streetNo: req.body.shippingAddress.streetNo,
          postcode: req.body.shippingAddress.postcode,
        },
      });
      invoice.setShippingAddress(shippingAddress);
      invoice.save();
    }

    // const output = await Invoice.findByPk(invoice.id, {
    //   include: [db.invoiceLine, db.taxLine],
    // });

    const outputUrl = config.LOCAL_HOST + "api/invoice/data/" + invoice.id;

    return res.send({ InvoiceURL: outputUrl });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

// Find All Invoices
exports.findAll = async (req, res) => {
  const invoices = await Invoice.findAll();

  return res.send(invoices);
};

// Get Invoice Data
exports.getData = async (req, res) => {
  try {
    const invoiceId = req.params.invoiceId;

    const invoice = await Invoice.findByPk(invoiceId, {
      attributes: [
        "type",
        "documentNo",
        "dueDate",
        "netAmount",
        "taxAmount",
        "freightCharge",
        "priceRounding",
        "totalAmount",
        "purchaseOrder",
        "deliveryNote",
      ],
      include: [
        {
          model: db.invoiceLine,
          attributes: [
            "articleCode",
            "description",
            "purchaseOrder",
            "deliveryNote",
            "unitOfMeasure",
            "quantity",
            "unitPrice",
            "taxPercentage",
            "taxAmount",
            "totalAmount",
          ],
        },
        {
          model: db.taxLine,
          attributes: [
            "taxDescription",
            "taxPercentage",
            "netAmount",
            "taxAmount",
          ],
        },
        {
          model: db.company,
          as: "vendor",
          attributes: ["name", "identificator"],
        },
        {
          model: db.address,
          as: "ShippingAddress",
          attributes: ["country", "city", "street", "streetNo", "postcode"],
        },
      ],
    });

    if (!invoice) {
      return res
        .status(400)
        .send({ message: "The requested invoice does not exist" });
    } else {
      return res.send(invoice);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
