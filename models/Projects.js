import mongoose from "mongoose";

// Defining Schema
const projectSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  description: { type: String },
  team: [
    {
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
const ProjectModel = mongoose.model("project", projectSchema);

export default ProjectModel;
