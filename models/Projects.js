const mongoose = require("mongoose");

// Defining Schema
const projectSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  description: { type: String },
  team: [
    {
      _id: false,
      name: { type: String },
      photo: { type: String },
    },
  ],
  progress: { type: Number },
  tasks: { type: Number },
  createdAt: { type: String },
  status: { type: String },
});

// Model
const Project = mongoose.model("project", projectSchema);

module.exports = Project;
