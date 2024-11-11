import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

export const registerUser = async (req, res) => {
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

    if (
      !usuario ||
      !correo ||
      !nombre ||
      !apell_paterno ||
      !apell_materno ||
      !contrasena ||
      !tipo_usuario
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
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

    return res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", user: newUser });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({ error: "Error al crear el usuario" });
  }
};

export const login = async (req, res) => {
  const { correo, contrasena } = req.body;
  //const SECRET_KEY = Enr1qu3;

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

    const jwtToken = jwt.sign(
      {
        id: user.id,
        correo: user.correo,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("authToken",jwtToken,{
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000
    })

    return res.status(200).json({
      message: "Inicio de sesion exitoso",
      success: true,
      usuario: user.usuario,
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return res.status(500).json({ error: "Error en el inicio de sesión" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Cierre de session exitoso",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error al cerrar la session",
    });
  }
};

export const validateToken = async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.json({ authenticated: false });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    return res.json({ authenticated: true });
  } catch (error) {
    return res.json({ authenticated: false });
  }
};
