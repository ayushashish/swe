const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Create new user
// @route   POST /user/signup
// @access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const checkIfExists = await User.find({ email: req.body.email }).count();
  try {
    if (checkIfExists === 0) {
      const user = await User.create(req.body);
      res.status(201).json({ status: true, content: { data: user } });
    } else {
      res.status(400).json({
        status: false,
        errors: [{ message: "Email address already exists." }],
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ status: false, errors: [{ message: "Something went wrong." }] });
  }
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

// @desc    Login user
// @route   POST /user/signin
// @access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(400).json({
        status: false,
        errors: [{ message: "User not found." }],
      });
    } else {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      sendTokenResponse(user, 200, res);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      errors: [{ message: "Something went wrong." }],
    });
  }
});

// @desc    Get all users
// @route   GET /user/
// @access  Private
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ status: true, content: allUsers });
  } catch (err) {
    console.log(err);
  }
  next();
});

// @desc    Get single user
// @route   GET /user/:id
// @access  Private
exports.getSingleUser = asyncHandler(async (req, res, next) => {
  try {
    console.log("in");
    const singleUser = await User.findById(req.params.id);
    console.log("searched");
    res.status(200).json({ status: true, content: singleUser });
  } catch (err) {
    if (err.name === "CastError") {
      console.log("err");
      res.status(200).json({ status: true, content: { data: null } });
    }
    console.log(err.name);
  }
  next();
});
