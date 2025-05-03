import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
    CreateTask,
    UpdateTask,
    DeleteTask,
    GetAllTasks,
    GetSingleTask,
    AllProjectTasks,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/tasks", protect, AllProjectTasks);

router.post("/tasks/project/:projectId", protect, CreateTask);
router.get("/tasks/project/:projectId", protect, GetAllTasks);

router.get("/tasks/:id", protect, GetSingleTask);
router.patch("/tasks/:id", protect, UpdateTask);
router.delete("/tasks/:id", protect, DeleteTask);
export default router;
