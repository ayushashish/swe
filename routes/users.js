const express = require("express");
const {
  createUser,
  getAllUsers,
  getSingleUser,
  loginUser,
} = require("../controllers/users");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router.route("/signup").post(createUser);
router.route("/").get(protect, authorize("user-get"), getAllUsers);
router.route("/:id").get(protect, authorize("user-get"), getSingleUser);
router.route("/signin").post(loginUser);

module.exports = router;
