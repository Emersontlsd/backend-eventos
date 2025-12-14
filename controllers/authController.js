import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
      }

      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ erro: "E-mail já cadastrado" });
      }

      const hashed = bcrypt.hashSync(senha, 10);

      const user = await User.create({
        nome,
        email,
        senha: hashed,
      });

      res.status(201).json({
        id: user._id,
        nome: user.nome,
        email: user.email,
      });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao registrar usuário" });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ erro: "Usuário não existe" });
      }

      const valid = bcrypt.compareSync(senha, user.senha);
      if (!valid) {
        return res.status(400).json({ erro: "Senha incorreta" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "SEGREDOAQUI",
        { expiresIn: "2d" }
      );

      res.json({
        token,
        user: {
          id: user._id,
          nome: user.nome,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao realizar login" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;

      const data = {};

      if (nome) data.nome = nome;
      if (email) data.email = email;
      if (senha) data.senha = bcrypt.hashSync(senha, 10);

      const user = await User.findByIdAndUpdate(id, data, { new: true });

      if (!user) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      const result = user.toObject();
      delete result.senha;

      res.json(result);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
  },
};
