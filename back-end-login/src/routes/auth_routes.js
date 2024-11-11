import { Router } from "express";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import { login, logout, registerUser } from "../controlles/authController.js";

const router = Router();


router.use(cookieParser());

router.post("/login", login);
router.post("/register", registerUser);
router.post("/logout", logout);

export default router;