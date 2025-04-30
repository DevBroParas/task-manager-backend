import express from "express";
import {
  CreateTask,
  GetTasks,
  GetTask,
  UpdateTask,
  DeleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/tasks", CreateTask);

router.get("/tasks", GetTasks);

router.get("/tasks/:id", GetTask);

router.patch("/tasks/:id", UpdateTask);

router.delete("/tasks/:id", DeleteTask);

export default router;
