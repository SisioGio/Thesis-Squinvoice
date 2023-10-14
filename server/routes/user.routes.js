module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const { authJwt } = require("../middleware");
  var router = require("express").Router();
  // Is authenticated
  router.get("/is_authenticated", [authJwt.verifyToken], user.isAuthenticated);
  // Create a new user
  router.post("/", user.register);

  // Update
  router.put("/", user.update);

  // Login
  router.post("/login", user.login);

  // Retrieve all user
  router.get("/", user.findAll);

  app.use("/api/user", router);
};
