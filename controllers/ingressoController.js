import Ingresso from "../models/Ingresso.js";
import Evento from "../models/Evento.js";
import Participante from "../models/Participante.js";

export default {
  async listar(req, res) {
    try {
      const ingressos = await Ingresso.find()
        .populate("evento")
        .populate("participante");
      res.json(ingressos);
    } catch {
      res.status(500).json({ erro: "Erro ao listar ingressos" });
    }
  },

  async listarPorEvento(req, res) {
    try {
      const ingressos = await Ingresso.find({
        evento: req.params.eventoId,
      }).populate("evento participante");

      res.json(ingressos);
    } catch {
      res.status(500).json({ erro: "Erro ao listar ingressos" });
    }
  },

  async criar(req, res) {
    try {
      const { evento, participante } = req.body;

      if (!(await Evento.findById(evento))) {
        return res.status(404).json({ erro: "Evento não encontrado" });
      }

      if (!(await Participante.findById(participante))) {
        return res.status(404).json({ erro: "Participante não encontrado" });
      }

      const novo = await Ingresso.create({ evento, participante });
      res.status(201).json(novo);
    } catch {
      res.status(400).json({ erro: "Erro ao criar ingresso" });
    }
  },

  async atualizar(req, res) {
    try {
      const ingresso = await Ingresso.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(ingresso);
    } catch {
      res.status(400).json({ erro: "Erro ao atualizar ingresso" });
    }
  },

  async deletar(req, res) {
    try {
      await Ingresso.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch {
      res.status(400).json({ erro: "Erro ao deletar ingresso" });
    }
  },
};
