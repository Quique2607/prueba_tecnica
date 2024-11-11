import { Router } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/user", async (req, res) => {
  const user = await prisma.usuarios.findMany();
  res.send(user);
});

router.post("/create", async (req, res) => {
  const newUser = await prisma.usuarios.create({
    data: req.body,
  });
  res.json(newUser);
});

router.post("/register", async (req, res) => {
  try {
    const {
      usuario,
      correo,
      nombre,
      apell_paterno,
      apell_materno,
      contrasena,
      tipo_usuario,
    } = req.body;

    if (!usuario || !correo || !nombre || !apell_paterno || !apell_materno || !contrasena || !tipo_usuario) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const isfoundUser = await prisma.usuarios.findUnique({
      where: {
        correo,
      },
    });

    if (isfoundUser) {
      return res
        .status(400)
        .json({ error: "El Correo ingresado ya esta registrado" });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const newUser = await prisma.usuarios.create({
      data: {
        usuario,
        correo,
        nombre,
        apell_paterno,
        apell_materno,
        contrasena: hashedPassword,
        tipo_usuario,
      },
    });

    return res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({ error: "Error al crear el usuario" });
  }
});

router.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const user = await prisma.usuarios.findUnique({
      where: { correo },
    });

    if (!user) {
      return res.status(400).json({ error: "El correo ingresado no existe" });
    }

    const isPassword = await bcrypt.compare(contrasena, user.contrasena);

    if (!isPassword) {
      return res
        .status(400)
        .json({ error: "La contraseña ingresada es incorrecta" });
    }

    return res.status(200).json({ message: "Inicio de sesion exitoso" });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return res.status(500).json({ error: "Error en el inicio de sesión" });
  }
});

export default router;
