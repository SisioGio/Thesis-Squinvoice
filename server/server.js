const express = require("express");
const cors = require("cors");

const {
  sequelize,
  stock,
  taxCode,
  customerGroup,
  taxValues,
} = require("./models");
const app = express();
var bcrypt = require("bcryptjs");

var corsOptions = {
  origin: "http://localhost:3000",
};
// cron.schedule("*/2 * * * * *", function () {
//   console.log("---------------------");
//   console.log("running a task every 2 seconds");
// });

app.use(express.static("./../client/public/"));
app.use(express.static("./../client/public/prod_images/"));
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const { cart } = require("./models");
const { DB } = require("./config/db.config");

// // user - refreshToken
// db.user.hasMany(db.refreshToken, { onDelete: "RESTRICT" });
// db.refreshToken.belongsTo(db.user, { onDelete: "RESTRICT" });

// // User - Company
// db.user.hasMany(db.company, { onDelete: "RESTRICT" });
// db.company.belongsTo(db.user, { onDelete: "RESTRICT" });

// // Company - Token
// db.company.hasMany(db.token, { onDelete: "RESTRICT" });
// db.token.belongsTo(db.company, { onDelete: "RESTRICT" });

// Company - Address
db.company.hasOne(db.address, { onDelete: "RESTRICT" });
db.address.belongsTo(db.company, {
  onDelete: "RESTRICT",
});

// Invoice - Address
db.invoice.hasOne(db.address, { onDelete: "RESTRICT", as: "ShippingAddress" });
db.address.belongsTo(db.invoice, {
  onDelete: "RESTRICT",
  as: "ShippingAddress",
});

// Invoice - Invoice Line
db.invoice.hasMany(db.invoiceLine, { onDelete: "RESTRICT" });
db.invoiceLine.belongsTo(db.invoice, { onDelete: "RESTRICT" });

// Invoice - Tax Line
db.invoice.hasMany(db.taxLine, { onDelete: "RESTRICT" });
db.taxLine.belongsTo(db.invoice, { onDelete: "RESTRICT" });

// Company  (Vendor)- Invoice
db.company.hasMany(db.invoice, {
  onDelete: "RESTRICT",
  as: "vendor",
  foreignKey: "vendorId",
});
db.invoice.belongsTo(db.company, {
  onDelete: "RESTRICT",
  as: "vendor",
  foreignKey: "vendorId",
});

// // Company  (Customer)- Invoice
// db.company.hasMany(db.invoice, {
//   onDelete: "RESTRICT",
//   as: "customer",
//   foreignKey: "customerId",
// });
// db.invoice.belongsTo(db.company, {
//   onDelete: "RESTRICT",
//   as: "customer",
//   foreignKey: "customerId",
// });

db.sequelize
  .authenticate({ force: true })
  .then(async () => {
    console.log("Sync completed");
  })
  .catch((err) => {
    console.log("Sync failed - " + err.message ? err.message : null);
  });
// simple route
app.get("/test", (req, res) => {
  res.json({ message: "Welcome" });
});

// Routes
require("./routes/user.routes")(app);
require("./routes/company.routes")(app);
require("./routes/invoice.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
