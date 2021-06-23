const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name for this role"],
  },
  scopes: {
    type: Array,
    default: undefined,
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

module.exports = mongoose.model("Role", RoleSchema);
