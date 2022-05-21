import ProjectModel from "../models/Projects.js";

class ProjectController {
  static getAllDoc = async (req, res) => {
    try {
      const result = await ProjectModel.find();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProjectController;
