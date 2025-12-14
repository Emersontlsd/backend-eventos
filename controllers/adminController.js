import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  async listar(req, res) {
    try {
      const admins = await Admin.find({}, "-senha"); // não retorna senha
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

      const exists = await Admin.findOne({ email });
      if (exists) {
        return res.status(400).json({ erro: "Email já cadastrado" });
      }

      const admin = await Admin.create({ nome, email, senha });
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
      await Admin.findByIdAndDelete(id);
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao deletar administrador" });
    }
  }
};
