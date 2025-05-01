import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
    CreateTask,
    UpdateTask,
    DeleteTask,
    GetAllTasks,
    GetSingleTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/tasks", protect, CreateTask);

router.get("/tasks", protect, GetAllTasks);

router.get("/tasks/:id", protect, GetSingleTask);

router.patch("/tasks/:id", protect, UpdateTask);

router.delete("/tasks/:id", protect, DeleteTask);

export default router;
