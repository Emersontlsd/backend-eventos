import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default {
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha, foto, avatar } = req.body;

      const data = {};

      if (nome) data.nome = nome;
      if (email) data.email = email;
      if (foto !== undefined) data.foto = foto;
      if (avatar) data.avatar = avatar;

      if (senha) {
        data.senha = bcrypt.hashSync(senha, 10);
      }

      const user = await User.findByIdAndUpdate(
        id,
        data,
        { new: true }
      ).select("-senha");

      if (!user) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      res.json(user);

    } catch (err) {
      res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
  }
};
