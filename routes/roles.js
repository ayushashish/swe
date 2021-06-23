const express = require("express");
const { createRole, getAllRoles } = require("../controllers/roles");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(createRole)
  .get(protect, authorize("role-get"), getAllRoles);

module.exports = router;
