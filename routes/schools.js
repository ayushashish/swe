const express = require("express");
const {
  createSchool,
  getAllSchools,
  getStudents,
} = require("../controllers/schools");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, authorize("school-create"), createSchool)
  .get(protect, authorize("school-get"), getAllSchools);
router
  .route("/students")
  .get(protect, authorize("school-students"), getStudents);

module.exports = router;
