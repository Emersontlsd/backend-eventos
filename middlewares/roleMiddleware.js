export function onlyAdmin(req, res, next) {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ erro: "Acesso negado" });
    }
    next();
  }
  