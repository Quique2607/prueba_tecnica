import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { deleteUsuario, editarUsuario, getUsuario } from "../controlles/userController.js";

const router = Router();
const prisma = new PrismaClient();


router.get("/user", getUsuario);
router.put("/edit/:id", editarUsuario);
router.delete("/delete/:id", deleteUsuario);

export default router;
