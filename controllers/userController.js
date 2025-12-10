import User from "../models/User.js";

export default {
  async update(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      res.json(user);

    } catch (err) {
      res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
  }
};
