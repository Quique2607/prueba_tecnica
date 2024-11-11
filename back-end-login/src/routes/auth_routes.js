import { Router } from "express";
import 'dotenv/config';
import { login, logout, registerUser, validateToken } from "../controlles/authController.js";

const router = Router();

router.post("/login", login);
router.post("/register", registerUser);
router.post("/logout", logout);
router.get("/check-auth", validateToken);

export default router;