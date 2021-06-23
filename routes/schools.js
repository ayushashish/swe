const express = require("express");
const { createSchool, getAllSchools } = require("../controllers/schools");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, authorize("school-create"), createSchool)
  .get(protect, authorize("school-get"), getAllSchools);

module.exports = router;
