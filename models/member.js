const mongoose = require("mongoose");

// Defining Schema
const memberSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  portfolio_url: { type: String },
  profile_image: {
    _id: false,
    small: { type: String },
    medium: { type: String },
    large: { type: String },
  },
});

// Model
const Member = mongoose.model("member", memberSchema);

module.exports = Member;
