const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado", authenticated: false });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next(); 
  } catch (error) {
    return res.status(401).json({ error: "Token inválido", authenticated: false });
  }
};

export default verifyToken