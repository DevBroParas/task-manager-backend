import express from "express";
import {
    CreateProject,
    GetProjects,
    GetSingleProject,
    UpdateProject,
    DeleteProject,
} from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/projects", protect, CreateProject);

router.get("/projects", protect, GetProjects);

router.get("/projects/:id", protect, GetSingleProject);

// router.patch("/projects/:id", protect, UpdateProject);

// router.delete("/projects/:id", protect, DeleteProject);

export default router;
