const express = require("express");
const { createStudent, getAllStudents } = require("../controllers/students");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, authorize("student-create"), createStudent)
  .get(protect, authorize("student-get"), getAllStudents);

module.exports = router;
