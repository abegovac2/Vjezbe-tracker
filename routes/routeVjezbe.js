const path = require("path");
const express = require("express");
const routerVjezbe = express.Router();

const VjezbeController = require("../controllers/vjezbeController");

routerVjezbe
  .route("/")
  .post(VjezbeController.postVjezbeData)
  .get(VjezbeController.getVjezbeData);

module.exports = routerVjezbe;
