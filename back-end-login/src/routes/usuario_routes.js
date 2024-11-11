import { Router } from "express";
import { deleteUsuario, editarUsuario, getUsuario } from "../controlles/userController.js";

const router = Router();


router.get("/user", getUsuario);
router.put("/edit/:id", editarUsuario);
router.delete("/delete/:id", deleteUsuario);

export default router;
