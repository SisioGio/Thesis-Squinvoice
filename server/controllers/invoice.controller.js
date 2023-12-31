const config = require("../config/auth.config");
const db = require("../models");
const Invoice = db.invoice;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
// Create a new invoice
exports.create = async (req, res) => {
  try {
    //Retrieving vendor data from request
    const { vendorName, vendorIdentificator } = req.body;
    // Create a new vendor if does not exist
    const [vendor, createdAt] = await db.company.findOrCreate({
      where: {
        name: vendorName,
        identificator: vendorIdentificator,
      },
    });
    // Adding the vendor ID to the body
    req.body.vendorId = vendor.id;
    // Create invoice in db
    const invoice = await Invoice.create(req.body);
    //  Get line items from body
    const invoiceLines = req.body.lineItems;
    // Create line items with vendorId as foreign key
    for (const line of invoiceLines) {
      line.invoiceId = invoice.id;
      await db.invoiceLine.create(line);
    }
    // Get tax lines
    const taxLines = req.body.taxLines;
    // Create tax lines
    for (const taxLine of taxLines) {
      taxLine.invoiceId = invoice.id;
      delete taxLine.id;
      await db.taxLine.create(taxLine);
    }
    // Create shipping address if provided
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
      // Link shipping address to invoice
      invoice.setShippingAddress(shippingAddress);
    }
    // Create/Find vendor address if provided
    if (req.body.vendorAddress) {
      const [vendorAddress, createdAt] = await db.address.findOrCreate({
        where: {
          country: req.body.vendorAddress.country,
          city: req.body.vendorAddress.city,
          street: req.body.vendorAddress.street,
          streetNo: req.body.vendorAddress.streetNo,
          postcode: req.body.vendorAddress.postcode,
        },
      });
      vendor.setAddress(vendorAddress);
    }
    // Save invoice data
    await invoice.save();
    // Create output URL for invoice data
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
        "documentDate",
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
            "id",
            "articleCode",
            "description",
            "purchaseOrder",
            "deliveryNote",
            "unitOfMeasure",
            "quantity",
            "unitPrice",
            "netAmount",
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
          include: [
            {
              model: db.address,
              attributes: ["country", "city", "street", "streetNo", "postcode"],
            },
          ],
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
