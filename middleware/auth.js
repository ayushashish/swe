const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");

// Protect routes
exports.protect = asyncHandler(async (req, res, next, ...arg) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Check token exists
  if (!token) {
    return next(new ErrorResponse("Not authorised to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    req.listRoles = await Role.findById(req.user.roleId);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorised to access this route", 401));
  }
});

// Grant access to specific roles
exports.authorize = (role) => {
  return (req, res, next) => {
    if (req.listRoles.scopes.includes(role)) {
      next();
    } else {
      return next(
        new ErrorResponse("Not authorised to access this route", 401)
      );
    }
  };
};
