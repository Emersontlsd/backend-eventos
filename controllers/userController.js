import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default {
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, telefone, senha } = req.body;

      const user = await User.findById(id);
      if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });

      if (nome) user.nome = nome;
      if (telefone) user.telefone = telefone;

      // Atualiza senha se enviada
      if (senha) {
        const salt = bcrypt.genSaltSync(10);
        user.senha = bcrypt.hashSync(senha, salt);
      }

      await user.save();

      const userData = user.toObject();
      delete userData.senha; // remove senha do retorno

      res.json(userData);

    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
  }
};
