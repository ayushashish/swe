const Role = require("../models/Role.js");
const asyncHandler = require("../middleware/async");

// @desc    Create new role
// @route   POST /role
// @access  Public
exports.createRole = asyncHandler(async (req, res, next) => {
  try {
    const checkIfExists = await Role.find({ name: req.body.name }).count();
    if (checkIfExists === 0) {
      const role = await Role.create(req.body);
      res.status(201).json({ status: true, content: { data: role } });
    } else {
      res
        .status(400)
        .json({ status: false, errors: [{ message: "Role already exists." }] });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ status: false, errors: [{ message: "Something went wrong." }] });
  }
});

// @desc    Get all roles
// @route   POST /role
// @access  Public
exports.getAllRoles = asyncHandler(async (req, res, next) => {
  const role = await Role.find();
  res.status(201).json({ success: true, content: { data: role } });
});
