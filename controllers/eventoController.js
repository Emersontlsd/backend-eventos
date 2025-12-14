import Evento from "../models/Evento.js";
import Participante from "../models/Participante.js";

export default {
  async listar(req, res) {
    try {
      const eventos = await Evento.find()
        .populate("participantes")
        .populate("ingressos");
      res.json(eventos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao listar eventos" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const evento = await Evento.findById(id)
        .populate("participantes")
        .populate("ingressos");
      if (!evento) return res.status(404).json({ erro: "Evento não encontrado" });
      res.json(evento);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao buscar evento" });
    }
  },

  async criar(req, res) {
    try {
      const evento = await Evento.create(req.body);
      res.json(evento);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao criar evento" });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const evento = await Evento.findByIdAndUpdate(id, req.body, { new: true });
      res.json(evento);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao atualizar evento" });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await Evento.findByIdAndDelete(id);
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao remover evento" });
    }
  },

  // Adiciona participante
  async addParticipant(req, res) {
    try {
      const { id } = req.params; // id do evento
      const { participantId } = req.body;

      const evento = await Evento.findById(id);
      if (!evento) return res.status(404).json({ erro: "Evento não encontrado" });

      // evita duplicidade
      if (!evento.participantes.includes(participantId)) {
        evento.participantes.push(participantId);
        await evento.save();
      }

      const updatedEvento = await Evento.findById(id).populate("participantes");
      res.json(updatedEvento);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao adicionar participante" });
    }
  },

  // Remove participante
  async removeParticipant(req, res) {
    try {
      const { id, participantId } = req.params; // id do evento + participante

      const evento = await Evento.findById(id);
      if (!evento) return res.status(404).json({ erro: "Evento não encontrado" });

      evento.participantes = evento.participantes.filter(p => p.toString() !== participantId);
      await evento.save();

      const updatedEvento = await Evento.findById(id).populate("participantes");
      res.json(updatedEvento);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao remover participante" });
    }
  }
};
