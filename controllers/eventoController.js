import Evento from "../models/Evento.js";

export default {
  async listar(req, res) {
    try {
      const eventos = await Evento.find().populate("participantes");
      res.json(eventos);
    } catch {
      res.status(500).json({ erro: "Erro ao listar eventos" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const evento = await Evento.findById(req.params.id).populate("participantes");
      if (!evento) {
        return res.status(404).json({ erro: "Evento não encontrado" });
      }
      res.json(evento);
    } catch {
      res.status(500).json({ erro: "Erro ao buscar evento" });
    }
  },

  async criar(req, res) {
    try {
      const novo = await Evento.create(req.body);
      res.status(201).json(novo);
    } catch {
      res.status(400).json({ erro: "Erro ao criar evento" });
    }
  },

  async atualizar(req, res) {
    try {
      const atualizado = await Evento.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate("participantes");

      res.json(atualizado);
    } catch {
      res.status(400).json({ erro: "Erro ao atualizar evento" });
    }
  },

  async deletar(req, res) {
    try {
      await Evento.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch {
      res.status(400).json({ erro: "Erro ao deletar evento" });
    }
  },
};
