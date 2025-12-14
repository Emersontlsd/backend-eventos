import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ erro: "Token malformado" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // informações úteis no request
    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.user = decoded;

    return next();

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ erro: "Token expirado" });
    }

    return res.status(401).json({ erro: "Token inválido" });
  }
}

export function onlyAdmin(req, res, next) {
  if (req.userRole !== "admin") {
    return res.status(403).json({ erro: "Acesso restrito a administradores" });
  }

  return next();
}
