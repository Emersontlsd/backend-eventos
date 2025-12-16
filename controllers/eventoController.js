import Evento from "../models/Evento.js";
import Ingresso from "../models/Ingresso.js";

export default {
  // LISTAR EVENTOS
  async listar(req, res) {
    try {
      const eventos = await Evento.find().lean();

      const eventosComDados = await Promise.all(
        eventos.map(async (evento) => {
          const ingressos = await Ingresso.find({ evento: evento._id });
          return {
            ...evento,
            totalIngressos: ingressos.length,
          };
        })
      );

      res.json(eventosComDados);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao listar eventos" });
    }
  },

  // BUSCAR EVENTO POR ID (DETALHE)
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const evento = await Evento.findById(id).lean();
      if (!evento) {
        return res.status(404).json({ erro: "Evento não encontrado" });
      }

      const ingressos = await Ingresso.find({ evento: id })
        .populate("participante")
        .lean();

      const participantes = ingressos
        .map(i => i.participante)
        .filter(Boolean);

      res.json({
        ...evento,
        totalIngressos: ingressos.length,
        participantes,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao buscar evento" });
    }
  },

  // CRIAR EVENTO
  async criar(req, res) {
    try {
      const evento = await Evento.create(req.body);
      res.json(evento);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao criar evento" });
    }
  },

  // ATUALIZAR EVENTO
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

  // DELETAR EVENTO
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
};
