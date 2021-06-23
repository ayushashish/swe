const School = require("../models/School.js");
const asyncHandler = require("../middleware/async");
const Student = require("../models/Student.js");

// @desc    Create new role
// @route   POST /school
// @access  Private
exports.createSchool = asyncHandler(async (req, res, next) => {
  try {
    const checkIfExists = await School.find({ name: req.body.name }).count();
    if (checkIfExists === 0) {
      const school = await School.create(req.body);
      res.status(201).json({ status: true, content: { data: school } });
    } else {
      res.status(400).json({
        status: false,
        errors: [{ message: "School already exists." }],
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ status: false, errors: [{ message: "Something went wrong." }] });
  }
});

// @desc    Get all schools
// @route   GET /school
// @access  Private
exports.getAllSchools = asyncHandler(async (req, res, next) => {
  const schools = await School.find();
  res.status(201).json({ success: true, content: { data: schools } });
});

// @desc    Get students
// @route   GET /school/students
// @access  Private
exports.getStudents = asyncHandler(async (req, res, next) => {
  const schools = await School.find();
  let query;
  query = Student.find().populate({
    path: "school",
    select: "name description",
  });
  res.status(201).json({ success: true, content: { data: schools } });
});