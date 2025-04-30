import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "./DB/connectDb.js";
import connectDb from "./DB/connectDb.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
app.use("api/v1/user", userRoutes);
app.use("api/v1/project", projectRoutes);
app.use("api/vi/task", taskRoutes);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${PORT}`);
});
