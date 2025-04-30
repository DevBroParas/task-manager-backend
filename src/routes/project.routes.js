import express from "express";
import { CreateProject, GetProjects } from "../controllers/project.controller";

const router = express.Router();

router.post("/projects", CreateProject);

router.get("/projects", GetProjects);

export default router;
