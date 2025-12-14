import Participante from "../models/Participante.js";

export default {
  async listar(req, res) {
    try {
      const lista = await Participante.find();
      res.json(lista);
    } catch {
      res.status(500).json({ erro: "Erro ao listar participantes" });
    }
  },

  async criar(req, res) {
    try {
      const novo = await Participante.create(req.body);
      res.status(201).json(novo);
    } catch {
      res.status(400).json({ erro: "Erro ao criar participante" });
    }
  },

  async atualizar(req, res) {
    try {
      const atualizado = await Participante.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(atualizado);
    } catch {
      res.status(400).json({ erro: "Erro ao atualizar participante" });
    }
  },

  async deletar(req, res) {
    try {
      await Participante.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch {
      res.status(400).json({ erro: "Erro ao deletar participante" });
    }
  },
};
