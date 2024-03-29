var dbConfig;

const Sequelize = require("sequelize");

if (process.env.NODE_ENV === "test") {
  dbConfig = require("../config/db.config.test.js");
} else {
  dbConfig = require("../config/db.config.js");
}
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    timestamps: true,
    paranoid: true,
  },
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.invoice = require("./invoice.model.js")(sequelize, Sequelize);
db.invoiceLine = require("./invoiceLine.model.js")(sequelize, Sequelize);
db.taxLine = require("./taxLine.model.js")(sequelize, Sequelize);

db.user = require("./user.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize);

db.address = require("./address.model.js")(sequelize, Sequelize);

module.exports = db;
