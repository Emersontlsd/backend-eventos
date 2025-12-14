import Ingresso from "../models/Ingresso.js";
import Evento from "../models/Evento.js";
import Participante from "../models/Participante.js";

export default {
  async listar(req, res) {
    const ingressos = await Ingresso.find()
      .populate("evento")
      .populate("participante");

    res.json(ingressos);
  },

  async listarPorEvento(req, res) {
    const ingressos = await Ingresso.find({ evento: req.params.eventoId })
      .populate("evento")
      .populate("participante");

    res.json(ingressos);
  },

  async criar(req, res) {
    try {
      const { evento, participante } = req.body;

      const ev = await Evento.findById(evento);
      if (!ev) {
        return res.status(404).json({ erro: "Evento não encontrado" });
      }

      // 🚫 BLOQUEIO: evento já ocorreu
      if (ev.data && new Date(ev.data) < new Date()) {
        return res.status(400).json({
          erro: "Não é possível emitir ingresso para evento já realizado"
        });
      }

      const part = await Participante.findById(participante);
      if (!part) {
        return res.status(404).json({ erro: "Participante não encontrado" });
      }

      const novo = await Ingresso.create({ evento, participante });
      res.json(novo);

    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao emitir ingresso" });
    }
  },

  async atualizar(req, res) {
    const result = await Ingresso.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(result);
  },

  async deletar(req, res) {
    await Ingresso.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  }
};
