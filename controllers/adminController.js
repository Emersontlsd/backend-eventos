import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default {
  async listar(req, res) {
    try {
      const admins = await User.find({ role: "admin" });
      res.json(admins);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao listar administradores" });
    }
  },

  async criar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
      }

      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ erro: "E-mail já cadastrado" });

      const hashed = bcrypt.hashSync(senha, 10);

      const admin = await User.create({ nome, email, senha: hashed, role: "admin" });

      res.json({
        mensagem: "Administrador criado com sucesso",
        admin: { id: admin._id, nome: admin.nome, email: admin.email, role: admin.role }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao criar administrador" });
    }
  },

  async deletar(req, res) {
    try {
      const admin = await User.findById(req.params.id);
      if (!admin) return res.status(404).json({ erro: "Administrador não encontrado" });

      await admin.remove();
      res.json({ mensagem: "Administrador removido" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao deletar administrador" });
    }
  }
};
