import express from "express";
import { CreateProject, GetProjects } from "../controllers/project.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/projects", protect, CreateProject);

router.get("/projects", protect, GetProjects);

export default router;
