const User = require("../models/User");
const Student = require("../models/Student");
const asyncHandler = require("../middleware/async");
const School = require("../models/School");

// @desc    Create new student
// @route   POST /student
// @access  Private
exports.createStudent = asyncHandler(async (req, res, next) => {
  try {
    const checkIfUserExists = await User.find({ _id: req.body.userId }).count();
    const checkIfSchoolExists = await School.find({
      _id: req.body.schoolId,
    }).count();
    if (checkIfUserExists !== 0 && checkIfSchoolExists !== 0) {
      const student = await Student.create(req.body);
      res.status(201).json({ status: true, content: { data: student } });
    } else if (checkIfUserExists === 0) {
      res.status(400).json({
        status: false,
        errors: [{ message: "User not found" }],
      });
    } else {
      res.status(400).json({
        status: false,
        errors: [{ message: "School not found" }],
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ status: false, errors: [{ message: "Something went wrong." }] });
  }
});

// @desc    Get all students
// @route   GET /student
// @access  Private
exports.getAllStudents = asyncHandler(async (req, res, next) => {
  const students = await Student.find();
  res.status(201).json({ success: true, content: { data: students } });
});
