import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import { Register, Login, Logout, Me } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", Register);

router.post("/login", Login);

router.post("/logout", Logout);

router.get("/me", protect, Me);

export default router;
