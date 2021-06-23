const mongoose = require("mongoose");

const SchoolSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name for this school"],
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("School", SchoolSchema);
