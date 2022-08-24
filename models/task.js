const mongoose = require("mongoose");

// Defining Schema
const taskSchema = new mongoose.Schema({
  ProjectId: { type: String },
  id: { type: String },
  title: { type: String },
  description: { type: String },
  selectedMembers: [
    {
      _id: false,
      name: { type: String },
      id: { type: String },
      profile_image: {
        _id: false,
        small: { type: String },
        medium: { type: String },
        large: { type: String },
      },
      portfolio_url: { type: String },
    },
  ],
  progress: { type: Number },
});

// Model
const Task = mongoose.model("task", taskSchema);

module.exports = Task;
