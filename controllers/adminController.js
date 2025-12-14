import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default {
  async listar(req, res) {
    try {
      const admins = await User.find({ role: "admin" }).select("-senha");
      res.json(admins);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao carregar administradores" });
    }
  },

  async criar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha)
        return res.status(400).json({ erro: "Preencha todos os campos" });

      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).json({ erro: "E-mail já cadastrado" });

      const hashed = bcrypt.hashSync(senha, 10);

      const admin = await User.create({ nome, email, senha: hashed, role: "admin" });

      const adminData = admin.toObject();
      delete adminData.senha;

      res.json(adminData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao criar administrador" });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar administrador" });
    }
  },
};
