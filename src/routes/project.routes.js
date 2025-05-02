import express from "express";
import {
    CreateProject,
    GetProjects,
    GetSingleProject,
} from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/projects", protect, CreateProject);

router.get("/projects", protect, GetProjects);

router.get("/projects/:id", protect, GetSingleProject);

export default router;
