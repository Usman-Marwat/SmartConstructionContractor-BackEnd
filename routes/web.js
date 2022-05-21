import express from "express";
import ProjectController from "../controllers/projectsController.js";
const router = express.Router();

router.get("/project", ProjectController.getAllDoc);

export default router;
