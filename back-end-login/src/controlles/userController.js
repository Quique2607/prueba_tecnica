import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsuario = async (req, res) => {
  const user = await prisma.usuarios.findMany();

  const dataUser = user.map((user) => ({
    id: user.id,
    usuario: user.usuario,
    correo: user.correo,
    nombre_completo: `${user.nombre} ${user.apell_paterno} ${user.apell_materno}`,
    tipo_usuario: user.tipo_usuario,
  }));

  res.json(dataUser);
};

export const editarUsuario = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID desde los parámetros de la URL
  const {
    usuario,
    correo,
    tipo_usuario,
  } = req.body; // Datos para actualizar

  try {
    const updatedUser = await prisma.usuarios.update({
      where: { id: Number(id) }, // Convertimos el id a número si es necesario
      data: {
        usuario,
        correo,
        tipo_usuario,
      },
    });

    res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente", updatedUser });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "No se pudo actualizar el usuario" });
  }
};

export const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.usuarios.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "No se pudo eliminar el usuario" });
  }
};
