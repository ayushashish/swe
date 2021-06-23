const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  schoolId: {
    type: mongoose.Schema.ObjectId,
    ref: "School",
    default: null,
  },
  updated: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
