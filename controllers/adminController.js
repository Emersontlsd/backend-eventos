import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default {
  // Cadastro de novo administrador
  async criarAdmin(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
      }

      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ erro: "E-mail já cadastrado" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(senha, salt);

      const admin = await User.create({ nome, email, senha: hashed, role: "admin" });

      return res.json({
        mensagem: "Administrador criado com sucesso",
        admin: {
          id: admin._id,
          nome: admin.nome,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }, 

  async listarAdmins(req, res) {
    try {
      const admins = await User.find({ role: "admin" }).select("-senha");
      res.json(admins);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao listar administradores" });
    }
  }
};

