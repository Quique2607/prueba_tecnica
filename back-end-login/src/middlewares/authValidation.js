const signUpValidation = (req, res, next) => {
  const {usuario,correo,nombre,apell_paterno,apell_materno, contrasena, tipo_usuario} = req.body

  if (!usuario || !correo || !nombre || !apell_paterno || !apell_materno || !contrasena || !tipo_usuario) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({ error: "El correo no es válido" });
  }

  if (contrasena.length < 6) {
    return res.status(400).json({
      error: "La contraseña debe tener al menos 6 caracteres",
    });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res
      .status(400)
      .json({ error: "El Correo y contraseña son necesarios" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({ error: "El correo ingresado no es valido" });
  }

  next();
};
