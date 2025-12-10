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
    const { evento, participante } = req.body;

    const ev = await Evento.findById(evento);
    if (!ev) return res.status(404).json({ erro: "Evento não encontrado" });

    const part = await Participante.findById(participante);
    if (!part) return res.status(404).json({ erro: "Participante não encontrado" });

    const novo = await Ingresso.create({ evento, participante });
    res.json(novo);
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
