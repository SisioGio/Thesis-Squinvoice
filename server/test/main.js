const http = require("http");
const request = require("supertest");
const app = require("./../app");
const server = require("./../server");
const db = require("../models");
const invoiceData = require("./invoiceData");
var invoiceUrl;
describe("Document", () => {
  before(async () => {
    await db.sequelize
      .sync({ force: true })
      .then(() => {})
      .catch((err) => {
        console.log("Sync failed - " + (err.message ? err.message : null));
      });
  });
  after(() => {
    if (server && server.listening) {
      server.close((err) => {
        if (err) {
          console.error("Error closing server:", err);
        } else {
          console.log("Server closed");
        }
      });
    }
  });

  it("Should create a new document and return the Squinvoice url", (done) => {
    request(app)
      .post("/api/invoice")
      .send(invoiceData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        if (!res.body.InvoiceURL) return done(new Error("No URL was received"));
        invoiceUrl = res.body.InvoiceURL;
        done();
      });
  });

  it("Should return list of documents", (done) => {
    request(app)
      .get("/api/invoice/data/1")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (res.body.length === 0) {
          done(new Error("No documents were returned"));
        }

        done();
      });
  });

  it("Should return invoice details", (done) => {
    var relativeUrl = invoiceUrl.replace();
    request(app)
      .get("/api/invoice/data/1")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });
});
